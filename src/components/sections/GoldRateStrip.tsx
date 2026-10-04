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
      className="border-b border-charcoal/8 bg-cream"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-16 lg:py-20">
        {showValues ? (
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
                  {dict.common.todayGoldRate}
                </p>
                {showLive ? (
                  <span className="text-[10px] uppercase tracking-[0.18em] text-champagne">
                    Live
                  </span>
                ) : null}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16">
                <RateCell
                  label="22KT"
                  value={formatGoldRate(rate.karat22, rate.currency)}
                />
                <div className="sm:border-l sm:border-charcoal/10 sm:pl-16">
                  <RateCell
                    label="24KT"
                    value={formatGoldRate(rate.karat24, rate.currency)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:items-end lg:text-right">
              <div className="text-xs leading-relaxed text-taupe">
                {rate.updatedAt ? (
                  <p>
                    {dict.common.lastUpdated}{" "}
                    <span className="text-charcoal/70">
                      {new Date(rate.updatedAt).toLocaleString("en-LK")}
                    </span>
                  </p>
                ) : null}
                <p className={rate.updatedAt ? "mt-1" : undefined}>
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
        ) : (
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
                {dict.common.todayGoldRate}
              </p>
              <p className="mt-5 font-serif text-[clamp(1.65rem,3.2vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                Contact the showroom for today&apos;s gold rate.
              </p>
            </div>
            <LocaleLink
              href="/gold-rate"
              className="inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-champagne"
            >
              View Gold Rate
              <span aria-hidden className="text-champagne">
                →
              </span>
            </LocaleLink>
          </div>
        )}
      </div>
    </section>
  );
}

function RateCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.24em] text-champagne">
        {label}
      </p>
      <p className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.02em] text-charcoal">
        {value}
      </p>
    </div>
  );
}
