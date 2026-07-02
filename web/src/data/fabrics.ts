/**
 * Цвета тканей DAMASKA из каталога (стр. 16).
 * inStock=true — цвета в наличии (быстрая доставка), согласованы с заказчиком.
 * isHit=true — хиты продаж (показываем первыми).
 * Остальные — под заказ (часть ассортимента 450+ тканей). НЕ добавлять новые цвета.
 * Образцы — CSS (без картинок) → не влияет на скорость.
 * Цвет/паттерн — представление по каталогу; финальный эталон — реальный образец ткани.
 */

export interface Fabric {
  code: string;
  name: string;
  css: string; // background образца (сплошной цвет или полосы)
  inStock: boolean;
  isHit?: boolean;
}

function stripe(...colors: string[]): string {
  const band = 8; // px на одну полосу
  const stops = colors
    .map((c, i) => `${c} ${i * band}px ${(i + 1) * band}px`)
    .join(", ");
  return `repeating-linear-gradient(90deg, ${stops})`;
}

export const fabrics: Fabric[] = [
  // ——— В НАЛИЧИИ — хиты продаж сначала ———
  { code: "007", name: "Serena", css: "#1f3aa6", inStock: true, isHit: true },
  { code: "011", name: "Lucena", css: stripe("#f4c41e", "#ffffff"), inStock: true, isHit: true },
  { code: "012", name: "Teruel", css: stripe("#2f63c8", "#ffffff"), inStock: true, isHit: true },
  { code: "362", name: "Petrusa", css: stripe("#6e9b5e", "#ded7c4", "#9aa0a2"), inStock: true, isHit: true },
  { code: "040", name: "Girona", css: "#d62b1f", inStock: true, isHit: true },
  { code: "328", name: "Ibiza", css: "#44c2bb", inStock: true, isHit: true },
  // ——— В НАЛИЧИИ — остальные ———
  { code: "002", name: "Abba", css: "#d9a6a0", inStock: true },
  { code: "003", name: "Domingo", css: "#f3a712", inStock: true },
  { code: "005", name: "Valor", css: "#3a2a23", inStock: true },
  { code: "014", name: "Madrid", css: stripe("#3a3f47", "#ffffff"), inStock: true },
  { code: "028", name: "Bilbao", css: stripe("#e070a8", "#ffffff"), inStock: true },
  { code: "041", name: "Tortosa", css: "#cec7b8", inStock: true },
  { code: "064", name: "Gatiga", css: "#6fc62a", inStock: true },
  { code: "067", name: "Cabo", css: "#8b9094", inStock: true },
  { code: "085", name: "Motril", css: "#e7dfce", inStock: true },
  { code: "490", name: "Hihon", css: "#5a2d8c", inStock: true },

  // ——— ПОД ЗАКАЗ (из каталога, не на складе) ———
  { code: "001", name: "Abant", css: "#ece4d6", inStock: false },
  { code: "017", name: "Laurca", css: stripe("#c9cdd2", "#ffffff"), inStock: false },
  { code: "019", name: "Palma", css: stripe("#4e9e6a", "#ffffff"), inStock: false },
  { code: "039", name: "Acura", css: "#1a1a1a", inStock: false },
  { code: "060", name: "Buesta", css: "#7a1f33", inStock: false },
  { code: "630", name: "Avila", css: stripe("#7d4a55", "#c8bfb2", "#e9e2d4"), inStock: false },
  { code: "069", name: "Manresa", css: stripe("#7d9a6a", "#d9cdb0"), inStock: false },
  { code: "072", name: "Campos", css: "#1f5c3a", inStock: false },
  { code: "016", name: "Carino", css: stripe("#9a8466", "#b9bcbe"), inStock: false },
  { code: "528", name: "Gabos", css: stripe("#3f7bd6", "#ffffff"), inStock: false },
  { code: "529", name: "Guardo", css: stripe("#f2c200", "#ffffff"), inStock: false },
  { code: "506", name: "Maneka", css: stripe("#c0566a", "#ece2d2"), inStock: false },
  { code: "386", name: "Ribera", css: stripe("#8a9aa8", "#5f7488"), inStock: false },
  { code: "646", name: "Valbona", css: stripe("#a99a86", "#cdc9c2"), inStock: false },
  { code: "364", name: "Valdes", css: stripe("#7a3b46", "#e2d8c6"), inStock: false },
  { code: "079", name: "Linares", css: "#c2a878", inStock: false },
  { code: "591", name: "Tilda", css: "#9a9456", inStock: false },
  { code: "569", name: "Elda", css: stripe("#7ec62a", "#ffffff"), inStock: false },
  { code: "960", name: "Valencia", css: stripe("#c79a5e", "#2a2a2a"), inStock: false },
  { code: "547", name: "Malaga", css: stripe("#8a6f56", "#b3a99a"), inStock: false },
];

export const inStockFabrics = fabrics.filter((f) => f.inStock);
export const orderFabrics = fabrics.filter((f) => !f.inStock);
