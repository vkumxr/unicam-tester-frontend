// Camera Analysis Types
// All data structures for camera modules, sessions, and reports

export interface CameraIdentification {
  sensorName: string;
  manufacturer: string;
  sensorType: string;
}

export interface OpticalParameters {
  aperture: string;
  focalLength: string;
  fieldOfView: string;
}

export interface SensorSpecifications {
  resolution: string;
  resolutionMegapixels: number;
  pixelSize: string;
  colorFilterArray: string;
  shutterType: string;
}

export interface InterfaceInfo {
  dataInterface: string;
  clockingMethod: string;
  powerRequirements: string;
}

export interface LiveData {
  sensorResolution: string;
  frameRate: string;
  dataInterface: string;
  powerStatus: "active" | "standby" | "off";
}

export interface CameraProfile {
  id: string;
  identification: CameraIdentification;
  optical: OpticalParameters;
  sensor: SensorSpecifications;
  interface: InterfaceInfo;
  workingPrinciple: string;
  liveData: LiveData;
  isVerified: boolean; // true = from mock backend, false = custom entry
  createdAt: string;
}

export interface AnalysisSession {
  id: string;
  name: string;
  cameraProfile: CameraProfile;
  isConnected: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type ConnectionStatus = "connected" | "disconnected" | "connecting";

// Parameter verification status for display
export interface VerifiedParameter<T> {
  value: T;
  verified: boolean;
}
