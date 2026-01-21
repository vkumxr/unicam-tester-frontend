import { LiveData } from "@/types/camera";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Gauge, Cable, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveDataPanelProps {
  liveData: LiveData | null;
  isConnected: boolean;
}

interface DataRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function DataRow({ icon, label, value, highlight }: DataRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span
        className={cn(
          "font-mono text-sm",
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
    return (
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Real-Time Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground text-sm">
            Connect camera to view live data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-success" />
          Real-Time Data
          <span className="ml-auto text-xs text-success font-normal">● LIVE</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <DataRow
          icon={<Gauge className="w-4 h-4" />}
          label="Sensor Resolution"
          value={liveData.sensorResolution}
        />
        <DataRow
          icon={<Activity className="w-4 h-4" />}
          label="Frame Rate"
          value={liveData.frameRate}
        />
        <DataRow
          icon={<Cable className="w-4 h-4" />}
          label="Data Interface"
          value={liveData.dataInterface}
        />
        <DataRow
          icon={<Zap className="w-4 h-4" />}
          label="Power Status"
          value={liveData.powerStatus.toUpperCase()}
          highlight={liveData.powerStatus === "active"}
        />
      </CardContent>
    </Card>
  );
}
