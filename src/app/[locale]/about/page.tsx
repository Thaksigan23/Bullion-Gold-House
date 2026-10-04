import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return createMetadata({
    title: "About",
    description: `Learn about ${siteConfig.name} — a Sri Lankan jewellery house focused on meaningful celebrations and thoughtful craft.`,
    path: "/about",
    locale: raw,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <div className="bg-ivory">
      <section className="pt-[calc(var(--header-h)+3rem)] pb-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            About
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] tracking-[-0.03em]">
            Bullion Gold House
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal/70">
            A Sri Lankan jewellery house dedicated to pieces that become part of
            life&apos;s most meaningful celebrations — from everyday elegance to
            lifelong vows.
          </p>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px]">
          <Image
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1600&q=80"
            alt="Jewellery craftsmanship detail"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="flex items-center bg-cream px-5 py-16 md:px-12">
          <div className="max-w-md">
            <h2 className="font-serif text-3xl md:text-4xl">Philosophy</h2>
            <p className="mt-4 leading-relaxed text-charcoal/70">
              We believe jewellery should feel personal — shaped by occasion,
              culture, and the people we celebrate with. Beauty lives in
              restraint as much as in splendour.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-8 lg:grid-cols-3">
          {[
            {
              title: "Jewellery",
              body: "Collections spanning bridal, celebration, and everyday gold — curated for wearability and lasting meaning.",
            },
            {
              title: "Craftsmanship",
              body: "Attention to form, finish, and comfort — explored through the details that define each piece.",
            },
            {
              title: "Customer Experience",
              body: "Thoughtful guidance whether you are selecting a gift, preparing for a wedding, or exploring jewellery for everyday wear.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-champagne/60 pt-5">
              <h3 className="font-serif text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="craftsmanship" className="bg-near-black section-pad text-ivory">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:grid lg:grid-cols-2 lg:gap-16">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)]">
            Showroom
          </h2>
          <div>
            <p className="leading-relaxed text-ivory/70">
              Visit Bullion Gold House to experience pieces in person, or
              contact the showroom for product, availability and gold-rate
              enquiries.
            </p>
            {siteConfig.contact.address ? (
              <p className="mt-4 text-ivory/85">{siteConfig.contact.address}</p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
