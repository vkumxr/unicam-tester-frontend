import { ConnectionStatus } from "@/types/camera";
import { Usb, Camera, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionStatusBadgeProps {
  status: ConnectionStatus;
  cameraName?: string;
}

export function ConnectionStatusBadge({ status, cameraName }: ConnectionStatusBadgeProps) {
  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300",
        isConnected
          ? "bg-success/10 border-success/30"
          : isConnecting
          ? "bg-primary/10 border-primary/30"
          : "bg-destructive/10 border-destructive/30"
      )}
    >
      {/* Status indicator dot */}
      <div className="relative">
        <div
          className={cn(
            "w-3 h-3 rounded-full transition-colors duration-300",
            isConnected
              ? "bg-success"
              : isConnecting
              ? "bg-primary"
              : "bg-destructive"
          )}
        />
        {(isConnected || isConnecting) && (
          <div
            className={cn(
              "absolute inset-0 w-3 h-3 rounded-full animate-pulse-glow",
              isConnected ? "bg-success" : "bg-primary"
            )}
          />
        )}
      </div>

      {/* Icon */}
      <div className="flex items-center gap-2">
        {isConnecting ? (
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        ) : (
          <>
            <Usb
              className={cn(
                "w-5 h-5 transition-colors duration-300",
                isConnected ? "text-success" : "text-destructive"
              )}
            />
            <Camera
              className={cn(
                "w-5 h-5 transition-colors duration-300",
                isConnected ? "text-success" : "text-muted-foreground"
              )}
            />
          </>
        )}
      </div>

      {/* Status text */}
      <div className="flex flex-col">
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            isConnected
              ? "text-success"
              : isConnecting
              ? "text-primary"
              : "text-destructive"
          )}
        >
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? `Camera Connected: ${cameraName || "Unknown"}`
            : "No Camera Connected"}
        </span>
        <span className="text-xs text-muted-foreground">
          {isConnecting
            ? "Establishing connection via USB"
            : isConnected
            ? "USB 2.0 High-Speed"
            : "Connect camera module via USB port"}
        </span>
      </div>
    </div>
  );
}
