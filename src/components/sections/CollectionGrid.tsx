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
      className="bg-ivory px-5 pb-[clamp(5rem,14vw,10rem)] pt-[clamp(3.5rem,8vw,6rem)] md:px-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="max-w-xl">
          <p
            className={cn(
              "collections-eyebrow text-[11px] uppercase tracking-[0.28em] text-taupe",
              !reduced && "opacity-0",
            )}
          >
            Collections
          </p>
          <h2
            className={cn(
              "collections-heading mt-4 font-serif text-[clamp(2.15rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-charcoal",
              !reduced && "opacity-0",
            )}
          >
            Explore Our Jewellery
          </h2>
          <p
            className={cn(
              "collections-copy mt-4 max-w-sm text-sm leading-relaxed text-charcoal/60 md:text-base",
              !reduced && "opacity-0",
            )}
          >
            Discover pieces for celebrations, milestones and everyday moments.
          </p>
        </header>

        {/* Desktop / tablet editorial mosaic */}
        <div className="collections-mosaic mt-12 hidden gap-2 md:grid md:grid-cols-12 md:gap-3 lg:mt-16">
          <CollectionCard
            collection={necklaces}
            className="md:col-span-7 md:row-span-2 md:min-h-[620px] lg:min-h-[720px]"
            titleClass="md:text-4xl lg:text-[2.75rem]"
            sizes="(max-width: 1024px) 60vw, 50vw"
          />
          <CollectionCard
            collection={earrings}
            className="md:col-span-5 md:min-h-[300px] lg:min-h-[350px]"
            sizes="(max-width: 1024px) 40vw, 35vw"
          />
          <CollectionCard
            collection={rings}
            className="md:col-span-5 md:min-h-[300px] lg:min-h-[350px]"
            sizes="(max-width: 1024px) 40vw, 35vw"
          />
          <CollectionCard
            collection={bangles}
            className="md:col-span-6 md:min-h-[300px] lg:min-h-[340px]"
            titleClass="md:text-3xl lg:text-4xl"
            sizes="(max-width: 1024px) 50vw, 40vw"
          />
          <CollectionCard
            collection={chains}
            className="md:col-span-3 md:min-h-[300px] lg:min-h-[340px]"
            sizes="(max-width: 1024px) 25vw, 20vw"
          />
          <CollectionCard
            collection={pendants}
            className="md:col-span-3 md:min-h-[300px] lg:min-h-[340px]"
            sizes="(max-width: 1024px) 25vw, 20vw"
          />
        </div>

        {/* Mobile intentional composition */}
        <div className="collections-mosaic mt-10 grid gap-2 md:hidden">
          <CollectionCard
            collection={necklaces}
            className="min-h-[380px]"
            titleClass="text-3xl"
            sizes="100vw"
          />
          <div className="grid grid-cols-2 gap-2">
            <CollectionCard
              collection={earrings}
              className="min-h-[230px]"
              sizes="50vw"
            />
            <CollectionCard
              collection={rings}
              className="min-h-[230px]"
              sizes="50vw"
            />
          </div>
          <CollectionCard
            collection={bangles}
            className="min-h-[280px]"
            titleClass="text-3xl"
            sizes="100vw"
          />
          <div className="grid grid-cols-2 gap-2">
            <CollectionCard
              collection={chains}
              className="min-h-[210px]"
              sizes="50vw"
            />
            <CollectionCard
              collection={pendants}
              className="min-h-[210px]"
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
      <div className="absolute inset-0 bg-gradient-to-t from-near-black/65 via-near-black/10 to-transparent transition-opacity duration-[600ms] group-hover:from-near-black/72" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <p
          className={cn(
            "font-serif text-2xl text-ivory transition-transform duration-[600ms] ease-out group-hover:-translate-y-0.5",
            titleClass,
          )}
        >
          {collection.name}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-ivory/0 transition-all duration-500 group-hover:text-ivory/85 group-focus-visible:text-ivory/85">
          Explore →
        </p>
      </div>
    </LocaleLink>
  );
}
