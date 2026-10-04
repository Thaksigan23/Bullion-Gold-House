import { notFound } from "next/navigation";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { Button } from "@/components/ui/Button";
import { getGoldRate } from "@/lib/goldRate";
import { getDictionary, isLocale, localizedHref } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { formatGoldRate } from "@/lib/utils";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return createMetadata({
    title: "Today's Gold Rate",
    description:
      "View today's gold rate information for Bullion Gold House. Contact the showroom for confirmed pricing.",
    path: "/gold-rate",
    locale: raw,
  });
}

export default async function GoldRatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const rate = await getGoldRate();
  const showValues = rate.karat22 != null || rate.karat24 != null;

  return (
    <div className="bg-ivory pt-[calc(var(--header-h)+3rem)] pb-24 md:pt-[calc(var(--header-h)+5rem)]">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <FadeReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            Gold Rate
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            Today&apos;s Gold Rate
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/65">
            Clear reference values for the day. Final jewellery pricing is
            confirmed at the showroom.
          </p>
        </FadeReveal>

        <FadeReveal delay={0.08} className="mt-14 md:mt-20">
          {showValues ? (
            <div className="space-y-10 border-y border-charcoal/10 py-12">
              <RateRow
                label="22KT"
                value={formatGoldRate(rate.karat22, rate.currency)}
              />
              <RateRow
                label="24KT"
                value={formatGoldRate(rate.karat24, rate.currency)}
              />
            </div>
          ) : (
            <div className="border-y border-charcoal/10 py-14">
              <p className="font-serif text-2xl text-charcoal md:text-3xl">
                Contact the showroom for today&apos;s gold rate.
              </p>
            </div>
          )}
        </FadeReveal>

        <FadeReveal delay={0.12} className="mt-8 space-y-3 text-sm text-charcoal/60">
          {showValues ? (
            <p>
              Unit: {rate.unit} · Currency: {rate.currency}
            </p>
          ) : null}
          {rate.updatedAt ? (
            <p>
              {dict.common.lastUpdated}:{" "}
              {new Date(rate.updatedAt).toLocaleString("en-LK")}
            </p>
          ) : null}
          {showValues && rate.isDemo ? (
            <p className="text-[11px] uppercase tracking-[0.16em] text-taupe">
              {dict.common.demoRate}
            </p>
          ) : null}
        </FadeReveal>

        <FadeReveal delay={0.16} className="mt-12 max-w-xl">
          <p className="leading-relaxed text-charcoal/65">
            Jewellery pricing may depend on product-specific factors such as
            design, weight and availability. Please contact the showroom for
            confirmed rates before purchase.
          </p>
          <div className="mt-10">
            <Button
              href={localizedHref("/contact?type=gold-rate", locale)}
              variant="primary"
              size="lg"
            >
              Contact Showroom
            </Button>
          </div>
        </FadeReveal>
      </div>
    </div>
  );
}

function RateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
      <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
        {label}
      </p>
      <p className="font-serif text-[clamp(2rem,5vw,3.25rem)] leading-none tracking-[-0.02em] text-charcoal">
        {value}
      </p>
    </div>
  );
}
