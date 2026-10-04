import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-[11px] uppercase tracking-[0.28em]",
            light ? "text-champagne" : "text-taupe",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-serif text-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.1] tracking-[-0.02em]",
          light ? "text-ivory" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-base leading-relaxed md:text-lg",
            light ? "text-ivory/75" : "text-charcoal/70",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
