"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ProductCard } from "@/components/jewellery/ProductCard";
import {
  filterProducts,
  ProductFilters,
  type FilterState,
} from "@/components/jewellery/ProductFilters";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { Button } from "@/components/ui/Button";
import { localizedHref } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";
import type { CatalogueCategory } from "@/lib/productCategories";
import type { CollectionSlug, Locale, Product } from "@/types";

export function JewelleryListing({
  products,
  dict,
  locale,
}: {
  products: Product[];
  dict: Dictionary;
  locale: Locale;
}) {
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get("collection") as CollectionSlug | null;
  const categoryParam = searchParams.get("category") as CatalogueCategory | null;

  const [filters, setFilters] = useState<FilterState>(() => ({
    category: categoryParam || "all",
    sort: "featured",
  }));

  const list = useMemo(() => {
    let base = products;
    if (collectionParam) {
      base = products.filter((p) => p.collection === collectionParam);
    }
    return filterProducts(base, filters);
  }, [products, filters, collectionParam]);

  const showEditorial = list.length >= 6;
  const first = showEditorial ? list.slice(0, 4) : list;
  const rest = showEditorial ? list.slice(4) : [];

  const clearAll = () => {
    setFilters({ category: "all", sort: "featured" });
  };

  return (
    <div className="mt-14 md:mt-16">
      <ProductFilters
        products={products}
        dict={dict}
        value={filters}
        onChange={setFilters}
      />

      <p className="mt-8 text-sm text-charcoal/50">
        {list.length} {list.length === 1 ? "piece" : "pieces"}
      </p>

      {list.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-charcoal md:text-3xl">
            No pieces found for this selection.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-8 min-h-11 text-[11px] uppercase tracking-[0.2em] text-taupe transition-colors hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 md:gap-x-6 md:gap-y-14 xl:grid-cols-4">
            {first.map((product, i) => (
              <FadeReveal key={product.id} delay={Math.min(i * 0.04, 0.16)}>
                <ProductCard product={product} />
              </FadeReveal>
            ))}
          </div>

          {showEditorial ? (
            <FadeReveal className="my-16 md:my-24">
              <div className="grid overflow-hidden bg-cream lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[280px] lg:min-h-[420px]">
                  <Image
                    src="/images/celebrations/weddings.jpg"
                    alt="Bridal portrait with warm yellow-gold jewellery"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 22%" }}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-14">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
                    Editorial
                  </p>
                  <h2 className="mt-4 font-serif text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
                    Jewellery for
                    <br />
                    Meaningful Moments
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal/65 md:text-base">
                    Explore pieces for celebrations, gifting and everyday wear.
                  </p>
                  <div className="mt-8">
                    <Button
                      href={localizedHref("/contact", locale)}
                      variant="outline"
                    >
                      Make an Enquiry
                    </Button>
                  </div>
                </div>
              </div>
            </FadeReveal>
          ) : null}

          {rest.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 md:gap-x-6 md:gap-y-14 xl:grid-cols-4">
              {rest.map((product, i) => (
                <FadeReveal key={product.id} delay={Math.min(i * 0.04, 0.12)}>
                  <ProductCard product={product} />
                </FadeReveal>
              ))}
            </div>
          ) : null}
        </>
      )}

      <FadeReveal className="mt-20 border-t border-charcoal/10 pt-14 text-center md:mt-28">
        <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
          Personal Assistance
        </p>
        <h2 className="mt-4 font-serif text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.05] text-charcoal">
          Looking for a particular piece?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-charcoal/65 md:text-base">
          Speak with the showroom about availability, gold rates and jewellery
          for your occasion.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href={localizedHref("/contact", locale)} variant="primary" size="lg">
            Contact Showroom
          </Button>
        </div>
      </FadeReveal>
    </div>
  );
}
