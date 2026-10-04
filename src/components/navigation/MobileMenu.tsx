"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { mainNavigation } from "@/data/navigation";
import type { Dictionary } from "@/lib/i18n";

export function MobileMenu({
  open,
  onClose,
  dict,
}: {
  open: boolean;
  onClose: () => void;
  dict: Dictionary;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] bg-near-black text-ivory lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <p className="font-serif text-lg tracking-[0.12em]">
              BULLION GOLD HOUSE
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label={dict.nav.close}
              className="p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="px-5 pb-10 pt-6">
            <ul className="space-y-1">
              {mainNavigation.map((item, i) => (
                <motion.li
                  key={item.href + item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.45 }}
                >
                  <LocaleLink
                    href={item.href}
                    onClick={onClose}
                    className="block py-3 font-serif text-[clamp(2rem,8vw,2.75rem)] leading-none tracking-[-0.02em]"
                  >
                    {item.label}
                  </LocaleLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
