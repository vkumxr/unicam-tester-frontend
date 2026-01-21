import { CameraProfile } from "@/types/camera";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VerifiedParameter, ParameterSection } from "./VerifiedParameter";
import {
  Camera,
  Aperture,
  Cpu,
  Cable,
  BookOpen,
  FileText,
} from "lucide-react";

interface TechnicalReportProps {
  profile: CameraProfile;
}

export function TechnicalReport({ profile }: TechnicalReportProps) {
  const { identification, optical, sensor, interface: interfaceInfo, workingPrinciple, isVerified } = profile;

  return (
    <Card className="h-full bg-card/50 border-border/50 flex flex-col">
      <CardHeader className="pb-3 border-b border-border/50 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="w-5 h-5 text-primary" />
          Camera Technical Report
        </CardTitle>
        <div className="flex items-center gap-4 mt-2 text-xs">
          <span className="flex items-center gap-1 text-success">
            <span className="w-2 h-2 rounded-full bg-success" />
            Verified (from backend)
          </span>
          <span className="flex items-center gap-1 text-warning">
            <span className="w-2 h-2 rounded-full bg-warning" />
            Not verified (manual entry)
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {/* Camera Identification */}
            <ParameterSection title="Camera Identification" icon={<Camera className="w-4 h-4" />}>
              <VerifiedParameter
                label="Sensor Name"
                value={identification.sensorName}
                verified={isVerified}
              />
              <VerifiedParameter
                label="Manufacturer"
                value={identification.manufacturer}
                verified={isVerified}
              />
              <VerifiedParameter
                label="Sensor Type"
                value={identification.sensorType}
                verified={isVerified}
              />
            </ParameterSection>

            {/* Optical Parameters */}
            <ParameterSection title="Optical Parameters" icon={<Aperture className="w-4 h-4" />}>
              <VerifiedParameter
                label="Aperture"
                value={optical.aperture}
                verified={isVerified}
              />
              <VerifiedParameter
                label="Focal Length"
                value={optical.focalLength}
                verified={isVerified}
              />
              <VerifiedParameter
                label="Field of View"
                value={optical.fieldOfView}
                verified={isVerified}
              />
            </ParameterSection>

            {/* Sensor Specifications */}
            <ParameterSection title="Sensor Specifications" icon={<Cpu className="w-4 h-4" />}>
              <VerifiedParameter
                label="Resolution"
                value={`${sensor.resolution} (${sensor.resolutionMegapixels}MP)`}
                verified={isVerified}
              />
              <VerifiedParameter
                label="Pixel Size"
                value={sensor.pixelSize}
                verified={isVerified}
              />
              <VerifiedParameter
                label="Color Filter Array"
                value={sensor.colorFilterArray}
                verified={isVerified}
              />
              <VerifiedParameter
                label="Shutter Type"
                value={sensor.shutterType}
                verified={isVerified}
              />
            </ParameterSection>

            {/* Working Principle */}
            <ParameterSection title="Working Principle" icon={<BookOpen className="w-4 h-4" />}>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/30 p-3 rounded-md">
                {workingPrinciple || "No working principle description available."}
              </div>
            </ParameterSection>

            {/* Interface & Pin Info */}
            <ParameterSection title="Interface & Pin Info" icon={<Cable className="w-4 h-4" />}>
              <VerifiedParameter
                label="Data Interface"
                value={interfaceInfo.dataInterface}
                verified={isVerified}
              />
              <VerifiedParameter
                label="Clocking Method"
                value={interfaceInfo.clockingMethod}
                verified={isVerified}
              />
              <VerifiedParameter
                label="Power Requirements"
                value={interfaceInfo.powerRequirements}
                verified={isVerified}
              />
            </ParameterSection>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
