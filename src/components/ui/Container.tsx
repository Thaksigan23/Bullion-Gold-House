import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] container-pad", className)}>
      {children}
    </Tag>
  );
}
