// app/profile/page.tsx
"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { SectionHeading } from "@/components/SectionHeading";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { journeys, me, posts } from "@/lib/data";
import { formatRelativeTime } from "@/lib/utils";

export default function ProfilePage() {
  const myPosts = posts
    .filter((p) => p.authorId === me.id)
    .sort((a, b) => (a.createdAtISO < b.createdAtISO ? 1 : -1));

  return (
    <AppShell
      title="Profile"
      right={
        <Link href="/settings">
          <Button variant="secondary" className="h-10 px-3">
            Settings
          </Button>
        </Link>
      }
    >
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <Avatar name={me.name} color={me.avatarColor} size={42} />
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold leading-tight">
                {me.name} <span className="text-sm text-[rgb(var(--muted))]">{me.handle}</span>
              </p>
              <p className="mt-1 text-sm text-[rgb(var(--fg)/0.85)]">{me.bio}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Pill>Mode: {me.mode}</Pill>
                <Pill>Privacy-first</Pill>
                <Pill>Journeys: {journeys.length}</Pill>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Link href="/create" className="flex-1">
              <Button className="w-full">Post update</Button>
            </Link>
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => alert("Edit profile (demo).")}
            >
              Edit
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <SectionHeading title="My Journeys" subtitle="Progress is the product." />
          <div className="space-y-2">
            {journeys.map((j) => (
              <div
                key={j.id}
                className="rounded-3xl border border-[rgb(var(--border)/0.10)] bg-[rgb(var(--bg)/0.45)] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{j.title}</p>
                    <p className="mt-1 text-xs text-[rgb(var(--fg)/0.8)]">Goal: {j.goal}</p>
                    <p className="mt-1 text-xs text-[rgb(var(--muted))]">
                      Next: {j.milestone} • Streak: {j.streakDays} days
                    </p>
                  </div>
                  <Pill>{j.visibility}</Pill>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <SectionHeading title="My posts" subtitle="Tiny updates → compounding confidence." />
          {myPosts.length ? (
            <div className="space-y-2">
              {myPosts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-3xl border border-[rgb(var(--border)/0.10)] bg-[rgb(var(--bg)/0.45)] p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-[rgb(var(--muted))]">{formatRelativeTime(p.createdAtISO)}</p>
                    <Pill>{p.type}</Pill>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-[rgb(var(--fg)/0.9)]">{p.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[rgb(var(--muted))]">No posts yet.</p>
          )}
        </Card>
      </div>
    </AppShell>
  );
}