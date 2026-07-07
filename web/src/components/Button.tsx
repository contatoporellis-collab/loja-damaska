import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // Графит → тёплый акцент на hover (премиально, высокий контраст)
  primary:
    "bg-ink text-bone hover:bg-accent shadow-[0_10px_24px_-12px_rgba(23,25,30,0.6)]",
  accent: "bg-accent text-white hover:bg-accent-700",
  outline:
    "border border-ink/20 text-ink bg-transparent hover:border-ink hover:bg-ink hover:text-bone",
  ghost: "text-ink hover:bg-ink/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.95rem] gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-full font-display font-semibold",
    "transition-[background-color,border-color,color,box-shadow] duration-200 ease-[var(--ease-out-soft)]",
    "cursor-pointer select-none whitespace-nowrap",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:opacity-55",
    variants[variant],
    sizes[size],
    className,
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  dataGoal,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Метка цели Метрики (data-goal) — читается делегированием в Analytics. */
  dataGoal?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const external = /^https?:|^tel:|^mailto:/.test(href);
  // Якорные ссылки (#...) рендерим нативным <a>: браузер сам прокручивает
  // к секции (next/link в App Router не всегда скроллит к hash на той же странице).
  if (external || href.startsWith("#")) {
    return (
      <a
        href={href}
        className={classes(variant, size, className)}
        data-goal={dataGoal}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={classes(variant, size, className)}
      data-goal={dataGoal}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
