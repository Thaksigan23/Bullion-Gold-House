"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { celebrations } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function CelebrationsSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!root.current || reduced) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".cele-reveal",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
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
      className="bg-ivory px-5 pb-[clamp(4.5rem,12vw,9rem)] pt-[clamp(4rem,9vw,7rem)] md:px-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="max-w-2xl">
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
              "cele-reveal mt-3 font-serif text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-charcoal",
              !reduced && "opacity-0",
            )}
          >
            Jewellery for
            <br />
            Every Celebration
          </h2>
          <p
            className={cn(
              "cele-reveal mt-4 max-w-md text-base leading-relaxed text-charcoal/65 md:text-lg",
              !reduced && "opacity-0",
            )}
          >
            From life&apos;s biggest beginnings to the moments worth remembering.
          </p>
        </header>

        {/* Desktop editorial strip — expand on hover/focus, no scroll-jacking */}
        <div
          className="cele-reveal mt-12 hidden h-[520px] gap-2 lg:flex"
          role="list"
        >
          {celebrations.map((item, index) => {
            const isActive = active === index;
            return (
              <LocaleLink
                key={item.id}
                href={item.href}
                role="listitem"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={cn(
                  "group relative block min-w-0 overflow-hidden bg-cream transition-[flex] duration-500 ease-out",
                  isActive ? "flex-[2.4]" : "flex-[1]",
                )}
              >
                {/* Cursor only on image plane — never over title/copy/CTA */}
                <div data-cursor="Explore" className="absolute inset-0">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-[650ms] ease-out",
                      isActive ? "scale-[1.04]" : "scale-100",
                    )}
                    style={{
                      objectPosition: item.image.objectPosition ?? "50% 50%",
                    }}
                    sizes="(max-width: 1280px) 25vw, 20vw"
                  />
                </div>
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 transition-colors duration-500",
                    isActive
                      ? "bg-gradient-to-t from-near-black/78 via-near-black/15 to-transparent"
                      : "bg-near-black/40",
                  )}
                />
                <div
                  data-cursor-ignore
                  className="absolute inset-x-0 bottom-0 p-5 xl:p-6"
                >
                  <p
                    className={cn(
                      "font-serif text-ivory transition-all duration-500",
                      isActive ? "text-3xl" : "text-xl",
                    )}
                  >
                    {item.title}
                  </p>
                  <p
                    className={cn(
                      "mt-2 max-w-[16rem] text-sm leading-relaxed text-ivory/75 transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {item.description}
                  </p>
                  <p
                    className={cn(
                      "mt-3 text-[11px] uppercase tracking-[0.18em] text-ivory/85 transition-all duration-500",
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0",
                    )}
                  >
                    Explore →
                  </p>
                </div>
              </LocaleLink>
            );
          })}
        </div>

        {/* Mobile / tablet — native horizontal swipe */}
        <div className="mt-10 flex gap-3 overflow-x-auto pb-2 no-scrollbar lg:hidden">
          {celebrations.map((item) => (
            <LocaleLink
              key={item.id}
              href={item.href}
              className="group relative min-w-[78vw] overflow-hidden bg-cream sm:min-w-[48vw]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/75 via-near-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif text-2xl text-ivory">{item.title}</p>
                  <p className="mt-1 text-sm text-ivory/75">{item.description}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ivory/80">
                    Explore →
                  </p>
                </div>
              </div>
            </LocaleLink>
          ))}
        </div>
      </div>
    </section>
  );
}
