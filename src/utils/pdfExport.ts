import { CameraProfile } from "@/types/camera";
import { jsPDF } from "jspdf";

export function generatePDFReport(profile: CameraProfile): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  // Helper functions
  const addTitle = (text: string) => {
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(text, pageWidth / 2, y, { align: "center" });
    y += 10;
  };

  const addSectionTitle = (text: string) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246); // Blue
    doc.text(text, margin, y);
    doc.setTextColor(0, 0, 0);
    y += 8;
  };

  const addParameter = (label: string, value: string, verified: boolean) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(label + ":", margin, y);
    doc.setFont("helvetica", "bold");
    doc.text(value || "—", margin + 60, y);
    
    // Verification indicator
    doc.setFont("helvetica", "normal");
    const status = verified ? "✓ Verified" : "⚠ Not verified";
    const color = verified ? [34, 197, 94] : [245, 158, 11];
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(status, pageWidth - margin - 30, y);
    doc.setTextColor(0, 0, 0);
    y += 6;
  };

  const addParagraph = (text: string) => {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
    lines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += 5;
    });
    y += 4;
  };

  // Document content
  addTitle("Camera Technical Report");
  y += 5;

  // Subtitle
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(profile.identification.sensorName, pageWidth / 2, y, { align: "center" });
  y += 5;
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, y, { align: "center" });
  doc.setTextColor(0, 0, 0);
  y += 15;

  // Camera Identification
  addSectionTitle("CAMERA IDENTIFICATION");
  addParameter("Sensor Name", profile.identification.sensorName, profile.isVerified);
  addParameter("Manufacturer", profile.identification.manufacturer, profile.isVerified);
  addParameter("Sensor Type", profile.identification.sensorType, profile.isVerified);
  y += 5;

  // Optical Parameters
  addSectionTitle("OPTICAL PARAMETERS");
  addParameter("Aperture", profile.optical.aperture, profile.isVerified);
  addParameter("Focal Length", profile.optical.focalLength, profile.isVerified);
  addParameter("Field of View", profile.optical.fieldOfView, profile.isVerified);
  y += 5;

  // Sensor Specifications
  addSectionTitle("SENSOR SPECIFICATIONS");
  addParameter("Resolution", `${profile.sensor.resolution} (${profile.sensor.resolutionMegapixels}MP)`, profile.isVerified);
  addParameter("Pixel Size", profile.sensor.pixelSize, profile.isVerified);
  addParameter("Color Filter Array", profile.sensor.colorFilterArray, profile.isVerified);
  addParameter("Shutter Type", profile.sensor.shutterType, profile.isVerified);
  y += 5;

  // Interface & Pin Info
  addSectionTitle("INTERFACE & PIN INFO");
  addParameter("Data Interface", profile.interface.dataInterface, profile.isVerified);
  addParameter("Clocking Method", profile.interface.clockingMethod, profile.isVerified);
  addParameter("Power Requirements", profile.interface.powerRequirements, profile.isVerified);
  y += 5;

  // Working Principle
  if (profile.workingPrinciple) {
    addSectionTitle("WORKING PRINCIPLE");
    addParagraph(profile.workingPrinciple);
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Camera Analysis Lab Tool | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Save
  doc.save(`${profile.identification.sensorName}_Technical_Report.pdf`);
}
