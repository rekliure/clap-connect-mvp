import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[110px] w-full resize-y rounded-2xl border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] px-3 py-2.5 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted))] outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]",
        className
      )}
      {...props}
    />
  );
}
