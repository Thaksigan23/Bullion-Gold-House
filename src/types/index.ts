export type Locale = "en" | "si";

export type Currency = "LKR";

export type Metal = "gold" | "diamond" | "mixed";

export type Karat = "18K" | "22K" | "24K";

export type ProductCategory =
  | "necklaces"
  | "chains"
  | "bangles"
  | "bracelets"
  | "earrings"
  | "rings"
  | "pendants"
  | "mens"
  | "kids"
  | "diamond"
  | "lightweight";

export type CollectionSlug =
  | "new-arrivals"
  | "bestsellers"
  | "signature"
  | "wedding"
  | "everyday-gold"
  | "gifting"
  | "bridal-gold"
  | "wedding-jewellery"
  | "wedding-rings"
  | "bridal-enquiry"
  | "bespoke-bridal";

export interface ProductImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** CSS object-position for intentional crops */
  objectPosition?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection?: CollectionSlug;
  metal: Metal;
  karat?: Karat;
  weight?: string;
  stones?: string;
  price?: number | null;
  currency?: Currency;
  images: ProductImage[];
  description: string;
  keywords?: string[];
  featured?: boolean;
  newArrival?: boolean;
  available: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description?: string;
  href: string;
  image: ProductImage;
  size?: "large" | "medium" | "wide" | "small";
}

export interface GoldRate {
  karat22: number | null;
  karat24: number | null;
  unit: string;
  currency: Currency;
  updatedAt: string | null;
  isDemo: boolean;
  contactForRate?: boolean;
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  mega?: "jewellery" | "collections";
}

export interface ContactConfig {
  address?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  hours?: string | null;
  mapUrl?: string | null;
  directionsUrl?: string | null;
}

export interface SocialConfig {
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  localeDefault: Locale;
  locales: Locale[];
  contact: ContactConfig;
  social: SocialConfig;
  commerceEnabled: boolean;
}

export interface Celebration {
  id: string;
  title: string;
  description: string;
  href: string;
  image: ProductImage;
}

export interface GalleryItem {
  id: string;
  image: ProductImage;
  span?: "tall" | "wide" | "square";
}

export interface TrustItem {
  id: string;
  title: string;
  description: string;
}

export interface BespokeStep {
  id: string;
  step: string;
  title: string;
  description: string;
}
