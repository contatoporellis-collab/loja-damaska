/**
 * Маркизы DAMASKA — источник путей к фото.
 * Тексты лендинга — в landing.ts. Здесь только то, что нужно для изображений.
 */

export interface Product {
  slug: string;
  title: string;
  image: string;
}

export const products: Product[] = [
  {
    slug: "markiza-loktevaya",
    title: "Локтевая (террасная) маркиза",
    image: "/images/products/markiza-loktevaya.jpg",
  },
  {
    slug: "markiza-vitrinnaya",
    title: "Витринная маркиза",
    // Жилое фото вместо «коммерческого» (был супермаркет) — теплее для аудитории
    image: "/images/works/work-house-entrance.jpg",
  },
  {
    slug: "markiza-vertikalnaya",
    title: "Вертикальная маркиза (ZIP)",
    image: "/images/products/markiza-vertikalnaya.jpg",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
