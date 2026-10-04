"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeReveal } from "@/components/motion/FadeReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function EditorialGallery() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  useGSAP(
    () => {
      if (!root.current || reduced || !isDesktop) return;
      const images = root.current.querySelectorAll(".gallery-img");
      images.forEach((img, i) => {
        gsap.to(img, {
          yPercent: i % 2 === 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { dependencies: [reduced, isDesktop] },
  );

  return (
    <section ref={root} className="section-pad bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <FadeReveal>
          <SectionHeading
            eyebrow="Gallery"
            title="The World of Bullion"
            description="A visual diary of jewellery, celebration, and craft."
          />
        </FadeReveal>

        <div className="mt-10 hidden gap-4 md:grid md:grid-cols-12">
          {galleryItems.map((item, i) => (
            <FadeReveal
              key={item.id}
              delay={i * 0.04}
              className={cn(
                "overflow-hidden",
                item.span === "tall" && "col-span-4 row-span-2 min-h-[520px]",
                item.span === "wide" && "col-span-8 min-h-[280px]",
                item.span === "square" && "col-span-4 min-h-[280px]",
              )}
            >
              <div className="relative h-full min-h-[inherit] overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="gallery-img object-cover"
                  sizes="40vw"
                />
              </div>
            </FadeReveal>
          ))}
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto no-scrollbar md:hidden">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative min-w-[78vw] aspect-[3/4] overflow-hidden bg-ivory"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                className="object-cover"
                sizes="78vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
