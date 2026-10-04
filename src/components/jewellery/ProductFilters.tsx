"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  categoryLabels,
  getCatalogueCategories,
  isBridalProduct,
  type CatalogueCategory,
} from "@/lib/productCategories";
import type { Dictionary } from "@/lib/i18n";
import type { Karat, Product, ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

export type FilterState = {
  category?: CatalogueCategory;
  karat?: Karat;
  available?: boolean;
  sort: "featured" | "newest";
};

export function filterProducts(products: Product[], filters: FilterState) {
  let list = [...products];

  if (filters.category && filters.category !== "all") {
    if (filters.category === "bridal") {
      list = list.filter(isBridalProduct);
    } else {
      list = list.filter((p) => p.category === filters.category);
    }
  }

  if (filters.karat) {
    list = list.filter((p) => p.karat === filters.karat);
  }

  if (filters.available === true) {
    list = list.filter((p) => p.available);
  } else if (filters.available === false) {
    list = list.filter((p) => !p.available);
  }

  if (filters.sort === "featured") {
    list.sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        Number(b.newArrival) - Number(a.newArrival),
    );
  } else {
    list.sort(
      (a, b) =>
        Number(b.newArrival) - Number(a.newArrival) ||
        Number(b.featured) - Number(a.featured),
    );
  }

  return list;
}

export function ProductFilters({
  products,
  dict,
  value,
  onChange,
}: {
  products: Product[];
  dict: Dictionary;
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const categories = useMemo(
    () => getCatalogueCategories(products),
    [products],
  );

  const karats = useMemo(
    () =>
      [...new Set(products.map((p) => p.karat).filter(Boolean))] as Karat[],
    [products],
  );

  const hasAvailabilityVariance = useMemo(
    () => products.some((p) => p.available) && products.some((p) => !p.available),
    [products],
  );

  const activeFilterCount =
    (value.karat ? 1 : 0) + (value.available !== undefined ? 1 : 0);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const clearFilters = () => {
    onChange({
      category: value.category ?? "all",
      sort: value.sort,
    });
  };

  const filterPanel = (
    <div className="space-y-8">
      {karats.length > 0 ? (
        <fieldset>
          <legend className="mb-3 text-[11px] uppercase tracking-[0.2em] text-taupe">
            {dict.filters.karat}
          </legend>
          <div className="flex flex-wrap gap-2">
            {karats.map((karat) => (
              <FilterChip
                key={karat}
                label={karat}
                active={value.karat === karat}
                onClick={() =>
                  onChange({
                    ...value,
                    karat: value.karat === karat ? undefined : karat,
                  })
                }
              />
            ))}
          </div>
        </fieldset>
      ) : null}

      {hasAvailabilityVariance ? (
        <fieldset>
          <legend className="mb-3 text-[11px] uppercase tracking-[0.2em] text-taupe">
            {dict.product.availability}
          </legend>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label={dict.product.available}
              active={value.available === true}
              onClick={() =>
                onChange({
                  ...value,
                  available: value.available === true ? undefined : true,
                })
              }
            />
            <FilterChip
              label={dict.product.unavailable}
              active={value.available === false}
              onClick={() =>
                onChange({
                  ...value,
                  available: value.available === false ? undefined : false,
                })
              }
            />
          </div>
        </fieldset>
      ) : null}

      {activeFilterCount > 0 ? (
        <button
          type="button"
          className="min-h-11 text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          onClick={clearFilters}
        >
          {dict.filters.clear}
        </button>
      ) : null}
    </div>
  );

  return (
    <div>
      <nav
        aria-label="Jewellery categories"
        className="-mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0"
      >
        <ul className="flex min-w-max items-center gap-1 border-b border-charcoal/10 md:min-w-0 md:flex-wrap md:gap-0">
          {categories.map((item) => {
            const active = (value.category ?? "all") === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onChange({ ...value, category: item.id })}
                  className={cn(
                    "relative min-h-11 whitespace-nowrap px-3 py-3 text-[11px] uppercase tracking-[0.16em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne md:px-4",
                    active
                      ? "text-charcoal"
                      : "text-charcoal/45 hover:text-charcoal/75",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 bottom-0 h-px bg-champagne"
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex min-h-11 items-center gap-2 border border-charcoal/15 px-4 text-[11px] uppercase tracking-[0.18em] text-charcoal/80 transition-colors hover:border-champagne/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
        >
          {dict.filters.title}
          {activeFilterCount > 0 ? (
            <span className="text-champagne">({activeFilterCount})</span>
          ) : null}
        </button>

        <label className="inline-flex min-h-11 items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-taupe">
          <span>{dict.filters.sort}</span>
          <select
            value={value.sort}
            onChange={(e) =>
              onChange({
                ...value,
                sort: e.target.value as FilterState["sort"],
              })
            }
            className="min-h-11 border-0 border-b border-charcoal/20 bg-transparent py-2 pr-6 text-[11px] uppercase tracking-[0.16em] text-charcoal outline-none focus-visible:border-champagne"
          >
            <option value="featured">{dict.filters.featured}</option>
            <option value="newest">{dict.filters.newest}</option>
          </select>
        </label>
      </div>

      {drawerOpen ? (
        <div
          className="fixed inset-0 z-[60] bg-near-black/40"
          onClick={() => setDrawerOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-none sm:max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
              <p
                id={titleId}
                className="text-[11px] uppercase tracking-[0.22em] text-charcoal"
              >
                {dict.filters.title}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label={dict.nav.close}
                className="flex min-h-11 min-w-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-8">{filterPanel}</div>
            <div className="border-t border-charcoal/10 p-5">
              <button
                type="button"
                className="flex min-h-12 w-full items-center justify-center bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-charcoal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                onClick={() => setDrawerOpen(false)}
              >
                {dict.filters.apply}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
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
      aria-pressed={active}
      className={cn(
        "min-h-11 border px-4 text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne",
        active
          ? "border-charcoal bg-charcoal text-ivory"
          : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/40",
      )}
    >
      {label}
    </button>
  );
}

export function categoryLabel(category: ProductCategory | string) {
  return categoryLabels[category as ProductCategory] ?? category;
}
