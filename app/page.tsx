import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/Button";

export default function Landing() {
  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <Card className="p-6">
        <div className="space-y-3">
          <p className="text-xs text-[rgb(var(--muted))]">CLAP Connect • MVP UI</p>
          <h1 className="text-2xl font-semibold leading-tight">
            Progress-first social for learning.
          </h1>
          <p className="text-sm text-[rgb(var(--fg)/0.8)]">
            Journeys, Circles, Events, and lightweight messaging—designed to be easy for everyone.
          </p>

          <div className="pt-2 flex flex-col gap-3">
            <Link href="/onboarding">
              <Button className="w-full">Get started</Button>
            </Link>
            <Link href="/feed">
              <Button variant="ghost" className="w-full">Skip to demo feed</Button>
            </Link>
          </div>

          <div className="pt-4 text-xs text-[rgb(var(--muted))]">
            Tip: This is UI-only with dummy data. Hook it to your backend later.
          </div>
        </div>
      </Card>
    </main>
  );
}
