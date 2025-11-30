import { cn } from "@/lib/utils";

export function Avatar({
  name,
  color,
  size = 36,
  className
}: {
  name: string;
  color: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div
      aria-label={`${name} avatar`}
      className={cn(
        "grid place-items-center rounded-2xl border border-[rgb(var(--border)/0.12)] text-xs font-semibold text-[rgb(var(--bg))]",
        className
      )}
      style={{ width: size, height: size, backgroundColor: color }}
    >
      {initials || "?"}
    </div>
  );
}
