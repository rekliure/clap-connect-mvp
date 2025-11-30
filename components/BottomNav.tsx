"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string; icon: string };

const items: Item[] = [
  { href: "/feed", label: "Home", icon: "⌂" },
  { href: "/circles", label: "Circles", icon: "◉" },
  { href: "/create", label: "Create", icon: "+" },
  { href: "/notifications", label: "Alerts", icon: "⟡" },
  { href: "/profile", label: "Me", icon: "☺" }
];

function isActive(pathname: string, href: string) {
  if (href === "/feed") return pathname === "/" || pathname === "/feed";
  return pathname === href || pathname.startsWith(href + "/");
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[rgb(var(--border)/0.10)] bg-[rgb(var(--bg)/0.72)] backdrop-blur"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-2 py-2">
        {items.map((it) => {
          const active = isActive(pathname, it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-xs outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]",
                active
                  ? "bg-[rgb(var(--card)/0.65)] text-[rgb(var(--fg))]"
                  : "text-[rgb(var(--muted))] hover:bg-[rgb(var(--card)/0.35)]"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mb-0.5 flex h-6 w-6 items-center justify-center rounded-xl text-sm",
                  it.label === "Create"
                    ? "bg-[rgb(var(--fg))] text-[rgb(var(--bg))] group-hover:opacity-95"
                    : ""
                )}
              >
                {it.icon}
              </span>
              <span className="leading-none">{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
