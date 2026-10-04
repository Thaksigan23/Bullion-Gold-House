import type { Celebration, GalleryItem, TrustItem } from "@/types";

/** Configurable occasion panels — DEMO CONTENT / TEMPORARY EDITORIAL ASSETS */
export const celebrations: Celebration[] = [
  {
    id: "weddings",
    title: "Weddings",
    description: "Jewellery that marks a lifelong beginning.",
    href: "/bridal",
    image: {
      src: "/images/celebrations/weddings.jpg",
      alt: "Sri Lankan bride in traditional gold jewellery",
      objectPosition: "50% 22%",
    },
  },
  {
    id: "engagements",
    title: "Engagements",
    description: "Rings and pieces chosen for a promise.",
    href: "/jewellery?collection=wedding-rings",
    image: {
      src: "/images/celebrations/engagements.jpg",
      alt: "Hands holding yellow-gold wedding bands",
      objectPosition: "50% 45%",
    },
  },
  {
    id: "nikah-walima",
    title: "Nikah & Walima",
    description: "Elegant jewellery for sacred celebrations.",
    href: "/bridal",
    image: {
      src: "/images/celebrations/nikah.jpg",
      alt: "Wedding celebration moment with visible gold jewellery",
      objectPosition: "50% 28%",
    },
  },
  {
    id: "gifting",
    title: "Gifting",
    description: "Thoughtful gold for people you cherish.",
    href: "/jewellery?collection=gifting",
    image: {
      src: "/images/celebrations/gifting.jpg",
      alt: "Hands opening an elegant jewellery gift box",
      objectPosition: "50% 40%",
    },
  },
  {
    id: "festive",
    title: "Festive Moments",
    description: "Pieces that bring light to the season.",
    href: "/jewellery",
    image: {
      src: "/images/celebrations/festive.jpg",
      alt: "Celebratory styling with warm yellow-gold jewellery",
      objectPosition: "48% 30%",
    },
  },
  {
    id: "everyday",
    title: "Everyday Gold",
    description: "Quiet luxury for the days in between.",
    href: "/jewellery?collection=everyday-gold",
    image: {
      src: "/images/celebrations/everyday.jpg",
      alt: "Hands naturally wearing elegant yellow-gold jewellery",
      objectPosition: "50% 45%",
    },
  },
];

/**
 * Why Bullion pillars — safe experience-oriented copy only.
 * Do not invent warranties, certifications, or unverified claims.
 * TODO: Sinhala review when official translations are available.
 */
export const trustItems: TrustItem[] = [
  {
    id: "curated",
    title: "Curated Jewellery",
    description:
      "Discover pieces across bridal, celebration and everyday collections.",
  },
  {
    id: "assistance",
    title: "Personal Assistance",
    description:
      "Speak with the showroom when choosing jewellery for an occasion.",
  },
  {
    id: "information",
    title: "Clear Information",
    description:
      "Product and gold-rate information presented clearly when verified.",
  },
];

/**
 * Editorial gallery — TEMPORARY LOCAL ASSETS.
 * TODO: Replace with official Bullion Gold House campaign and product
 * photography before final production launch.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    span: "tall",
    image: {
      src: "/images/celebrations/weddings.jpg",
      alt: "Bridal portrait with yellow-gold jewellery",
      objectPosition: "50% 22%",
    },
  },
  {
    id: "g2",
    span: "square",
    image: {
      src: "/images/collections/bangles.jpg",
      alt: "Warm yellow-gold bangles",
      objectPosition: "50% 45%",
    },
  },
  {
    id: "g3",
    span: "wide",
    image: {
      src: "/images/bridal/wedding-jewellery.jpg",
      alt: "Close-up of bridal gold jewellery",
      objectPosition: "50% 35%",
    },
  },
  {
    id: "g4",
    span: "square",
    image: {
      src: "/images/bridal/wedding-rings.jpg",
      alt: "Yellow-gold ring in warm light",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "g5",
    span: "tall",
    image: {
      src: "/images/bridal/bridal-gold.jpg",
      alt: "Layered bridal gold jewellery styling",
      objectPosition: "50% 28%",
    },
  },
  {
    id: "g6",
    span: "square",
    image: {
      src: "/images/collections/earrings.jpg",
      alt: "Yellow-gold earrings editorial still",
      objectPosition: "50% 45%",
    },
  },
];

/** Jewellery Enquiry — showroom contact only; no manufacturing claims */
export const enquiryContent = {
  eyebrow: "Personal Assistance",
  line1: "Find the Piece",
  line2: "That Feels Right.",
  supporting:
    "Looking for jewellery for a wedding, celebration, gift or everyday occasion? Speak with the showroom about the pieces currently available.",
  primaryCta: { label: "Make an Enquiry", href: "/contact" },
  secondaryCta: { label: "Contact Showroom", href: "/contact" },
  image: {
    src: "/images/bridal/enquiry.jpg",
    alt: "Hands adorned with yellow-gold jewellery",
    objectPosition: "50% 45%",
  },
};

/** Visit Bullion / showroom conversion — TODO: Sinhala review */
export const showroomContent = {
  eyebrow: "Visit Bullion",
  line1: "See the Jewellery",
  line2: "In Person.",
  supporting:
    "Visit the showroom or contact Bullion Gold House for product, availability and gold-rate enquiries.",
  image: {
    src: "/images/hero/campaign-portrait.jpg",
    alt: "Editorial portrait wearing fine gold jewellery",
    objectPosition: "50% 30%",
  },
};

export const heroContent = {
  eyebrow: "Bullion Gold House",
  headingLine1: "Gold for Your",
  /** Split for desktop campaign line breaks; wraps naturally on smaller screens */
  headingLinesRest: ["Meaningful", "Moments."],
  supporting:
    "Discover jewellery for life's most meaningful celebrations.",
  primaryCta: { label: "Explore Collection", href: "/jewellery" },
  secondaryCta: { label: "Discover Bullion", href: "/about" },
  /**
   * Temporary editorial placeholder — replace with official Bullion photography.
   * Drop files into /public/images/hero/ and update `src` below.
   */
  image: {
    src: "/images/hero/campaign-portrait.jpg",
    alt: "Editorial portrait of a woman wearing fine gold jewellery",
  },
};

/**
 * Cinematic showcase — ONE jewellery object.
 * TEMPORARY ASSET in /public/images/showcase/
 * Architecture is image-first; GLB/GLTF can replace later.
 */
export const showcaseContent = {
  eyebrow: "The Bullion Signature",
  line1: "Chosen to",
  line2: "be remembered.",
  supporting:
    "A celebration of detail, form and the enduring beauty of gold.",
  labels: ["Craft", "Detail", "Form"] as const,
  cta: { label: "Explore Jewellery", href: "/jewellery" },
  image: {
    src: "/images/showcase/signature-necklace.jpg",
    alt: "Yellow-gold floral pendant isolated against a deep black background",
    objectPosition: "50% 45%",
  },
};

/**
 * Craftsmanship / detail appreciation — no manufacturing claims.
 * TODO: Sinhala review when official translations are available.
 */
export const craftsmanshipContent = {
  eyebrow: "A Closer Look",
  heading: "Beauty in the Details",
  body: "Explore jewellery through the details that define its character — form, texture, proportion and finish.",
  image: {
    src: "/images/products/luna-bangle-1.jpg",
    alt: "Close-up detail of yellow-gold bangle texture",
    objectPosition: "50% 50%",
  },
};

/** Why Bullion section chrome — TODO: Sinhala review */
export const whyBullionContent = {
  eyebrow: "Why Bullion",
  title: "A Thoughtful Way to Choose",
};
