import { Camera, MonitorOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraPreviewProps {
  isConnected: boolean;
  cameraName?: string;
}

export function CameraPreview({ isConnected, cameraName }: CameraPreviewProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-[4/3] rounded-lg border-2 border-dashed overflow-hidden transition-all duration-300",
        isConnected
          ? "border-success/30 bg-card"
          : "border-border bg-muted/20"
      )}
    >
      {isConnected ? (
        // Simulated live feed - grid pattern with camera info overlay
        <div className="absolute inset-0 grid-pattern">
          {/* Simulated feed visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Animated scan lines effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-success/5 to-transparent animate-pulse" />
              
              {/* Camera icon */}
              <Camera className="w-16 h-16 text-success/40" />
            </div>
          </div>

          {/* Overlay info */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
            <span className="text-xs font-mono text-success">REC</span>
          </div>

          <div className="absolute top-3 right-3 text-xs font-mono text-muted-foreground">
            {cameraName || "Unknown Camera"}
          </div>

          <div className="absolute bottom-3 left-3 text-xs font-mono text-muted-foreground">
            SIMULATED FEED
          </div>

          <div className="absolute bottom-3 right-3 text-xs font-mono text-muted-foreground">
            {new Date().toLocaleTimeString()}
          </div>

          {/* Corner markers */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-success/50" />
          <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-success/50" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-success/50" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-success/50" />
        </div>
      ) : (
        // Disconnected placeholder
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
          <div className="relative">
            <MonitorOff className="w-16 h-16 text-muted-foreground/40" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-destructive" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              No Camera Connected
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Connect camera module via USB port
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
