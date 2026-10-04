"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="space-y-3">
      <button
        type="button"
        className="relative aspect-[4/5] w-full overflow-hidden bg-cream"
        onClick={() => setZoomed((z) => !z)}
        aria-label="Toggle image zoom"
      >
        <Image
          src={images[active]?.src}
          alt={images[active]?.alt || "Product image"}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in",
          )}
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      </button>
      {images.length > 1 ? (
        <div className="flex gap-2">
          {images.map((image, i) => (
            <button
              key={image.src + i}
              type="button"
              onClick={() => {
                setActive(i);
                setZoomed(false);
              }}
              className={cn(
                "relative h-20 w-16 overflow-hidden border",
                active === i ? "border-champagne" : "border-transparent",
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
