import type { Locale } from "@/types";
import { siteConfig } from "@/config/site";

export const locales: Locale[] = siteConfig.locales;
export const defaultLocale: Locale = siteConfig.localeDefault;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** UI chrome strings only — not machine-translated business copy */
const dictionaries = {
  en: {
    nav: {
      jewellery: "Jewellery",
      collections: "Collections",
      bridal: "Bridal",
      newArrivals: "New Arrivals",
      goldRate: "Gold Rate",
      about: "About",
      contact: "Contact",
      search: "Search",
      wishlist: "Wishlist",
      account: "Account",
      bag: "Bag",
      menu: "Menu",
      close: "Close",
      explore: "Explore",
      view: "View",
      whatsapp: "WhatsApp",
    },
    common: {
      enquire: "Enquire",
      exploreCollection: "Explore Collection",
      discoverBullion: "Discover Bullion",
      exploreBridal: "Explore Bridal",
      startEnquiry: "Start an Enquiry",
      getDirections: "Get Directions",
      callUs: "Call Us",
      whatsappUs: "WhatsApp Us",
      visitShowroom: "Visit Bullion Gold House",
      followUs: "Follow Bullion Gold House",
      todayGoldRate: "Today's Gold Rate",
      lastUpdated: "Last Updated",
      contactForRate: "Contact showroom for today's rate",
      demoRate: "Demo values — not live market rates",
      language: "Language",
      privacy: "Privacy Policy",
      terms: "Terms",
      returns: "Returns / Exchange",
      allRights: "All rights reserved.",
    },
    search: {
      placeholder: "Search jewellery, collections, occasions…",
      popular: "Popular categories",
      recent: "Recent searches",
      noResults: "No pieces found",
      results: "Results",
    },
    product: {
      enquireCta: "Enquire About This Piece",
      whatsapp: "WhatsApp",
      related: "You May Also Like",
      care: "Care",
      delivery: "Collection & Delivery",
      careBody:
        "Store jewellery in a dry place. Avoid contact with harsh chemicals. Wipe gently after wear.",
      deliveryBody:
        "Collection and delivery details will be confirmed when you enquire. Policies will be published once available.",
      availability: "Availability",
      available: "Available to enquire",
      unavailable: "Currently unavailable",
      karat: "Karat",
      weight: "Weight",
      stones: "Stones",
      metal: "Metal",
      category: "Category",
    },
    filters: {
      title: "Filters",
      category: "Category",
      metal: "Metal",
      karat: "Karat",
      collection: "Collection",
      sort: "Sort",
      clear: "Clear",
      apply: "Apply",
      newest: "Newest",
      nameAsc: "Name A–Z",
      featured: "Featured",
    },
  },
  si: {
    nav: {
      jewellery: "ආභරණ",
      collections: "එකතු",
      bridal: "මංගල",
      newArrivals: "නවතම",
      goldRate: "රන් මිල",
      about: "අප ගැන",
      contact: "සම්බන්ධ වන්න",
      search: "සොයන්න",
      wishlist: "ප්‍රියතම",
      account: "ගිණුම",
      bag: "බෑගය",
      menu: "මෙනුව",
      close: "වසන්න",
      explore: "ගවේෂණය",
      view: "බලන්න",
      whatsapp: "WhatsApp",
    },
    common: {
      enquire: "විමසන්න",
      exploreCollection: "එකතුව බලන්න",
      discoverBullion: "Bullion සොයා ගන්න",
      exploreBridal: "මංගල එකතුව",
      startEnquiry: "විමසීමක් අරඹන්න",
      getDirections: "දිශාව ලබා ගන්න",
      callUs: "අමතන්න",
      whatsappUs: "WhatsApp",
      visitShowroom: "Bullion Gold House වෙත පැමිණෙන්න",
      followUs: "Bullion Gold House අනුගමනය කරන්න",
      todayGoldRate: "අද රන් මිල",
      lastUpdated: "අවසන් යාවත්කාලීන",
      contactForRate: "අද මිල සඳහා ප්‍රදර්ශනාගාරය අමතන්න",
      demoRate: "නියැදි අගයන් — සජීවී වෙළඳපොළ මිල නොවේ",
      language: "භාෂාව",
      privacy: "රහස්‍යතා ප්‍රතිපත්තිය",
      terms: "නියම",
      returns: "ආපසු / හුවමාරු",
      allRights: "සියලු හිමිකම් ඇවිරිණි.",
    },
    search: {
      placeholder: "ආභරණ, එකතු, අවස්ථා සොයන්න…",
      popular: "ජනප්‍රිය වර්ග",
      recent: "මෑත සෙවුම්",
      noResults: "කිසිවක් හමු නොවීය",
      results: "ප්‍රතිඵල",
    },
    product: {
      enquireCta: "මෙම කැබැල්ල ගැන විමසන්න",
      whatsapp: "WhatsApp",
      related: "ඔබටත් කැමති විය හැක",
      care: "රැකවරණය",
      delivery: "ලබා ගැනීම සහ බෙදාහැරීම",
      careBody:
        "Store jewellery in a dry place. Avoid harsh chemicals. Wipe gently after wear.",
      deliveryBody:
        "Collection details confirmed on enquiry. Policies published when available.",
      availability: "Availability",
      available: "Available to enquire",
      unavailable: "Currently unavailable",
      karat: "කැරට්",
      weight: "බර",
      stones: "මැණික්",
      metal: "ලෝහ",
      category: "වර්ගය",
    },
    filters: {
      title: "පෙරහන්",
      category: "වර්ගය",
      metal: "ලෝහ",
      karat: "කැරට්",
      collection: "එකතුව",
      sort: "අනුපිළිවෙල",
      clear: "මකන්න",
      apply: "යොදන්න",
      newest: "නවතම",
      nameAsc: "නම A–Z",
      featured: "විශේෂ",
    },
  },
};

export type Dictionary = {
  nav: Record<keyof (typeof dictionaries)["en"]["nav"], string>;
  common: Record<keyof (typeof dictionaries)["en"]["common"], string>;
  search: Record<keyof (typeof dictionaries)["en"]["search"], string>;
  product: Record<keyof (typeof dictionaries)["en"]["product"], string>;
  filters: Record<keyof (typeof dictionaries)["en"]["filters"], string>;
};

export function getDictionary(locale: Locale): Dictionary {
  return (dictionaries[locale] ?? dictionaries.en) as Dictionary;
}

export function localizedHref(href: string, locale: Locale): string {
  if (
    href.startsWith("http") ||
    href.startsWith("mailto") ||
    href.startsWith("tel")
  ) {
    return href;
  }
  const path = href.startsWith("/") ? href : `/${href}`;
  if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}
