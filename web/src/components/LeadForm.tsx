"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestMeasurement, type MeasurementState } from "@/app/actions";
import { Button } from "./Button";
import { Check, Max, Whatsapp } from "./icons";
import { cn } from "@/lib/cn";

const initial: MeasurementState = { status: "idle" };

const inputBase =
  "w-full rounded-[var(--radius-sm)] border bg-surface px-4 py-3.5 text-base text-ink placeholder:text-muted " +
  "transition-colors duration-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

export function LeadForm({
  source,
  title,
  subtitle,
  button,
  altLabel,
  successMessage,
  whatsappHref,
  maxHref,
  tone = "light",
  className,
  id,
}: {
  source: string;
  title?: string;
  subtitle?: string;
  button: string;
  altLabel: string;
  successMessage: string;
  whatsappHref: string;
  maxHref: string;
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}) {
  const [state, formAction, pending] = useActionState(
    requestMeasurement,
    initial,
  );
  const phoneErr = state.status === "error" ? state.fieldErrors?.phone : undefined;

  if (state.status === "success") {
    return (
      <div
        id={id}
        className={cn(
          "flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-7 text-center shadow-[var(--shadow-card)]",
          className,
        )}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="font-display text-xl font-bold text-ink">Заявка принята!</h3>
        <p className="max-w-xs text-muted">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      id={id}
      action={formAction}
      noValidate
      className={cn(
        "flex flex-col gap-3.5 rounded-[var(--radius-lg)] border bg-surface p-5 shadow-[var(--shadow-lift)] sm:p-6",
        tone === "dark" ? "border-white/10" : "border-line",
        className,
      )}
    >
      {title ? (
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
          {subtitle ? (
            <p className="text-sm leading-relaxed text-muted">{subtitle}</p>
          ) : null}
        </div>
      ) : null}

      <input
        type="text"
        name="name"
        autoComplete="name"
        placeholder="Ваше имя"
        aria-label="Ваше имя"
        className={cn(inputBase, "border-line")}
      />

      <div className="flex flex-col gap-1.5">
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="+7 (___) ___-__-__"
          aria-label="Телефон"
          aria-invalid={phoneErr ? true : undefined}
          className={cn(inputBase, phoneErr ? "border-accent" : "border-line")}
        />
        {phoneErr ? (
          <p role="alert" className="text-xs text-accent-700">
            {phoneErr}
          </p>
        ) : null}
      </div>

      {/* honeypot — скрыто от людей, заполняют только боты */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <input type="hidden" name="source" value={source} />

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Отправляем…" : button}
      </Button>

      <p className="text-center text-xs leading-relaxed text-faint">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
          Политикой конфиденциальности
        </Link>{" "}
        и даёте{" "}
        <Link href="/consent" className="underline underline-offset-2 hover:text-accent">
          согласие на обработку персональных данных
        </Link>
        .
      </p>

      <div className="flex flex-col items-center gap-2 border-t border-line pt-3">
        <span className="text-xs text-faint">{altLabel}</span>
        <div className="flex gap-2">
          <a
            href={maxHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66FF]/12 px-3.5 py-1.5 text-sm font-medium text-[#0a53cc] transition-colors hover:bg-[#0A66FF]/20"
          >
            <Max className="h-4 w-4" />
            MAX
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/12 px-3.5 py-1.5 text-sm font-medium text-[#128C4B] transition-colors hover:bg-[#25D366]/20"
          >
            <Whatsapp className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </form>
  );
}
