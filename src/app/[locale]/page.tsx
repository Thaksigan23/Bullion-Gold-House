import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { GoldRateStrip } from "@/components/sections/GoldRateStrip";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { BridalSection } from "@/components/sections/BridalSection";
import { CelebrationsSection } from "@/components/sections/CelebrationsSection";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { BespokeSection } from "@/components/sections/BespokeSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { EditorialGallery } from "@/components/sections/EditorialGallery";
import { SocialSection } from "@/components/sections/SocialSection";
import { ShowroomCTA } from "@/components/sections/ShowroomCTA";
import { getGoldRate } from "@/lib/goldRate";
import { getDictionary, isLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import type { Locale } from "@/types";
import { notFound } from "next/navigation";

const JewelleryShowcase = dynamic(
  () =>
    import("@/components/sections/JewelleryShowcase").then(
      (m) => m.JewelleryShowcase,
    ),
  { ssr: true },
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return createMetadata({ locale: raw });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const rate = await getGoldRate();

  return (
    <>
      <Hero locale={locale} />
      <GoldRateStrip rate={rate} dict={dict} />
      <CollectionGrid />
      <NewArrivals locale={locale} />
      <JewelleryShowcase />
      <BridalSection locale={locale} />
      <CelebrationsSection />
      <Craftsmanship />
      <BespokeSection locale={locale} />
      <TrustSection />
      <EditorialGallery />
      <SocialSection dict={dict} />
      <ShowroomCTA locale={locale} dict={dict} />
    </>
  );
}
