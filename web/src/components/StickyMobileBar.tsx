import { contacts } from "@/lib/site";
import { landing } from "@/data/landing";
import { Phone, Ruler, Max } from "./icons";

/**
 * Закреплённая нижняя панель на мобильных: 3 крупных действия.
 * Телефон и мессенджер часто конвертируют лучше формы у аудитории 30–60.
 * Чистый CSS, без JS.
 */
export function StickyMobileBar() {
  const m = landing.microcopy;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bone/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3">
        <a
          href={contacts.phoneHref}
          className="flex flex-col items-center gap-1 py-2.5 text-ink active:bg-ink/[0.06]"
        >
          <Phone className="h-5 w-5 text-accent" />
          <span className="text-xs font-medium">{m.stickyCall}</span>
        </a>
        <a
          href={contacts.maxHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-x border-line py-2.5 text-ink active:bg-ink/[0.06]"
        >
          <Max className="h-5 w-5" />
          <span className="text-xs font-medium">{m.stickyMax}</span>
        </a>
        <a
          href="#zayavka"
          className="flex flex-col items-center gap-1 bg-accent py-2.5 text-white active:bg-accent-700"
        >
          <Ruler className="h-5 w-5" />
          <span className="text-xs font-semibold">{m.stickyRequest}</span>
        </a>
      </div>
    </div>
  );
}
