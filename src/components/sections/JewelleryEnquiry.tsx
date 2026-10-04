"use client";

import Image from "next/image";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { Button } from "@/components/ui/Button";
import { enquiryContent } from "@/data/content";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";

/**
 * Jewellery Enquiry — showroom contact only.
 * Does not claim custom manufacturing or bespoke services.
 */
export function JewelleryEnquiry({ locale }: { locale: Locale }) {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-center px-5 py-[clamp(3.5rem,8vw,6rem)] md:px-10 lg:px-16">
          <FadeReveal>
            <p className="text-[11px] uppercase tracking-[0.32em] text-champagne">
              {enquiryContent.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.02em]">
              {enquiryContent.line1}
              <br />
              {enquiryContent.line2}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/70 md:text-lg">
              {enquiryContent.supporting}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                href={localizedHref(enquiryContent.primaryCta.href, locale)}
                variant="gold"
                size="lg"
              >
                {enquiryContent.primaryCta.label} →
              </Button>
              <Button
                href={localizedHref(enquiryContent.secondaryCta.href, locale)}
                variant="secondary"
                size="lg"
              >
                {enquiryContent.secondaryCta.label}
              </Button>
            </div>
          </FadeReveal>
        </div>

        <FadeReveal className="relative min-h-[320px] lg:min-h-full">
          <div className="relative h-full min-h-[320px] overflow-hidden lg:min-h-[480px]">
            <Image
              src={enquiryContent.image.src}
              alt={enquiryContent.image.alt}
              fill
              className="object-cover transition-transform duration-[700ms] ease-out hover:scale-[1.03]"
              style={{
                objectPosition:
                  enquiryContent.image.objectPosition ?? "50% 50%",
              }}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-charcoal/35 via-transparent to-transparent lg:from-charcoal/25"
            />
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
