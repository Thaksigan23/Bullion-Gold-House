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
    <section className="bg-cream px-5 py-[clamp(4.5rem,10vw,8rem)] md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <FadeReveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
            Gallery
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.15rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            The Bullion Edit
          </h2>
        </FadeReveal>

        <div className="mt-12 hidden auto-rows-[200px] grid-cols-12 gap-2 md:grid lg:mt-16 lg:auto-rows-[240px] lg:gap-3">
          {galleryItems.map((item, i) => (
            <FadeReveal
              key={item.id}
              delay={i * 0.04}
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
                className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
                style={{
                  objectPosition: item.image.objectPosition ?? "50% 50%",
                }}
                sizes="(max-width: 1280px) 40vw, 33vw"
              />
            </FadeReveal>
          ))}
        </div>

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
