import { LiveData } from "@/types/camera";
import { cn } from "@/lib/utils";

interface LiveDataPanelProps {
  liveData: LiveData | null;
  isConnected: boolean;
}

interface DataRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function DataRow({ label, value, highlight }: DataRowProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</span>
      <span
        className={cn(
          "font-mono text-xs",
          highlight ? "text-success" : "text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function LiveDataPanel({ liveData, isConnected }: LiveDataPanelProps) {
  if (!isConnected || !liveData) {
    return null;
  }

  return (
    <div className="space-y-1 pt-3 border-t border-border/30">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Real-Time</span>
        <span className="text-[10px] text-success uppercase tracking-wider">● Live</span>
      </div>
      <DataRow label="Resolution" value={liveData.sensorResolution} />
      <DataRow label="Frame Rate" value={liveData.frameRate} />
      <DataRow label="Interface" value={liveData.dataInterface} />
      <DataRow
        label="Power"
        value={liveData.powerStatus.toUpperCase()}
        highlight={liveData.powerStatus === "active"}
      />
    </div>
  );
}
