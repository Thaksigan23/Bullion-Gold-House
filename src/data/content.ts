import type {
  BespokeStep,
  Celebration,
  GalleryItem,
  TrustItem,
} from "@/types";

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

export const trustItems: TrustItem[] = [
  {
    id: "service",
    title: "Thoughtful Service",
    description: "Guidance with care, from first look to final selection.",
  },
  {
    id: "curated",
    title: "Curated Jewellery",
    description: "Pieces chosen for beauty, wearability, and lasting meaning.",
  },
  {
    id: "assistance",
    title: "Personal Assistance",
    description: "Speak with our team for bridal, gifting, or custom needs.",
  },
  {
    id: "moments",
    title: "Jewellery for Meaningful Moments",
    description: "Designed to become part of celebrations you remember.",
  },
];

export const bespokeSteps: BespokeStep[] = [
  {
    id: "01",
    step: "01",
    title: "Share Your Idea",
    description: "Tell us about the occasion, style, and inspiration behind your piece.",
  },
  {
    id: "02",
    step: "02",
    title: "Refine the Design",
    description: "We help shape proportions, details, and finishing with you.",
  },
  {
    id: "03",
    step: "03",
    title: "Craft Your Piece",
    description: "Your jewellery is carefully brought to life with focused attention.",
  },
  {
    id: "04",
    step: "04",
    title: "Collect Your Jewellery",
    description: "Receive a piece made for your moment — ready to be worn and remembered.",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    span: "tall",
    image: {
      src: "https://images.unsplash.com/photo-1769500805415-0f9485e70e5b?auto=format&fit=crop&w=1000&q=80",
      alt: "Bridal portrait with gold jewellery",
    },
  },
  {
    id: "g2",
    span: "square",
    image: {
      src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      alt: "Gold necklace editorial still",
    },
  },
  {
    id: "g3",
    span: "wide",
    image: {
      src: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1400&q=80",
      alt: "Macro gold jewellery craftsmanship",
    },
  },
  {
    id: "g4",
    span: "square",
    image: {
      src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
      alt: "Gold ring detail",
    },
  },
  {
    id: "g5",
    span: "tall",
    image: {
      src: "https://images.unsplash.com/photo-1762709414326-67c887a8dc98?auto=format&fit=crop&w=1000&q=80",
      alt: "Traditional bridal jewellery styling",
    },
  },
  {
    id: "g6",
    span: "square",
    image: {
      src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80",
      alt: "Gold bangles and bracelets",
    },
  },
];

export const heroContent = {
  eyebrow: "Bullion Gold House",
  headingLine1: "Crafted in Gold.",
  /** Split for desktop campaign line breaks; wraps naturally on smaller screens */
  headingLinesRest: ["Made for Your", "Moments."],
  supporting:
    "Discover jewellery created to become part of life's most meaningful celebrations.",
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
  line1: "Crafted to",
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

export const craftsmanshipContent = {
  heading: "Made With Meaning",
  body: "At Bullion Gold House, jewellery is more than an ornament. It becomes part of the moments, traditions and memories we carry forward.",
  image: {
    src: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1600&q=80",
    alt: "Macro jewellery craftsmanship detail",
  },
};
