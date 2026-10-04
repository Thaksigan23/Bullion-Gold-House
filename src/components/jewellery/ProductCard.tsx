"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useWishlist } from "@/hooks/useWishlist";
import { categoryLabels, formatKarat } from "@/lib/productCategories";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { toggle, has } = useWishlist();
  const secondary =
    product.images[1] && product.images[1].src !== product.images[0]?.src
      ? product.images[1]
      : null;
  const karat = formatKarat(product.karat, product.metal);
  const category = categoryLabels[product.category] ?? product.category;
  const priceLabel = formatPrice(product.price, product.currency);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <LocaleLink
          href={`/jewellery/${product.slug}`}
          data-cursor="View"
          className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
        >
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            className={cn(
              "object-cover transition-all duration-[650ms] ease-out",
              secondary
                ? "group-hover:opacity-0 group-focus-within:opacity-0"
                : "group-hover:scale-[1.03] group-focus-within:scale-[1.03]",
            )}
            style={{
              objectPosition: product.images[0].objectPosition ?? "50% 50%",
            }}
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          {secondary ? (
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              className="object-cover opacity-0 transition-opacity duration-[650ms] ease-out group-hover:opacity-100 group-focus-within:opacity-100"
              style={{
                objectPosition: secondary.objectPosition ?? "50% 50%",
              }}
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          ) : null}
        </LocaleLink>

        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={
            has(product.id)
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={has(product.id)}
          className="absolute right-2 top-2 flex min-h-11 min-w-11 items-center justify-center text-charcoal/65 transition-colors hover:text-champagne focus-visible:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
        >
          <Heart
            className={cn(
              "h-4 w-4",
              has(product.id) && "fill-champagne text-champagne",
            )}
          />
        </button>
      </div>

      <div className="mt-5 space-y-1.5">
        <LocaleLink
          href={`/jewellery/${product.slug}`}
          className="block font-serif text-[1.25rem] leading-tight text-charcoal transition-colors hover:text-champagne md:text-[1.4rem]"
        >
          {product.name}
        </LocaleLink>

        <p className="text-sm text-charcoal/50">{category}</p>

        {karat ? <p className="text-sm text-charcoal/65">{karat}</p> : null}

        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2 pt-1">
          <p className="text-sm text-charcoal/80">{priceLabel}</p>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em]">
            <LocaleLink
              href={`/contact?type=product&product=${product.slug}`}
              className="text-taupe transition-colors hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            >
              Enquire
            </LocaleLink>
            <LocaleLink
              href={`/jewellery/${product.slug}`}
              className="inline-flex items-center gap-1 text-taupe transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            >
              View Piece
              <span aria-hidden>→</span>
            </LocaleLink>
          </div>
        </div>
      </div>
    </article>
  );
}
