import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  children,
  className
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-xs font-medium text-[rgb(var(--fg)/0.9)]">{label}</label>
        {hint ? <span className="text-[11px] text-[rgb(var(--muted))]">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
