import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { CatalogButton } from "@/components/CatalogButton";
import { LeadForm } from "@/components/LeadForm";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingFooter } from "@/components/LandingFooter";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Check, Phone, Shield, Star, Sun } from "@/components/icons";
import { landing } from "@/data/landing";
import { workGroups } from "@/data/works";
import { contacts } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Маркизы для веранд кафе и ресторанов в Краснодаре — под ключ | DAMASKA",
  description:
    "Маркизы под ключ для летних веранд кафе и ресторанов в Краснодаре: замер, изготовление и монтаж. Больше посадочных мест весь сезон — в жару, ветер и дождь. С 2011 года, гарантия 24 мес.",
  alternates: { canonical: "/kafe-i-restorany" },
  openGraph: {
    title: "Маркизы для веранд кафе и ресторанов — под ключ в Краснодаре",
    description:
      "Замер, изготовление и монтаж под ключ. Больше посадочных мест весь сезон в любую погоду.",
    type: "website",
    locale: "ru_RU",
  },
};

function leadFormProps(source: string) {
  return {
    source,
    button: "Заказать бесплатный замер",
    altLabel: landing.hero.formAlt,
    successMessage: landing.microcopy.successMessage,
    whatsappHref: contacts.whatsappHref,
    maxHref: contacts.maxHref,
  };
}

// Портфолио для HoReCa: сначала бизнес (кафе/рестораны), внутри — общепит первым.
const HORECA_FIRST = ["work-forno-rosso", "work-rakov", "work-4syna", "work-dim-coffee"];
function orderedGroups() {
  const rank = (src: string) => {
    const i = HORECA_FIRST.findIndex((s) => src.includes(s));
    return i === -1 ? HORECA_FIRST.length : i;
  };
  return [...workGroups]
    .sort((a) => (a.title === "Для бизнеса" ? -1 : 1))
    .map((g) =>
      g.title === "Для бизнеса"
        ? { ...g, items: [...g.items].sort((x, y) => rank(x.src) - rank(y.src)) }
        : g,
    );
}

const heroBullets = [
  "Больше посадочных мест весь сезон — в жару, ветер и дождь",
  "Замер и дизайн-проект бесплатно, монтаж под ключ по Краснодару и краю",
  "Собственное производство · гарантия от 24 месяцев",
];

export default function HorecaPage() {
  const groups = orderedGroups();

  return (
    <>
      <LandingHeader />

      <main>
        {/* ----------------------------------------------------------- HERO */}
        <section className="sun-wash">
          <Container className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-20">
            <div className="flex flex-col items-start gap-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-sm text-muted backdrop-blur-sm">
                <Sun className="h-4 w-4 text-accent" />
                Фабрика солнцезащитных систем DAMASKA · Краснодар, с 2011 года
              </span>

              <h1 className="text-balance font-display text-[2rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.25rem]">
                Маркизы для летних веранд кафе и ресторанов — под ключ в
                Краснодаре
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted">
                Замер, изготовление и монтаж под ключ. Больше посадочных мест
                весь сезон — в жару, ветер и дождь.
              </p>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <ButtonLink href="#zayavka" size="lg">
                  Заказать бесплатный замер
                </ButtonLink>
                <ButtonLink
                  href={contacts.phoneHref}
                  variant="outline"
                  size="lg"
                >
                  <Phone className="h-5 w-5" />
                  Позвонить
                </ButtonLink>
              </div>

              <ul className="flex flex-col gap-2.5">
                {heroBullets.map((b, i) => (
                  <li
                    key={b}
                    className={
                      "items-start gap-2.5 text-ink/85 " +
                      (i === 2 ? "hidden sm:flex" : "flex")
                    }
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-faint">
                С 2011 года · ТОП-3 производителей маркиз юга России · гарантия
                от 24 мес
              </p>
            </div>

            <LeadForm
              id="zayavka"
              title="Оставьте имя и телефон — рассчитаем стоимость и запишем на бесплатный замер"
              subtitle={landing.hero.formSubtitle}
              className="lg:sticky lg:top-24"
              {...leadFormProps("horeca-hero")}
            />
          </Container>
        </section>

        {/* ------------------------------------------------------------ PAS */}
        <section className="section bg-sand/60">
          <Container className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface/60 p-6">
              <span className="eyebrow text-faint">Знакомо?</span>
              <p className="leading-relaxed text-muted">
                Днём веранда пустует — гости не хотят сидеть на солнцепёке. В
                дождь они уходят в зал, а часть — к конкурентам. В самый доходный
                сезон вы теряете лучшие места.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-accent/30 bg-accent/[0.06] p-6">
              <span className="eyebrow text-accent-700">Решение</span>
              <p className="leading-relaxed text-ink">
                Маркиза DAMASKA закрывает веранду от солнца, ветра и дождя. Гости
                остаются, веранда работает с утра до вечера в любую погоду — а вы
                зарабатываете весь сезон.
              </p>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------ HIGHLIGHT */}
        <section className="bg-graphite text-bone">
          <Container className="flex items-center justify-center gap-4 py-10 text-center">
            <p className="text-balance font-display text-xl font-bold leading-snug sm:text-2xl">
              Веранда под маркизой = больше гостей и больше выручки в высокий
              сезон.
            </p>
          </Container>
        </section>

        {/* ----------------------------------------------------- PORTFOLIO */}
        <section className="section">
          <Container className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <span className="eyebrow flex items-center gap-2 text-accent">
                <span className="h-px w-7 bg-accent/50" aria-hidden="true" />
                Наши работы
              </span>
              <h2 className="max-w-3xl text-balance font-display text-3xl leading-[1.08] text-ink sm:text-4xl">
                Веранды кафе и ресторанов Краснодара под маркизами DAMASKA
              </h2>
            </div>
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="eyebrow text-accent-700">{group.title}</span>
                  <p className="text-sm text-muted">{group.subtitle}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((w) => (
                    <figure
                      key={w.src}
                      className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface shadow-[var(--shadow-card)]"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={w.src}
                          alt={w.alt}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="flex flex-col gap-0.5 px-4 py-3">
                        <span className="font-display text-sm font-semibold text-ink">
                          {w.caption}
                        </span>
                        <span className="text-xs text-faint">
                          Краснодар · маркиза под ключ
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </Container>
        </section>

        {/* ---------------------------------------------------------- TRUST */}
        <section className="section bg-sand/60">
          <Container className="flex flex-col gap-10">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-4">
              {landing.proof.stats.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center gap-2 bg-surface px-4 py-8 text-center"
                >
                  <dt className="font-display text-3xl font-extrabold text-accent">
                    {f.value}
                  </dt>
                  <dd className="text-sm text-muted">{f.label}</dd>
                </div>
              ))}
            </dl>

            <div className="grid gap-5 md:grid-cols-3">
              {landing.proof.guarantees.map((g) => (
                <div
                  key={g.title}
                  className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-accent/10 text-accent">
                    <Shield className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {g.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{g.text}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-7 text-center shadow-[var(--shadow-card)]">
              <div
                className="flex items-center gap-0.5 text-amber"
                role="img"
                aria-label="Высокий рейтинг"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5" />
                ))}
              </div>
              <p className="font-display text-lg font-bold text-ink sm:text-xl">
                Более 370 отзывов о нас на Яндекс.Картах
              </p>
              <ButtonLink
                href="https://yandex.ru/profile/1356773915"
                variant="outline"
                size="md"
              >
                <Star className="h-4 w-4" />
                Читать отзывы на Яндексе
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------ FINAL CTA */}
        <section className="section">
          <Container>
            <div className="sun-wash relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface">
              <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="flex flex-col gap-5">
                  <h2 className="text-balance font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                    Закажите бесплатный замер веранды
                  </h2>
                  <p className="text-lg leading-relaxed text-muted">
                    Оставьте имя и телефон — приедем, снимем размеры и рассчитаем
                    стоимость маркизы под вашу веранду. Замер и дизайн-проект
                    бесплатно, по Краснодару и краю.
                  </p>
                  <p className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-amber/30 bg-amber/[0.08] p-4 text-sm leading-relaxed text-ink/80">
                    <Sun className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {landing.finalCta.urgency}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <a
                      href={contacts.phoneHref}
                      className="flex items-center gap-2 font-display text-xl font-bold text-ink transition-colors hover:text-accent"
                    >
                      <Phone className="h-5 w-5 text-accent" />
                      {contacts.phone}
                    </a>
                  </div>
                  <CatalogButton className="self-start" />
                </div>

                <LeadForm
                  id="zakaz"
                  title="Оставьте имя и телефон — рассчитаем стоимость и запишем на бесплатный замер"
                  subtitle={landing.hero.formSubtitle}
                  {...leadFormProps("horeca-final")}
                />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <LandingFooter />
      <StickyMobileBar />
      <FloatingWhatsApp />
    </>
  );
}
