"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import type { Product, ProductCategory, Karat, Metal, CollectionSlug } from "@/types";
import { cn } from "@/lib/utils";

export type FilterState = {
  category?: ProductCategory;
  metal?: Metal;
  karat?: Karat;
  collection?: CollectionSlug;
  sort: "newest" | "name" | "featured";
};

export function filterProducts(products: Product[], filters: FilterState) {
  let list = [...products];
  if (filters.category) list = list.filter((p) => p.category === filters.category);
  if (filters.metal) list = list.filter((p) => p.metal === filters.metal);
  if (filters.karat) list = list.filter((p) => p.karat === filters.karat);
  if (filters.collection) {
    list = list.filter((p) => p.collection === filters.collection);
  }
  if (filters.sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sort === "featured") {
    list.sort((a, b) => Number(b.featured) - Number(a.featured));
  } else {
    list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
  }
  return list;
}

export function ProductFilters({
  products,
  dict,
  initial,
  onChange,
}: {
  products: Product[];
  dict: Dictionary;
  initial: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(initial);

  const options = useMemo(() => {
    return {
      category: [...new Set(products.map((p) => p.category))],
      metal: [...new Set(products.map((p) => p.metal))],
      karat: [...new Set(products.map((p) => p.karat).filter(Boolean))] as Karat[],
      collection: [
        ...new Set(products.map((p) => p.collection).filter(Boolean)),
      ] as CollectionSlug[],
    };
  }, [products]);

  const apply = (next: FilterState) => {
    setDraft(next);
    onChange(next);
  };

  const panel = (
    <div className="space-y-6">
      <FilterGroup label={dict.filters.category}>
        {options.category.map((value) => (
          <Chip
            key={value}
            active={draft.category === value}
            onClick={() =>
              apply({
                ...draft,
                category: draft.category === value ? undefined : value,
              })
            }
            label={value}
          />
        ))}
      </FilterGroup>
      <FilterGroup label={dict.filters.metal}>
        {options.metal.map((value) => (
          <Chip
            key={value}
            active={draft.metal === value}
            onClick={() =>
              apply({
                ...draft,
                metal: draft.metal === value ? undefined : value,
              })
            }
            label={value}
          />
        ))}
      </FilterGroup>
      <FilterGroup label={dict.filters.karat}>
        {options.karat.map((value) => (
          <Chip
            key={value}
            active={draft.karat === value}
            onClick={() =>
              apply({
                ...draft,
                karat: draft.karat === value ? undefined : value,
              })
            }
            label={value}
          />
        ))}
      </FilterGroup>
      <FilterGroup label={dict.filters.collection}>
        {options.collection.map((value) => (
          <Chip
            key={value}
            active={draft.collection === value}
            onClick={() =>
              apply({
                ...draft,
                collection: draft.collection === value ? undefined : value,
              })
            }
            label={value.replace(/-/g, " ")}
          />
        ))}
      </FilterGroup>
      <FilterGroup label={dict.filters.sort}>
        {(
          [
            ["newest", dict.filters.newest],
            ["name", dict.filters.nameAsc],
            ["featured", dict.filters.featured],
          ] as const
        ).map(([value, label]) => (
          <Chip
            key={value}
            active={draft.sort === value}
            onClick={() => apply({ ...draft, sort: value })}
            label={label}
          />
        ))}
      </FilterGroup>
      <button
        type="button"
        className="text-xs uppercase tracking-[0.18em] text-taupe hover:text-charcoal"
        onClick={() => apply({ sort: "newest" })}
      >
        {dict.filters.clear}
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-taupe">
          {dict.filters.title}
        </p>
        {panel}
      </aside>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border border-charcoal/20 px-4 py-2 text-[11px] uppercase tracking-[0.18em]"
        >
          {dict.filters.title}
        </button>
        {open ? (
          <div className="fixed inset-0 z-[60] bg-near-black/40" onClick={() => setOpen(false)}>
            <div
              className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto bg-ivory p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.22em]">{dict.filters.title}</p>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {panel}
              <button
                type="button"
                className="mt-6 w-full bg-charcoal py-3 text-[11px] uppercase tracking-[0.18em] text-ivory"
                onClick={() => setOpen(false)}
              >
                {dict.filters.apply}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.16em] text-charcoal/70">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-3 py-1.5 text-xs capitalize transition-colors",
        active
          ? "border-champagne bg-champagne/15 text-charcoal"
          : "border-charcoal/15 text-charcoal/70 hover:border-champagne/50",
      )}
    >
      {label}
    </button>
  );
}
