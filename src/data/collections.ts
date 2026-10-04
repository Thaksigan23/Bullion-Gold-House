import type { Collection } from "@/types";

/**
 * DEMO CONTENT — homepage shop-by-collection tiles.
 * Official Bullion photography: replace files in /public/images/collections/
 */
export const shopCollections: Collection[] = [
  {
    id: "col-necklaces",
    slug: "necklaces",
    name: "Necklaces",
    href: "/jewellery?category=necklaces",
    size: "large",
    image: {
      src: "/images/collections/necklaces.jpg",
      alt: "Layered yellow-gold necklaces with warm beige lighting",
      objectPosition: "50% 35%",
    },
  },
  {
    id: "col-earrings",
    slug: "earrings",
    name: "Earrings",
    href: "/jewellery?category=earrings",
    size: "medium",
    image: {
      src: "/images/collections/earrings.jpg",
      alt: "Twisted yellow-gold hoop earrings on a warm ivory surface",
      objectPosition: "50% 45%",
    },
  },
  {
    id: "col-rings",
    slug: "rings",
    name: "Rings",
    href: "/jewellery?category=rings",
    size: "medium",
    image: {
      src: "/images/collections/rings.jpg",
      alt: "Yellow-gold statement ring on warm beige fabric",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "col-bangles",
    slug: "bangles",
    name: "Bangles",
    href: "/jewellery?category=bangles",
    size: "wide",
    image: {
      src: "/images/collections/bangles.jpg",
      alt: "Stack of ornate yellow-gold bangles on a dark reflective surface",
      objectPosition: "45% 50%",
    },
  },
  {
    id: "col-chains",
    slug: "chains",
    name: "Chains",
    href: "/jewellery?category=chains",
    size: "small",
    image: {
      src: "/images/collections/chains.jpg",
      alt: "Chunky yellow-gold link chain in warm editorial light",
      objectPosition: "50% 45%",
    },
  },
  {
    id: "col-pendants",
    slug: "pendants",
    name: "Pendants",
    href: "/jewellery?category=pendants",
    size: "small",
    image: {
      src: "/images/collections/pendants.jpg",
      alt: "Yellow-gold floral pearl pendant against a deep black background",
      objectPosition: "50% 45%",
    },
  },
];

/**
 * Bridal discovery cards — DEMO CONTENT.
 * Bridal Enquiry leads to showroom contact only.
 * Do not imply confirmed custom/bespoke manufacturing.
 */
export const bridalHero = {
  eyebrow: "Bridal",
  title: "For Every Beginning",
  supporting:
    "Jewellery for weddings, celebrations and the moments that begin a new chapter.",
  cta: { label: "Bridal Enquiry", href: "/contact?type=bridal" },
  image: {
    src: "/images/bridal/hero.jpg",
    alt: "Editorial bridal portrait with warm gold jewellery",
    objectPosition: "62% 28%",
  },
};

export const bridalCollections: Collection[] = [
  {
    id: "bridal-gold",
    slug: "bridal-gold",
    name: "Bridal Gold",
    description: "Jewellery for the ceremony and every celebration around it.",
    href: "/jewellery?category=bridal",
    size: "large",
    image: {
      src: "/images/bridal/bridal-gold.jpg",
      alt: "Bride wearing layered yellow-gold bridal jewellery",
      objectPosition: "50% 28%",
    },
  },
  {
    id: "wedding-jewellery",
    slug: "wedding-jewellery",
    name: "Wedding Jewellery",
    description: "Pieces chosen for vows, gatherings, and lasting memories.",
    href: "/jewellery?collection=wedding",
    size: "medium",
    image: {
      src: "/images/bridal/wedding-jewellery.jpg",
      alt: "Wedding jewellery with elegant traditional styling",
      objectPosition: "50% 35%",
    },
  },
  {
    id: "wedding-rings",
    slug: "wedding-rings",
    name: "Wedding Rings",
    description: "Quiet symbols of commitment, crafted to be worn every day.",
    href: "/jewellery?collection=wedding-rings",
    size: "medium",
    image: {
      src: "/images/bridal/wedding-rings.jpg",
      alt: "Yellow-gold wedding ring in warm champagne light",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "bridal-enquiry",
    slug: "bridal-enquiry",
    name: "Bridal Enquiry",
    description:
      "Speak with the showroom about jewellery for your celebration.",
    href: "/contact?type=bridal",
    size: "wide",
    image: {
      src: "/images/bridal/enquiry.jpg",
      alt: "Henna-adorned hand with yellow-gold bridal bangles",
      objectPosition: "50% 45%",
    },
  },
];
