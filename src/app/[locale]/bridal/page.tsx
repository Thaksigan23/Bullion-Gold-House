import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/jewellery/ProductCard";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { Button } from "@/components/ui/Button";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { bridalCollections, bridalHero } from "@/data/collections";
import { products } from "@/data/products";
import { isBridalProduct } from "@/lib/productCategories";
import { isLocale, localizedHref } from "@/lib/i18n";
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
    title: "Bridal Jewellery",
    description:
      "Bridal and wedding jewellery for meaningful beginnings — inclusive of Sri Lanka's diverse celebrations.",
    path: "/bridal",
    locale: raw,
  });
}

const bridalCategorySlugs = new Set([
  "bridal-gold",
  "wedding-jewellery",
  "wedding-rings",
]);

export default async function BridalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const categories = bridalCollections.filter((item) =>
    bridalCategorySlugs.has(item.slug),
  );
  const related = products.filter(isBridalProduct).slice(0, 4);

  return (
    <div className="bg-ivory">
      <section className="relative min-h-[72svh] overflow-hidden bg-near-black text-ivory md:min-h-[78svh]">
        <Image
          src={bridalHero.image.src}
          alt={bridalHero.image.alt}
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: bridalHero.image.objectPosition ?? "62% 28%",
          }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/75 via-near-black/20 to-transparent" />
        <div className="relative z-10 flex min-h-[72svh] items-end px-5 pb-14 pt-32 md:min-h-[78svh] md:px-10 md:pb-20 lg:px-16">
          <FadeReveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-champagne">
              {bridalHero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em]">
              {bridalHero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg">
              Jewellery for weddings, celebrations and the moments that begin a
              new chapter.
            </p>
          </FadeReveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <FadeReveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
              Introduction
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
              Pieces chosen for the moments that begin a lifetime.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/65">
              From traditional bridal gold to contemporary wedding rings —
              explore jewellery that feels personal to your celebration.
            </p>
          </FadeReveal>
        </div>
      </section>

      <section className="pb-[clamp(4rem,10vw,7rem)]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <FadeReveal>
            <h2 className="font-serif text-[clamp(1.85rem,3.5vw,2.75rem)] text-charcoal">
              Bridal Jewellery
            </h2>
          </FadeReveal>
          <div className="mt-10 grid gap-3 md:grid-cols-3 md:gap-4">
            {categories.map((item, i) => (
              <FadeReveal key={item.id} delay={Math.min(i * 0.06, 0.18)}>
                <LocaleLink
                  href={item.href}
                  className="group relative block min-h-[360px] overflow-hidden md:min-h-[480px]"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{
                      objectPosition: item.image.objectPosition ?? "50% 50%",
                    }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-near-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="font-serif text-2xl text-ivory md:text-3xl">
                      {item.name}
                    </p>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-ivory/75">
                      {item.description}
                    </p>
                  </div>
                </LocaleLink>
              </FadeReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]">
            <Image
              src="/images/bridal/wedding-jewellery.jpg"
              alt="Close-up of bridal gold jewellery"
              fill
              className="object-cover"
              style={{ objectPosition: "50% 35%" }}
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-[clamp(3.5rem,8vw,6.5rem)] md:px-12 lg:px-16">
            <FadeReveal>
              <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
                Editorial
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
                Warm gold for every beginning.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-charcoal/65">
                Celebrate with jewellery that honours tradition and contemporary
                elegance — one Bullion brand for every community.
              </p>
            </FadeReveal>
          </div>
        </div>
      </section>

      <section className="bg-charcoal section-pad text-ivory">
        <div className="mx-auto max-w-[1440px] px-5 text-center md:px-8">
          <FadeReveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Bridal Enquiry
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)]">
              Speak with the showroom
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ivory/70">
              Speak with the showroom about jewellery for your wedding
              celebration.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                href={localizedHref("/contact?type=bridal", locale)}
                variant="gold"
                size="lg"
              >
                Bridal Enquiry
              </Button>
            </div>
          </FadeReveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section-pad">
          <div className="mx-auto max-w-[1440px] px-5 md:px-8">
            <FadeReveal>
              <h2 className="font-serif text-[clamp(1.85rem,3.5vw,2.75rem)] text-charcoal">
                Related Jewellery
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
        </section>
      ) : null}
    </div>
  );
}
