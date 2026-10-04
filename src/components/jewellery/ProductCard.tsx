"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useWishlist } from "@/hooks/useWishlist";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  necklaces: "Necklaces",
  chains: "Chains",
  bangles: "Bangles",
  bracelets: "Bracelets",
  earrings: "Earrings",
  rings: "Rings",
  pendants: "Pendants",
  mens: "Men's Jewellery",
  kids: "Kids' Jewellery",
  diamond: "Diamond Jewellery",
  lightweight: "Lightweight Jewellery",
};

function karatLabel(karat?: string, metal?: string) {
  if (!karat) return null;
  if (metal === "gold" || !metal) return `${karat} Gold`;
  return karat;
}

export function ProductCard({ product }: { product: Product }) {
  const { toggle, has } = useWishlist();
  const secondary =
    product.images[1] && product.images[1].src !== product.images[0]?.src
      ? product.images[1]
      : null;
  const karat = karatLabel(product.karat, product.metal);
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
                : "group-hover:scale-[1.025] group-focus-within:scale-[1.025]",
            )}
            style={{
              objectPosition: product.images[0].objectPosition ?? "50% 50%",
            }}
            sizes="(max-width: 768px) 70vw, (max-width: 1280px) 33vw, 25vw"
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
              sizes="(max-width: 768px) 70vw, (max-width: 1280px) 33vw, 25vw"
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
          className="absolute right-3 top-3 p-2 text-charcoal/70 transition-colors hover:text-champagne focus-visible:text-champagne"
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
          className="block font-serif text-[1.35rem] leading-tight text-charcoal transition-colors hover:text-champagne md:text-[1.5rem]"
        >
          {product.name}
        </LocaleLink>

        <p className="font-sans text-sm text-charcoal/55">{category}</p>

        {karat ? (
          <p className="font-sans text-sm text-charcoal/70">{karat}</p>
        ) : null}

        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="font-sans text-sm text-charcoal/80">{priceLabel}</p>
          <LocaleLink
            href={`/jewellery/${product.slug}`}
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-taupe transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-champagne"
          >
            View piece
            <span aria-hidden>→</span>
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}
