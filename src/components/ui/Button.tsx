import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-charcoal text-ivory hover:bg-near-black border border-charcoal",
  secondary:
    "bg-transparent text-ivory border border-ivory/70 hover:bg-ivory/10",
  outline:
    "bg-transparent text-charcoal border border-charcoal/25 hover:border-champagne hover:text-near-black",
  ghost: "bg-transparent text-charcoal hover:text-champagne",
  gold: "bg-champagne text-near-black hover:bg-[#c4ad78] border border-champagne",
} as const;

const sizes = {
  sm: "px-4 py-2 text-[11px] tracking-[0.18em]",
  md: "px-6 py-3 text-[11px] tracking-[0.2em]",
  lg: "px-8 py-3.5 text-xs tracking-[0.22em]",
} as const;

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

function isExternal(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("https://wa.me")
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center uppercase font-sans transition-colors duration-300 disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
