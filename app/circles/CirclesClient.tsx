"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { SectionHeading } from "@/components/SectionHeading";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { circles } from "@/lib/data";

export function CirclesClient() {
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return circles;
    return circles.filter((c) => {
      const hay = `${c.name} ${c.description} ${c.tags.join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <SectionHeading title="Find your people" subtitle="Small circles by default. Safe + kind." />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search circles (e.g., English, CAT, design)…"
          aria-label="Search circles"
        />
        <p className="mt-2 text-xs text-[rgb(var(--muted))]">
          Tip: Private circles require invite or approval (UI-only in MVP).
        </p>
      </Card>

      <div className="space-y-3">
        {list.map((c) => (
          <Card key={c.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold">{c.name}</h3>
                  {c.isPrivate ? <Pill>Private</Pill> : <Pill>Public</Pill>}
                </div>
                <p className="mt-1 text-xs text-[rgb(var(--fg)/0.78)]">{c.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <Pill key={t}>#{t}</Pill>
                  ))}
                  <Pill>{c.membersCount.toLocaleString()} members</Pill>
                </div>
              </div>

              <Link href={`/circles/${c.id}`} className="shrink-0">
                <Button className="h-10 px-3">Open</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
