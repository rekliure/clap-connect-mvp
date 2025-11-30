"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Field } from "@/components/Field";
import { Pill } from "@/components/Pill";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { circles } from "@/lib/data";
import type { PostType } from "@/lib/types";
import { readPrefs } from "@/lib/storage";

const typeOptions: Array<{ type: PostType; label: string; hint: string }> = [
  { type: "progress", label: "Progress", hint: "What I did / learned / need help with" },
  { type: "question", label: "Question", hint: "Ask clearly; keep details in body" },
  { type: "resource", label: "Resource", hint: "Share link/summary and why it matters" },
  { type: "event", label: "Event", hint: "Simple event announcement (v0 UI)" }
];

export default function CreatePage() {
  const prefs = useMemo(() => readPrefs(), []);
  const [type, setType] = useState<PostType>("progress");
  const [circleId, setCircleId] = useState<string>(circles[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("What I did:\nWhat I learned:\nWhat I need help with:");
  const [tags, setTags] = useState("daily, learning");

  const hint = typeOptions.find((o) => o.type === type)?.hint ?? "";

  function submit() {
    alert("Posted (demo). Connect a backend to persist.");
    setTitle("");
    setBody(type === "progress" ? "What I did:\nWhat I learned:\nWhat I need help with:" : "");
    setTags("");
  }

  return (
    <AppShell title="Create post" backHref="/feed" right={<Pill>v0</Pill>}>
      <div className="space-y-4">
        <Card className="p-4">
          <SectionHeading
            title="Pick a template"
            subtitle={prefs.mode === "simple" ? "Simple mode: guided defaults." : "Power mode: more control."}
            right={
              <Link href="/settings" className="text-xs text-[rgb(var(--muted))] hover:underline">
                Mode
              </Link>
            }
          />

          <div className="grid grid-cols-2 gap-2">
            {typeOptions.map((o) => {
              const on = o.type === type;
              return (
                <button
                  key={o.type}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setType(o.type)}
                  className={[
                    "rounded-2xl border px-3 py-2 text-left outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]",
                    on
                      ? "border-[rgb(var(--fg)/0.25)] bg-[rgb(var(--card)/0.75)]"
                      : "border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] hover:bg-[rgb(var(--card)/0.35)]"
                  ].join(" ")}
                >
                  <p className="text-xs font-semibold">{o.label}</p>
                  <p className="mt-0.5 text-[11px] text-[rgb(var(--muted))]">{o.hint}</p>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-4">
          <SectionHeading title="Post details" subtitle={hint} />
          <div className="space-y-4">
            <Field label="Circle" hint="Where it shows up">
              <select
                value={circleId}
                onChange={(e) => setCircleId(e.target.value)}
                className="h-11 w-full rounded-2xl border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] px-3 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                aria-label="Select circle"
              >
                {circles.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.isPrivate ? "(Private)" : ""}
                  </option>
                ))}
              </select>
            </Field>

            {type !== "progress" ? (
              <Field label="Title" hint="Optional for progress">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short and clear…" />
              </Field>
            ) : null}

            <Field label="Body" hint="Be kind + specific">
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write here…" />
            </Field>

            <Field label="Tags" hint="comma-separated">
              <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., english, daily, quant" />
            </Field>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={submit}>
                Post (demo)
              </Button>
              <Link href="/feed" className="flex-1">
                <Button variant="secondary" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>

            <p className="text-xs text-[rgb(var(--muted))]">
              Default visibility: <span className="text-[rgb(var(--fg)/0.9)]">{prefs.defaultVisibility}</span> (change
              in Settings).
            </p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
