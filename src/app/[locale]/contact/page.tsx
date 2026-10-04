import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { getDictionary, isLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return createMetadata({
    title: "Contact",
    description: `Contact ${siteConfig.name} for product, bridal jewellery, availability, or gold rate enquiries.`,
    path: "/contact",
    locale: raw,
  });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string; product?: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const { type, product } = await searchParams;
  const { contact } = siteConfig;
  const mapUrl = contact.mapUrl || contact.directionsUrl;
  const hasContactDetails = Boolean(
    contact.address ||
      contact.hours ||
      contact.email ||
      contact.phone ||
      contact.whatsapp,
  );

  return (
    <div className="bg-ivory pt-[calc(var(--header-h)+3rem)] pb-24 md:pt-[calc(var(--header-h)+4.5rem)]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <FadeReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            Let&apos;s Talk Jewellery.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/65 md:text-lg">
            Enquire about a piece, bridal jewellery, product availability, or
            today&apos;s gold rate.
          </p>
        </FadeReveal>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <FadeReveal delay={0.06}>
            <div>
              {hasContactDetails ? (
                <div className="space-y-3 text-sm leading-relaxed text-charcoal/75">
                  {contact.address ? <p>{contact.address}</p> : null}
                  {contact.hours ? <p>{contact.hours}</p> : null}
                  {contact.email ? (
                    <p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="transition-colors hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                      >
                        {contact.email}
                      </a>
                    </p>
                  ) : null}
                  {contact.phone ? (
                    <p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="transition-colors hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                      >
                        {contact.phone}
                      </a>
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                {contact.phone ? (
                  <Button href={`tel:${contact.phone}`} variant="outline">
                    {dict.common.callUs}
                  </Button>
                ) : null}
                {contact.whatsapp ? (
                  <Button
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                    variant="outline"
                  >
                    {dict.common.whatsappUs}
                  </Button>
                ) : null}
                {mapUrl ? (
                  <Button href={mapUrl} variant="primary">
                    {dict.common.getDirections}
                  </Button>
                ) : null}
              </div>

              <div className="relative mt-12 aspect-[4/5] overflow-hidden bg-cream md:max-w-md">
                <Image
                  src="/images/bridal/enquiry.jpg"
                  alt="Hands adorned with yellow-gold jewellery"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "50% 45%" }}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {contact.mapUrl ? (
                <div className="mt-10 overflow-hidden bg-cream">
                  <iframe
                    title="Bullion Gold House showroom map"
                    src={contact.mapUrl}
                    className="h-[220px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : null}
            </div>
          </FadeReveal>

          <FadeReveal delay={0.1}>
            <div className="border border-charcoal/10 bg-white/60 p-6 md:p-10 lg:p-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-taupe">
                Enquiry
              </p>
              <h2 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl">
                Send a message
              </h2>
              <div className="mt-8">
                <ContactForm defaultType={type} productSlug={product} />
              </div>
            </div>
          </FadeReveal>
        </div>
      </div>
    </div>
  );
}
