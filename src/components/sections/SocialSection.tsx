import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";

/** Hidden when no real social URLs are configured */
export function SocialSection({ dict }: { dict: Dictionary }) {
  const { social } = siteConfig;
  const links = [
    social.instagram && { label: "Instagram", href: social.instagram },
    social.facebook && { label: "Facebook", href: social.facebook },
    social.youtube && { label: "YouTube", href: social.youtube },
  ].filter(Boolean) as { label: string; href: string }[];

  if (!links.length) return null;

  return (
    <section className="border-y border-charcoal/10 bg-white py-16">
      <div className="mx-auto max-w-[1440px] px-5 text-center md:px-8">
        <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
          Social
        </p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">{dict.common.followUs}</h2>
        <div className="mt-6 flex justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm uppercase tracking-[0.18em] text-charcoal/70 transition-colors hover:text-champagne"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
