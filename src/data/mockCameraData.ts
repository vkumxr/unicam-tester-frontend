import { CameraProfile, LiveData } from "@/types/camera";

// OV5640 Reference Camera Profile
// This is the default verified camera with complete specifications
export const OV5640_PROFILE: CameraProfile = {
  id: "ov5640-default",
  identification: {
    sensorName: "OV5640",
    manufacturer: "OmniVision Technologies",
    sensorType: "CMOS Image Sensor",
  },
  optical: {
    aperture: "f/2.4",
    focalLength: "2.8mm",
    fieldOfView: "72° diagonal",
  },
  sensor: {
    resolution: "2592 × 1944",
    resolutionMegapixels: 5.0,
    pixelSize: "1.4μm × 1.4μm",
    colorFilterArray: "Bayer RGB",
    shutterType: "Rolling Shutter (ERS)",
  },
  interface: {
    dataInterface: "MIPI CSI-2 (2-lane) / DVP 8/10-bit",
    clockingMethod: "6-27MHz external clock input (XVCLK)",
    powerRequirements: "AVDD 2.8V, DOVDD 1.8V, DVDD 1.5V (140mW typical)",
  },
  workingPrinciple: `The OV5640 is a 1/4-inch CMOS image sensor that converts incoming light into electrical signals through photodiodes arranged in a Bayer pattern. Each pixel contains a photodiode that accumulates charge proportional to light intensity during the exposure period.

The sensor employs a rolling shutter mechanism where each row is exposed sequentially rather than simultaneously. Light passes through color filters (Red, Green, Blue arranged in a Bayer pattern) before reaching the photodiodes. The accumulated charges are then converted to voltage by source followers, amplified, and digitized by on-chip ADCs.

The digital signal processor (DSP) performs demosaicing, white balance, exposure control, and outputs data via MIPI CSI-2 or DVP interface. Auto-focus is achieved through VCM (Voice Coil Motor) driver integration.`,
  liveData: {
    sensorResolution: "2592 × 1944 (5MP)",
    frameRate: "15 fps @ full resolution",
    dataInterface: "MIPI CSI-2",
    powerStatus: "active",
  },
  isVerified: true,
  createdAt: new Date().toISOString(),
};

// Empty template for custom camera entry
export const EMPTY_CAMERA_TEMPLATE: Omit<CameraProfile, "id" | "createdAt"> = {
  identification: {
    sensorName: "",
    manufacturer: "",
    sensorType: "CMOS Image Sensor",
  },
  optical: {
    aperture: "",
    focalLength: "",
    fieldOfView: "",
  },
  sensor: {
    resolution: "",
    resolutionMegapixels: 0,
    pixelSize: "",
    colorFilterArray: "Bayer RGB",
    shutterType: "Rolling Shutter",
  },
  interface: {
    dataInterface: "",
    clockingMethod: "",
    powerRequirements: "",
  },
  workingPrinciple: "",
  liveData: {
    sensorResolution: "",
    frameRate: "",
    dataInterface: "",
    powerStatus: "off",
  },
  isVerified: false,
};

// Simulated live data variations for connected state
export const getSimulatedLiveData = (profile: CameraProfile): LiveData => {
  // Add slight variations to make it feel "live"
  const frameRates = [
    "15 fps @ full resolution",
    "30 fps @ 1080p",
    "60 fps @ 720p",
  ];
  
  return {
    ...profile.liveData,
    powerStatus: "active",
  };
};

// Frame rate options based on resolution
export const FRAME_RATE_OPTIONS = {
  "5MP": "15 fps",
  "1080p": "30 fps",
  "720p": "60 fps",
  "VGA": "120 fps",
};
