import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
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

  return (
    <div className="bg-ivory pt-[calc(var(--header-h)+3rem)] pb-24">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            Contact
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.05]">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-md text-charcoal/70">
            Enquire about a piece, bridal jewellery, product availability, or
            today&apos;s gold rate.
          </p>

          <div className="mt-8 space-y-3 text-sm text-charcoal/75">
            {contact.address ? <p>{contact.address}</p> : null}
            {contact.hours ? <p>{contact.hours}</p> : null}
            {contact.email ? (
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-champagne"
                >
                  {contact.email}
                </a>
              </p>
            ) : null}
          </div>

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

        <div className="bg-white p-6 md:p-10">
          <ContactForm defaultType={type} productSlug={product} />
        </div>
      </div>
    </div>
  );
}
