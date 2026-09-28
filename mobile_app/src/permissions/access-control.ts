import type { FieldRole, ReportingDomain } from '../types/auth';
const domainByRole: Record<FieldRole, ReportingDomain> = { SIRDAR: 'safety', SAFETY_INSPECTOR: 'safety', TECHNICAL_COMPETENT_PERSON: 'safety', ENVIRONMENT_OFFICER: 'environment', PRODUCTION_OFFICER: 'production', WELFARE_OFFICER: 'labour', MINE_MANAGER: 'safety' };
export const accessControl = { domainFor: (role: FieldRole) => domainByRole[role], canAccessDomain: (role: FieldRole, domain: ReportingDomain) => domainByRole[role] === domain };
