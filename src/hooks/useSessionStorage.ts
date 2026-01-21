import { useState, useEffect, useCallback } from "react";
import { AnalysisSession, CameraProfile } from "@/types/camera";
import { OV5640_PROFILE } from "@/data/mockCameraData";

const SESSIONS_STORAGE_KEY = "camera-analysis-sessions";
const CURRENT_SESSION_KEY = "camera-current-session";

interface UseSessionStorageReturn {
  sessions: AnalysisSession[];
  currentSession: AnalysisSession | null;
  saveSession: (name?: string) => void;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  clearCurrentSession: () => void;
  updateCurrentSession: (updates: Partial<AnalysisSession>) => void;
  updateCameraProfile: (profile: CameraProfile) => void;
}

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function createNewSession(camera: CameraProfile = OV5640_PROFILE): AnalysisSession {
  const now = new Date().toISOString();
  return {
    id: generateSessionId(),
    name: `Analysis - ${new Date().toLocaleString()}`,
    cameraProfile: camera,
    isConnected: false,
    notes: "",
    createdAt: now,
    updatedAt: now,
  };
}

export function useSessionStorage(): UseSessionStorageReturn {
  const [sessions, setSessions] = useState<AnalysisSession[]>(() => {
    const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [currentSession, setCurrentSession] = useState<AnalysisSession | null>(() => {
    const stored = localStorage.getItem(CURRENT_SESSION_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return createNewSession();
      }
    }
    return createNewSession();
  });

  // Persist sessions list
  useEffect(() => {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  // Persist current session
  useEffect(() => {
    if (currentSession) {
      localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(currentSession));
    } else {
      localStorage.removeItem(CURRENT_SESSION_KEY);
    }
  }, [currentSession]);

  const saveSession = useCallback((name?: string) => {
    if (!currentSession) return;

    const sessionToSave: AnalysisSession = {
      ...currentSession,
      name: name || currentSession.name,
      updatedAt: new Date().toISOString(),
    };

    setSessions((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === sessionToSave.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = sessionToSave;
        return updated;
      }
      return [sessionToSave, ...prev];
    });

    setCurrentSession(sessionToSave);
  }, [currentSession]);

  const loadSession = useCallback((sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentSession({ ...session });
    }
  }, [sessions]);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSession?.id === sessionId) {
      setCurrentSession(createNewSession());
    }
  }, [currentSession]);

  const clearCurrentSession = useCallback(() => {
    setCurrentSession(createNewSession());
  }, []);

  const updateCurrentSession = useCallback((updates: Partial<AnalysisSession>) => {
    setCurrentSession((prev) => {
      if (!prev) return createNewSession();
      return {
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const updateCameraProfile = useCallback((profile: CameraProfile) => {
    setCurrentSession((prev) => {
      if (!prev) return createNewSession(profile);
      return {
        ...prev,
        cameraProfile: profile,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  return {
    sessions,
    currentSession,
    saveSession,
    loadSession,
    deleteSession,
    clearCurrentSession,
    updateCurrentSession,
    updateCameraProfile,
  };
}
