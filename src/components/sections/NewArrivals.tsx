"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "@/components/jewellery/ProductCard";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { getNewArrivals } from "@/data/products";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export function NewArrivals({ locale: _locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const products = getNewArrivals(4);
  void _locale;

  useGSAP(
    () => {
      if (!root.current || reduced) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".arrivals-eyebrow",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 84%" },
          },
        );
        gsap.fromTo(
          ".arrivals-heading",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 84%" },
          },
        );
        gsap.fromTo(
          ".arrivals-copy",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 84%" },
          },
        );
        gsap.fromTo(
          ".arrival-card",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".arrivals-grid",
              start: "top 88%",
            },
          },
        );
      }, root);

      return () => ctx.revert();
    },
    { dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="bg-white px-5 pb-[clamp(4.5rem,12vw,9rem)] pt-[clamp(4.5rem,10vw,8rem)] md:px-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <header className="max-w-xl">
            <p
              className={cn(
                "arrivals-eyebrow text-[11px] uppercase tracking-[0.28em] text-taupe",
                !reduced && "opacity-0",
              )}
            >
              New Arrivals
            </p>
            <h2
              className={cn(
                "arrivals-heading mt-3 font-serif text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-charcoal",
                !reduced && "opacity-0",
              )}
            >
              New Pieces at Bullion
            </h2>
            <p
              className={cn(
                "arrivals-copy mt-4 text-base leading-relaxed text-charcoal/65 md:text-lg",
                !reduced && "opacity-0",
              )}
            >
              Fresh selections to explore — enquire for current availability.
            </p>
          </header>

          <LocaleLink
            href="/jewellery?collection=new-arrivals"
            className="inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-champagne"
          >
            View all
            <span aria-hidden className="text-champagne">
              →
            </span>
          </LocaleLink>
        </div>

        <div className="arrivals-grid mt-10 flex gap-4 overflow-x-auto pb-2 no-scrollbar md:mt-14 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-12 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={cn(
                "arrival-card min-w-[72vw] sm:min-w-[46vw] md:min-w-0",
                !reduced && "opacity-0",
              )}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
