import { CameraProfile } from "@/types/camera";
import PptxGenJS from "pptxgenjs";

export function generatePPTReport(profile: CameraProfile): void {
  const pptx = new PptxGenJS();
  
  // Set presentation properties
  pptx.author = "Camera Analysis Lab Tool";
  pptx.title = `${profile.identification.sensorName} Technical Report`;
  pptx.subject = "Camera Module Technical Specifications";

  // Define colors
  const colors = {
    background: "1a1a2e",
    primary: "3b82f6",
    success: "22c55e",
    warning: "f59e0b",
    text: "e2e8f0",
    muted: "94a3b8",
  };

  // Define master slide
  pptx.defineSlideMaster({
    title: "CAMERA_REPORT",
    background: { color: colors.background },
  });

  // Slide 1: Title Slide
  const slide1 = pptx.addSlide({ masterName: "CAMERA_REPORT" });
  
  slide1.addText(profile.identification.sensorName, {
    x: 0.5,
    y: 2,
    w: 9,
    h: 1,
    fontSize: 44,
    bold: true,
    color: colors.text,
    align: "center",
  });

  slide1.addText("Technical Specification Report", {
    x: 0.5,
    y: 3,
    w: 9,
    h: 0.5,
    fontSize: 24,
    color: colors.primary,
    align: "center",
  });

  slide1.addText([
    { text: profile.identification.manufacturer, options: { fontSize: 16, color: colors.muted } },
    { text: " | ", options: { fontSize: 16, color: colors.muted } },
    { text: profile.identification.sensorType, options: { fontSize: 16, color: colors.muted } },
  ], {
    x: 0.5,
    y: 3.7,
    w: 9,
    h: 0.4,
    align: "center",
  });

  slide1.addText(`Generated: ${new Date().toLocaleDateString()}`, {
    x: 0.5,
    y: 5,
    w: 9,
    h: 0.3,
    fontSize: 12,
    color: colors.muted,
    align: "center",
  });

  // Helper to add parameter slide
  const addParameterSlide = (
    title: string,
    params: Array<{ label: string; value: string; verified: boolean }>
  ) => {
    const slide = pptx.addSlide({ masterName: "CAMERA_REPORT" });

    // Title
    slide.addText(title, {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.6,
      fontSize: 28,
      bold: true,
      color: colors.primary,
    });

    // Line under title
    slide.addShape("rect" as PptxGenJS.SHAPE_NAME, {
      x: 0.5,
      y: 1,
      w: 9,
      h: 0.02,
      fill: { color: colors.primary },
    });

    // Parameters
    let yPos = 1.4;
    params.forEach((param) => {
      // Label
      slide.addText(param.label, {
        x: 0.5,
        y: yPos,
        w: 3,
        h: 0.5,
        fontSize: 14,
        color: colors.muted,
        valign: "middle",
      });

      // Value
      slide.addText(param.value || "—", {
        x: 3.5,
        y: yPos,
        w: 4,
        h: 0.5,
        fontSize: 14,
        bold: true,
        color: colors.text,
        valign: "middle",
      });

      // Verification status
      slide.addText(param.verified ? "✓ Verified" : "⚠ Not verified", {
        x: 7.5,
        y: yPos,
        w: 2,
        h: 0.5,
        fontSize: 11,
        color: param.verified ? colors.success : colors.warning,
        valign: "middle",
        align: "right",
      });

      yPos += 0.6;
    });

    return slide;
  };

  // Slide 2: Camera Identification
  addParameterSlide("Camera Identification", [
    { label: "Sensor Name", value: profile.identification.sensorName, verified: profile.isVerified },
    { label: "Manufacturer", value: profile.identification.manufacturer, verified: profile.isVerified },
    { label: "Sensor Type", value: profile.identification.sensorType, verified: profile.isVerified },
  ]);

  // Slide 3: Optical Parameters
  addParameterSlide("Optical Parameters", [
    { label: "Aperture", value: profile.optical.aperture, verified: profile.isVerified },
    { label: "Focal Length", value: profile.optical.focalLength, verified: profile.isVerified },
    { label: "Field of View", value: profile.optical.fieldOfView, verified: profile.isVerified },
  ]);

  // Slide 4: Sensor Specifications
  addParameterSlide("Sensor Specifications", [
    { label: "Resolution", value: `${profile.sensor.resolution} (${profile.sensor.resolutionMegapixels}MP)`, verified: profile.isVerified },
    { label: "Pixel Size", value: profile.sensor.pixelSize, verified: profile.isVerified },
    { label: "Color Filter Array", value: profile.sensor.colorFilterArray, verified: profile.isVerified },
    { label: "Shutter Type", value: profile.sensor.shutterType, verified: profile.isVerified },
  ]);

  // Slide 5: Interface & Power
  addParameterSlide("Interface & Pin Info", [
    { label: "Data Interface", value: profile.interface.dataInterface, verified: profile.isVerified },
    { label: "Clocking Method", value: profile.interface.clockingMethod, verified: profile.isVerified },
    { label: "Power Requirements", value: profile.interface.powerRequirements, verified: profile.isVerified },
  ]);

  // Slide 6: Working Principle
  if (profile.workingPrinciple) {
    const slide6 = pptx.addSlide({ masterName: "CAMERA_REPORT" });

    slide6.addText("Working Principle", {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.6,
      fontSize: 28,
      bold: true,
      color: colors.primary,
    });

    slide6.addShape("rect" as PptxGenJS.SHAPE_NAME, {
      x: 0.5,
      y: 1,
      w: 9,
      h: 0.02,
      fill: { color: colors.primary },
    });

    slide6.addText(profile.workingPrinciple, {
      x: 0.5,
      y: 1.3,
      w: 9,
      h: 4,
      fontSize: 12,
      color: colors.text,
      valign: "top",
    });
  }

  // Save
  pptx.writeFile({ fileName: `${profile.identification.sensorName}_Technical_Report.pptx` });
}
