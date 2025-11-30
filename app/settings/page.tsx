"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Field } from "@/components/Field";
import { Pill } from "@/components/Pill";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { readPrefs, writePrefs, type MiniPrefs } from "@/lib/storage";

export default function SettingsPage() {
  const [prefs, setPrefs] = useState<MiniPrefs>(() => ({
    mode: "simple",
    reducedMotion: false,
    defaultVisibility: "circle"
  }));

 useEffect(() => {
  // Reading from localStorage after mount is intentional to avoid hydration mismatch.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setPrefs(readPrefs());
}, []);

  function save() {
    writePrefs(prefs);
    alert("Saved (demo).");
  }

  return (
    <AppShell title="Settings" backHref="/feed" right={<Pill>Privacy-first</Pill>}>
      <div className="space-y-4">
        <Card className="p-4">
          <SectionHeading title="Preferences" subtitle="Smart defaults for everyone." />

          <div className="space-y-4">
            <Field label="Mode" hint="Simple vs power controls">
              <div className="grid grid-cols-2 gap-2">
                {(["simple", "power"] as const).map((m) => {
                  const on = prefs.mode === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPrefs((p) => ({ ...p, mode: m }))}
                      className={[
                        "rounded-2xl border px-3 py-2 text-left outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]",
                        on
                          ? "border-[rgb(var(--fg)/0.25)] bg-[rgb(var(--card)/0.75)]"
                          : "border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] hover:bg-[rgb(var(--card)/0.35)]"
                      ].join(" ")}
                    >
                      <p className="text-xs font-semibold">{m === "simple" ? "Simple" : "Power"}</p>
                      <p className="mt-0.5 text-[11px] text-[rgb(var(--muted))]">
                        {m === "simple" ? "Guided + minimal steps" : "More controls + advanced options"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Default post visibility" hint="Recommended: Circle">
              <select
                value={prefs.defaultVisibility}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, defaultVisibility: e.target.value as MiniPrefs["defaultVisibility"] }))
                }
                className="h-11 w-full rounded-2xl border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] px-3 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
              >
                <option value="circle">Circle (recommended)</option>
                <option value="me">Only me</option>
                <option value="public">Public</option>
              </select>
            </Field>

            <Field label="Reduce motion" hint="Accessibility">
              <label className="flex items-center justify-between gap-3 rounded-3xl border border-[rgb(var(--border)/0.10)] bg-[rgb(var(--bg)/0.45)] p-3">
                <span className="text-sm">Prefer fewer animations</span>
                <input
                  type="checkbox"
                  checked={prefs.reducedMotion}
                  onChange={(e) => setPrefs((p) => ({ ...p, reducedMotion: e.target.checked }))}
                  className="h-5 w-5 accent-[rgb(var(--fg))]"
                  aria-label="Reduce motion"
                />
              </label>
            </Field>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={save}>
                Save
              </Button>
              <Link href="/profile" className="flex-1">
                <Button variant="secondary" className="w-full">
                  Back to Profile
                </Button>
              </Link>
            </div>

            <p className="text-xs text-[rgb(var(--muted))]">
              Next in v1: push notifications, DMs, bookmarks, stronger moderation.
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <SectionHeading title="Safety tools" subtitle="One-tap reporting & blocking (demo UI)." />
          <div className="grid grid-cols-2 gap-2">
            <Button variant="ghost" onClick={() => alert("Blocked users (demo).")}>
              Blocked users
            </Button>
            <Button variant="ghost" onClick={() => alert("Report history (demo).")}>
              Report history
            </Button>
            <Button variant="danger" className="col-span-2" onClick={() => alert("Signed out (demo).")}>
              Sign out (demo)
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
