import type { GoldRate } from "@/types";

/**
 * Demo gold rate data. Do NOT invent live market prices.
 * Connect to a manual CMS update or API later via lib/goldRate.ts
 */
export const goldRate: GoldRate = {
  karat22: null,
  karat24: null,
  unit: "per sovereign",
  currency: "LKR",
  updatedAt: null,
  isDemo: true,
  contactForRate: true,
};

/** Example shape once live rates are supplied */
export const goldRateExampleShape: GoldRate = {
  karat22: null, // e.g. 185000 when real
  karat24: null,
  unit: "per sovereign",
  currency: "LKR",
  updatedAt: null,
  isDemo: true,
  contactForRate: true,
};
