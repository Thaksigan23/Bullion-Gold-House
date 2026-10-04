import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/jewellery/ProductGallery";
import { ProductCard } from "@/components/jewellery/ProductCard";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { Button } from "@/components/ui/Button";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { categoryLabels, formatKarat } from "@/lib/productCategories";
import { getDictionary, isLocale, localizedHref } from "@/lib/i18n";
import { breadcrumbJsonLd, createMetadata, productJsonLd } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return products.flatMap((product) =>
    (["en", "si"] as const).map((locale) => ({
      locale,
      slug: product.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const product = getProductBySlug(slug);
  if (!product) return {};
  return createMetadata({
    title: product.name,
    description: product.description,
    path: `/jewellery/${product.slug}`,
    locale: raw,
    images: product.images.map((i) => i.src),
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const dict = getDictionary(locale);
  const related = getRelatedProducts(product, 4);
  const whatsapp = siteConfig.contact.whatsapp;
  const category = categoryLabels[product.category] ?? product.category;
  const karat = formatKarat(product.karat, product.metal);
  const hasPrice = product.price != null;
  const priceLabel = hasPrice
    ? formatPrice(product.price, product.currency)
    : "Price on enquiry";

  return (
    <div className="bg-ivory pt-[calc(var(--header-h)+1.5rem)] pb-24 md:pt-[calc(var(--header-h)+2.5rem)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            productJsonLd(product, locale),
            breadcrumbJsonLd(
              [
                { name: "Jewellery", path: "/jewellery" },
                { name: product.name, path: `/jewellery/${product.slug}` },
              ],
              locale,
            ),
          ]),
        }}
      />

      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-8 lg:grid-cols-[1.55fr_1fr] lg:items-start lg:gap-16 xl:gap-20">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <FadeReveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-taupe">
              {category}
            </p>
            <h1 className="mt-3 font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
              {product.name}
            </h1>

            {product.karat ? (
              <p className="mt-4 text-sm text-charcoal/65">{karat}</p>
            ) : null}

            <p className="mt-5 text-lg text-charcoal/85 md:text-xl">
              {priceLabel}
            </p>

            <p className="mt-6 max-w-md leading-relaxed text-charcoal/65">
              {product.description}
            </p>

            <dl className="mt-8 space-y-3 border-y border-charcoal/10 py-6 text-sm">
              <Row label={dict.product.category} value={category} />
              {product.karat ? (
                <Row label={dict.product.karat} value={product.karat} />
              ) : null}
              <Row
                label={dict.product.availability}
                value={
                  product.available
                    ? dict.product.available
                    : dict.product.unavailable
                }
              />
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={localizedHref(
                  `/contact?type=product&product=${product.slug}`,
                  locale,
                )}
                variant="primary"
                size="lg"
              >
                {dict.product.enquireCta}
              </Button>
              <Button
                href={localizedHref("/contact", locale)}
                variant="outline"
                size="lg"
              >
                Contact Showroom
              </Button>
              {whatsapp ? (
                <Button
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Enquiry about ${product.name}`)}`}
                  variant="outline"
                  size="lg"
                >
                  {dict.product.whatsapp}
                </Button>
              ) : null}
            </div>
          </FadeReveal>
        </div>
      </div>

      {related.length ? (
        <div className="mx-auto mt-20 max-w-[1440px] px-5 md:mt-28 md:px-8">
          <FadeReveal>
            <h2 className="font-serif text-[clamp(1.85rem,3.5vw,2.75rem)] text-charcoal">
              {dict.product.related}
            </h2>
          </FadeReveal>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
            {related.map((item, i) => (
              <FadeReveal key={item.id} delay={Math.min(i * 0.05, 0.15)}>
                <ProductCard product={item} />
              </FadeReveal>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-taupe">{label}</dt>
      <dd className="text-right text-charcoal/85">{value}</dd>
    </div>
  );
}
