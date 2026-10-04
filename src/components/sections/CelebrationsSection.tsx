"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { celebrations } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Occasions — calm editorial presentation (not an animation demo) */
export function CelebrationsSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current || reduced) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".cele-reveal",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 80%",
            },
          },
        );
      }, root);

      return () => ctx.revert();
    },
    { dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="bg-ivory px-5 pb-[clamp(4.5rem,11vw,8.5rem)] pt-[clamp(4rem,9vw,7rem)] md:px-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="max-w-xl">
          <p
            className={cn(
              "cele-reveal text-[11px] uppercase tracking-[0.28em] text-taupe",
              !reduced && "opacity-0",
            )}
          >
            Occasions
          </p>
          <h2
            className={cn(
              "cele-reveal mt-4 font-serif text-[clamp(2.15rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-charcoal",
              !reduced && "opacity-0",
            )}
          >
            Jewellery for
            <br />
            Every Celebration
          </h2>
          <p
            className={cn(
              "cele-reveal mt-4 max-w-md text-sm leading-relaxed text-charcoal/60 md:text-base",
              !reduced && "opacity-0",
            )}
          >
            From life&apos;s biggest beginnings to the moments worth remembering.
          </p>
        </header>

        {/* Desktop — quiet editorial row */}
        <div className="cele-reveal mt-12 hidden grid-cols-4 gap-2 lg:grid lg:mt-16">
          {celebrations.map((item) => (
            <LocaleLink
              key={item.id}
              href={item.href}
              className="group relative block min-h-[480px] overflow-hidden bg-cream xl:min-h-[540px]"
            >
              <div data-cursor="Explore" className="absolute inset-0">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
                  style={{
                    objectPosition: item.image.objectPosition ?? "50% 50%",
                  }}
                  sizes="25vw"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-near-black/72 via-near-black/10 to-transparent"
              />
              <div
                data-cursor-ignore
                className="absolute inset-x-0 bottom-0 p-6"
              >
                <p className="font-serif text-2xl text-ivory xl:text-[1.75rem]">
                  {item.title}
                </p>
                <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-ivory/0 transition-opacity duration-500 group-hover:text-ivory/75">
                  {item.description}
                </p>
              </div>
            </LocaleLink>
          ))}
        </div>

        {/* Mobile / tablet — native horizontal swipe */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:hidden">
          {celebrations.map((item) => (
            <LocaleLink
              key={item.id}
              href={item.href}
              className="group relative min-w-[78vw] overflow-hidden bg-cream sm:min-w-[46vw]"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{
                    objectPosition: item.image.objectPosition ?? "50% 50%",
                  }}
                  sizes="80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/72 via-near-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif text-2xl text-ivory">{item.title}</p>
                  <p className="mt-1.5 text-sm text-ivory/75">{item.description}</p>
                </div>
              </div>
            </LocaleLink>
          ))}
        </div>
      </div>
    </section>
  );
}
