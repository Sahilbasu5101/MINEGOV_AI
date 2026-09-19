import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthSession, AuthenticatedUser } from '../types/auth';
import type { InspectionDraft } from '../storage/inspection-storage';
import type { ReportedIssue, EvidenceItem } from '../storage/issue-storage';

// Resolution for backend API URL across Web, Android Emulator, iOS Simulator & LAN
const getDefaultBaseUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  if (Platform.OS === 'android') {
    // Android emulator host loopback address
    return 'http://10.0.2.2:5000/api/v1';
  }
  // Web browser or iOS Simulator
  return 'http://localhost:5000/api/v1';
};

let activeBaseUrl = getDefaultBaseUrl();

const TOKEN_STORAGE_KEY = 'minegov.auth.token';

export interface UploadResult {
  status: string;
  message: string;
  fileUrl: string;
  publicId: string;
  format: string;
  bytes: number;
}

export const apiClient = {
  getBaseUrl(): string {
    return activeBaseUrl;
  },

  setBaseUrl(url: string) {
    activeBaseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },

  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {
      // ignore
    }
  },

  async clearToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
  },

  async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },

  /**
   * 1. Authentication against unified Neon PostgreSQL backend
   */
  async login(employeeId: string, pin: string): Promise<AuthSession> {
    const res = await fetch(`${activeBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: employeeId.trim(), pin: pin.trim() }),
    });

    const data = await res.json();
    if (!res.ok || data.status !== 'SUCCESS') {
      throw new Error(data.message || 'Invalid Employee ID or PIN.');
    }

    if (data.token) {
      await this.setToken(data.token);
    }

    const authUser: AuthenticatedUser = {
      id: data.user.id,
      employeeId: data.user.employeeId || employeeId,
      name: data.user.name || data.user.fullName || employeeId,
      role: data.user.role,
      domain: data.user.domain || 'safety',
    };

    return {
      user: authUser,
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * 2. Cloudinary Media Upload (via backend POST /api/v1/upload)
   * Streams photos, voice recordings, and documents directly to Cloudinary CDN
   */
  async uploadEvidence(
    uri: string,
    type: 'photo' | 'video' | 'voice' | 'document',
    name?: string,
    category: string = 'mobile_evidence'
  ): Promise<UploadResult> {
    // Determine MIME type
    let mimeType = 'image/jpeg';
    if (type === 'voice') mimeType = 'audio/m4a';
    else if (type === 'video') mimeType = 'video/mp4';
    else if (type === 'document') mimeType = 'application/pdf';
    else if (uri.endsWith('.png')) mimeType = 'image/png';
    else if (uri.endsWith('.jpg') || uri.endsWith('.jpeg')) mimeType = 'image/jpeg';

    const fileName = name || `evidence_${Date.now()}.${mimeType.split('/')[1] || 'jpg'}`;

    const formData = new FormData();
    formData.append('file', {
      uri,
      type: mimeType,
      name: fileName,
    } as any);
    formData.append('category', category);

    const token = await this.getToken();
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${activeBaseUrl}/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || data.status !== 'SUCCESS') {
      throw new Error(data.message || 'Failed to upload media to Cloudinary CDN');
    }

    return data as UploadResult;
  },

  /**
   * 3. Submit Daily Inspection Report to Neon PostgreSQL database
   */
  async submitInspection(
    draft: InspectionDraft,
    inspectorUser?: AuthenticatedUser
  ): Promise<any> {
    const headers = await this.getAuthHeaders();

    const payload = {
      shift: draft.shift,
      workingLocation: draft.workingLocation,
      dateSubtitle: draft.dateSubtitle,
      status: 'SUBMITTED',
      checklistItems: draft.items,
      summaryCounts: {
        total: draft.items.length,
        completed: draft.items.filter((i) => i.status !== 'PENDING').length,
        pending: draft.items.filter((i) => i.status === 'PENDING').length,
        issues: draft.items.filter((i) => i.status === 'ISSUE').length,
      },
      ...(inspectorUser?.id ? { inspectorId: inspectorUser.id } : {}),
    };

    const res = await fetch(`${activeBaseUrl}/inspections`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || data.status !== 'SUCCESS') {
      throw new Error(data.message || 'Failed to submit inspection report to central database.');
    }

    return data.report;
  },

  /**
   * 4. Submit Reported Issue with Cloudinary Media Links to Neon PostgreSQL
   */
  async submitIssue(
    issue: ReportedIssue,
    reporterUser?: AuthenticatedUser
  ): Promise<any> {
    // Process evidence attachments: upload any local files to Cloudinary
    const processedEvidence: Array<{
      id: string;
      type: string;
      url: string;
      name: string;
      size?: number;
      duration?: number;
    }> = [];

    for (const item of issue.evidence) {
      // If already a remote Cloudinary URL, keep as is
      if (item.uri && item.uri.startsWith('http')) {
        processedEvidence.push({
          id: item.id,
          type: item.type,
          url: item.uri,
          name: item.name,
          size: item.size,
          duration: item.duration,
        });
      } else if (item.uri) {
        // Upload local URI to Cloudinary via backend
        try {
          const uploadRes = await this.uploadEvidence(item.uri, item.type, item.name);
          processedEvidence.push({
            id: item.id,
            type: item.type,
            url: uploadRes.fileUrl,
            name: item.name,
            size: uploadRes.bytes || item.size,
            duration: item.duration,
          });
        } catch (uploadErr) {
          console.warn('Cloudinary upload warning for item:', item.name, uploadErr);
          // Keep local record fallback
          processedEvidence.push({
            id: item.id,
            type: item.type,
            url: item.uri,
            name: item.name,
            size: item.size,
            duration: item.duration,
          });
        }
      }
    }

    const headers = await this.getAuthHeaders();

    const payload = {
      category: issue.category,
      itemTitle: issue.itemTitle,
      itemDescription: issue.itemDescription,
      workingLocation: issue.location,
      observation: issue.observation,
      immediateAction: issue.immediateAction,
      additionalRemarks: issue.additionalRemarks,
      severity: issue.aiAssessment.severity || 'MEDIUM',
      riskScore: issue.aiAssessment.riskScore || 50,
      riskCategory: issue.aiAssessment.riskCategory || 'Moderate Risk',
      latitude: issue.coordinates?.latitude,
      longitude: issue.coordinates?.longitude,
      gpsStatus: issue.gpsStatus,
      evidenceUrls: processedEvidence,
      status: 'SUBMITTED',
      ...(reporterUser?.id ? { reporterId: reporterUser.id } : {}),
    };

    const res = await fetch(`${activeBaseUrl}/issues`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || data.status !== 'SUCCESS') {
      throw new Error(data.message || 'Failed to submit issue to central database.');
    }

    return data.issue;
  },

  /**
   * 5. Health check verification
   */
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${activeBaseUrl.replace('/api/v1', '')}/api/health`);
      const data = await res.json();
      return data.status === 'HEALTHY';
    } catch {
      return false;
    }
  },
};
