"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { heroContent } from "@/data/content";
import { localizedHref } from "@/lib/i18n";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

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
          { scale: 1.03 },
          { scale: 1, duration: 2.6, ease: "power2.out" },
          0,
        )
          .fromTo(
            ".hero-eyebrow",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 1 },
            0.4,
          )
          .fromTo(
            ".hero-line",
            { yPercent: 105 },
            { yPercent: 0, duration: 1.25, stagger: 0.14 },
            0.55,
          )
          .fromTo(
            ".hero-copy",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 1.05 },
            1.05,
          )
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.95, stagger: 0.1 },
            1.25,
          );

        gsap.to(".hero-parallax", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, root);
      return () => ctx.revert();
    },
    { dependencies: [reduced] },
  );

  const lines = [
    heroContent.headingLine1,
    ...heroContent.headingLinesRest,
  ];

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-near-black text-ivory lg:items-center"
    >
      <div className="hero-parallax absolute inset-0">
        <Image
          src={heroContent.image.src}
          alt={heroContent.image.alt}
          fill
          priority
          className="hero-image object-cover object-[72%_center] md:object-[78%_center] lg:object-[82%_center]"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 w-full px-5 pb-16 pt-28 md:px-10 md:pb-20 lg:px-14 lg:pb-0 xl:px-20">
        <div className="max-w-[min(100%,32rem)] lg:max-w-[42%]">
          <p className="hero-eyebrow mb-5 text-[11px] uppercase tracking-[0.35em] text-champagne">
            {heroContent.eyebrow}
          </p>

          <h1 className="font-serif text-[clamp(2.5rem,5.2vw,5.25rem)] leading-[0.95] tracking-[-0.03em] lg:text-[clamp(3.5rem,4.6vw,5.625rem)] lg:leading-[0.94]">
            {lines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span className="hero-line inline-block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="hero-copy mt-8 max-w-[32.5rem] text-base leading-relaxed text-ivory/80 md:text-[1.05rem]">
            {heroContent.supporting}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <div className="hero-cta">
              <Link
                href={localizedHref(heroContent.primaryCta.href, locale)}
                className={cn(
                  "group inline-flex items-center gap-2.5 border border-champagne bg-champagne px-7 py-2.5",
                  "text-[11px] uppercase tracking-[0.2em] text-near-black transition-colors duration-300",
                  "hover:bg-[#c4ad78] hover:border-[#c4ad78]",
                )}
              >
                {heroContent.primaryCta.label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="hero-cta">
              <Link
                href={localizedHref(heroContent.secondaryCta.href, locale)}
                className={cn(
                  "group inline-flex items-center gap-2.5 border border-ivory/45 bg-transparent px-7 py-2.5",
                  "text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors duration-300",
                  "hover:border-champagne/70 hover:bg-ivory/5",
                )}
              >
                {heroContent.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
