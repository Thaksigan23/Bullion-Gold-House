import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
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
    title: "About",
    description: `${siteConfig.name} presents jewellery for weddings, celebrations, gifting and everyday moments.`,
    path: "/about",
    locale: raw,
  });
}

const brandPillars = [
  {
    title: "Curated Jewellery",
    body: "A considered selection of pieces for weddings, celebrations, gifting and everyday wear.",
  },
  {
    title: "Personal Assistance",
    body: "Thoughtful guidance when choosing jewellery for an occasion that matters.",
  },
  {
    title: "Clear Information",
    body: "Product and gold-rate information presented clearly when available.",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div className="bg-ivory">
      <section className="pt-[calc(var(--header-h)+3rem)] pb-16 md:pt-[calc(var(--header-h)+5rem)] md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <FadeReveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
              About Bullion
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.02] tracking-[-0.03em] text-charcoal">
              Jewellery for
              <br />
              Meaningful Moments.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal/65">
              Bullion Gold House presents jewellery for weddings, celebrations,
              gifting and everyday moments.
            </p>
          </FadeReveal>
        </div>
      </section>

      <section className="relative min-h-[50vh] overflow-hidden md:min-h-[65vh]">
        <Image
          src="/images/hero/campaign-portrait.jpg"
          alt="Editorial portrait wearing fine gold jewellery"
          fill
          className="object-cover"
          style={{ objectPosition: "50% 28%" }}
          sizes="100vw"
          priority
        />
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <FadeReveal>
            <div className="max-w-2xl">
              <h2 className="font-serif text-[clamp(1.85rem,3.5vw,2.75rem)] text-charcoal">
                A thoughtful way to choose.
              </h2>
              <p className="mt-5 leading-relaxed text-charcoal/65">
                We believe jewellery should feel personal — shaped by occasion,
                culture, and the people we celebrate with. Beauty lives in
                restraint as much as in splendour.
              </p>
            </div>
          </FadeReveal>

          <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-12">
            {brandPillars.map((item, i) => (
              <FadeReveal key={item.title} delay={Math.min(i * 0.06, 0.18)}>
                <div className="border-t border-champagne/50 pt-5">
                  <h3 className="font-serif text-2xl text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                    {item.body}
                  </p>
                </div>
              </FadeReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
          <Image
            src="/images/showcase/signature-necklace.jpg"
            alt="Signature yellow-gold necklace detail"
            fill
            className="object-cover"
            style={{ objectPosition: "50% 40%" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="relative min-h-[420px] overflow-hidden bg-cream lg:min-h-[560px]">
          <Image
            src="/images/bridal/bridal-gold.jpg"
            alt="Layered bridal gold jewellery styling"
            fill
            className="object-cover"
            style={{ objectPosition: "50% 28%" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="bg-near-black section-pad text-ivory">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <FadeReveal>
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
                Visit Bullion
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)]">
                See the jewellery in person.
              </h2>
              <p className="mt-5 leading-relaxed text-ivory/70">
                Visit Bullion Gold House to experience pieces in person, or
                contact the showroom for product, availability and gold-rate
                enquiries.
              </p>
              {siteConfig.contact.address ? (
                <p className="mt-4 text-ivory/85">
                  {siteConfig.contact.address}
                </p>
              ) : null}
              <div className="mt-8">
                <Button
                  href={localizedHref("/contact", locale)}
                  variant="gold"
                  size="lg"
                >
                  Contact →
                </Button>
              </div>
            </div>
          </FadeReveal>
        </div>
      </section>
    </div>
  );
}
