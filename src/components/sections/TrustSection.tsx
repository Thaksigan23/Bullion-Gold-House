"use client";

import { FadeReveal } from "@/components/motion/FadeReveal";
import { trustItems, whyBullionContent } from "@/data/content";

/** Why Bullion — safe experience pillars only; no unverified claims */
export function TrustSection() {
  return (
    <section className="bg-ivory px-5 py-[clamp(5rem,12vw,9rem)] md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <FadeReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            {whyBullionContent.eyebrow}
          </p>
          <h2 className="mt-4 max-w-lg font-serif text-[clamp(2.15rem,4.2vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-charcoal">
            {whyBullionContent.title}
          </h2>
        </FadeReveal>

        <div className="mt-16 grid gap-0 border-t border-charcoal/10 md:mt-20 md:grid-cols-3">
          {trustItems.map((item, i) => (
            <FadeReveal
              key={item.id}
              delay={i * 0.08}
              className="border-charcoal/10 py-10 md:border-l md:px-8 md:py-12 md:first:border-l-0 md:first:pl-0 lg:px-12"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-serif text-[1.65rem] text-charcoal md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/60 md:text-[0.95rem]">
                {item.description}
              </p>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
