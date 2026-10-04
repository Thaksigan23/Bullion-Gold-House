import { Suspense } from "react";
import { notFound } from "next/navigation";
import { JewelleryListing } from "@/components/jewellery/JewelleryListing";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { products } from "@/data/products";
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
      "Discover the Bullion Gold House jewellery collection — necklaces, bangles, earrings, rings and more for weddings, celebrations and everyday moments.",
    path: "/jewellery",
    locale: raw,
  });
}

export default async function JewelleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; collection?: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const query = await searchParams;
  const listingKey = `${query.category ?? "all"}-${query.collection ?? ""}`;

  return (
    <div className="bg-ivory pt-[calc(var(--header-h)+3rem)] pb-24 md:pt-[calc(var(--header-h)+4.5rem)]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <FadeReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            Jewellery
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            Discover the Collection
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-charcoal/65 md:text-lg">
            Explore jewellery for weddings, celebrations, gifting and everyday
            moments.
          </p>
        </FadeReveal>

        <Suspense
          fallback={
            <p className="mt-16 text-sm text-taupe">Loading collection…</p>
          }
        >
          <JewelleryListing
            key={listingKey}
            products={products}
            dict={dict}
            locale={locale}
          />
        </Suspense>
      </div>
    </div>
  );
}
