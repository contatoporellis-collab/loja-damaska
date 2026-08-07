"use client";

import { useActionState, useEffect, useRef } from "react";
import { requestMeasurement, type MeasurementState } from "@/app/actions";
import { contacts } from "@/lib/site";
import {
  UTM_KEYS,
  YM_UID_KEY,
  captureUtm,
  captureYmClientId,
  getStoredUtm,
  reachGoal,
} from "@/lib/analytics";

const initial: MeasurementState = { status: "idle" };

const PRODUCTS = [
  "Рулонные шторы Мини",
  "Шторы День-Ночь",
  "Рулонные Блэкаут",
  "Горизонтальные жалюзи",
  "Вертикальные жалюзи",
  "Деревянные жалюзи",
  "Ещё не определился(ась)",
];

/** Маска телефона: +7 (XXX) XXX-XX-XX по мере ввода. */
function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  let out = "+7";
  if (d.length > 1) out += " (" + d.slice(1, 4);
  if (d.length >= 4) out += ") " + d.slice(4, 7);
  if (d.length >= 7) out += "-" + d.slice(7, 9);
  if (d.length >= 9) out += "-" + d.slice(9, 11);
  return out;
}

/**
 * Форма LP v2 в дизайне пакета, но на нашей доставке заявок:
 * server action requestMeasurement (amoCRM + e-mail), скрытые UTM/ClientID,
 * honeypot и цель Метрики form_submit при успехе.
 */
export function Lp2Form({ source }: { source: string }) {
  const [state, formAction, pending] = useActionState(
    requestMeasurement,
    initial,
  );
  const phoneErr =
    state.status === "error" ? state.fieldErrors?.phone : undefined;

  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    captureUtm();
    const utm = getStoredUtm();
    const form = formRef.current;
    if (!form) return;
    for (const k of UTM_KEYS) {
      const input = form.elements.namedItem(k) as HTMLInputElement | null;
      if (input) input.value = utm[k] || "";
    }
    const setYmUid = (value: string) => {
      const input = form.elements.namedItem(
        YM_UID_KEY,
      ) as HTMLInputElement | null;
      if (input) input.value = value;
    };
    if (utm[YM_UID_KEY]) setYmUid(utm[YM_UID_KEY]);
    captureYmClientId(setYmUid);
  }, []);

  useEffect(() => {
    if (state.status === "success") reachGoal("form_submit");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="form-card">
        <div className="form-ok">
          <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.75 2.25 2.25L15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h4>Заявка отправлена!</h4>
          <p>Менеджер свяжется с вами в рабочее время в течение 15 минут.</p>
          <div className="form-alt">
            <a href={contacts.whatsappHref} target="_blank" rel="noopener noreferrer">
              Написать в WhatsApp
            </a>
            <a href={contacts.maxHref} target="_blank" rel="noopener noreferrer">
              Написать в MAX
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <form ref={formRef} id="leadForm" action={formAction} noValidate>
        <h3>Рассчитать стоимость</h3>
        <p className="form-note">
          Заполните форму — перезвоним и поможем с выбором
        </p>
        <div className="field">
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Ваше имя"
            aria-label="Ваше имя"
          />
        </div>
        <div className="field">
          <input
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+7 (___) ___-__-__"
            aria-label="Телефон"
            aria-invalid={phoneErr ? true : undefined}
            onInput={(e) => {
              const el = e.currentTarget;
              el.value = formatPhone(el.value);
            }}
          />
          {phoneErr ? (
            <span role="alert" className="err">
              {phoneErr}
            </span>
          ) : null}
        </div>
        <div className="field">
          <select name="product" defaultValue="" aria-label="Что вас интересует?">
            <option value="">Что вас интересует?</option>
            {PRODUCTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* honeypot — скрыто от людей, заполняют только боты */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
        />
        <input type="hidden" name="source" value={source} />
        {UTM_KEYS.map((k) => (
          <input key={k} type="hidden" name={k} defaultValue="" />
        ))}
        <input type="hidden" name={YM_UID_KEY} defaultValue="" />

        <label className="consent">
          <input type="checkbox" name="consent" defaultChecked required />
          <span>
            Нажимая кнопку, я соглашаюсь с{" "}
            <a href="/privacy" target="_blank">
              политикой конфиденциальности
            </a>{" "}
            и даю{" "}
            <a href="/consent" target="_blank">
              согласие на обработку персональных данных
            </a>
          </span>
        </label>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Отправляем…" : "Получить расчёт"}
        </button>
      </form>
    </div>
  );
}
