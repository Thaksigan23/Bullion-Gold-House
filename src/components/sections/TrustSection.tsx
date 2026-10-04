"use client";

import { FadeReveal } from "@/components/motion/FadeReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trustItems } from "@/data/content";

export function TrustSection() {
  return (
    <section className="section-pad bg-ivory">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <FadeReveal>
          <SectionHeading
            align="center"
            eyebrow="Why Bullion"
            title="Why Bullion Gold House"
            description="Safe placeholders until verified benefits and policies are confirmed."
          />
        </FadeReveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, i) => (
            <FadeReveal key={item.id} delay={i * 0.06}>
              <div className="border-t border-champagne/50 pt-5">
                <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                  {item.description}
                </p>
              </div>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
