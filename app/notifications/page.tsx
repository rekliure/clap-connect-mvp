"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { notificationsSeed } from "@/lib/data";
import { formatRelativeTime } from "@/lib/utils";
import type { Notification } from "@/lib/types";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(notificationsSeed);

  const unread = useMemo(() => items.filter((n) => !n.read).length, [items]);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <AppShell
      title="Notifications"
      right={
        <Button variant="secondary" className="h-10 px-3" onClick={markAllRead} disabled={!unread}>
          Mark all
        </Button>
      }
    >
      <div className="space-y-4">
        <Card className="p-4">
          <SectionHeading title="Your alerts" subtitle={unread ? `${unread} unread` : "All caught up"} />
          <p className="text-xs text-[rgb(var(--muted))]">
            Notifications are in-app only in v0. Push/email can be added in v1.
          </p>
        </Card>

        <div className="space-y-3">
          {items.map((n) => (
            <Card key={n.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-[rgb(var(--muted))]">{formatRelativeTime(n.createdAtISO)}</p>
                  <p className="mt-2 text-sm text-[rgb(var(--fg)/0.92)]">{n.text}</p>
                </div>
                <span
                  aria-label={n.read ? "Read" : "Unread"}
                  className={[
                    "mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full",
                    n.read ? "bg-[rgb(var(--border)/0.18)]" : "bg-[rgb(var(--fg))]"
                  ].join(" ")}
                />
              </div>

              <div className="mt-3 flex gap-2">
                {n.href ? (
                  <Link href={n.href} className="flex-1">
                    <Button className="w-full">Open</Button>
                  </Link>
                ) : null}
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                >
                  Mark read
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
