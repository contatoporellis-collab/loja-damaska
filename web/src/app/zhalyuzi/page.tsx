import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { LeadForm } from "@/components/LeadForm";
import { Faq } from "@/components/Faq";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingFooter } from "@/components/LandingFooter";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import {
  ArrowRight,
  Check,
  Factory,
  Phone,
  Rain,
  Ruler,
  Shield,
  Star,
  Sun,
  Swatches,
  Wind,
} from "@/components/icons";
import { type BenefitIcon } from "@/data/landing";
import { landingZhalyuzi as landing } from "@/data/landing-zhalyuzi";
import { contacts, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: landing.seo.title },
  description: landing.seo.description,
  alternates: { canonical: "/zhalyuzi" },
  openGraph: {
    title: landing.seo.ogTitle,
    description: landing.seo.description,
    type: "website",
    locale: "ru_RU",
    siteName: "DAMASKA",
    url: `${site.url}/zhalyuzi`,
    images: [
      {
        url: `${site.url}/images/zhalyuzi/zh-den-noch-more.jpg`,
        width: 1200,
        height: 630,
        alt: "Рулонные шторы день-ночь DAMASKA в доме с видом на море",
      },
    ],
  },
};

const benefitIcons: Record<BenefitIcon, typeof Sun> = {
  sun: Sun,
  wind: Wind,
  rain: Rain,
  shield: Shield,
  ruler: Ruler,
  swatches: Swatches,
  factory: Factory,
  star: Star,
};

function leadFormProps(source: string) {
  const h = landing.hero;
  return {
    source,
    button: h.formButton,
    altLabel: h.formAlt,
    successMessage: landing.microcopy.successMessage,
    whatsappHref: contacts.whatsappHref,
    maxHref: contacts.maxHref,
  };
}

/** WhatsApp с преднастроенным сообщением под дистанционный заказ. */
const zhalyuziWhatsappHref =
  `${contacts.whatsappHref}?text=` +
  encodeURIComponent(
    "Здравствуйте! Хочу заказать жалюзи/рулонные шторы с доставкой на побережье. Пришлю размеры и фото окна.",
  );

export default function ZhalyuziLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DAMASKA — Фабрика солнцезащитных систем",
    description: landing.seo.description,
    image: `${site.url}/images/zhalyuzi/zh-den-noch-more.jpg`,
    telephone: "+79282684085",
    foundingDate: "2011",
    priceRange: "от 3 600 ₽",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Дальняя, 43, офис 306",
      addressLocality: "Краснодар",
      addressRegion: "Краснодарский край",
      addressCountry: "RU",
    },
    areaServed: ["Сочи", "Новороссийск", "Анапа", "Геленджик", "Туапсе"],
    sameAs: [contacts.vkHref, contacts.maxHref],
    url: `${site.url}/zhalyuzi`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LandingHeader cta="Получить расчёт" />

      <main>
        {/* ----------------------------------------------------------- HERO */}
        <section className="sun-wash">
          <Container className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-20">
            <div className="flex flex-col items-start gap-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-sm text-muted backdrop-blur-sm">
                <Sun className="h-4 w-4 text-accent" />
                {landing.hero.eyebrow}
              </span>

              <h1 className="text-balance font-display text-[2rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.25rem]">
                {landing.hero.h1}
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted">
                {landing.hero.subhead}
              </p>

              {/* Главное действие — выше «на первом экране» мобильного */}
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <ButtonLink href="#zayavka" size="lg">
                  {landing.hero.ctaPrimary}
                </ButtonLink>
                <ButtonLink href={contacts.phoneHref} variant="outline" size="lg">
                  <Phone className="h-5 w-5" />
                  {landing.hero.ctaSecondary}
                </ButtonLink>
              </div>

              <ul className="flex flex-col gap-2.5">
                {landing.hero.bullets.map((b, i) => (
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

              <p className="text-sm text-faint">{landing.hero.trustline}</p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="text-faint">Сразу к делу:</span>
                <a
                  href="#vidy"
                  className="inline-flex items-center gap-1 font-medium text-ink/75 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Виды и цены
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#kak-zakazat"
                  className="inline-flex items-center gap-1 font-medium text-ink/75 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Как заказать без замерщика
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Форма заявки — главное действие, видно сразу */}
            <LeadForm
              id="zayavka"
              title={landing.hero.formTitle}
              subtitle={landing.hero.formSubtitle}
              className="lg:sticky lg:top-24"
              {...leadFormProps("zhalyuzi-hero")}
            />
          </Container>
        </section>

        {/* ---------------------------------- SHOWCASE (диптих: терраса + море) */}
        <section className="relative">
          <div className="relative grid aspect-[16/11] w-full grid-cols-2 overflow-hidden bg-sand sm:aspect-[21/9]">
            {/* Левая половина — терраса с рулонными шторами скрин */}
            <div className="relative overflow-hidden">
              <Image
                src="/images/zhalyuzi/zh-rulonnye-terrasa.jpg"
                alt="Рулонные шторы скрин DAMASKA в стеклянном павильоне у сада"
                fill
                loading="lazy"
                sizes="50vw"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-graphite/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-bone backdrop-blur-sm">
                Терраса
              </span>
            </div>
            {/* Правая половина — день-ночь с видом на море */}
            <div className="relative overflow-hidden border-l-2 border-bone/80">
              <Image
                src="/images/zhalyuzi/zh-den-noch-more.jpg"
                alt="Рулонные шторы день-ночь DAMASKA в доме с видом на море и горы"
                fill
                loading="lazy"
                sizes="50vw"
                className="object-cover"
              />
              <span className="absolute right-3 top-3 rounded-full bg-graphite/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-bone backdrop-blur-sm">
                У моря
              </span>
            </div>
            {/* Градиент + подпись на всю ширину */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-graphite/85 via-graphite/25 to-transparent" />
            <Container className="absolute inset-x-0 bottom-0">
              <div className="flex flex-col gap-2 pb-7">
                <span className="font-display text-lg font-bold text-bone sm:text-2xl">
                  Изготовим по вашим размерам — доставим на побережье
                </span>
                <span className="text-sm text-bone/80 sm:text-base">
                  Собственная фабрика с 2011 года · Сочи · Новороссийск · Анапа ·
                  Геленджик
                </span>
              </div>
            </Container>
          </div>
        </section>

        {/* ------------------------------------------------------------ PAS */}
        <section className="section bg-sand/60">
          <Container className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface/60 p-6">
              <span className="eyebrow text-faint">Знакомо?</span>
              <p className="leading-relaxed text-muted">{landing.pas.problem}</p>
            </div>
            <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface/60 p-6">
              <span className="eyebrow text-faint">И что в итоге</span>
              <p className="leading-relaxed text-muted">{landing.pas.agitate}</p>
            </div>
            <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-accent/30 bg-accent/[0.06] p-6">
              <span className="eyebrow text-accent-700">Решение</span>
              <p className="leading-relaxed text-ink">{landing.pas.solution}</p>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------- BENEFITS */}
        <section className="section">
          <Container className="flex flex-col gap-10">
            <SectionTitle
              eyebrow="Преимущества"
              title={landing.benefits.title}
              lead={landing.benefits.subtitle}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {landing.benefits.items.map((b) => {
                const Icon = benefitIcons[b.icon];
                return (
                  <div
                    key={b.title}
                    className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-6"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {b.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">{b.text}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------- TYPES */}
        <section id="vidy" className="section scroll-mt-24 bg-graphite text-bone">
          <Container className="flex flex-col gap-10">
            <SectionTitle
              eyebrow="Виды и цены"
              title={landing.types.title}
              lead={landing.types.subtitle}
              tone="dark"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {landing.types.items.map((t) => (
                <article
                  key={t.name}
                  className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-bone/10 bg-graphite-700/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-graphite/85 px-3 py-1 text-xs font-medium text-bone/90 backdrop-blur-sm">
                      {t.bestFor}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-display text-lg font-bold text-bone">
                      {t.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-bone/65">
                      {t.blurb}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-bone/10 pt-4">
                      <span className="font-display text-lg font-bold text-amber">
                        {t.priceNote}
                      </span>
                      <ButtonLink href="#zayavka" variant="accent" size="md">
                        Рассчитать
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-bone/50">
              Цены указаны «от»: рулонные — за створку 50×120 см, жалюзи — за
              м². Точную стоимость по вашим размерам посчитаем за один звонок и
              зафиксируем до производства.
            </p>
          </Container>
        </section>

        {/* --------------------------------------- КАК ЗАКАЗАТЬ (самозамер) */}
        <section id="kak-zakazat" className="section scroll-mt-24 bg-sand/60">
          <Container className="flex flex-col gap-10">
            <SectionTitle
              eyebrow={landing.samozamer.eyebrow}
              title={landing.samozamer.title}
              lead={landing.samozamer.lead}
            />
            <ol className="grid gap-5 md:grid-cols-3">
              {landing.samozamer.steps.map((s, i) => (
                <li
                  key={s.title}
                  className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-base font-bold text-bone">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-base font-semibold leading-snug text-ink">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-2.5">
              {landing.samozamer.chips.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink/80"
                >
                  <Check className="h-4 w-4 text-accent" />
                  {p}
                </span>
              ))}
            </div>
            <div className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-amber/30 bg-amber/[0.08] p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex max-w-2xl items-start gap-2.5 text-sm leading-relaxed text-ink/80">
                <Ruler className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {landing.samozamer.zamerNote}
              </p>
              <ButtonLink
                href={zhalyuziWhatsappHref}
                variant="outline"
                size="md"
                className="shrink-0"
              >
                Прислать размеры в WhatsApp
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* -------------------------------------------------- DIFFERENTIALS */}
        <section className="section">
          <Container className="flex flex-col gap-10">
            <SectionTitle
              eyebrow="Почему мы"
              title={landing.differentials.title}
              lead={landing.differentials.subtitle}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {landing.differentials.items.map((d, i) => (
                <div
                  key={d.title}
                  className="relative flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-6"
                >
                  <span className="font-display text-3xl font-extrabold text-line">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{d.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* -------------------------------------------------------- PROCESS */}
        <section className="section bg-sand/60">
          <Container className="flex flex-col gap-10">
            <SectionTitle
              eyebrow="Как это работает"
              title={landing.process.title}
              lead={landing.process.subtitle}
            />
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {landing.process.steps.map((s, i) => (
                <li
                  key={s.title}
                  className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-base font-bold text-bone">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-base font-semibold leading-snug text-ink">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="flex justify-center">
              <ButtonLink href="#zakaz" size="lg">
                Получить расчёт
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------- PROOF */}
        <section className="section">
          <Container className="flex flex-col gap-10">
            <SectionTitle eyebrow="Нам доверяют" title={landing.proof.title} />

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
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Реальные отзывы клиентов о работе фабрики «Дамаска» — их можно
                прочитать и проверить.
              </p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink
                  href="https://yandex.ru/profile/1356773915"
                  variant="outline"
                  size="md"
                >
                  <Star className="h-4 w-4" />
                  Читать отзывы на Яндексе
                </ButtonLink>
                <a
                  href={contacts.vkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent underline-offset-2 hover:underline"
                >
                  Мы во ВКонтакте
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------ FAQ */}
        <section className="section bg-sand/60">
          <Container className="flex flex-col gap-10">
            <SectionTitle
              eyebrow="Вопросы и ответы"
              title={landing.faq.title}
              align="center"
            />
            <Faq items={landing.faq.items} />
          </Container>
        </section>

        {/* ----------------------------------- НЕ С ПОБЕРЕЖЬЯ (вторично) */}
        <section className="border-y border-line bg-sand/40">
          <Container className="flex flex-col items-start gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-display text-base font-semibold text-ink">
                Вы в Краснодаре или крае?
              </span>
              <p className="max-w-2xl text-sm leading-relaxed text-muted">
                По Краснодару и краю работаем под ключ: бесплатный замер,
                изготовление и монтаж нашими мастерами. А ещё делаем уличные
                маркизы и перголы для террас и кафе.
              </p>
            </div>
            <ButtonLink
              href="#zayavka"
              variant="outline"
              size="md"
              className="shrink-0"
            >
              Оставить заявку
            </ButtonLink>
          </Container>
        </section>

        {/* ------------------------------------------------------ FINAL CTA */}
        <section className="section">
          <Container>
            <div className="sun-wash relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface">
              <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="flex flex-col gap-5">
                  <h2 className="text-balance font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                    {landing.finalCta.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted">
                    {landing.finalCta.text}
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
                </div>

                <LeadForm
                  id="zakaz"
                  title={landing.finalCta.title}
                  subtitle={landing.hero.formSubtitle}
                  {...leadFormProps("zhalyuzi-final")}
                />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <LandingFooter />
      <StickyMobileBar requestLabel="Расчёт" />
      <FloatingWhatsApp />
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={
        "flex flex-col gap-4" + (align === "center" ? " items-center text-center" : "")
      }
    >
      <span className="eyebrow flex items-center gap-2 text-accent">
        <span className="h-px w-7 bg-accent/50" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        className={
          "max-w-3xl text-balance text-3xl leading-[1.08] sm:text-4xl " +
          (tone === "dark" ? "text-bone" : "text-ink")
        }
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={
            "max-w-2xl text-base leading-relaxed sm:text-lg " +
            (tone === "dark" ? "text-bone/65" : "text-muted") +
            (align === "center" ? " mx-auto" : "")
          }
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
