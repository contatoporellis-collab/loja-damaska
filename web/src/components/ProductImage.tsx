"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Изображение товара с аккуратным запасным вариантом.
 * Пока реальные фото не загружены в /public/images/products,
 * показываем брендовую «маркизную» заглушку с названием.
 */
export function ProductImage({
  src,
  alt,
  title,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "relative flex h-full w-full items-end overflow-hidden bg-sand",
          className,
        )}
        aria-label={alt}
        role="img"
      >
        {/* тёплый солнечный градиент */}
        <div className="sun-wash absolute inset-0" />
        {/* диагональные «маркизные» полосы */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 16%, transparent) 0 18px, transparent 18px 40px)",
          }}
        />
        <div className="absolute right-4 top-4 font-display text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/40">
          Дамаска
        </div>
        {title ? (
          <p className="relative z-10 max-w-[80%] p-5 font-display text-lg font-semibold leading-tight text-ink/80">
            {title}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
