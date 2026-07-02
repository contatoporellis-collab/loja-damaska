import { Container } from "./Container";
import { ButtonLink } from "./Button";
import { Check } from "./icons";
import { inStockFabrics, orderFabrics, type Fabric } from "@/data/fabrics";

/**
 * «Цвета в наличии» — ткани с быстрой доставкой + остальная палитра под заказ.
 * Тёмная секция для акцента, CSS-образцы (без картинок) — не влияет на скорость.
 * SEO: маркизы в наличии / готовые маркизы / быстрая доставка / Краснодар, Краснодарский край.
 */
export function InStockColors() {
  return (
    <section id="cveta" className="section bg-graphite text-bone">
      <Container className="flex flex-col gap-9">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="eyebrow inline-flex w-fit items-center gap-2 text-amber">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            В наличии · быстрая доставка
          </span>

          <h2 className="text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
            Маркизы в наличии — популярные цвета с быстрой доставкой
          </h2>

          <p className="text-base leading-relaxed text-bone/70 sm:text-lg">
            Эти цвета тканей всегда есть на нашем складе в Краснодаре — маркизу из
            них мы изготавливаем и отправляем заметно быстрее, чем под заказ. Это
            самые востребованные оттенки у наших клиентов, того же качества, что и
            весь ассортимент. Быстрая покупка и доставка по Краснодару и всему
            Краснодарскому краю.
          </p>

          <ul className="flex flex-wrap gap-2 pt-1">
            {[
              "Та же гарантия от 24 мес",
              "Производство — быстрее",
              "Доставка по краю и России",
            ].map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-3.5 py-1.5 text-sm text-bone/80"
              >
                <Check className="h-4 w-4 text-amber" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* В наличии */}
        <div className="flex flex-col gap-4">
          <h3 className="inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.12em] text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3ddc84]" />
            Сейчас в наличии — быстрая доставка
          </h3>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {inStockFabrics.map((f) => (
              <Swatch key={f.code} fabric={f} inStock />
            ))}
          </ul>
        </div>

        {/* Под заказ */}
        <div className="flex flex-col gap-4 border-t border-bone/10 pt-8">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-bone/55">
            Ещё цвета — под заказ · более 450 тканей в каталоге
          </h3>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {orderFabrics.map((f) => (
              <Swatch key={f.code} fabric={f} inStock={false} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4 border-t border-bone/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-bone/55">
            Наличие цветов может меняться в зависимости от склада — актуальные
            оттенки и сроки уточняйте при заказе.
          </p>
          <ButtonLink href="#zakaz" variant="accent" size="lg" className="shrink-0">
            Заказать маркизу из наличия
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function Swatch({ fabric, inStock }: { fabric: Fabric; inStock: boolean }) {
  const hit = !!fabric.isHit;
  return (
    <li className="group flex flex-col gap-2">
      <div
        className={
          "relative aspect-square overflow-hidden rounded-[var(--radius-md)] shadow-[0_6px_16px_-8px_rgba(0,0,0,0.6)] transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 " +
          (hit ? "border-2 border-amber" : "border border-bone/20")
        }
        style={{ background: fabric.css }}
        role="img"
        aria-label={`Цвет ${fabric.name} ${fabric.code}${hit ? " — хит продаж" : ""}${inStock ? " — в наличии" : " — под заказ"}`}
      >
        {hit ? (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-amber px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-graphite shadow-sm">
            Хит
          </span>
        ) : null}
        {inStock ? (
          <span className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-graphite/70 text-[#3ddc84] backdrop-blur-sm">
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </div>
      <div className="flex items-baseline gap-1.5 px-0.5">
        <span
          className={
            "font-display text-sm font-semibold " +
            (inStock ? "text-bone" : "text-bone/70")
          }
        >
          {fabric.name}
        </span>
        <span className="text-xs text-bone/50">{fabric.code}</span>
      </div>
    </li>
  );
}
