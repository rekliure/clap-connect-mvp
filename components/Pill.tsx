import { cn } from "@/lib/utils";

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] px-2.5 py-1 text-[11px] text-[rgb(var(--fg)/0.92)]",
        className
      )}
    >
      {children}
    </span>
  );
}
