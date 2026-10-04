"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { enquiryContent } from "@/data/content";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";

/**
 * Jewellery Enquiry — showroom contact only.
 * Does not claim custom manufacturing or bespoke services.
 */
export function JewelleryEnquiry({ locale }: { locale: Locale }) {
  return (
    <section className="bg-near-black text-ivory">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center px-5 py-[clamp(4rem,9vw,7rem)] md:px-10 lg:px-16 xl:px-20">
          <FadeReveal>
            <p className="text-[11px] uppercase tracking-[0.32em] text-champagne">
              {enquiryContent.eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.02em]">
              {enquiryContent.line1}
              <br />
              {enquiryContent.line2}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/68">
              {enquiryContent.supporting}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={localizedHref(enquiryContent.primaryCta.href, locale)}
                className="inline-flex items-center border border-champagne bg-champagne px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-near-black transition-colors hover:border-[#c4ad78] hover:bg-[#c4ad78]"
              >
                {enquiryContent.primaryCta.label}
              </Link>
              <Link
                href={localizedHref(enquiryContent.secondaryCta.href, locale)}
                className="text-[11px] uppercase tracking-[0.2em] text-ivory/75 transition-colors hover:text-champagne"
              >
                {enquiryContent.secondaryCta.label}
              </Link>
            </div>
          </FadeReveal>
        </div>

        <FadeReveal className="relative min-h-[360px] lg:min-h-full">
          <div className="relative h-full min-h-[360px] overflow-hidden lg:min-h-[560px]">
            <Image
              src={enquiryContent.image.src}
              alt={enquiryContent.image.alt}
              fill
              className="object-cover transition-transform duration-[800ms] ease-out hover:scale-[1.025]"
              style={{
                objectPosition:
                  enquiryContent.image.objectPosition ?? "50% 50%",
              }}
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
