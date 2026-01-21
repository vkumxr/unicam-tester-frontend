import { useState, useCallback, useEffect } from "react";
import { ConnectionStatus, CameraProfile, LiveData } from "@/types/camera";
import { OV5640_PROFILE, getSimulatedLiveData } from "@/data/mockCameraData";

const STORAGE_KEY = "camera-connection-state";

interface UseConnectionSimulationReturn {
  status: ConnectionStatus;
  currentCamera: CameraProfile | null;
  liveData: LiveData | null;
  connect: (profile?: CameraProfile) => void;
  disconnect: () => void;
  toggleConnection: () => void;
  refreshData: () => void;
}

export function useConnectionSimulation(): UseConnectionSimulationReturn {
  const [status, setStatus] = useState<ConnectionStatus>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.isConnected ? "connected" : "disconnected";
      } catch {
        return "disconnected";
      }
    }
    return "disconnected";
  });

  const [currentCamera, setCurrentCamera] = useState<CameraProfile | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.isConnected ? (parsed.camera || OV5640_PROFILE) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [liveData, setLiveData] = useState<LiveData | null>(() => {
    if (currentCamera) {
      return getSimulatedLiveData(currentCamera);
    }
    return null;
  });

  // Persist connection state
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        isConnected: status === "connected",
        camera: currentCamera,
      })
    );
  }, [status, currentCamera]);

  const connect = useCallback((profile: CameraProfile = OV5640_PROFILE) => {
    setStatus("connecting");
    
    // Simulate connection delay
    setTimeout(() => {
      setCurrentCamera(profile);
      setLiveData(getSimulatedLiveData(profile));
      setStatus("connected");
    }, 800);
  }, []);

  const disconnect = useCallback(() => {
    setStatus("disconnected");
    setCurrentCamera(null);
    setLiveData(null);
  }, []);

  const toggleConnection = useCallback(() => {
    if (status === "connected") {
      disconnect();
    } else if (status === "disconnected") {
      connect();
    }
  }, [status, connect, disconnect]);

  const refreshData = useCallback(() => {
    if (currentCamera && status === "connected") {
      // Simulate data refresh
      setLiveData(getSimulatedLiveData(currentCamera));
    }
  }, [currentCamera, status]);

  return {
    status,
    currentCamera,
    liveData,
    connect,
    disconnect,
    toggleConnection,
    refreshData,
  };
}
