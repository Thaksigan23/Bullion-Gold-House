import { LocaleLink } from "@/components/ui/LocaleLink";
import { footerNavigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/types";

export function Footer({ dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const { contact, social } = siteConfig;
  const hasSocial = Boolean(social.instagram || social.facebook || social.youtube);

  return (
    <footer className="border-t border-charcoal/10 bg-near-black text-ivory">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] tracking-[0.12em]">
              BULLION
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-champagne">
              Gold House
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65">
              {siteConfig.description}
            </p>
            {(contact.phone || contact.email || contact.address) && (
              <div className="mt-6 space-y-1 text-sm text-ivory/70">
                {contact.address ? <p>{contact.address}</p> : null}
                {contact.phone ? (
                  <p>
                    <a href={`tel:${contact.phone}`} className="hover:text-champagne">
                      {contact.phone}
                    </a>
                  </p>
                ) : null}
                {contact.email ? (
                  <p>
                    <a href={`mailto:${contact.email}`} className="hover:text-champagne">
                      {contact.email}
                    </a>
                  </p>
                ) : null}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {(
              [
                ["Jewellery", footerNavigation.jewellery],
                ["Collections", footerNavigation.collections],
                ["Customer Care", footerNavigation.customerCare],
                ["About", footerNavigation.about],
              ] as const
            ).map(([title, links]) => (
              <div key={title}>
                <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-champagne">
                  {title}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href + link.label}>
                      <LocaleLink
                        href={link.href}
                        className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                      >
                        {link.label}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ivory/45">
            © {year} {siteConfig.name}. {dict.common.allRights}
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
            {hasSocial ? (
              <>
                {social.instagram ? (
                  <a href={social.instagram} target="_blank" rel="noreferrer" className="hover:text-ivory">
                    Instagram
                  </a>
                ) : null}
                {social.facebook ? (
                  <a href={social.facebook} target="_blank" rel="noreferrer" className="hover:text-ivory">
                    Facebook
                  </a>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
