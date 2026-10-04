import { Button } from "@/components/ui/Button";
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
  const hasDirections = Boolean(contact.directionsUrl || contact.mapUrl);
  const hasPhone = Boolean(contact.phone);
  const hasWhatsapp = Boolean(contact.whatsapp);

  return (
    <section className="relative overflow-hidden bg-near-black text-ivory">
      <div className="editorial-grain absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 text-center md:px-8 md:py-32">
        <p className="text-[11px] uppercase tracking-[0.3em] text-champagne">
          Showroom
        </p>
        <h2 className="mt-4 font-serif text-[clamp(2.25rem,5vw,4rem)] tracking-[-0.02em]">
          {dict.common.visitShowroom}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ivory/70">
          Visit us to discover pieces in person, discuss bridal selections, or
          begin a bespoke enquiry.
        </p>
        {contact.address ? (
          <p className="mt-4 text-sm text-ivory/60">{contact.address}</p>
        ) : (
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ivory/40">
            Showroom details coming soon
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {hasDirections ? (
            <Button
              href={contact.directionsUrl || contact.mapUrl || "#"}
              variant="gold"
              size="lg"
            >
              {dict.common.getDirections}
            </Button>
          ) : null}
          {hasPhone ? (
            <Button href={`tel:${contact.phone}`} variant="secondary" size="lg">
              {dict.common.callUs}
            </Button>
          ) : null}
          {hasWhatsapp ? (
            <Button
              href={`https://wa.me/${contact.whatsapp!.replace(/\D/g, "")}`}
              variant="secondary"
              size="lg"
            >
              {dict.common.whatsappUs}
            </Button>
          ) : null}
          <Button
            href={localizedHref("/contact", locale)}
            variant={hasDirections || hasPhone || hasWhatsapp ? "secondary" : "gold"}
            size="lg"
          >
            {dict.nav.contact}
          </Button>
        </div>
      </div>
    </section>
  );
}
