"use client";

import { useMemo, useState, useSyncExternalStore, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { popularSearchCategories, searchProducts } from "@/lib/search";
import type { Dictionary } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

const RECENT_KEY = "bullion-recent-searches";

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

const EMPTY_RECENT: string[] = [];
let recentCache: string[] =
  typeof window === "undefined" ? EMPTY_RECENT : readRecent();
const recentListeners = new Set<() => void>();

function subscribeRecent(listener: () => void) {
  recentListeners.add(listener);
  return () => recentListeners.delete(listener);
}

function getRecentSnapshot() {
  return recentCache;
}

function getRecentServerSnapshot() {
  return EMPTY_RECENT;
}

function writeRecent(next: string[]) {
  recentCache = next;
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  recentListeners.forEach((l) => l());
}

export function SearchOverlay({
  open,
  onClose,
  dict,
}: {
  open: boolean;
  onClose: () => void;
  dict: Dictionary;
}) {
  const [query, setQuery] = useState("");
  const recent = useSyncExternalStore(
    subscribeRecent,
    getRecentSnapshot,
    getRecentServerSnapshot,
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const results = useMemo(() => searchProducts(query), [query]);

  const commitSearch = (value: string) => {
    if (!value) return;
    writeRecent([value, ...recent.filter((r) => r !== value)].slice(0, 6));
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] bg-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto flex h-full max-w-4xl flex-col px-5 py-6 md:px-8">
            <div className="flex items-center gap-3 border-b border-charcoal/15 pb-4">
              <Search className="h-5 w-5 text-taupe" aria-hidden />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) commitSearch(query.trim());
                }}
                placeholder={dict.search.placeholder}
                className="w-full bg-transparent font-serif text-2xl text-charcoal outline-none placeholder:text-taupe/70 md:text-3xl"
                aria-label={dict.nav.search}
              />
              <button type="button" onClick={onClose} aria-label={dict.nav.close}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid gap-10 overflow-y-auto pb-10 md:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-8">
                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-taupe">
                    {dict.search.popular}
                  </p>
                  <ul className="space-y-2">
                    {popularSearchCategories.map((cat) => (
                      <li key={cat.href}>
                        <LocaleLink
                          href={cat.href}
                          onClick={onClose}
                          className="text-lg text-charcoal/80 transition-colors hover:text-champagne"
                        >
                          {cat.label}
                        </LocaleLink>
                      </li>
                    ))}
                  </ul>
                </div>
                {recent.length ? (
                  <div>
                    <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-taupe">
                      {dict.search.recent}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {recent.map((item) => (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() => setQuery(item)}
                            className="border border-charcoal/15 px-3 py-1.5 text-sm text-charcoal/70 hover:border-champagne"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-taupe">
                  {dict.search.results}
                </p>
                {query && results.length === 0 ? (
                  <p className="text-charcoal/60">{dict.search.noResults}</p>
                ) : (
                  <ul className="space-y-3">
                    {results.map((product) => (
                      <li key={product.id}>
                        <LocaleLink
                          href={`/jewellery/${product.slug}`}
                          onClick={() => {
                            commitSearch(query.trim() || product.name);
                            onClose();
                          }}
                          className="flex gap-4 border-b border-charcoal/8 py-3 transition-colors hover:bg-cream/50"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-cream">
                            <Image
                              src={product.images[0]?.src}
                              alt={product.images[0]?.alt || product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <p className="font-serif text-xl">{product.name}</p>
                            <p className="text-sm capitalize text-taupe">
                              {product.category}
                              {product.karat ? ` · ${product.karat}` : ""}
                            </p>
                            <p className="mt-1 text-sm">
                              {formatPrice(product.price, product.currency)}
                            </p>
                          </div>
                        </LocaleLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
