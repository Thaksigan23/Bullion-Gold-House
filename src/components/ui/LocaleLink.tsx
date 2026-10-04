"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { localizedHref } from "@/lib/i18n";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";

export function LocaleLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
} & React.ComponentPropsWithoutRef<"a">) {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  return (
    <Link
      href={localizedHref(href, locale)}
      className={cn(className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
