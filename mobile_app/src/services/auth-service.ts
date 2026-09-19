import type { AuthSession, AuthenticatedUser, FieldRole } from '../types/auth';
import { accessControl } from '../permissions/access-control';
type DemoAccount = Omit<AuthenticatedUser, 'id' | 'domain'> & { pin: string };
// Development-only adapter. Replace with the production backend adapter later.
const demoAccounts: DemoAccount[] = [
  { employeeId: 'TEST-SIR-001', pin: '1234', name: 'Ramesh Kumar', role: 'SIRDAR' }, { employeeId: 'TEST-SI-001', pin: '1234', name: 'Amit Verma', role: 'SAFETY_INSPECTOR' }, { employeeId: 'TEST-TECH-001', pin: '1234', name: 'Vikash Singh', role: 'TECHNICAL_COMPETENT_PERSON' }, { employeeId: 'TEST-ENV-001', pin: '1234', name: 'Sudhanshu Sharma', role: 'ENVIRONMENT_OFFICER' }, { employeeId: 'TEST-PROD-001', pin: '1234', name: 'Rohit Kumar', role: 'PRODUCTION_OFFICER' }, { employeeId: 'TEST-WEL-001', pin: '1234', name: 'Priya Kumari', role: 'WELFARE_OFFICER' },
];
export const authService = { async signIn(employeeId: string, pin: string): Promise<AuthSession> { const account = demoAccounts.find((item) => item.employeeId === employeeId.trim().toUpperCase() && item.pin === pin); if (!account) throw new Error('Invalid Employee ID or PIN.'); const role: FieldRole = account.role; return { user: { id: account.employeeId, employeeId: account.employeeId, name: account.name, role, domain: accessControl.domainFor(role) }, createdAt: new Date().toISOString() }; } };
