"use server";

/**
 * Запись на бесплатный замер.
 *
 * Пока это «заглушка»: заявка валидируется и логируется на сервере.
 * Реальная доставка (Telegram-бот / e-mail) подключается отдельным этапом —
 * достаточно заменить тело sendLead().
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
};

async function sendLead(lead: Lead): Promise<void> {
  // TODO: подключить доставку заявок (Telegram-бот / e-mail).
  console.info("[DAMASKA] Новая заявка на замер:", lead);
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

  await sendLead({
    name: name || "—",
    phone,
    address: "",
    product: source,
    date: "",
    time: "",
    comment: "",
  });

  return { status: "success" };
}
