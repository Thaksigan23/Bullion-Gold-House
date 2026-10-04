import Image from "next/image";
import Link from "next/link";
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
  const hasEmail = Boolean(contact.email);
  const hasHours = Boolean(contact.hours);
  const hasDetails = hasAddress || hasHours || hasPhone || hasEmail;

  return (
    <section className="bg-ivory">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[640px]">
          <Image
            src={showroomContent.image.src}
            alt={showroomContent.image.alt}
            fill
            className="object-cover"
            style={{
              objectPosition:
                showroomContent.image.objectPosition ?? "50% 30%",
            }}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>

        <div className="flex flex-col justify-center px-5 py-[clamp(4rem,9vw,7rem)] md:px-12 lg:px-16 xl:px-20">
          <p className="text-[11px] uppercase tracking-[0.32em] text-taupe">
            {showroomContent.eyebrow}
          </p>
          <h2 className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.02em] text-charcoal">
            {showroomContent.line1}
            <br />
            {showroomContent.line2}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/65">
            {showroomContent.supporting}
          </p>

          {hasDetails ? (
            <div className="mt-8 space-y-2 text-sm text-charcoal/65">
              {hasAddress ? <p>{contact.address}</p> : null}
              {hasHours ? <p>{contact.hours}</p> : null}
              {hasPhone ? (
                <p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="transition-colors hover:text-champagne"
                  >
                    {contact.phone}
                  </a>
                </p>
              ) : null}
              {hasEmail ? (
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-champagne"
                  >
                    {contact.email}
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-10">
            <Link
              href={localizedHref("/contact", locale)}
              className="inline-flex items-center gap-2 border border-charcoal bg-charcoal px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-near-black"
            >
              Contact
              <span aria-hidden>→</span>
            </Link>
            {hasPhone ? (
              <p className="mt-5">
                <a
                  href={`tel:${contact.phone}`}
                  className="text-[11px] uppercase tracking-[0.18em] text-charcoal/60 transition-colors hover:text-champagne"
                >
                  {dict.common.callUs}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
