import type { SiteConfig } from "@/types";

/**
 * Central business configuration for Bullion Gold House.
 * Fill in real values when available. Null / empty values are hidden in the UI.
 */
export const siteConfig: SiteConfig = {
  name: "Bullion Gold House",
  shortName: "Bullion",
  tagline: "Gold for Your Meaningful Moments.",
  description:
    "Discover jewellery for life's most meaningful celebrations. Premium gold jewellery for Sri Lankan moments of joy.",
  url: "https://bulliongoldhouse.lk",
  localeDefault: "en",
  locales: ["en", "si"],
  commerceEnabled: false,
  contact: {
    // DEMO PLACEHOLDERS — replace with real Bullion showroom details
    address: null,
    phone: null,
    whatsapp: null,
    email: null,
    hours: null,
    mapUrl: null,
    directionsUrl: null,
  },
  social: {
    // Do not invent handles — set real URLs when available
    instagram: null,
    facebook: null,
    youtube: null,
  },
};

export const DEMO_DISCLAIMER =
  "DEMO CONTENT — REPLACE WITH REAL BULLION PRODUCTS / INFORMATION";
