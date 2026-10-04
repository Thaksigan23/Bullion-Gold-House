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
          { scale: 1.04 },
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
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.09,
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
      className="bg-cream px-5 py-[clamp(4rem,10vw,8rem)] md:px-8"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 xl:gap-24">
        <div
          className={cn(
            "craft-reveal relative min-h-[460px] overflow-hidden bg-ivory md:min-h-[560px] lg:min-h-[720px]",
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
            sizes="(max-width: 1024px) 100vw, 62vw"
          />
        </div>

        <div className="max-w-sm lg:py-10">
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
              "craft-reveal mt-5 font-serif text-[clamp(2.15rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-charcoal",
              !reduced && "opacity-0",
            )}
          >
            {craftsmanshipContent.heading}
          </h2>
          <p
            className={cn(
              "craft-reveal mt-6 text-base leading-relaxed text-charcoal/65",
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
