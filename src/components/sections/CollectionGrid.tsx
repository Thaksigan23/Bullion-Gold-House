"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { shopCollections } from "@/data/collections";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const bySlug = (slug: string) =>
  shopCollections.find((c) => c.slug === slug) as Collection;

export function CollectionGrid() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current || reduced) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".collections-eyebrow",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 82%" },
          },
        );
        gsap.fromTo(
          ".collections-heading",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            delay: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 82%" },
          },
        );
        gsap.fromTo(
          ".collections-copy",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay: 0.16,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 82%" },
          },
        );
        gsap.fromTo(
          ".collection-card",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            delay: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".collections-mosaic",
              start: "top 86%",
            },
          },
        );
      }, root);

      return () => ctx.revert();
    },
    { dependencies: [reduced] },
  );

  const necklaces = bySlug("necklaces");
  const earrings = bySlug("earrings");
  const rings = bySlug("rings");
  const bangles = bySlug("bangles");
  const chains = bySlug("chains");
  const pendants = bySlug("pendants");

  return (
    <section
      ref={root}
      className="bg-ivory px-5 pb-[clamp(4.5rem,12vw,9rem)] pt-[clamp(4.5rem,10vw,7.5rem)] md:px-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="max-w-2xl">
          <p
            className={cn(
              "collections-eyebrow text-[11px] uppercase tracking-[0.28em] text-taupe",
              !reduced && "opacity-0",
            )}
          >
            Explore
          </p>
          <h2
            className={cn(
              "collections-heading mt-3 font-serif text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-charcoal",
              !reduced && "opacity-0",
            )}
          >
            Explore Our Jewellery
          </h2>
          <p
            className={cn(
              "collections-copy mt-4 max-w-md text-base leading-relaxed text-charcoal/65 md:text-lg",
              !reduced && "opacity-0",
            )}
          >
            Discover pieces for celebrations, milestones and everyday moments.
          </p>
        </header>

        {/* Desktop / tablet editorial mosaic */}
        <div className="collections-mosaic mt-10 hidden gap-3 md:grid md:grid-cols-12 md:gap-4 lg:mt-14">
          <CollectionCard
            collection={necklaces}
            className="md:col-span-7 md:row-span-2 md:min-h-[560px] lg:min-h-[640px]"
            titleClass="md:text-4xl lg:text-5xl"
            sizes="(max-width: 1024px) 60vw, 50vw"
          />
          <CollectionCard
            collection={earrings}
            className="md:col-span-5 md:min-h-[270px] lg:min-h-[310px]"
            sizes="(max-width: 1024px) 40vw, 35vw"
          />
          <CollectionCard
            collection={rings}
            className="md:col-span-5 md:min-h-[270px] lg:min-h-[310px]"
            sizes="(max-width: 1024px) 40vw, 35vw"
          />
          <CollectionCard
            collection={bangles}
            className="md:col-span-6 md:min-h-[280px] lg:min-h-[320px]"
            titleClass="md:text-3xl lg:text-4xl"
            sizes="(max-width: 1024px) 50vw, 40vw"
          />
          <CollectionCard
            collection={chains}
            className="md:col-span-3 md:min-h-[280px] lg:min-h-[320px]"
            sizes="(max-width: 1024px) 25vw, 20vw"
          />
          <CollectionCard
            collection={pendants}
            className="md:col-span-3 md:min-h-[280px] lg:min-h-[320px]"
            sizes="(max-width: 1024px) 25vw, 20vw"
          />
        </div>

        {/* Mobile intentional composition */}
        <div className="collections-mosaic mt-10 grid gap-3 md:hidden">
          <CollectionCard
            collection={necklaces}
            className="min-h-[360px]"
            titleClass="text-3xl"
            sizes="100vw"
          />
          <div className="grid grid-cols-2 gap-3">
            <CollectionCard
              collection={earrings}
              className="min-h-[220px]"
              sizes="50vw"
            />
            <CollectionCard
              collection={rings}
              className="min-h-[220px]"
              sizes="50vw"
            />
          </div>
          <CollectionCard
            collection={bangles}
            className="min-h-[260px]"
            titleClass="text-3xl"
            sizes="100vw"
          />
          <div className="grid grid-cols-2 gap-3">
            <CollectionCard
              collection={chains}
              className="min-h-[200px]"
              sizes="50vw"
            />
            <CollectionCard
              collection={pendants}
              className="min-h-[200px]"
              sizes="50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionCard({
  collection,
  className,
  titleClass,
  sizes,
}: {
  collection: Collection;
  className?: string;
  titleClass?: string;
  sizes: string;
}) {
  return (
    <LocaleLink
      href={collection.href}
      data-cursor="Explore"
      className={cn(
        "collection-card group relative block overflow-hidden bg-cream",
        className,
      )}
    >
      <Image
        src={collection.image.src}
        alt={collection.image.alt}
        fill
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
        style={{
          objectPosition: collection.image.objectPosition ?? "50% 50%",
        }}
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-near-black/30 transition-colors duration-[600ms] group-hover:bg-near-black/40 group-focus-visible:bg-near-black/40" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
        <p
          className={cn(
            "font-serif text-2xl text-ivory transition-transform duration-[600ms] ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1",
            titleClass,
          )}
        >
          {collection.name}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-ivory/80 transition-transform duration-[600ms] ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1">
          Explore
          <span aria-hidden>→</span>
        </p>
      </div>
    </LocaleLink>
  );
}
