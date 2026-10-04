"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { heroContent } from "@/data/content";
import { localizedHref } from "@/lib/i18n";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Hero({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current || reduced) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".hero-image",
          { scale: 1.04 },
          { scale: 1, duration: 3.2, ease: "power2.out" },
          0,
        )
          .fromTo(
            ".hero-eyebrow",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1.1 },
            0.45,
          )
          .fromTo(
            ".hero-line",
            { yPercent: 100 },
            { yPercent: 0, duration: 1.35, stagger: 0.12 },
            0.6,
          )
          .fromTo(
            ".hero-copy",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 1.1 },
            1.15,
          )
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1 },
            1.35,
          );
      }, root);
      return () => ctx.revert();
    },
    { dependencies: [reduced] },
  );

  const lines = [heroContent.headingLine1, ...heroContent.headingLinesRest];

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-near-black text-ivory lg:min-h-[100svh] lg:items-end lg:pb-0"
    >
      <div className="absolute inset-0">
        <Image
          src={heroContent.image.src}
          alt={heroContent.image.alt}
          fill
          priority
          className="hero-image object-cover object-[70%_center] md:object-[76%_center] lg:object-[80%_22%]"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 w-full px-5 pb-14 pt-28 md:px-10 md:pb-20 lg:px-14 lg:pb-24 xl:px-20 xl:pb-28">
        <div className="max-w-[min(100%,26rem)] lg:max-w-[32%]">
          <p className="hero-eyebrow mb-6 text-[10px] uppercase tracking-[0.38em] text-champagne md:text-[11px]">
            {heroContent.eyebrow}
          </p>

          <h1 className="font-serif text-[clamp(2.4rem,5.9vw,4.9rem)] leading-[0.94] tracking-[-0.03em] md:text-[clamp(2.95rem,5vw,5.15rem)]">
            {lines.map((line) => (
              <span key={line} className="block overflow-hidden py-[0.02em]">
                <span className="hero-line inline-block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="hero-copy mt-7 max-w-[24rem] text-[0.95rem] leading-relaxed text-ivory/78 md:mt-8 md:text-base">
            {heroContent.supporting}
          </p>

          <div className="hero-cta mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={localizedHref(heroContent.primaryCta.href, locale)}
              className={cn(
                "group inline-flex items-center gap-2.5 border border-champagne bg-champagne px-7 py-3",
                "text-[11px] uppercase tracking-[0.2em] text-near-black transition-colors duration-300",
                "hover:bg-[#c4ad78] hover:border-[#c4ad78]",
              )}
            >
              {heroContent.primaryCta.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={localizedHref(heroContent.secondaryCta.href, locale)}
              className="group inline-flex items-center gap-1.5 border-b border-ivory/35 pb-0.5 text-[11px] uppercase tracking-[0.2em] text-ivory/70 transition-colors duration-300 hover:border-champagne/70 hover:text-champagne"
            >
              {heroContent.secondaryCta.label}
              <span aria-hidden className="text-champagne/80">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
