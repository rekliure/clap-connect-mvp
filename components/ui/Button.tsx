import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium outline-none transition focus:ring-2 focus:ring-[rgb(var(--ring))] disabled:opacity-50 disabled:cursor-not-allowed";
  const styles: Record<Variant, string> = {
    primary:
      "bg-[rgb(var(--fg))] text-[rgb(var(--bg))] hover:opacity-95 border border-[rgb(var(--border)/0.10)]",
    secondary:
      "bg-[rgb(var(--card))] text-[rgb(var(--fg))] hover:bg-[rgb(var(--card)/0.8)] border border-[rgb(var(--border)/0.12)]",
    ghost:
      "bg-transparent text-[rgb(var(--fg))] hover:bg-[rgb(var(--card)/0.35)] border border-[rgb(var(--border)/0.10)]",
    danger:
      "bg-[rgba(239,68,68,0.15)] text-[rgb(var(--fg))] hover:bg-[rgba(239,68,68,0.22)] border border-[rgba(239,68,68,0.35)]"
  };

  return <button type={type} className={cn(base, styles[variant], className)} {...props} />;
}
