"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/ui/LocaleLink";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

export function MegaMenu({
  item,
  open,
  onClose,
}: {
  item: NavItem;
  open: boolean;
  onClose: () => void;
}) {
  if (!item.children?.length) return null;

  const editorial =
    item.mega === "jewellery"
      ? {
          src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
          alt: "Editorial gold necklace",
          caption: "Signature Jewellery",
        }
      : {
          src: "https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?auto=format&fit=crop&w=900&q=80",
          alt: "Editorial bridal jewellery set",
          caption: "Wedding Collection",
        };

  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-full origin-top border-t border-charcoal/8 bg-ivory/95 shadow-[0_24px_60px_rgba(13,13,12,0.08)] backdrop-blur-xl transition-all duration-300",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      )}
      onMouseLeave={onClose}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-[1.4fr_0.8fr] gap-10 px-10 py-10">
        <ul className="grid grid-cols-3 gap-x-8 gap-y-3">
          {item.children.map((child) => (
            <li key={child.href}>
              <LocaleLink
                href={child.href}
                onClick={onClose}
                className="group flex items-center justify-between border-b border-transparent py-2.5 text-sm tracking-wide text-charcoal/80 transition-colors hover:border-champagne/40 hover:text-charcoal"
              >
                <span>{child.label}</span>
                <span className="translate-x-[-4px] text-champagne opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </LocaleLink>
            </li>
          ))}
        </ul>
        <LocaleLink
          href={item.href}
          onClick={onClose}
          data-cursor="Explore"
          className="relative block min-h-[220px] overflow-hidden"
        >
          <Image
            src={editorial.src}
            alt={editorial.alt}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-serif text-2xl text-ivory">
            {editorial.caption}
          </p>
        </LocaleLink>
      </div>
    </div>
  );
}
