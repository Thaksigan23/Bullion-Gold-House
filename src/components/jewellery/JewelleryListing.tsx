"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/jewellery/ProductCard";
import {
  filterProducts,
  ProductFilters,
  type FilterState,
} from "@/components/jewellery/ProductFilters";
import type { Dictionary } from "@/lib/i18n";
import type {
  CollectionSlug,
  Product,
  ProductCategory,
} from "@/types";

export function JewelleryListing({
  products,
  dict,
}: {
  products: Product[];
  dict: Dictionary;
}) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    category: (searchParams.get("category") as ProductCategory) || undefined,
    collection: (searchParams.get("collection") as CollectionSlug) || undefined,
    sort: "newest",
  });

  const list = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  return (
    <div className="mt-10 flex flex-col gap-8 lg:flex-row">
      <ProductFilters
        products={products}
        dict={dict}
        initial={filters}
        onChange={setFilters}
      />
      <div className="flex-1">
        <p className="mb-6 text-sm text-taupe">{list.length} pieces</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {list.length === 0 ? (
          <p className="py-20 text-center text-charcoal/60">
            No pieces match these filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}
