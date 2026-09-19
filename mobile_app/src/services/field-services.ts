export interface Coordinates { latitude: number; longitude: number; accuracy?: number; capturedAt: string }
export interface EvidenceMetadata { reportId: string; userId: string; type: 'photo' | 'video' | 'document' | 'voice'; localUri: string; capturedAt: string; location?: Coordinates; serverReference?: string }
export interface LocationService { capture(): Promise<Coordinates> }
export interface EvidenceService { register(metadata: EvidenceMetadata): Promise<void> }
export interface AiAssistance { assess(input: unknown): Promise<unknown> }
