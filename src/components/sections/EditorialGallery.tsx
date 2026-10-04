"use client";

import Image from "next/image";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { galleryItems } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Editorial gallery — TEMPORARY local assets.
 * Replace with official Bullion campaign photography before launch.
 */
export function EditorialGallery() {
  return (
    <section className="bg-cream px-5 py-[clamp(4rem,9vw,7.5rem)] md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <FadeReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            Gallery
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            The Bullion Edit
          </h2>
        </FadeReveal>

        {/* Desktop asymmetric editorial grid */}
        <div className="mt-12 hidden auto-rows-[180px] grid-cols-12 gap-3 md:grid lg:auto-rows-[220px] lg:gap-4">
          {galleryItems.map((item, i) => (
            <FadeReveal
              key={item.id}
              delay={i * 0.05}
              className={cn(
                "group relative overflow-hidden bg-ivory",
                item.span === "tall" && "col-span-4 row-span-2",
                item.span === "wide" && "col-span-8 row-span-1",
                item.span === "square" && "col-span-4 row-span-1",
              )}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                className="object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.035]"
                style={{
                  objectPosition: item.image.objectPosition ?? "50% 50%",
                }}
                sizes="(max-width: 1280px) 40vw, 33vw"
              />
              <span className="pointer-events-none absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-90">
                View
              </span>
            </FadeReveal>
          ))}
        </div>

        {/* Mobile stacked asymmetric rhythm */}
        <div className="mt-10 grid grid-cols-2 gap-2 md:hidden">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                "relative overflow-hidden bg-ivory",
                i === 0 || i === 4 ? "col-span-2 aspect-[4/5]" : "aspect-square",
                i === 2 && "col-span-2 aspect-[16/9]",
              )}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                className="object-cover"
                style={{
                  objectPosition: item.image.objectPosition ?? "50% 50%",
                }}
                sizes="90vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
