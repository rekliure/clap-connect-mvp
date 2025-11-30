"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { SectionHeading } from "@/components/SectionHeading";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { circles, events, posts, usersById } from "@/lib/data";
import { formatDateTime, formatRelativeTime } from "@/lib/utils";
import type { Post } from "@/lib/types";

function PostBadge({ type }: { type: Post["type"] }) {
  const label =
    type === "progress" ? "Progress" : type === "question" ? "Question" : type === "resource" ? "Resource" : "Event";
  return <Pill className="border-[rgb(var(--border)/0.18)]">{label}</Pill>;
}

export function FeedClient() {
  const [tab, setTab] = useState<"forYou" | "circles">("forYou");

  const feed = useMemo(() => {
    const list = [...posts].sort((a, b) => (a.createdAtISO < b.createdAtISO ? 1 : -1));
    return list;
  }, []);

  const nextEvent = useMemo(() => {
    const sorted = [...events].sort((a, b) => (a.startsAtISO > b.startsAtISO ? 1 : -1));
    return sorted[0];
  }, []);

  const circleById = useMemo(() => Object.fromEntries(circles.map((c) => [c.id, c])), []);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-[rgb(var(--muted))]">Today’s focus</p>
            <p className="truncate text-sm font-semibold">
              Post a tiny update → get feedback → repeat.
            </p>
          </div>
          <Link href="/create">
            <Button className="h-10 px-4">Post</Button>
          </Link>
        </div>

        {nextEvent ? (
          <div className="mt-3 rounded-3xl border border-[rgb(var(--border)/0.10)] bg-[rgb(var(--bg)/0.45)] p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-[rgb(var(--muted))]">Upcoming event</p>
                <p className="truncate text-sm font-semibold">{nextEvent.title}</p>
                <p className="mt-1 text-xs text-[rgb(var(--fg)/0.8)]">
                  {formatDateTime(nextEvent.startsAtISO)} • {nextEvent.durationMin}m •{" "}
                  {circleById[nextEvent.circleId]?.name ?? "Circle"}
                </p>
              </div>
              <Link href={`/circles/${nextEvent.circleId}`}>
                <Button variant="secondary" className="h-10 px-3">
                  View
                </Button>
              </Link>
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setTab("forYou")}
            aria-pressed={tab === "forYou"}
            className={[
              "flex-1 rounded-2xl border px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]",
              tab === "forYou"
                ? "border-[rgb(var(--fg)/0.25)] bg-[rgb(var(--card)/0.75)] text-[rgb(var(--fg))]"
                : "border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] text-[rgb(var(--muted))] hover:bg-[rgb(var(--card)/0.35)]",
            ].join(" ")}
          >
            For you
          </button>
          <button
            type="button"
            onClick={() => setTab("circles")}
            aria-pressed={tab === "circles"}
            className={[
              "flex-1 rounded-2xl border px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]",
              tab === "circles"
                ? "border-[rgb(var(--fg)/0.25)] bg-[rgb(var(--card)/0.75)] text-[rgb(var(--fg))]"
                : "border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] text-[rgb(var(--muted))] hover:bg-[rgb(var(--card)/0.35)]",
            ].join(" ")}
          >
            Circles
          </button>
        </div>
      </Card>

      <SectionHeading
        title={tab === "forYou" ? "Feed" : "Circle feed"}
        subtitle="Templates keep posts high-signal."
        right={
          <Link href="/settings" className="text-xs text-[rgb(var(--muted))] underline-offset-4 hover:underline">
            Preferences
          </Link>
        }
      />

      <div className="space-y-3">
        {feed.map((p) => {
          const author = usersById[p.authorId] ?? { name: "Unknown", handle: "@unknown", avatarColor: "#94A3B8" };
          const c = p.circleId ? circleById[p.circleId] : undefined;

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
                      <p className="truncate text-xs text-[rgb(var(--muted))]">
                        {formatRelativeTime(p.createdAtISO)}
                        {c ? ` • ${c.name}` : ""}
                      </p>
                    </div>
                    <PostBadge type={p.type} />
                  </div>

                  {p.title ? <p className="mt-3 text-sm font-semibold">{p.title}</p> : null}
                  <p className="mt-2 whitespace-pre-wrap text-sm text-[rgb(var(--fg)/0.9)]">{p.body}</p>

                  {p.tags.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Pill key={t} className="text-[rgb(var(--fg)/0.85)]">
                          #{t}
                        </Pill>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 flex items-center gap-2 text-xs text-[rgb(var(--muted))]">
                    <span aria-label={`${p.likeCount} likes`}>♥ {p.likeCount}</span>
                    <span aria-label={`${p.commentCount} comments`}>💬 {p.commentCount}</span>
                    <span className="ml-auto">
                      {new Date(p.createdAtISO).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  {c ? (
                    <div className="mt-3 flex gap-2">
                      <Link href={`/circles/${c.id}`} className="flex-1">
                        <Button variant="secondary" className="w-full">
                          View circle
                        </Button>
                      </Link>
                      <Link href="/create" className="flex-1">
                        <Button variant="ghost" className="w-full">
                          Reply (demo)
                        </Button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
