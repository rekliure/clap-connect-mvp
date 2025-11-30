export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export function formatRelativeTime(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;

  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;

  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export function formatDateTime(iso: string) {
  const dt = new Date(iso);
  return dt.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
