import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] px-3 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted))] outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]",
        className
      )}
      {...props}
    />
  );
}
