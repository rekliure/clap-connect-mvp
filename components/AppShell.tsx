import React from "react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils";

export function AppShell({
  title,
  backHref,
  right,
  children,
  className
}: {
  title: string;
  backHref?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded-xl bg-[rgb(var(--card))] px-3 py-2 text-sm shadow-lg outline-none ring-2 ring-[rgb(var(--ring))]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border)/0.10)] bg-[rgb(var(--bg)/0.75)] backdrop-blur">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          {backHref ? (
            <Link
              href={backHref}
              aria-label="Go back"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgb(var(--border)/0.10)] bg-[rgb(var(--card)/0.4)] text-sm text-[rgb(var(--fg))] hover:bg-[rgb(var(--card)/0.65)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
            >
              ←
            </Link>
          ) : (
            <div className="h-10 w-10" aria-hidden="true" />
          )}

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold">{title}</h1>
            <p className="truncate text-xs text-[rgb(var(--muted))]">Learning-first • Minimal, fast, accessible</p>
          </div>

          <div className="flex items-center gap-2">{right}</div>
        </div>
      </header>

      <main id="content" className={cn("mx-auto max-w-md px-4 pb-24 pt-4", className)}>
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
