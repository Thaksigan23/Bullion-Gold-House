import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { getDictionary, isLocale } from "@/lib/i18n";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "si" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div lang={locale} className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]),
        }}
      />
      <SmoothScroll>
        <CustomCursor />
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
      </SmoothScroll>
    </div>
  );
}
