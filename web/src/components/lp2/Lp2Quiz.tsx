"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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

/** Шаги квиза: большие кнопки, автопереход, контакты только в конце. */
const STEPS: { title: string; options: string[] }[] = [
  {
    title: "Что подбираете?",
    options: [
      "Рулонные шторы",
      "Жалюзи",
      "День-ночь или блэкаут",
      "Пока не знаю — посоветуйте",
    ],
  },
  {
    title: "Куда нужны шторы?",
    options: ["Квартира", "Дом или дача", "Офис или бизнес"],
  },
  {
    title: "Сколько окон?",
    options: ["1 окно", "2–3 окна", "4–7 окон", "Больше 7"],
  },
  {
    title: "Когда хотите установить?",
    options: ["На этой неделе", "В этом месяце", "Пока просто узнать цены"],
  },
];

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

export function Lp2Quiz({ source }: { source: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [state, formAction, pending] = useActionState(
    requestMeasurement,
    initial,
  );
  const phoneErr =
    state.status === "error" ? state.fieldErrors?.phone : undefined;

  const formRef = useRef<HTMLFormElement>(null);
  const contactStep = step >= STEPS.length;

  // UTM/ClientID проставляем, когда появляется контактный шаг с формой.
  useEffect(() => {
    if (!contactStep) return;
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
  }, [contactStep]);

  useEffect(() => {
    if (state.status === "success") reachGoal("form_submit");
  }, [state.status]);

  const pick = (opt: string) => {
    setAnswers((a) => [...a.slice(0, step), opt]);
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const progress = Math.round(
    (Math.min(step, STEPS.length) / (STEPS.length + 1)) * 100,
  );

  if (state.status === "success") {
    return (
      <div className="quiz-card">
        <div className="form-ok">
          <svg fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.75 2.25 2.25L15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h4>Готово — подбираем варианты!</h4>
          <p>
            Менеджер перезвонит в рабочее время в течение 15 минут с расчётом
            под ваши ответы.
          </p>
          <div className="form-alt">
            <a
              href={contacts.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Написать в WhatsApp
            </a>
            <a href={contacts.phoneHref}>Позвонить сейчас</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-card">
      <div className="quiz-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }}></span>
      </div>

      {!contactStep ? (
        <div key={step}>
          <div className="quiz-step-label">
            Вопрос {step + 1} из {STEPS.length}
          </div>
          <h3 className="quiz-title">{STEPS[step].title}</h3>
          <div className="quiz-options">
            {STEPS[step].options.map((opt) => (
              <button
                key={opt}
                type="button"
                className={
                  "quiz-option" + (answers[step] === opt ? " picked" : "")
                }
                onClick={() => pick(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          {step > 0 ? (
            <button type="button" className="quiz-back" onClick={back}>
              ← Назад
            </button>
          ) : null}
        </div>
      ) : (
        <form ref={formRef} action={formAction} noValidate>
          <div className="quiz-step-label">Последний шаг</div>
          <h3 className="quiz-title">
            Куда прислать расчёт{answers[0] ? ` — ${answers[0].toLowerCase()}` : ""}?
          </h3>
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

          {/* honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
          />
          <input type="hidden" name="source" value={`${source}-quiz`} />
          <input
            type="hidden"
            name="product"
            value={`Квиз: ${answers.join(" · ")}`}
          />
          {UTM_KEYS.map((k) => (
            <input key={k} type="hidden" name={k} defaultValue="" />
          ))}
          <input type="hidden" name={YM_UID_KEY} defaultValue="" />

          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Отправляем…" : "Отправить и получить расчёт"}
          </button>
          <p className="quiz-reassure">
            Один звонок или сообщение с расчётом — без спама и рассылок
          </p>
          {/* 16–17.08: двое дошли до контактов и не отправили — даём выход без
              номера. Два мессенджера: WhatsApp доступен не всем в РФ, MAX — да. */}
          <p className="quiz-alt-label">Не хотите оставлять номер? Отправьте ответы сами:</p>
          <div className="quiz-alt-row">
            <a
              className="btn btn-wa"
              href={`${contacts.whatsappHref}?text=${encodeURIComponent(
                `Здравствуйте! Прошёл подбор на сайте: ${answers.join(" · ")}. Посчитайте, пожалуйста, стоимость.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              В WhatsApp
            </a>
            <a
              className="btn btn-max"
              href={contacts.maxHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              В MAX
            </a>
          </div>
          <p className="quiz-consent">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/privacy" target="_blank">
              политикой конфиденциальности
            </a>{" "}
            и даёте согласие на обработку персональных данных
          </p>
          <button type="button" className="quiz-back" onClick={back}>
            ← Назад
          </button>
        </form>
      )}
    </div>
  );
}
