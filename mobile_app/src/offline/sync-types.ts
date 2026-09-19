export type ReportStatus = 'DRAFT' | 'PENDING_SYNC' | 'SUBMITTED' | 'UNDER_REVIEW' | 'VERIFIED' | 'CLOSED';
export interface SyncQueueItem { id: string; reportId: string; attempts: number; createdAt: string }
export interface SyncAdapter { enqueue(item: SyncQueueItem): Promise<void>; syncPending(): Promise<void> }
