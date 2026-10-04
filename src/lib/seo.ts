import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Locale, Product } from "@/types";

export function createMetadata({
  title,
  description,
  path = "",
  locale = "en",
  images,
}: {
  title?: string;
  description?: string;
  path?: string;
  locale?: Locale;
  images?: string[];
}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const desc = description ?? siteConfig.description;
  const url = `${siteConfig.url}/${locale}${path}`;

  return {
    title: pageTitle,
    description: desc,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/en${path}`,
        si: `${siteConfig.url}/si${path}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: locale === "si" ? "si_LK" : "en_LK",
      type: "website",
      images: images?.map((src) => ({ url: src })),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: desc,
      images: images,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(siteConfig.contact.address
      ? { address: { "@type": "PostalAddress", streetAddress: siteConfig.contact.address } }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/en/jewellery?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: Product, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.src),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: product.category,
    url: `${siteConfig.url}/${locale}/jewellery/${product.slug}`,
    ...(product.price != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: product.currency ?? "LKR",
            price: product.price,
            availability: product.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}/${locale}${item.path}`,
    })),
  };
}
