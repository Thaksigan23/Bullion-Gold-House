"use client";

import Image from "next/image";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { craftsmanshipContent } from "@/data/content";

export function Craftsmanship() {
  return (
    <section id="craftsmanship" className="section-pad bg-white">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <FadeReveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-cream">
            <Image
              src={craftsmanshipContent.image.src}
              alt={craftsmanshipContent.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </FadeReveal>
        <FadeReveal delay={0.1}>
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            Craftsmanship
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-charcoal">
            {craftsmanshipContent.heading}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/70">
            {craftsmanshipContent.body}
          </p>
        </FadeReveal>
      </div>
    </section>
  );
}
