"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (isTouch) return;

    const tick = () => {
      const ease = reduced ? 1 : 0.22;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;
      if (elRef.current) {
        elRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = e.target as HTMLElement | null;
      // Never show custom cursor over textual card content
      if (el?.closest("[data-cursor-ignore]")) {
        setVisible(false);
        setLabel(null);
        return;
      }
      const hit = el?.closest("[data-cursor]") as HTMLElement | null;
      if (hit) {
        setLabel(hit.dataset.cursor || "View");
        setVisible(true);
      } else {
        setVisible(false);
        setLabel(null);
      }
    };

    const onLeave = () => {
      setVisible(false);
      setLabel(null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isTouch, reduced]);

  if (isTouch) return null;

  return (
    <div
      ref={elRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[100] hidden h-[48px] w-[48px] items-center justify-center rounded-full bg-charcoal text-[8px] uppercase tracking-[0.16em] text-ivory transition-opacity duration-200 lg:flex",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      {label}
    </div>
  );
}
