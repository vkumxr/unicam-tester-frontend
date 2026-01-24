import { ConnectionStatus } from "@/types/camera";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionStatusBadgeProps {
  status: ConnectionStatus;
  cameraName?: string;
}

export function ConnectionStatusBadge({ status, cameraName }: ConnectionStatusBadgeProps) {
  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <div className="flex items-center gap-2">
      {/* Status dot */}
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          isConnected
            ? "bg-success"
            : isConnecting
            ? "bg-primary animate-pulse"
            : "bg-destructive"
        )}
      />
      
      {/* Status text */}
      {isConnecting ? (
        <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
          <Loader2 className="w-3 h-3 animate-spin" />
          Connecting
        </span>
      ) : (
        <span
          className={cn(
            "text-xs font-medium",
            isConnected ? "text-success" : "text-destructive"
          )}
        >
          {isConnected ? cameraName || "Connected" : "Disconnected"}
        </span>
      )}
    </div>
  );
}
