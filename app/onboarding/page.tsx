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

const interestOptions = ["English", "CAT", "Coding", "Design", "Arts", "Public Speaking", "Math", "Physics"] as const;

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("Shashank");
  const [handle, setHandle] = useState("@shashank");
  const [bio, setBio] = useState("Building learning-first communities.");
  const [interests, setInterests] = useState<string[]>(["English", "CAT"]);
  const [goal, setGoal] = useState("Speak English clearly");
  const [milestone, setMilestone] = useState("Record a 60-sec intro video");

  const canNext = useMemo(() => {
    if (step === 1) return name.trim().length >= 2 && handle.trim().startsWith("@");
    if (step === 2) return interests.length >= 1;
    return goal.trim().length >= 3 && milestone.trim().length >= 3;
  }, [step, name, handle, interests, goal, milestone]);

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <AppShell title="Onboarding" backHref="/" right={<Pill>{step}/3</Pill>}>
      <Card className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[rgb(var(--muted))]">Setup in ~2 minutes</p>
            <p className="text-xs text-[rgb(var(--muted))]" aria-label={`Progress ${progress}%`}>
              {progress}%
            </p>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[rgb(var(--bg)/0.55)]">
            <div
              className="h-full rounded-full bg-[rgb(var(--fg))] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <SectionHeading title="Your profile" subtitle="Keep it minimal—edit anytime." />
            <Field label="Name">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </Field>
            <Field label="Handle" hint="Start with @">
              <Input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="@username" />
            </Field>
            <Field label="Bio" hint="Optional">
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={160} />
            </Field>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <SectionHeading title="Pick interests" subtitle="Used for feed + circle suggestions." />
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((opt) => {
                const on = interests.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setInterests((prev) =>
                        prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
                      )
                    }
                    className={[
                      "rounded-full border px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]",
                      on
                        ? "border-[rgb(var(--fg)/0.35)] bg-[rgb(var(--fg))] text-[rgb(var(--bg))]"
                        : "border-[rgb(var(--border)/0.12)] bg-[rgb(var(--bg)/0.55)] text-[rgb(var(--fg))] hover:bg-[rgb(var(--card)/0.35)]",
                    ].join(" ")}
                    aria-pressed={on}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="rounded-3xl border border-[rgb(var(--border)/0.10)] bg-[rgb(var(--bg)/0.45)] p-3">
              <p className="text-xs text-[rgb(var(--muted))]">Selected</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {interests.length ? interests.map((i) => <Pill key={i}>{i}</Pill>) : <Pill>None</Pill>}
              </div>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <SectionHeading title="Start your first Journey" subtitle="This powers your progress-first feed." />
            <Field label="Goal">
              <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g., Improve English fluency" />
            </Field>
            <Field label="First milestone">
              <Input
                value={milestone}
                onChange={(e) => setMilestone(e.target.value)}
                placeholder="e.g., Speak 60 seconds on camera"
              />
            </Field>
            <div className="rounded-3xl border border-[rgb(var(--border)/0.10)] bg-[rgb(var(--bg)/0.45)] p-3">
              <p className="text-xs text-[rgb(var(--muted))]">Preview</p>
              <p className="mt-1 text-sm font-semibold">{goal}</p>
              <p className="mt-1 text-xs text-[rgb(var(--fg)/0.8)]">Next: {milestone}</p>
            </div>
          </div>
        ) : null}

        <div className="mt-5 flex items-center gap-3">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep((s) => (s === 2 ? 1 : 2))} className="w-28">
              Back
            </Button>
          ) : (
            <div className="w-28" />
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep((s) => (s === 1 ? 2 : 3))}
              disabled={!canNext}
              className="flex-1"
            >
              Continue
            </Button>
          ) : (
            <Link href="/feed" className="flex-1">
              <Button disabled={!canNext} className="w-full">
                Finish &amp; go to Feed
              </Button>
            </Link>
          )}
        </div>

        <p className="mt-3 text-xs text-[rgb(var(--muted))]">
          Privacy defaults: posts are Circle-only unless you change it later.
        </p>
      </Card>
    </AppShell>
  );
}
