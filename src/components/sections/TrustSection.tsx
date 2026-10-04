"use client";

import { FadeReveal } from "@/components/motion/FadeReveal";
import { trustItems, whyBullionContent } from "@/data/content";

/** Why Bullion — safe experience pillars only; no unverified claims */
export function TrustSection() {
  return (
    <section className="bg-ivory px-5 py-[clamp(4.5rem,10vw,8rem)] md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <FadeReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            {whyBullionContent.eyebrow}
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-charcoal">
            {whyBullionContent.title}
          </h2>
        </FadeReveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
          {trustItems.map((item, i) => (
            <FadeReveal key={item.id} delay={i * 0.08}>
              <p className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.03em] text-champagne/80">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div className="mt-5 h-px w-12 bg-champagne/50" aria-hidden />
              <h3 className="mt-5 font-serif text-2xl text-charcoal md:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/65 md:text-base">
                {item.description}
              </p>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
