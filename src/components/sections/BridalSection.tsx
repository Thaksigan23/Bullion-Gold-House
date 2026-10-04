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

  useGSAP(
    () => {
      if (!root.current || reduced) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".bridal-hero-img",
          { scale: 1.06 },
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
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bridal-hero",
              start: "top 72%",
            },
          },
        );

        gsap.fromTo(
          ".bridal-card",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.08,
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
      {/* Bridge from dark showcase into editorial bridal photography */}
      <div className="bridal-hero relative min-h-[65svh] overflow-hidden md:min-h-[72svh]">
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
        {/* Left-weighted gradient — keep bride jewellery on the right readable */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-near-black/78 via-near-black/22 to-transparent md:from-near-black/70 md:via-near-black/12 md:to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-near-black/55 via-transparent to-near-black/15"
        />

        <div className="relative z-10 flex min-h-[65svh] items-end px-5 pb-14 pt-28 md:min-h-[72svh] md:px-10 md:pb-20 lg:px-16">
          <div className="max-w-xl">
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
                "bridal-reveal mt-4 font-serif text-[clamp(2.75rem,6vw,5rem)] leading-[0.96] tracking-[-0.03em]",
                !reduced && "opacity-0",
              )}
            >
              {bridalHero.title}
            </h2>
            <p
              className={cn(
                "bridal-reveal mt-5 max-w-md text-base leading-relaxed text-ivory/80 md:text-lg",
                !reduced && "opacity-0",
              )}
            >
              {bridalHero.supporting}
            </p>
            <LocaleLink
              href={bridalHero.cta.href}
              className={cn(
                "bridal-reveal mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors hover:text-champagne",
                !reduced && "opacity-0",
              )}
            >
              {bridalHero.cta.label}
              <span aria-hidden className="text-champagne">
                →
              </span>
            </LocaleLink>
          </div>
        </div>
      </div>

      {/* Follow-up discovery — warm cream return begins */}
      <div className="bg-cream px-5 py-[clamp(4.5rem,10vw,7.5rem)] text-charcoal md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            Bridal Collections
          </p>
          <h3 className="mt-3 max-w-xl font-serif text-[clamp(1.85rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em]">
            Discover jewellery for every beginning
          </h3>

          <div className="bridal-grid mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {bridalCollections.map((item) => {
              const isEnquiry = item.id === "bridal-enquiry";
              return (
                <LocaleLink
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "bridal-card group relative block min-h-[280px] overflow-hidden bg-ivory md:min-h-[320px]",
                    !reduced && "opacity-0",
                  )}
                >
                  <div
                    data-cursor={isEnquiry ? "Enquire" : "Explore"}
                    className="absolute inset-0"
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className="object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                      style={{
                        objectPosition: item.image.objectPosition ?? "50% 50%",
                      }}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-near-black/72 via-near-black/12 to-transparent transition-colors duration-500 group-hover:from-near-black/78"
                  />
                  <div
                    data-cursor-ignore
                    className="absolute inset-x-0 bottom-0 p-5"
                  >
                    <p className="font-serif text-2xl text-ivory transition-transform duration-500 group-hover:-translate-y-0.5">
                      {item.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ivory/70">
                      {item.description}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ivory/0 transition-all duration-500 group-hover:text-ivory/85 group-focus-visible:text-ivory/85">
                      {isEnquiry ? "Enquire →" : "Explore →"}
                    </p>
                  </div>
                </LocaleLink>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
