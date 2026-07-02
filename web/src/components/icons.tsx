import type { SVGProps } from "react";

/**
 * Минимальный набор иконок (24×24, stroke=currentColor), в стиле Lucide.
 * Никаких эмодзи в интерфейсе.
 */

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function Telegram(props: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M21.94 4.6 18.9 19.3c-.23 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.18c-.25.25-.46.46-.95.46l.34-4.8 8.73-7.9c.38-.34-.08-.53-.59-.19L6.69 13.2l-4.65-1.46c-1.01-.32-1.03-1.01.21-1.5l18.18-7c.84-.31 1.58.2 1.31 1.36Z" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/** Собственное производство — фабрика. */
export function Factory(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M4 21V9l6 4V9l6 4V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v15" />
      <path d="M8 21v-4M12 21v-4" />
    </svg>
  );
}

/** Гарантия качества — щит с галочкой. */
export function Shield(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 11.5 1.8 1.8 3.4-3.6" />
    </svg>
  );
}

/** Широкий ассортимент тканей — образцы. */
export function Swatches(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 17.5a3.5 3.5 0 0 0 7 0 3.5 3.5 0 0 0-7 0Z" />
    </svg>
  );
}

/** Бесплатный замер — линейка. */
export function Ruler(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="m16 2 6 6L8 22l-6-6L16 2Z" />
      <path d="M7.5 10.5 9 12M10.5 7.5 12 9M13.5 4.5 15 6M4.5 13.5 6 15" />
    </svg>
  );
}

export function Sun(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function Wind(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M12.8 19.6A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.4A2 2 0 1 1 11 8H2" />
    </svg>
  );
}

export function Rain(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M16 13a5 5 0 0 0-1-9.9A6 6 0 0 0 4 7a4.5 4.5 0 0 0 1 8.9" />
      <path d="M8 18.5 7 21M12 18.5 11 21M16 18.5 15 21" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.7L12 2Z" />
    </svg>
  );
}

export function Whatsapp(props: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M.06 24l1.68-6.13A11.82 11.82 0 0 1 .16 11.9C.16 5.34 5.5 0 12.06 0a11.82 11.82 0 0 1 8.42 3.49 11.82 11.82 0 0 1 3.49 8.42c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.45L.06 24Zm6.6-3.8c1.68.99 3.28 1.59 5.4 1.59 5.45 0 9.89-4.43 9.89-9.88 0-5.46-4.43-9.89-9.89-9.89C6.6 2.02 2.17 6.45 2.17 11.9c0 2.24.65 3.92 1.74 5.68l-.99 3.62 3.74-.99Zm11.39-5.55c-.07-.12-.27-.2-.56-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41Z" />
    </svg>
  );
}

const icons = {
  ArrowRight,
  ArrowUpRight,
  Check,
  Phone,
  Telegram,
  MapPin,
  Menu,
  Close,
  Factory,
  Shield,
  Swatches,
  Ruler,
  Sun,
  Wind,
};

export default icons;
