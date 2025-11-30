import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { SectionHeading } from "@/components/SectionHeading";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { circles, events, posts, usersById } from "@/lib/data";
import { formatDateTime, formatRelativeTime } from "@/lib/utils";

export default function CircleDetailPage({ params }: { params: { circleId: string } }) {
  const circle = circles.find((c) => c.id === params.circleId);
  const circlePosts = posts
    .filter((p) => p.circleId === params.circleId)
    .sort((a, b) => (a.createdAtISO < b.createdAtISO ? 1 : -1));
  const circleEvents = events
    .filter((e) => e.circleId === params.circleId)
    .sort((a, b) => (a.startsAtISO > b.startsAtISO ? 1 : -1));

  if (!circle) {
    return (
      <AppShell title="Circle" backHref="/circles">
        <Card className="p-6">
          <h2 className="text-base font-semibold">Circle not found</h2>
          <p className="mt-2 text-sm text-[rgb(var(--muted))]">Check the URL or return to circles.</p>
          <Link href="/circles" className="mt-4 inline-block">
            <Button>Back to Circles</Button>
          </Link>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell title={circle.name} backHref="/circles" right={<Pill>{circle.isPrivate ? "Private" : "Public"}</Pill>}>
      <div className="space-y-4">
        <Card className="p-4">
          <p className="text-xs text-[rgb(var(--muted))]">About</p>
          <p className="mt-1 text-sm text-[rgb(var(--fg)/0.92)]">{circle.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {circle.tags.map((t) => (
              <Pill key={t}>#{t}</Pill>
            ))}
            <Pill>{circle.membersCount.toLocaleString()} members</Pill>
          </div>

          <div className="mt-4 flex gap-2">
            <Link href="/create" className="flex-1">
              <Button className="w-full">Post to circle</Button>
            </Link>
            <Button
              variant="secondary"
              className="flex-1"
              aria-label="Invite link (demo)"
              onClick={() => alert("Invite link copied (demo).")}
            >
              Invite
            </Button>
          </div>
        </Card>

        {circleEvents.length ? (
          <Card className="p-4">
            <SectionHeading title="Events" subtitle="Energy + accountability." />
            <div className="space-y-2">
              {circleEvents.map((e) => (
                <div
                  key={e.id}
                  className="rounded-3xl border border-[rgb(var(--border)/0.10)] bg-[rgb(var(--bg)/0.45)] p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{e.title}</p>
                      <p className="mt-1 text-xs text-[rgb(var(--fg)/0.8)]">
                        {formatDateTime(e.startsAtISO)} • {e.durationMin}m • {e.location}
                      </p>
                    </div>
                    <Button variant="ghost" className="h-10 px-3" onClick={() => alert("RSVP saved (demo).")}>
                      RSVP
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : null}

        <SectionHeading title="Circle feed" subtitle="Small updates. High signal." />

        <div className="space-y-3">
          {circlePosts.length ? (
            circlePosts.map((p) => {
              const author = usersById[p.authorId] ?? { name: "Unknown", handle: "@unknown", avatarColor: "#94A3B8" };
              return (
                <Card key={p.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar name={author.name} color={author.avatarColor} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {author.name} <span className="text-xs text-[rgb(var(--muted))]">{author.handle}</span>
                          </p>
                          <p className="truncate text-xs text-[rgb(var(--muted))]">{formatRelativeTime(p.createdAtISO)}</p>
                        </div>
                        <Pill>{p.type}</Pill>
                      </div>
                      {p.title ? <p className="mt-3 text-sm font-semibold">{p.title}</p> : null}
                      <p className="mt-2 whitespace-pre-wrap text-sm text-[rgb(var(--fg)/0.9)]">{p.body}</p>

                      <div className="mt-4 flex items-center gap-2 text-xs text-[rgb(var(--muted))]">
                        <span>♥ {p.likeCount}</span>
                        <span>💬 {p.commentCount}</span>
                        <button
                          className="ml-auto rounded-xl border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] px-2 py-1 outline-none hover:bg-[rgb(var(--card)/0.35)] focus:ring-2 focus:ring-[rgb(var(--ring))]"
                          onClick={() => alert("Reported (demo).")}
                        >
                          Report
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="p-6">
              <p className="text-sm text-[rgb(var(--fg)/0.9)]">No posts yet.</p>
              <p className="mt-1 text-xs text-[rgb(var(--muted))]">Be the first—post a tiny progress update.</p>
              <Link href="/create" className="mt-4 inline-block">
                <Button>Post now</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}
