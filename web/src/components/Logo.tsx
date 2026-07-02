import Link from "next/link";
import { cn } from "@/lib/cn";

/** Текстовый логотип DAMASKA с подписью. */
export function Logo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "bone";
}) {
  return (
    <Link
      href="/"
      aria-label="DAMASKA — на главную"
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-display text-[1.35rem] font-extrabold tracking-[0.12em]",
          tone === "ink" ? "text-ink" : "text-bone",
        )}
      >
        DAMA
        <span className="text-accent">S</span>
        KA
      </span>
      <span
        className={cn(
          "mt-1 text-[0.6rem] font-medium uppercase tracking-[0.24em]",
          tone === "ink" ? "text-faint" : "text-bone/60",
        )}
      >
        Солнцезащитные системы
      </span>
    </Link>
  );
}
