import { notFound } from "next/navigation";
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
    title: "Gold Rate",
    description:
      "View today's indicative gold rate information for Bullion Gold House. Contact the showroom for confirmed pricing.",
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
    <div className="bg-ivory pt-[calc(var(--header-h)+3rem)] pb-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
          {dict.common.todayGoldRate}
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.05]">
          Gold Rate
        </h1>
        <p className="mt-4 text-charcoal/70">
          Indicative rates for reference. Final transaction prices are confirmed
          at the showroom.
        </p>

        <div className="mt-12 grid gap-6 border border-charcoal/10 bg-white p-8 md:grid-cols-2">
          <RateCard
            label="22K"
            value={
              showValues
                ? formatGoldRate(rate.karat22, rate.currency)
                : dict.common.contactForRate
            }
          />
          <RateCard
            label="24K"
            value={
              showValues
                ? formatGoldRate(rate.karat24, rate.currency)
                : dict.common.contactForRate
            }
          />
        </div>

        <dl className="mt-8 space-y-3 text-sm">
          <div className="flex justify-between border-b border-charcoal/10 py-3">
            <dt className="text-taupe">Unit</dt>
            <dd>{rate.unit}</dd>
          </div>
          <div className="flex justify-between border-b border-charcoal/10 py-3">
            <dt className="text-taupe">Currency</dt>
            <dd>{rate.currency}</dd>
          </div>
          <div className="flex justify-between border-b border-charcoal/10 py-3">
            <dt className="text-taupe">{dict.common.lastUpdated}</dt>
            <dd>
              {rate.updatedAt
                ? new Date(rate.updatedAt).toLocaleString("en-LK")
                : "—"}
            </dd>
          </div>
        </dl>

        <aside className="mt-10 border-l-2 border-champagne bg-cream/60 p-5 text-sm leading-relaxed text-charcoal/70">
          <p className="font-medium text-charcoal">Disclaimer</p>
          <p className="mt-2">
            Published rates are indicative and may change without notice. They
            do not constitute a guaranteed transaction price. Please contact
            Bullion Gold House for confirmed rates before purchase.
          </p>
          {rate.isDemo ? (
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-taupe">
              {dict.common.demoRate}
            </p>
          ) : null}
        </aside>

        <div className="mt-10">
          <Button href={localizedHref("/contact?type=gold-rate", locale)} variant="primary">
            Contact for Today&apos;s Rate
          </Button>
        </div>
      </div>
    </div>
  );
}

function RateCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-champagne">
        {label}
      </p>
      <p className="mt-3 font-serif text-3xl md:text-4xl">{value}</p>
    </div>
  );
}
