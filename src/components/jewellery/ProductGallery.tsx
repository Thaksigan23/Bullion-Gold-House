"use client";

import Image from "next/image";
import type { ProductImage } from "@/types";

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const unique = images.filter(
    (image, index, arr) =>
      arr.findIndex((item) => item.src === image.src) === index,
  );

  if (unique.length === 0) return null;

  if (unique.length === 1) {
    const image = unique[0];
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream lg:min-h-[70vh] lg:aspect-auto">
        <Image
          src={image.src}
          alt={image.alt || productName}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>
    );
  }

  return (
    <>
      {/* Mobile: horizontal snap gallery */}
      <div className="lg:hidden">
        <div
          className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2"
          aria-label={`${productName} images`}
        >
          {unique.map((image, i) => (
            <div
              key={image.src + i}
              className="relative aspect-[4/5] w-[86%] shrink-0 snap-center overflow-hidden bg-cream"
            >
              <Image
                src={image.src}
                alt={image.alt || `${productName} — image ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
                style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
                sizes="86vw"
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-taupe">
          Swipe to view · {unique.length} images
        </p>
      </div>

      {/* Desktop: stacked editorial images */}
      <div className="hidden space-y-3 lg:block">
        {unique.map((image, i) => (
          <div
            key={image.src + i}
            className="relative aspect-[4/5] overflow-hidden bg-cream"
          >
            <Image
              src={image.src}
              alt={image.alt || `${productName} — image ${i + 1}`}
              fill
              priority={i === 0}
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
              sizes="60vw"
            />
          </div>
        ))}
      </div>
    </>
  );
}
