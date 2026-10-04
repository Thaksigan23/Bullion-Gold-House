import { goldRate as staticGoldRate } from "@/data/goldRate";
import type { GoldRate } from "@/types";

/**
 * Gold rate access layer.
 * Today: returns static/demo config.
 * Later: swap implementation to fetch from CMS or API without changing UI.
 */
export async function getGoldRate(): Promise<GoldRate> {
  // Future: const res = await fetch(...)
  return staticGoldRate;
}

export function getGoldRateSync(): GoldRate {
  return staticGoldRate;
}
