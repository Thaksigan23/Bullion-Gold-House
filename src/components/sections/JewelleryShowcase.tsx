"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { showcaseContent } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Image-based cinematic showcase (no fake 3D / no Three.js).
 * data-future-model="glb-ready" — swap image for GLB later if desired.
 */
export function JewelleryShowcase() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  useGSAP(
    () => {
      if (!root.current || reduced || !isDesktop) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=110%",
            scrub: 1.25,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Quieter pin: image + type lead; motion stays restrained
        tl.fromTo(
          ".showcase-jewel",
          { scale: 0.96, y: 24 },
          { scale: 1.04, y: 0, ease: "none", duration: 1 },
          0,
        )
          .fromTo(
            ".showcase-glow",
            { opacity: 0.14, scale: 0.85 },
            { opacity: 0.28, scale: 1.02, ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            ".showcase-eyebrow",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, ease: "none", duration: 0.35 },
            0.05,
          )
          .fromTo(
            ".showcase-line",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.06, ease: "none", duration: 0.4 },
            0.25,
          )
          .fromTo(
            ".showcase-support",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, ease: "none", duration: 0.35 },
            0.45,
          )
          .fromTo(
            ".showcase-label",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.05, ease: "none", duration: 0.3 },
            0.55,
          )
          .fromTo(
            ".showcase-cta",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, ease: "none", duration: 0.3 },
            0.7,
          );

        ScrollTrigger.refresh();
      }, root);

      return () => ctx.revert();
    },
    { dependencies: [reduced, isDesktop] },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-near-black text-ivory"
      data-showcase="image"
      data-future-model="glb-ready"
      aria-label="Bullion jewellery showcase"
    >
      {/* Soft radial warmth + vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 58% 48%, rgba(180,154,99,0.1), transparent 62%), radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(13,13,12,0.75) 100%)",
        }}
      />

      {/* Desktop pinned viewport */}
      <div className="relative hidden min-h-[100svh] lg:block">
        <div className="mx-auto grid h-[100svh] max-w-[1440px] grid-cols-[0.9fr_1.1fr] items-center gap-10 px-10 xl:px-16">
          <div className="relative z-10 max-w-md">
            <p
              className={cn(
                "showcase-eyebrow text-[11px] uppercase tracking-[0.32em] text-champagne",
                !reduced && "opacity-0",
              )}
            >
              {showcaseContent.eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-[clamp(2.75rem,4.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
              <span className="block overflow-hidden">
                <span
                  className={cn(
                    "showcase-line inline-block",
                    !reduced && "opacity-0",
                  )}
                >
                  {showcaseContent.line1}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={cn(
                    "showcase-line inline-block",
                    !reduced && "opacity-0",
                  )}
                >
                  {showcaseContent.line2}
                </span>
              </span>
            </h2>
            <p
              className={cn(
                "showcase-support mt-6 max-w-sm text-base leading-relaxed text-ivory/65",
                !reduced && "opacity-0",
              )}
            >
              {showcaseContent.supporting}
            </p>
            <LocaleLink
              href={showcaseContent.cta.href}
              className={cn(
                "showcase-cta mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors hover:text-champagne",
                !reduced && "opacity-0",
              )}
            >
              {showcaseContent.cta.label}
              <span aria-hidden className="text-champagne">
                →
              </span>
            </LocaleLink>
          </div>

          <div className="relative flex h-full items-center justify-center">
            <div
              aria-hidden
              className="showcase-glow absolute h-[min(52vw,520px)] w-[min(52vw,520px)] rounded-full bg-[radial-gradient(circle,rgba(180,154,99,0.2),transparent_70%)] blur-2xl"
            />

            {/* Soft-masked photo — edges dissolve into near-black stage */}
            <div className="showcase-jewel relative z-10 aspect-square w-[min(48vw,540px)]">
              <div
                className="absolute inset-0 overflow-hidden bg-[#0d0d0c]"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 68% 68% at 50% 48%, #000 38%, rgba(0,0,0,0.92) 52%, rgba(0,0,0,0.35) 64%, transparent 74%)",
                  maskImage:
                    "radial-gradient(ellipse 68% 68% at 50% 48%, #000 38%, rgba(0,0,0,0.92) 52%, rgba(0,0,0,0.35) 64%, transparent 74%)",
                }}
              >
                <Image
                  src={showcaseContent.image.src}
                  alt={showcaseContent.image.alt}
                  fill
                  className="object-contain scale-[1.18]"
                  style={{
                    objectPosition:
                      showcaseContent.image.objectPosition ?? "50% 45%",
                  }}
                  sizes="540px"
                  priority={false}
                />
                {/* Feathered vignette — softens canvas edge, not the jewel */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 52% 52% at 50% 48%, transparent 40%, rgba(13,13,12,0.45) 62%, rgba(13,13,12,0.92) 82%, #0d0d0c 100%)",
                  }}
                />
              </div>
            </div>

            <ul className="pointer-events-none absolute inset-0 z-20">
              {showcaseContent.labels.map((label, i) => (
                <li
                  key={label}
                  className={cn(
                    "showcase-label absolute text-[10px] uppercase tracking-[0.28em] text-ivory/55",
                    !reduced && "opacity-0",
                    i === 0 && "left-[8%] top-[22%]",
                    i === 1 && "right-[10%] top-[38%]",
                    i === 2 && "bottom-[24%] left-[18%]",
                  )}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile — simple flow, no long pin */}
      <div className="relative px-5 py-20 md:px-8 md:py-24 lg:hidden">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-champagne">
            {showcaseContent.eyebrow}
          </p>
          <div
            className="relative mt-10 aspect-square w-[min(82vw,360px)]"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 74% 74% at 50% 48%, #000 40%, rgba(0,0,0,0.8) 60%, transparent 80%)",
              maskImage:
                "radial-gradient(ellipse 74% 74% at 50% 48%, #000 40%, rgba(0,0,0,0.8) 60%, transparent 80%)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 scale-110 rounded-full bg-[radial-gradient(circle,rgba(180,154,99,0.18),transparent_70%)] blur-xl"
            />
            <div className="absolute inset-[5%] overflow-hidden bg-near-black">
              <Image
                src={showcaseContent.image.src}
                alt={showcaseContent.image.alt}
                fill
                className="object-contain scale-[1.1]"
                sizes="360px"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 48%, transparent 48%, rgba(13,13,12,0.9) 100%)",
                }}
              />
            </div>
          </div>
          <h2 className="mt-10 font-serif text-[clamp(2.25rem,8vw,3.25rem)] leading-[0.98] tracking-[-0.03em]">
            {showcaseContent.line1}
            <br />
            {showcaseContent.line2}
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ivory/65">
            {showcaseContent.supporting}
          </p>
          <LocaleLink
            href={showcaseContent.cta.href}
            className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ivory hover:text-champagne"
          >
            {showcaseContent.cta.label}
            <span aria-hidden className="text-champagne">
              →
            </span>
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
