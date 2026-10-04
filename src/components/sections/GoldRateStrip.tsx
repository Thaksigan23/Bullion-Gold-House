import { LocaleLink } from "@/components/ui/LocaleLink";
import type { Dictionary } from "@/lib/i18n";
import { formatGoldRate } from "@/lib/utils";
import type { GoldRate } from "@/types";

export function GoldRateStrip({
  rate,
  dict,
}: {
  rate: GoldRate;
  dict: Dictionary;
}) {
  const showValues = rate.karat22 != null || rate.karat24 != null;
  const showLive = showValues && !rate.isDemo && Boolean(rate.updatedAt);

  return (
    <section
      aria-label={dict.common.todayGoldRate}
      className="relative border-b border-charcoal/8 bg-cream"
    >
      {/* Soft bridge from dark hero into warm cream */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-near-black/10 to-transparent"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-10 md:px-8 md:py-12 lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
                {dict.common.todayGoldRate}
              </p>
              {showLive ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-champagne">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-champagne"
                    aria-hidden
                  />
                  Live
                </span>
              ) : null}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:gap-16">
              <RateCell
                label="22KT Gold"
                value={
                  showValues
                    ? formatGoldRate(rate.karat22, rate.currency)
                    : dict.common.contactForRate
                }
              />
              <div className="sm:border-l sm:border-charcoal/10 sm:pl-12 lg:pl-16">
                <RateCell
                  label="24KT Gold"
                  value={
                    showValues
                      ? formatGoldRate(rate.karat24, rate.currency)
                      : dict.common.contactForRate
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-end lg:text-right">
            <div className="text-xs leading-relaxed text-taupe">
              <p>
                {dict.common.lastUpdated}{" "}
                <span className="text-charcoal/70">
                  {rate.updatedAt
                    ? new Date(rate.updatedAt).toLocaleString("en-LK")
                    : "—"}
                </span>
              </p>
              <p className="mt-1">
                {rate.currency} / {rate.unit}
              </p>
              {rate.isDemo ? (
                <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-taupe/70">
                  {dict.common.demoRate}
                </p>
              ) : null}
            </div>

            <LocaleLink
              href="/gold-rate"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-champagne"
            >
              View Gold Rate
              <span aria-hidden className="text-champagne">
                →
              </span>
            </LocaleLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function RateCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-champagne">
        {label}
      </p>
      <p className="mt-3 font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight tracking-[-0.02em] text-charcoal">
        {value}
      </p>
    </div>
  );
}
