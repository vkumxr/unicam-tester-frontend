import { useState } from "react";
import { CameraProfile } from "@/types/camera";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VerifiedParameter } from "./VerifiedParameter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Camera,
  Aperture,
  Cpu,
  Cable,
  BookOpen,
  ChevronDown,
  Check,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TechnicalReportProps {
  profile: CameraProfile;
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, icon, children, defaultOpen = true }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 group">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">{icon}</span>
          <h3 className="text-[11px] font-medium text-foreground uppercase tracking-wider">
            {title}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pb-3 border-b border-border/30">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Parse working principle into bullet points
function parseWorkingPrinciple(text: string): string[] {
  // Common technical terms to extract as bullet points
  const keyTerms = [
    { pattern: /rolling shutter/i, label: "Rolling shutter readout" },
    { pattern: /global shutter/i, label: "Global shutter readout" },
    { pattern: /bayer (rgb|pattern|filter)/i, label: "Bayer RGB color filter array" },
    { pattern: /adc|analog.to.digital/i, label: "On-chip ADC conversion" },
    { pattern: /dsp|digital signal process/i, label: "Integrated DSP processing" },
    { pattern: /mipi/i, label: "MIPI CSI-2 output interface" },
    { pattern: /dvp|parallel/i, label: "DVP parallel output interface" },
    { pattern: /autofocus|af/i, label: "Autofocus support" },
    { pattern: /auto.exposure|aec/i, label: "Auto-exposure control" },
    { pattern: /auto.white.balance|awb/i, label: "Auto white balance" },
    { pattern: /cmos/i, label: "CMOS active-pixel sensor" },
    { pattern: /photodiode/i, label: "Photodiode light detection" },
  ];

  const bullets: string[] = [];
  
  for (const term of keyTerms) {
    if (term.pattern.test(text)) {
      bullets.push(term.label);
    }
  }

  // If we couldn't extract any, provide defaults for CMOS sensors
  if (bullets.length === 0) {
    return [
      "CMOS active-pixel sensor",
      "Rolling shutter readout",
      "Bayer RGB color filter array",
      "On-chip ADC conversion",
      "Integrated DSP processing",
    ];
  }

  return bullets.slice(0, 6); // Max 6 bullet points
}

export function TechnicalReport({ profile }: TechnicalReportProps) {
  const { identification, optical, sensor, interface: interfaceInfo, workingPrinciple, isVerified } = profile;
  const workingPrincipleBullets = parseWorkingPrinciple(workingPrinciple || "");

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/50 mb-3">
        <h2 className="text-sm font-medium text-foreground">Technical Report</h2>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1 text-success">
            <Check className="w-3 h-3" />
            Verified
          </span>
          <span className="flex items-center gap-1 text-warning">
            <AlertTriangle className="w-3 h-3" />
            Manual
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 pr-2">
          {/* Camera Identification */}
          <CollapsibleSection title="Camera Identification" icon={<Camera className="w-3.5 h-3.5" />}>
            <VerifiedParameter
              label="Sensor"
              value={identification.sensorName}
              verified={isVerified}
            />
            <VerifiedParameter
              label="Manufacturer"
              value={identification.manufacturer}
              verified={isVerified}
            />
            <VerifiedParameter
              label="Type"
              value={identification.sensorType}
              verified={isVerified}
            />
          </CollapsibleSection>

          {/* Optical Parameters */}
          <CollapsibleSection title="Optical Parameters" icon={<Aperture className="w-3.5 h-3.5" />}>
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
              label="FOV"
              value={optical.fieldOfView}
              verified={isVerified}
            />
          </CollapsibleSection>

          {/* Sensor Specifications */}
          <CollapsibleSection title="Sensor Specifications" icon={<Cpu className="w-3.5 h-3.5" />}>
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
              label="CFA"
              value={sensor.colorFilterArray}
              verified={isVerified}
            />
            <VerifiedParameter
              label="Shutter"
              value={sensor.shutterType}
              verified={isVerified}
            />
          </CollapsibleSection>

          {/* Interface & Power */}
          <CollapsibleSection title="Interface & Power" icon={<Cable className="w-3.5 h-3.5" />}>
            <VerifiedParameter
              label="Data Interface"
              value={interfaceInfo.dataInterface}
              verified={isVerified}
            />
            <VerifiedParameter
              label="Clock"
              value={interfaceInfo.clockingMethod}
              verified={isVerified}
            />
            <VerifiedParameter
              label="Power"
              value={interfaceInfo.powerRequirements}
              verified={isVerified}
            />
          </CollapsibleSection>

          {/* Working Principle - Bullet Points */}
          <CollapsibleSection title="Working Principle" icon={<BookOpen className="w-3.5 h-3.5" />} defaultOpen={false}>
            <div className="space-y-1 pt-1">
              {workingPrincipleBullets.map((bullet, index) => (
                <div key={index} className="flex items-center gap-2 py-0.5">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{bullet}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </ScrollArea>
    </div>
  );
}
