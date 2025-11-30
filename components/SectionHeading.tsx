export function SectionHeading({
  title,
  subtitle,
  right
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end gap-3">
      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle ? <p className="text-xs text-[rgb(var(--muted))]">{subtitle}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
