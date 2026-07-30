/**
 * Яндекс.Метрика + цели (goals) и захват UTM/yclid.
 * ID счётчика берётся из переменной окружения NEXT_PUBLIC_YM_ID.
 * Пока она не задана — счётчик не подключается, цели молча игнорируются
 * (сайт работает без аналитики, например локально).
 */

export const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

type YmFn = (id: number, action: string, ...rest: unknown[]) => void;

/** Отправить цель в Метрику. Безопасно вызывать где угодно (SSR/без счётчика). */
export function reachGoal(name: string): void {
  if (typeof window === "undefined" || !YM_ID) return;
  const ym = (window as unknown as { ym?: YmFn }).ym;
  if (typeof ym === "function") ym(Number(YM_ID), "reachGoal", name);
}

/** Метки, которые снимаем с URL и передаём вместе с заявкой. */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid",
] as const;

const STORE_KEY = "damaska_utm";

/** Считать метки из URL один раз и сохранить на время сессии. */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const store = getStoredUtm();
    let changed = false;
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v && !store[k]) {
        store[k] = v;
        changed = true;
      }
    }
    if (changed) sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    /* приватный режим / нет sessionStorage — не критично */
  }
}

/** Ранее захваченные метки (пусто, если yclid/utm не пришли). */
export function getStoredUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

/**
 * ClientID Метрики — ключ, по которому коннектор Метрика↔amoCRM связывает
 * сделку с визитом на сайте (поле `_ym_uid`, код `_YM_UID` в CRM).
 * Без него заказы из CRM не доезжают до отчётов Метрики и Директа.
 */
export const YM_UID_KEY = "_ym_uid";

/**
 * Спросить ClientID у счётчика и положить рядом с метками.
 * Ответ приходит асинхронно, поэтому есть колбэк: форма проставляет
 * значение в скрытое поле по готовности, а не в момент монтирования.
 */
export function captureYmClientId(onReady?: (clientId: string) => void): void {
  if (typeof window === "undefined" || !YM_ID) return;
  const ym = (window as unknown as { ym?: YmFn }).ym;
  if (typeof ym !== "function") return;
  try {
    ym(Number(YM_ID), "getClientID", (clientId: string) => {
      if (!clientId) return;
      try {
        const store = getStoredUtm();
        if (store[YM_UID_KEY] !== clientId) {
          store[YM_UID_KEY] = clientId;
          sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
        }
      } catch {
        /* приватный режим / нет sessionStorage — не критично */
      }
      onReady?.(clientId);
    });
  } catch {
    /* счётчик ещё не готов — заявка уйдёт без ClientID */
  }
}
