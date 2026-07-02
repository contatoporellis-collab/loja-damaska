/**
 * Готовые размеры локтевой маркизы в наличии.
 * Цены — рубли, данные от заказчика. Размер: ширина × вынос (см).
 */

export interface SizeRow {
  size: string; // ширина × вынос, см
  price: number; // рублей
}

export const inStockSizes: SizeRow[] = [
  { size: "250 × 200", price: 48450 },
  { size: "300 × 200", price: 53200 },
  { size: "330 × 200", price: 55470 },
  { size: "300 × 250", price: 56500 },
  { size: "330 × 250", price: 58600 },
];

export function formatRub(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₽`;
}
