import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReportStatus } from '../offline/sync-types';
import { Coordinates } from '../services/field-services';

export interface EvidenceItem {
  id: string;
  type: 'photo' | 'video' | 'voice' | 'document';
  uri: string;
  name: string;
  size?: number;
  duration?: number; // duration in seconds (for voice/video)
  capturedAt: string;
}

export interface ReportedIssue {
  id: string;
  reportId: string;
  itemId: string;
  category: string;
  itemTitle: string;
  itemDescription: string;
  mineSite: string;
  location: string;
  dateTime: string;
  userId: string;
  userRole: string;
  coordinates?: Coordinates;
  gpsStatus: 'CAPTURED' | 'PENDING' | 'UNAVAILABLE';
  observation: string;
  voiceNoteUri?: string;
  evidence: EvidenceItem[];
  aiAssessment: {
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    riskScore: number;
    riskCategory: string;
    explanation?: string;
    isOverridden?: boolean;
  };
  immediateAction: string;
  additionalRemarks: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

const ISSUES_STORAGE_KEY = 'minegov.safety.reported_issues';

export const issueStorage = {
  async getAllIssues(): Promise<ReportedIssue[]> {
    try {
      const data = await AsyncStorage.getItem(ISSUES_STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as ReportedIssue[];
      }
    } catch {
      // return empty array if read fails
    }
    return [];
  },

  async getIssueByItemId(itemId: string): Promise<ReportedIssue | null> {
    const issues = await this.getAllIssues();
    return issues.find((issue) => issue.itemId === itemId) || null;
  },

  async saveIssue(issue: ReportedIssue): Promise<void> {
    const issues = await this.getAllIssues();
    const index = issues.findIndex((i) => i.id === issue.id || i.itemId === issue.itemId);
    const updated = {
      ...issue,
      updatedAt: new Date().toISOString(),
    };

    if (index >= 0) {
      issues[index] = updated;
    } else {
      issues.push(updated);
    }

    await AsyncStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(issues));
  },

  async removeIssue(id: string): Promise<void> {
    const issues = await this.getAllIssues();
    const filtered = issues.filter((i) => i.id !== id);
    await AsyncStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(filtered));
  },
};
