import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { showroomContent } from "@/data/content";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";

export function ShowroomCTA({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { contact } = siteConfig;
  const hasAddress = Boolean(contact.address);
  const hasPhone = Boolean(contact.phone);
  const hasWhatsapp = Boolean(contact.whatsapp);
  const hasEmail = Boolean(contact.email);
  const hasDirections = Boolean(contact.directionsUrl || contact.mapUrl);
  const hasHours = Boolean(contact.hours);
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]">
          <Image
            src={showroomContent.image.src}
            alt={showroomContent.image.alt}
            fill
            className="object-cover"
            style={{
              objectPosition:
                showroomContent.image.objectPosition ?? "50% 30%",
            }}
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
        </div>

        <div className="flex flex-col justify-center px-5 py-[clamp(3.5rem,8vw,6.5rem)] md:px-10 lg:px-14 xl:px-16">
          <p className="text-[11px] uppercase tracking-[0.32em] text-taupe">
            {showroomContent.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.02em] text-charcoal">
            {showroomContent.line1}
            <br />
            {showroomContent.line2}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/70 md:text-lg">
            {showroomContent.supporting}
          </p>

          {(hasAddress || hasHours || hasPhone || hasEmail) && (
            <div className="mt-8 space-y-2 text-sm text-charcoal/70">
              {hasAddress ? <p>{contact.address}</p> : null}
              {hasHours ? <p>{contact.hours}</p> : null}
              {hasPhone ? (
                <p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="transition-colors hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    {contact.phone}
                  </a>
                </p>
              ) : null}
              {hasEmail ? (
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    {contact.email}
                  </a>
                </p>
              ) : null}
            </div>
          )}

          <div className="mt-9 flex flex-wrap gap-3">
            {hasPhone ? (
              <Button href={`tel:${contact.phone}`} variant="primary" size="lg">
                {dict.common.callUs}
              </Button>
            ) : null}
            {hasWhatsapp ? (
              <Button
                href={`https://wa.me/${contact.whatsapp!.replace(/\D/g, "")}`}
                variant="outline"
                size="lg"
              >
                {dict.common.whatsappUs}
              </Button>
            ) : null}
            {hasEmail ? (
              <Button
                href={`mailto:${contact.email}`}
                variant="outline"
                size="lg"
              >
                Email
              </Button>
            ) : null}
            {hasDirections ? (
              <Button
                href={contact.directionsUrl || contact.mapUrl || undefined}
                variant="outline"
                size="lg"
              >
                {dict.common.getDirections}
              </Button>
            ) : null}
            <Button
              href={localizedHref("/contact", locale)}
              variant={
                hasPhone || hasWhatsapp || hasEmail || hasDirections
                  ? "outline"
                  : "primary"
              }
              size="lg"
            >
              Contact →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
