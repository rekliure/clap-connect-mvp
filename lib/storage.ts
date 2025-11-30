import type { Mode, Visibility } from "@/lib/types";

const KEY = "clapconnect.miniPrefs.v1";

export type MiniPrefs = {
  mode: Mode;
  reducedMotion: boolean;
  defaultVisibility: Visibility;
};

const defaults: MiniPrefs = {
  mode: "simple",
  reducedMotion: false,
  defaultVisibility: "circle"
};

export function readPrefs(): MiniPrefs {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<MiniPrefs>;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

export function writePrefs(next: MiniPrefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
}
