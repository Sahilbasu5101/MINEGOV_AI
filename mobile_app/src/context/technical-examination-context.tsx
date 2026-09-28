import React, { createContext, useContext, useState, useCallback, type PropsWithChildren } from 'react';

export interface PhotoEvidence {
  id: string;
  uri: string;
  name?: string;
  size?: number;
}

export interface VideoEvidence {
  id: string;
  uri: string;
  name?: string;
  duration?: number;
  size?: number;
}

export interface DocumentEvidence {
  id: string;
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatExaminationDate(d: Date): string {
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatExaminationTime(d: Date): string {
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

interface TechnicalExaminationContextValue {
  examTimestamp: Date;
  examDate: string;
  examTime: string;
  dateTimeString: string;
  photos: PhotoEvidence[];
  videos: VideoEvidence[];
  documents: DocumentEvidence[];
  initExamination: (force?: boolean) => void;
  addPhotos: (newPhotos: PhotoEvidence[]) => void;
  removePhoto: (id: string) => void;
  addVideos: (newVideos: VideoEvidence[]) => void;
  removeVideo: (id: string) => void;
  addDocuments: (newDocs: DocumentEvidence[]) => void;
  removeDocument: (id: string) => void;
  resetExamination: () => void;
}

const TechnicalExaminationContext = createContext<TechnicalExaminationContextValue | null>(null);

export function TechnicalExaminationProvider({ children }: PropsWithChildren) {
  // Capture the actual current device timestamp when created
  const [examTimestamp, setExamTimestamp] = useState<Date>(() => new Date());
  const [photos, setPhotos] = useState<PhotoEvidence[]>([]);
  const [videos, setVideos] = useState<VideoEvidence[]>([]);
  const [documents, setDocuments] = useState<DocumentEvidence[]>([]);

  const initExamination = useCallback((force = false) => {
    if (force) {
      setExamTimestamp(new Date());
      setPhotos([]);
      setVideos([]);
      setDocuments([]);
    }
  }, []);

  const addPhotos = useCallback((newPhotos: PhotoEvidence[]) => {
    setPhotos((prev) => {
      const remainingSlots = Math.max(0, 5 - prev.length);
      const toAdd = newPhotos.slice(0, remainingSlots);
      return [...prev, ...toAdd];
    });
  }, []);

  const removePhoto = useCallback((id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addVideos = useCallback((newVideos: VideoEvidence[]) => {
    setVideos((prev) => {
      const remainingSlots = Math.max(0, 3 - prev.length);
      const toAdd = newVideos.slice(0, remainingSlots);
      return [...prev, ...toAdd];
    });
  }, []);

  const removeVideo = useCallback((id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const addDocuments = useCallback((newDocs: DocumentEvidence[]) => {
    setDocuments((prev) => {
      const remainingSlots = Math.max(0, 5 - prev.length);
      const toAdd = newDocs.slice(0, remainingSlots);
      return [...prev, ...toAdd];
    });
  }, []);

  const removeDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const resetExamination = useCallback(() => {
    setExamTimestamp(new Date());
    setPhotos([]);
    setVideos([]);
    setDocuments([]);
  }, []);

  const examDate = formatExaminationDate(examTimestamp);
  const examTime = formatExaminationTime(examTimestamp);
  const dateTimeString = `${examDate}, ${examTime}`;

  return (
    <TechnicalExaminationContext.Provider
      value={{
        examTimestamp,
        examDate,
        examTime,
        dateTimeString,
        photos,
        videos,
        documents,
        initExamination,
        addPhotos,
        removePhoto,
        addVideos,
        removeVideo,
        addDocuments,
        removeDocument,
        resetExamination,
      }}
    >
      {children}
    </TechnicalExaminationContext.Provider>
  );
}

export function useTechnicalExamination() {
  const context = useContext(TechnicalExaminationContext);
  if (!context) {
    throw new Error('useTechnicalExamination must be used within TechnicalExaminationProvider');
  }
  return context;
}
