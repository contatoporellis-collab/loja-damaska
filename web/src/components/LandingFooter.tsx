import { Container } from "./Container";
import { contacts, site } from "@/lib/site";
import { MapPin, Phone, Telegram, Whatsapp } from "./icons";

export function LandingFooter() {
  return (
    <footer className="bg-graphite pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-bone/70 lg:pb-0">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl font-extrabold tracking-[0.12em] text-bone">
            DAMA<span className="text-amber">S</span>KA
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-bone/55">
            {site.legalName}. Собственное производство маркиз в {site.city}е с{" "}
            {site.since} года. Замер и монтаж под ключ по Краснодару и краю;
            готовые маркизы отправляем по всей России.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-bone/15 px-3 py-1 text-bone/70">
              ТОП-3 юга России
            </span>
            <span className="rounded-full border border-bone/15 px-3 py-1 text-bone/70">
              Гарантия от 24 мес
            </span>
            <span className="rounded-full border border-bone/15 px-3 py-1 text-bone/70">
              450+ тканей
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-bone">
            Контакты
          </span>
          <a
            href={contacts.phoneHref}
            className="flex items-center gap-2.5 font-display text-lg font-semibold text-bone transition-colors hover:text-amber"
          >
            <Phone className="h-5 w-5" />
            {contacts.phone}
          </a>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={contacts.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-bone/15 px-3 py-1.5 text-sm text-bone/75 transition-colors hover:text-amber"
            >
              <Whatsapp className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={contacts.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-bone/15 px-3 py-1.5 text-sm text-bone/75 transition-colors hover:text-amber"
            >
              <Telegram className="h-4 w-4" />
              Telegram
            </a>
            <a
              href={contacts.vkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-bone/15 px-3 py-1.5 text-sm text-bone/75 transition-colors hover:text-amber"
            >
              VK
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-bone">
            Шоурум
          </span>
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-bone/60">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
            {contacts.address}
          </p>
        </div>
      </Container>

      <div className="border-t border-bone/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {2026} {site.name}. {site.tagline}.
          </p>
          <p>Маркизы под ключ в Краснодаре и Краснодарском крае.</p>
        </Container>
      </div>
    </footer>
  );
}
