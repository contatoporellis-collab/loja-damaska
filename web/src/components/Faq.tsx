import { landing } from "@/data/landing";

/** FAQ на нативных <details> — раскрытие без JavaScript. */
export function Faq({
  items = landing.faq.items,
}: {
  items?: { q: string; a: string }[];
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-[var(--radius-md)] border border-line bg-surface px-5 open:shadow-[var(--shadow-card)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] text-ink transition-transform duration-200 group-open:rotate-45 group-open:bg-accent group-open:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="pb-5 pr-10 text-[0.95rem] leading-relaxed text-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
