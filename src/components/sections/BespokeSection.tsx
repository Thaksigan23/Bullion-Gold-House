"use client";

import { FadeReveal } from "@/components/motion/FadeReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { bespokeSteps } from "@/data/content";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";

/** Configurable bespoke section — remove easily if service not offered */
export function BespokeSection({
  locale,
  enabled = true,
}: {
  locale: Locale;
  enabled?: boolean;
}) {
  if (!enabled) return null;

  return (
    <section className="section-pad bg-charcoal text-ivory">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <FadeReveal>
          <SectionHeading
            light
            eyebrow="Bespoke"
            title="Made For You"
            description="Begin with an idea. Together we shape a piece that belongs to your moment."
          />
        </FadeReveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bespokeSteps.map((step, i) => (
            <FadeReveal key={step.id} delay={i * 0.08}>
              <p className="text-[11px] tracking-[0.28em] text-champagne">
                {step.step}
              </p>
              <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">
                {step.description}
              </p>
            </FadeReveal>
          ))}
        </div>

        <FadeReveal className="mt-12">
          <Button
            href={localizedHref("/contact?type=custom", locale)}
            variant="gold"
            size="lg"
          >
            Start an Enquiry
          </Button>
        </FadeReveal>
      </div>
    </section>
  );
}
