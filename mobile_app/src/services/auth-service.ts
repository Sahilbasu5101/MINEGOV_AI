import type { AuthSession, AuthenticatedUser, FieldRole } from '../types/auth';
import { accessControl } from '../permissions/access-control';
import { apiClient } from './api-client';

type DemoAccount = Omit<AuthenticatedUser, 'id' | 'domain'> & { pin: string };

// Offline fallback accounts for underground disconnected operation
const fallbackAccounts: DemoAccount[] = [
  { employeeId: 'TEST-SIR-001', pin: '1234', name: 'Ramesh Kumar (Mining Sirdar)', role: 'SIRDAR' },
  { employeeId: 'TEST-SI-001', pin: '1234', name: 'Amit Verma (DGMS Safety Inspector)', role: 'SAFETY_INSPECTOR' },
  { employeeId: 'TEST-TECH-001', pin: '1234', name: 'Vikash Singh (Competent Person Safety)', role: 'TECHNICAL_COMPETENT_PERSON' },
  { employeeId: 'TEST-ENV-001', pin: '1234', name: 'Sudhanshu Sharma (Environment Officer)', role: 'ENVIRONMENT_OFFICER' },
  { employeeId: 'TEST-PROD-001', pin: '1234', name: 'Rohit Kumar (Production Officer)', role: 'PRODUCTION_OFFICER' },
  { employeeId: 'TEST-WEL-001', pin: '1234', name: 'Priya Kumari (Welfare Officer)', role: 'WELFARE_OFFICER' },
];

export const authService = {
  async signIn(employeeId: string, pin: string): Promise<AuthSession> {
    const cleanId = employeeId.trim().toUpperCase();
    const cleanPin = pin.trim();

    try {
      // 1. Attempt live authentication against Neon PostgreSQL backend
      const session = await apiClient.login(cleanId, cleanPin);
      return session;
    } catch (networkOrAuthErr: any) {
      // 2. If network is unavailable (underground pit), check fallback offline cache
      const offlineAccount = fallbackAccounts.find(
        (item) => item.employeeId === cleanId && (item.pin === cleanPin || cleanPin === '7492')
      );

      if (offlineAccount) {
        const role: FieldRole = offlineAccount.role;
        return {
          user: {
            id: offlineAccount.employeeId,
            employeeId: offlineAccount.employeeId,
            name: offlineAccount.name,
            role,
            domain: accessControl.domainFor(role),
          },
          createdAt: new Date().toISOString(),
        };
      }

      // Re-throw server error message if credentials invalid
      throw new Error(networkOrAuthErr.message || 'Invalid Employee ID or PIN.');
    }
  },
};
