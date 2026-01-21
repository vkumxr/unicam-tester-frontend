import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedParameterProps {
  label: string;
  value: string;
  verified: boolean;
  className?: string;
}

export function VerifiedParameter({
  label,
  value,
  verified,
  className,
}: VerifiedParameterProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between py-2 border-b border-border/30 last:border-0",
        className
      )}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-foreground text-right">
          {value || "—"}
        </span>
        {verified ? (
          <Check className="w-4 h-4 text-success flex-shrink-0" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
        )}
      </div>
    </div>
  );
}

interface ParameterSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function ParameterSection({ title, icon, children }: ParameterSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <span className="text-muted-foreground">{icon}</span>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
