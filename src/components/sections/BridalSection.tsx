"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { bridalCollections, bridalHero } from "@/data/collections";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export function BridalSection({ locale: _locale }: { locale: Locale }) {
  void _locale;
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const discovery = bridalCollections.filter((c) => c.id !== "bridal-enquiry");
  const enquiry = bridalCollections.find((c) => c.id === "bridal-enquiry");

  useGSAP(
    () => {
      if (!root.current || reduced) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".bridal-hero-img",
          { scale: 1.04 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".bridal-hero",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          ".bridal-reveal",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bridal-hero",
              start: "top 72%",
            },
          },
        );

        gsap.fromTo(
          ".bridal-card",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bridal-grid",
              start: "top 84%",
            },
          },
        );
      }, root);

      return () => ctx.revert();
    },
    { dependencies: [reduced] },
  );

  return (
    <section ref={root} className="bg-near-black text-ivory">
      <div className="bridal-hero relative min-h-[78svh] overflow-hidden md:min-h-[88svh]">
        <Image
          src={bridalHero.image.src}
          alt={bridalHero.image.alt}
          fill
          className="bridal-hero-img object-cover"
          style={{
            objectPosition: bridalHero.image.objectPosition ?? "50% 30%",
          }}
          sizes="100vw"
          priority={false}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-near-black/70 via-near-black/15 to-transparent md:from-near-black/62 md:via-near-black/8 md:to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-near-black/50 via-transparent to-near-black/10"
        />

        <div className="relative z-10 flex min-h-[78svh] items-end px-5 pb-16 pt-28 md:min-h-[88svh] md:px-10 md:pb-24 lg:px-16">
          <div className="max-w-lg">
            <p
              className={cn(
                "bridal-reveal text-[11px] uppercase tracking-[0.32em] text-champagne",
                !reduced && "opacity-0",
              )}
            >
              {bridalHero.eyebrow}
            </p>
            <h2
              className={cn(
                "bridal-reveal mt-4 font-serif text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[0.94] tracking-[-0.03em]",
                !reduced && "opacity-0",
              )}
            >
              {bridalHero.title}
            </h2>
            <p
              className={cn(
                "bridal-reveal mt-5 max-w-md text-base leading-relaxed text-ivory/78",
                !reduced && "opacity-0",
              )}
            >
              {bridalHero.supporting}
            </p>
            <LocaleLink
              href={enquiry?.href ?? bridalHero.cta.href}
              className={cn(
                "bridal-reveal mt-9 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors hover:text-champagne",
                !reduced && "opacity-0",
              )}
            >
              Bridal Enquiry
              <span aria-hidden className="text-champagne">
                →
              </span>
            </LocaleLink>
          </div>
        </div>
      </div>

      <div className="bg-cream px-5 py-[clamp(3.5rem,8vw,6rem)] text-charcoal md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="bridal-grid grid gap-2 md:grid-cols-3 md:gap-3">
            {discovery.map((item) => (
              <LocaleLink
                key={item.id}
                href={item.href}
                className={cn(
                  "bridal-card group relative block min-h-[340px] overflow-hidden bg-ivory md:min-h-[420px] lg:min-h-[480px]",
                  !reduced && "opacity-0",
                )}
              >
                <div data-cursor="Explore" className="absolute inset-0">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
                    style={{
                      objectPosition: item.image.objectPosition ?? "50% 50%",
                    }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-near-black/70 via-near-black/8 to-transparent"
                />
                <div data-cursor-ignore className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="font-serif text-2xl text-ivory md:text-3xl">
                    {item.name}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-ivory/0 transition-all duration-500 group-hover:text-ivory/85">
                    Explore →
                  </p>
                </div>
              </LocaleLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
