import { Suspense } from "react";
import { notFound } from "next/navigation";
import { JewelleryListing } from "@/components/jewellery/JewelleryListing";
import { products } from "@/data/products";
import { DEMO_DISCLAIMER } from "@/config/site";
import { getDictionary, isLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import type { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return createMetadata({
    title: "Jewellery",
    description:
      "Browse gold jewellery collections at Bullion Gold House — necklaces, bangles, earrings, rings and more.",
    path: "/jewellery",
    locale: raw,
  });
}

export default async function JewelleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="bg-ivory pt-[calc(var(--header-h)+2rem)] pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
          Jewellery
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em]">
          Explore Our Collection
        </h1>
        <p className="mt-4 max-w-xl text-charcoal/70">
          Discover curated pieces for celebration and everyday elegance. Enquire
          for current availability and pricing.
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-taupe/70">
          {DEMO_DISCLAIMER}
        </p>

        <Suspense fallback={<p className="mt-10 text-taupe">Loading…</p>}>
          <JewelleryListing products={products} dict={dict} />
        </Suspense>
      </div>
    </div>
  );
}
