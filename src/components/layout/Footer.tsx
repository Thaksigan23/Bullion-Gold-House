import Link from "next/link";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { footerNavigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  const { contact, social } = siteConfig;
  const hasSocial = Boolean(
    social.instagram || social.facebook || social.youtube,
  );
  const hasContact = Boolean(
    contact.address || contact.phone || contact.email,
  );

  return (
    <footer className="bg-near-black text-ivory">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-16">
          <div>
            <p className="font-serif text-[clamp(2rem,3.5vw,3rem)] tracking-[0.14em]">
              BULLION
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.38em] text-champagne">
              Gold House
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65">
              Jewellery for life&apos;s meaningful moments.
            </p>
          </div>

          <div
            className={
              hasContact || hasSocial
                ? "grid grid-cols-2 gap-8 sm:grid-cols-4"
                : "grid grid-cols-2 gap-8 sm:grid-cols-3"
            }
          >
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-champagne">
                Explore
              </p>
              <ul className="space-y-2.5">
                {footerNavigation.explore.map((link) => (
                  <li key={link.href + link.label}>
                    <LocaleLink
                      href={link.href}
                      className="text-sm text-ivory/65 transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    >
                      {link.label}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-champagne">
                Company
              </p>
              <ul className="space-y-2.5">
                {footerNavigation.company.map((link) => (
                  <li key={link.href + link.label}>
                    <LocaleLink
                      href={link.href}
                      className="text-sm text-ivory/65 transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    >
                      {link.label}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>

            {hasContact || hasSocial ? (
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-champagne">
                  Contact
                </p>
                {hasContact ? (
                  <ul className="space-y-2.5 text-sm text-ivory/65">
                    {contact.address ? <li>{contact.address}</li> : null}
                    {contact.phone ? (
                      <li>
                        <a
                          href={`tel:${contact.phone}`}
                          className="transition-colors hover:text-ivory"
                        >
                          {contact.phone}
                        </a>
                      </li>
                    ) : null}
                    {contact.email ? (
                      <li>
                        <a
                          href={`mailto:${contact.email}`}
                          className="transition-colors hover:text-ivory"
                        >
                          {contact.email}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
                {hasSocial ? (
                  <ul className={hasContact ? "mt-4 space-y-2.5" : "space-y-2.5"}>
                    {social.instagram ? (
                      <li>
                        <a
                          href={social.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                        >
                          Instagram
                        </a>
                      </li>
                    ) : null}
                    {social.facebook ? (
                      <li>
                        <a
                          href={social.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                        >
                          Facebook
                        </a>
                      </li>
                    ) : null}
                    {social.youtube ? (
                      <li>
                        <a
                          href={social.youtube}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                        >
                          YouTube
                        </a>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            ) : null}

            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-champagne">
                {dict.common.language}
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/en"
                    hrefLang="en"
                    className={
                      locale === "en"
                        ? "text-sm text-champagne"
                        : "text-sm text-ivory/65 transition-colors hover:text-ivory"
                    }
                  >
                    English
                  </Link>
                </li>
                <li>
                  <Link
                    href="/si"
                    hrefLang="si"
                    className={
                      locale === "si"
                        ? "text-sm text-champagne"
                        : "text-sm text-ivory/65 transition-colors hover:text-ivory"
                    }
                  >
                    සිංහල
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ivory/45">
            © {year} {siteConfig.name}.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-ivory/55">
            <LocaleLink href="/contact" className="hover:text-ivory">
              {dict.common.privacy}
            </LocaleLink>
            <LocaleLink href="/contact" className="hover:text-ivory">
              {dict.common.terms}
            </LocaleLink>
            <LocaleLink href="/contact" className="hover:text-ivory">
              {dict.common.returns}
            </LocaleLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
