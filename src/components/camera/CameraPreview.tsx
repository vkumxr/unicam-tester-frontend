import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraPreviewProps {
  isConnected: boolean;
  cameraName?: string;
}

export function CameraPreview({ isConnected, cameraName }: CameraPreviewProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-[4/3] rounded bg-muted/30 overflow-hidden"
      )}
    >
      {isConnected ? (
        // Simulated live feed
        <div className="absolute inset-0 grid-pattern">
          {/* Corner markers */}
          <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-success/60" />
          <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-success/60" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-success/60" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-success/60" />

          {/* Status overlay */}
          <div className="absolute top-3 left-8 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="text-[10px] font-mono text-success uppercase tracking-wider">Live</span>
          </div>

          <div className="absolute top-3 right-8 text-[10px] font-mono text-muted-foreground">
            {cameraName || "Camera"}
          </div>

          {/* Center camera icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-12 h-12 text-muted-foreground/20" />
          </div>

          <div className="absolute bottom-3 left-8 text-[10px] font-mono text-muted-foreground">
            SIMULATED
          </div>

          <div className="absolute bottom-3 right-8 text-[10px] font-mono text-muted-foreground">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      ) : (
        // Clean empty state
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <Camera className="w-10 h-10 text-muted-foreground/30" />
          <span className="text-xs text-muted-foreground">Waiting for camera…</span>
        </div>
      )}
    </div>
  );
}
