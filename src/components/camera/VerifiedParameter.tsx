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
        "flex items-center justify-between py-1.5",
        className
      )}
    >
      <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-mono text-foreground">
          {value || "—"}
        </span>
        {verified ? (
          <Check className="w-3 h-3 text-success flex-shrink-0" />
        ) : (
          <AlertTriangle className="w-3 h-3 text-warning flex-shrink-0" />
        )}
      </div>
    </div>
  );
}

interface ParameterSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function ParameterSection({ title, icon, children, defaultOpen = true }: ParameterSectionProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 py-1.5 border-b border-border/50">
        <span className="text-muted-foreground">{icon}</span>
        <h3 className="text-[11px] font-medium text-foreground uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div>{children}</div>
    </div>
  );
}
