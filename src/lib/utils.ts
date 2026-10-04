import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | null | undefined,
  currency: string = "LKR",
): string {
  if (price == null) return "Enquire";
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatGoldRate(
  value: number | null | undefined,
  currency: string = "LKR",
): string {
  if (value == null) return "Contact showroom";
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function absoluteUrl(path: string, locale?: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bulliongoldhouse.lk";
  const prefix = locale ? `/${locale}` : "";
  return `${base}${prefix}${path.startsWith("/") ? path : `/${path}`}`;
}
