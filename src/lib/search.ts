import { products } from "@/data/products";
import type { Product } from "@/types";

export function searchProducts(query: string, limit = 12): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return products
    .filter((product) => {
      const haystack = [
        product.name,
        product.category,
        product.collection ?? "",
        product.description,
        product.karat ?? "",
        product.metal,
        ...(product.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, limit);
}

export const popularSearchCategories = [
  { label: "Necklaces", href: "/jewellery?category=necklaces" },
  { label: "Bridal", href: "/bridal" },
  { label: "Rings", href: "/jewellery?category=rings" },
  { label: "Earrings", href: "/jewellery?category=earrings" },
  { label: "Bangles", href: "/jewellery?category=bangles" },
  { label: "New Arrivals", href: "/jewellery?collection=new-arrivals" },
];
