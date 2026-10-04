"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  en: "EN",
  si: "සිං",
};

export function LanguageSwitcher({
  locale,
  className,
  light = false,
}: {
  locale: Locale;
  className?: string;
  light?: boolean;
}) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(en|si)/, "") || "";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const other: Locale = locale === "en" ? "si" : "en";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] transition-colors",
          light
            ? "text-ivory/80 hover:text-ivory"
            : "text-charcoal/70 hover:text-charcoal",
        )}
      >
        <span>{labels[locale]}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 opacity-70 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Select language"
          className={cn(
            "absolute right-0 top-full z-50 mt-2 min-w-[4.5rem] border py-1 shadow-lg",
            light
              ? "border-ivory/20 bg-near-black/95 text-ivory"
              : "border-charcoal/10 bg-ivory text-charcoal",
          )}
        >
          <li role="option" aria-selected="true">
            <span className="block px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-champagne">
              {labels[locale]}
            </span>
          </li>
          <li role="option" aria-selected="false">
            <Link
              href={`/${other}${rest}`}
              hrefLang={other}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors",
                light
                  ? "text-ivory/75 hover:bg-ivory/10 hover:text-ivory"
                  : "text-charcoal/70 hover:bg-cream hover:text-charcoal",
              )}
            >
              {labels[other]}
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
