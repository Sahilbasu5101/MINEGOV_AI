export type ReportingDomain = 'safety' | 'environment' | 'production' | 'labour';
export type FieldRole = 'SIRDAR' | 'SAFETY_INSPECTOR' | 'TECHNICAL_COMPETENT_PERSON' | 'ENVIRONMENT_OFFICER' | 'PRODUCTION_OFFICER' | 'WELFARE_OFFICER' | 'MINE_MANAGER';
export interface AuthenticatedUser { id: string; employeeId: string; name: string; role: FieldRole; domain: ReportingDomain; }
export interface AuthSession { user: AuthenticatedUser; createdAt: string }
