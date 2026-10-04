import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { bridalCollections } from "@/data/collections";
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

export default async function BridalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div className="bg-ivory">
      <section className="relative min-h-[70svh] overflow-hidden bg-near-black text-ivory">
        <Image
          src="https://images.unsplash.com/photo-1769500805415-0f9485e70e5b?auto=format&fit=crop&w=2400&q=80"
          alt="Bridal jewellery editorial portrait"
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-near-black/30 to-near-black/20" />
        <div className="relative z-10 flex min-h-[70svh] items-end px-5 pb-16 pt-32 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-champagne">
              Bridal
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em]">
              For Every Beginning
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ivory/80">
              Jewellery for weddings and meaningful celebrations — honouring
              tradition and contemporary elegance across Sri Lanka&apos;s diverse
              communities.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)]">
            Bridal Collections
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {bridalCollections.map((item) => (
              <LocaleLink
                key={item.id}
                href={item.href}
                className="group relative min-h-[320px] overflow-hidden md:min-h-[400px]"
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-6 md:p-8">
                  <p className="font-serif text-3xl text-ivory">{item.name}</p>
                  <p className="mt-2 text-sm text-ivory/75">{item.description}</p>
                </div>
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream section-pad">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
              Inspiration
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)]">
              Bridal Inspiration
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-charcoal/70">
              From traditional bridal gold to contemporary wedding rings —
              explore pieces that feel personal to your celebration.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1762709414326-67c887a8dc98?auto=format&fit=crop&w=1400&q=80"
              alt="Wedding jewellery inspiration"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-charcoal section-pad text-ivory">
        <div className="mx-auto max-w-[1440px] px-5 text-center md:px-8">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)]">
            Book a Bridal Consultation
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ivory/70">
            Speak with our team about bridal selections, wedding rings, or a
            bespoke piece for your celebration.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href={localizedHref("/contact?type=bridal", locale)}
              variant="gold"
              size="lg"
            >
              Contact Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
