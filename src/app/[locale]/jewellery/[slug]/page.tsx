import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/jewellery/ProductGallery";
import { ProductCard } from "@/components/jewellery/ProductCard";
import { Button } from "@/components/ui/Button";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { siteConfig, DEMO_DISCLAIMER } from "@/config/site";
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
  const related = getRelatedProducts(product);
  const whatsapp = siteConfig.contact.whatsapp;

  return (
    <div className="bg-ivory pt-[calc(var(--header-h)+2rem)] pb-20">
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

      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <ProductGallery images={product.images} />

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-taupe">
            {product.category}
            {product.karat ? ` · ${product.karat}` : ""}
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05]">
            {product.name}
          </h1>
          <p className="mt-4 text-xl">{formatPrice(product.price, product.currency)}</p>
          <p className="mt-6 leading-relaxed text-charcoal/70">{product.description}</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-taupe/70">
            {DEMO_DISCLAIMER}
          </p>

          <dl className="mt-8 space-y-3 border-y border-charcoal/10 py-6 text-sm">
            <Row label={dict.product.category} value={product.category} />
            <Row label={dict.product.metal} value={product.metal} />
            {product.karat ? <Row label={dict.product.karat} value={product.karat} /> : null}
            {product.weight ? <Row label={dict.product.weight} value={product.weight} /> : null}
            {product.stones ? <Row label={dict.product.stones} value={product.stones} /> : null}
            <Row
              label={dict.product.availability}
              value={
                product.available ? dict.product.available : dict.product.unavailable
              }
            />
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
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

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-taupe">
                {dict.product.care}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                {dict.product.careBody}
              </p>
            </div>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-taupe">
                {dict.product.delivery}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                {dict.product.deliveryBody}
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length ? (
        <div className="mx-auto mt-20 max-w-[1440px] px-5 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl">{dict.product.related}</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 capitalize">
      <dt className="text-taupe">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
