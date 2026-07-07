"use server";

/**
 * Запись на бесплатный замер.
 *
 * Доставка заявки — на e-mail через HTTPS (Unisender Go, транзакционные письма).
 * SMTP-порты у хостинга закрыты, поэтому шлём через HTTP API (порт 443).
 * Настраивается переменными окружения (в панели Timeweb → App → «Переменные»):
 *   MAIL_API_KEY   — API-ключ Unisender Go (обязателен для отправки)
 *   MAIL_TO        — куда слать заявки (по умолчанию damaskad@yandex.ru)
 *   MAIL_FROM      — адрес отправителя на ПОДТВЕРЖДЁННОМ домене
 *                    (по умолчанию zayavki@damaska.net)
 *   MAIL_FROM_NAME — имя отправителя (по умолчанию «Сайт DAMASKA»)
 * Если MAIL_API_KEY не задан (например, локально) — заявка только логируется
 * на сервере, форма продолжает работать.
 * Позже сюда же можно добавить дубль-доставку в бот MAX.
 */

export interface MeasurementState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<MeasurementField, string>>;
}

type MeasurementField =
  | "name"
  | "phone"
  | "address"
  | "product"
  | "date"
  | "time"
  | "comment";

const phoneRe = /[\d()+\-\s]{10,}/;

export async function scheduleMeasurement(
  _prev: MeasurementState,
  formData: FormData,
): Promise<MeasurementState> {
  const data = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    product: String(formData.get("product") ?? "").trim(),
    date: String(formData.get("date") ?? "").trim(),
    time: String(formData.get("time") ?? "").trim(),
    comment: String(formData.get("comment") ?? "").trim(),
  };

  const fieldErrors: MeasurementState["fieldErrors"] = {};
  if (data.name.length < 2) fieldErrors.name = "Укажите, как к вам обращаться";
  if (!phoneRe.test(data.phone))
    fieldErrors.phone = "Укажите корректный номер телефона";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Проверьте, пожалуйста, выделенные поля.",
      fieldErrors,
    };
  }

  await sendLead(data);

  return {
    status: "success",
    message:
      "Заявка принята! Мы свяжемся с вами в ближайшее время, чтобы согласовать дату и время бесплатного замера.",
  };
}

type Lead = {
  name: string;
  phone: string;
  address: string;
  product: string;
  date: string;
  time: string;
  comment: string;
  utm?: Record<string, string>;
};

// Порядок и подписи UTM-меток в письме.
const UTM_LABELS: [string, string][] = [
  ["utm_source", "Источник (utm_source)"],
  ["utm_medium", "Тип (utm_medium)"],
  ["utm_campaign", "Кампания (utm_campaign)"],
  ["utm_content", "Объявление (utm_content)"],
  ["utm_term", "Ключевое слово (utm_term)"],
  ["yclid", "yclid"],
];

const MAIL_API_KEY = process.env.MAIL_API_KEY;
const MAIL_TO = process.env.MAIL_TO || "damaskad@yandex.ru";
const MAIL_FROM = process.env.MAIL_FROM || "zayavki@damaska.net";
const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || "Сайт DAMASKA";
const UNISENDER_ENDPOINT =
  "https://goapi.unisender.ru/ru/transactional/api/v1/email/send.json";

function formatLead(lead: Lead): { subject: string; text: string; html: string } {
  const when = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Moscow",
  }).format(new Date());

  const rows: [string, string][] = [
    ["Имя", lead.name || "—"],
    ["Телефон", lead.phone],
    ["Откуда", lead.product || "лендинг"],
  ];
  if (lead.comment) rows.push(["Комментарий", lead.comment]);
  const utm = lead.utm ?? {};
  for (const [key, label] of UTM_LABELS) {
    if (utm[key]) rows.push([label, utm[key]]);
  }
  rows.push(["Время (МСК)", when]);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<h2 style="margin:0 0 12px">Новая заявка с сайта DAMASKA</h2>` +
    `<table style="border-collapse:collapse;font:15px/1.5 Arial,sans-serif">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td>` +
          `<td style="padding:4px 0"><b>${v}</b></td></tr>`,
      )
      .join("") +
    `</table>`;

  return { subject: `Заявка с сайта — ${lead.phone}`, text, html };
}

async function sendLead(lead: Lead): Promise<void> {
  // Всегда логируем: если письмо не уйдёт, заявка останется в логах сервера.
  console.info("[DAMASKA] Новая заявка на замер:", lead);

  if (!MAIL_API_KEY) {
    console.warn(
      "[DAMASKA] MAIL_API_KEY не задан — письмо не отправлено (заявка в логах).",
    );
    return;
  }

  const { subject, text, html } = formatLead(lead);
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(UNISENDER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": MAIL_API_KEY,
      },
      body: JSON.stringify({
        message: {
          recipients: [{ email: MAIL_TO }],
          subject,
          body: { html, plaintext: text },
          from_email: MAIL_FROM,
          from_name: MAIL_FROM_NAME,
        },
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const info = await res.text().catch(() => "");
      console.error(
        `[DAMASKA] Unisender Go вернул ошибку ${res.status}: ${info}`,
      );
    }
  } catch (err) {
    // Не роняем отправку формы из-за сбоя почты — заявка уже в логах выше.
    console.error("[DAMASKA] Не удалось отправить письмо с заявкой:", err);
  }
}

/**
 * Минимальная заявка с лендинга: только телефон обязателен, имя — нет.
 * Чем меньше полей, тем выше конверсия на мобильном трафике из Яндекс Директа.
 * Поле `company` — honeypot: его заполняют только боты.
 */
export async function requestMeasurement(
  _prev: MeasurementState,
  formData: FormData,
): Promise<MeasurementState> {
  // Антиспам: скрытое поле должно остаться пустым.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const source = String(formData.get("source") ?? "лендинг").trim();

  if (!phoneRe.test(phone)) {
    return {
      status: "error",
      message: "Укажите корректный номер телефона — перезвоним и всё рассчитаем.",
      fieldErrors: { phone: "Введите номер телефона" },
    };
  }

  // Рекламные метки из скрытых полей формы.
  const utm: Record<string, string> = {};
  for (const [key] of UTM_LABELS) {
    const v = String(formData.get(key) ?? "").trim();
    if (v) utm[key] = v;
  }

  await sendLead({
    name: name || "—",
    phone,
    address: "",
    product: source,
    date: "",
    time: "",
    comment: "",
    utm,
  });

  return { status: "success" };
}
