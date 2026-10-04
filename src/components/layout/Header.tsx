"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Heart, Menu, MessageCircle, Search, ShoppingBag } from "lucide-react";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { SearchOverlay } from "@/components/navigation/SearchOverlay";
import { leftNavigation, rightNavigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";
import type { Locale, NavItem } from "@/types";
import { cn } from "@/lib/utils";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mega, setMega] = useState<NavItem | null>(null);
  const [megaPathname, setMegaPathname] = useState(pathname);

  // Close mega menu on route change so it never overlays page intros
  if (pathname !== megaPathname) {
    setMegaPathname(pathname);
    if (mega) setMega(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !isHome || scrolled || mobileOpen || Boolean(mega);
  const whatsapp = siteConfig.contact.whatsapp;
  const linkTone = solid
    ? "text-charcoal/75 hover:text-charcoal"
    : "text-ivory/85 hover:text-ivory";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b border-charcoal/10 bg-ivory/85 text-charcoal backdrop-blur-xl"
            : "bg-transparent text-ivory",
        )}
      >
        <div className="mx-auto grid h-[var(--header-h)] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-x-4 px-4 md:px-6 xl:px-10">
          {/* LEFT */}
          <div className="flex min-w-0 items-center justify-start">
            <button
              type="button"
              className="p-2 lg:hidden"
              aria-label={dict.nav.menu}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <nav className="hidden items-center lg:flex" aria-label="Primary left">
              {leftNavigation.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "relative",
                    item.label === "New Arrivals" && "hidden xl:block",
                  )}
                  onMouseEnter={() =>
                    item.mega ? setMega(item) : setMega(null)
                  }
                >
                  <LocaleLink
                    href={item.href}
                    onClick={() => setMega(null)}
                    className={cn(
                      "inline-block whitespace-nowrap px-2.5 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors xl:px-3 xl:tracking-[0.18em]",
                      linkTone,
                    )}
                    aria-expanded={
                      item.mega ? mega?.label === item.label : undefined
                    }
                    aria-haspopup={item.mega ? "true" : undefined}
                  >
                    {item.label}
                  </LocaleLink>
                </div>
              ))}
            </nav>
          </div>

          {/* CENTER — true viewport-centered brand via grid auto column */}
          <LocaleLink
            href="/"
            className="shrink-0 px-3 text-center sm:px-6"
            aria-label="Bullion Gold House"
          >
            <span className="block font-serif text-[1.05rem] tracking-[0.28em] sm:text-[1.15rem] sm:tracking-[0.3em]">
              BULLION
            </span>
            <span className="mt-0.5 block text-[8px] uppercase tracking-[0.48em] opacity-75 sm:text-[9px] sm:tracking-[0.52em]">
              Gold House
            </span>
          </LocaleLink>

          {/* RIGHT */}
          <div className="flex min-w-0 items-center justify-end gap-0.5 md:gap-1">
            <nav
              className="mr-1 hidden items-center lg:flex xl:mr-2"
              aria-label="Primary right"
            >
              {rightNavigation.map((item) => (
                <LocaleLink
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap px-2 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors xl:px-2.5 xl:tracking-[0.18em]",
                    item.label === "Gold Rate" && "hidden xl:inline-block",
                    linkTone,
                  )}
                  onMouseEnter={() => setMega(null)}
                >
                  {item.label}
                </LocaleLink>
              ))}
            </nav>

            <button
              type="button"
              className="p-2"
              aria-label={dict.nav.search}
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="hidden p-2 sm:inline-flex"
              aria-label={dict.nav.wishlist}
            >
              <Heart className="h-4 w-4" />
            </button>
            {whatsapp ? (
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="p-2"
                aria-label={dict.nav.whatsapp}
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            ) : null}
            {siteConfig.commerceEnabled ? (
              <button type="button" className="p-2" aria-label={dict.nav.bag}>
                <ShoppingBag className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        {mega?.mega ? (
          <MegaMenu
            item={mega}
            open={Boolean(mega)}
            onClose={() => setMega(null)}
          />
        ) : null}
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        dict={dict}
      />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        dict={dict}
      />
    </>
  );
}
