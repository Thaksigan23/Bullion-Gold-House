import type { Product } from "@/types";

/**
 * DEMO CONTENT — REPLACE WITH REAL BULLION PRODUCTS
 * Placeholder imagery uses Unsplash (free license) for development only.
 * Replace with official Bullion photography in /public/images/products/
 */
export const products: Product[] = [
  {
    id: "demo-001",
    slug: "aurora-necklace",
    name: "Aurora Necklace",
    category: "necklaces",
    collection: "signature",
    metal: "gold",
    karat: "22K",
    price: null,
    currency: "LKR",
    images: [
      {
        src: "/images/products/aurora-necklace-1.jpg",
        alt: "Layered yellow-gold necklaces with warm beige lighting",
        objectPosition: "50% 35%",
      },
      {
        src: "/images/products/aurora-necklace-2.jpg",
        alt: "Traditional yellow-gold necklace detail on dark background",
        objectPosition: "50% 40%",
      },
    ],
    description:
      "A refined necklace designed for meaningful celebrations. Enquire for current availability and pricing.",
    keywords: ["necklace", "22k", "bridal", "celebration"],
    featured: true,
    newArrival: true,
    available: true,
  },
  {
    id: "demo-002",
    slug: "luna-bangle",
    name: "Luna Bangle",
    category: "bangles",
    collection: "bestsellers",
    metal: "gold",
    karat: "22K",
    price: null,
    currency: "LKR",
    images: [
      {
        src: "/images/products/luna-bangle-1.jpg",
        alt: "Ornate yellow-gold bangles on a dark reflective surface",
        objectPosition: "45% 50%",
      },
    ],
    description:
      "A timeless bangle with a soft contemporary silhouette. Ideal for everyday elegance and gifting.",
    keywords: ["bangle", "everyday", "gift"],
    featured: true,
    newArrival: true,
    available: true,
  },
  {
    id: "demo-003",
    slug: "solstice-earrings",
    name: "Solstice Earrings",
    category: "earrings",
    collection: "new-arrivals",
    metal: "gold",
    karat: "22K",
    price: null,
    currency: "LKR",
    images: [
      {
        src: "/images/products/solstice-earrings-1.jpg",
        alt: "Twisted yellow-gold hoop earrings on warm ivory",
        objectPosition: "50% 45%",
      },
    ],
    description:
      "Lightweight earrings with a luminous finish — crafted to catch light gently through the day.",
    keywords: ["earrings", "lightweight", "festive"],
    featured: true,
    newArrival: true,
    available: true,
  },
  {
    id: "demo-004",
    slug: "heritage-ring",
    name: "Heritage Ring",
    category: "rings",
    collection: "wedding",
    metal: "gold",
    karat: "22K",
    price: null,
    currency: "LKR",
    images: [
      {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
        alt: "Gold ring with faceted detail",
      },
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
        alt: "Diamond and gold ring on soft surface",
      },
    ],
    description:
      "A ring made for beginnings — understated, enduring, and ready to be worn every day.",
    keywords: ["ring", "wedding", "engagement"],
    featured: true,
    newArrival: false,
    available: true,
  },
  {
    id: "demo-005",
    slug: "cascade-chain",
    name: "Cascade Chain",
    category: "chains",
    collection: "everyday-gold",
    metal: "gold",
    karat: "22K",
    price: null,
    currency: "LKR",
    images: [
      {
        src: "/images/products/cascade-chain-1.jpg",
        alt: "Chunky yellow-gold link chain in warm editorial light",
        objectPosition: "50% 45%",
      },
    ],
    description:
      "A versatile chain designed to layer or stand alone. Enquire for available lengths and finishes.",
    keywords: ["chain", "everyday", "layering"],
    newArrival: true,
    available: true,
  },
  {
    id: "demo-006",
    slug: "petal-pendant",
    name: "Petal Pendant",
    category: "pendants",
    collection: "gifting",
    metal: "gold",
    karat: "22K",
    price: null,
    currency: "LKR",
    images: [
      {
        src: "/images/collections/pendants.jpg",
        alt: "Yellow-gold floral pearl pendant against a deep black background",
        objectPosition: "50% 45%",
      },
    ],
    description:
      "A delicate pendant for gifting and personal milestones. Soft form, lasting presence.",
    keywords: ["pendant", "gift", "delicate"],
    newArrival: true,
    available: true,
  },
  {
    id: "demo-007",
    slug: "noir-bracelet",
    name: "Noir Bracelet",
    category: "bracelets",
    collection: "signature",
    metal: "gold",
    karat: "22K",
    price: null,
    currency: "LKR",
    images: [
      {
        src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80",
        alt: "Gold bracelet and rings arrangement",
      },
    ],
    description:
      "A refined bracelet with quiet presence — suited to both celebration and everyday wear.",
    keywords: ["bracelet", "signature"],
    featured: true,
    newArrival: false,
    available: true,
  },
  {
    id: "demo-008",
    slug: "celeste-diamond-ring",
    name: "Celeste Diamond Ring",
    category: "diamond",
    collection: "wedding-rings",
    metal: "diamond",
    karat: "18K",
    stones: "Diamond accent (details on enquiry)",
    price: null,
    currency: "LKR",
    images: [
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
        alt: "Diamond engagement ring with soft sparkle",
      },
    ],
    description:
      "A luminous ring for proposals and lifelong vows. Specifications confirmed upon enquiry.",
    keywords: ["diamond", "ring", "engagement", "wedding"],
    featured: true,
    newArrival: true,
    available: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((p) => p.newArrival).slice(0, limit);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.collection === product.collection),
    )
    .slice(0, limit);
}
