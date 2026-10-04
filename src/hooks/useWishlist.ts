"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "bullion-wishlist";

function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

const listeners = new Set<() => void>();
let cached: string[] = [];
/** Stable empty snapshot — new [] each call causes React infinite loop warnings */
const EMPTY_WISHLIST: string[] = [];

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cached;
}

function getServerSnapshot() {
  return EMPTY_WISHLIST;
}

function writeWishlist(next: string[]) {
  cached = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  cached = readWishlist();
}

export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const current = readWishlist();
    writeWishlist(
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, has };
}
