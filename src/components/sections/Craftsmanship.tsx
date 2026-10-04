"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { craftsmanshipContent } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Editorial detail section — appreciation of jewellery form, not manufacturing claims */
export function Craftsmanship() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current || reduced) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".craft-img",
          { scale: 1.06 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          ".craft-reveal",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
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
      id="craftsmanship"
      ref={root}
      className="bg-ivory px-5 py-[clamp(4.5rem,10vw,8rem)] md:px-8"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-20">
        <div
          className={cn(
            "craft-reveal relative min-h-[420px] overflow-hidden bg-cream md:min-h-[520px] lg:min-h-[640px]",
            !reduced && "opacity-0",
          )}
        >
          <Image
            src={craftsmanshipContent.image.src}
            alt={craftsmanshipContent.image.alt}
            fill
            className="craft-img object-cover"
            style={{
              objectPosition:
                craftsmanshipContent.image.objectPosition ?? "50% 50%",
            }}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>

        <div className="max-w-md lg:py-8">
          <p
            className={cn(
              "craft-reveal text-[11px] uppercase tracking-[0.32em] text-taupe",
              !reduced && "opacity-0",
            )}
          >
            {craftsmanshipContent.eyebrow}
          </p>
          <h2
            className={cn(
              "craft-reveal mt-4 font-serif text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-charcoal",
              !reduced && "opacity-0",
            )}
          >
            {craftsmanshipContent.heading}
          </h2>
          <p
            className={cn(
              "craft-reveal mt-6 text-base leading-relaxed text-charcoal/70 md:text-lg",
              !reduced && "opacity-0",
            )}
          >
            {craftsmanshipContent.body}
          </p>
        </div>
      </div>
    </section>
  );
}
