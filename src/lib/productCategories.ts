import type { Product, ProductCategory } from "@/types";

export const categoryLabels: Record<ProductCategory, string> = {
  necklaces: "Necklaces",
  chains: "Chains",
  bangles: "Bangles",
  bracelets: "Bracelets",
  earrings: "Earrings",
  rings: "Rings",
  pendants: "Pendants",
  mens: "Men's",
  kids: "Kids'",
  diamond: "Diamond",
  lightweight: "Lightweight",
};

/** Preferred category navigation order — only categories present in data are shown. */
const categoryOrder: ProductCategory[] = [
  "necklaces",
  "chains",
  "bangles",
  "bracelets",
  "earrings",
  "rings",
  "pendants",
  "mens",
  "kids",
  "diamond",
  "lightweight",
];

export type CatalogueCategory = "all" | "bridal" | ProductCategory;

export function getCatalogueCategories(products: Product[]): {
  id: CatalogueCategory;
  label: string;
}[] {
  const present = new Set(products.map((p) => p.category));
  const categories = categoryOrder
    .filter((id) => present.has(id))
    .map((id) => ({ id, label: categoryLabels[id] }));

  const hasBridal = products.some(
    (p) =>
      p.collection === "bridal-gold" ||
      p.collection === "wedding" ||
      p.collection === "wedding-jewellery" ||
      p.collection === "wedding-rings" ||
      p.keywords?.some((k) => /bridal|wedding/i.test(k)),
  );

  return [
    { id: "all", label: "All" },
    ...categories,
    ...(hasBridal ? [{ id: "bridal" as const, label: "Bridal" }] : []),
  ];
}

export function isBridalProduct(product: Product): boolean {
  return (
    product.collection === "bridal-gold" ||
    product.collection === "wedding" ||
    product.collection === "wedding-jewellery" ||
    product.collection === "wedding-rings" ||
    Boolean(product.keywords?.some((k) => /bridal|wedding/i.test(k)))
  );
}

export function formatKarat(karat?: string, metal?: string) {
  if (!karat) return null;
  if (metal === "gold" || !metal) return `${karat} Gold`;
  return karat;
}
