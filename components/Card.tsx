import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-[rgb(var(--border)/0.10)] bg-[rgb(var(--card)/0.55)] shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur",
        className
      )}
    >
      {children}
    </section>
  );
}
