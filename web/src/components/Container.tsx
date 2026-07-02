import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[78rem] px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
