import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { LandingFooter } from "./LandingFooter";
import { ArrowRight } from "./icons";
import { operator } from "@/lib/site";

/**
 * Оболочка юридической страницы (Политика, Согласие, Cookie).
 * Лёгкая шапка + читаемая типографика + общий подвал лендинга.
 */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-bone/85 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-ink transition-colors hover:text-accent"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            На главную
          </Link>
        </Container>
      </header>

      <main className="flex-1 py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="eyebrow text-accent">Правовая информация</p>
          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>
          ) : null}
          <p className="mt-4 text-sm text-faint">
            Редакция от {operator.docsUpdated}
          </p>

          <div className="legal-prose mt-10">{children}</div>
        </Container>
      </main>

      <LandingFooter />
    </div>
  );
}

/** Реквизиты оператора — единый блок для всех юридических страниц. */
export function OperatorRequisites() {
  return (
    <div className="req">
      <p>
        <strong>Оператор:</strong> {operator.legalName}
      </p>
      <p>
        <strong>ИНН:</strong> {operator.inn}
      </p>
      <p>
        <strong>Адрес:</strong> {operator.legalAddress}
      </p>
      <p>
        <strong>Офис / шоурум:</strong> {operator.officeAddress} ({operator.hours})
      </p>
      <p>
        <strong>E-mail:</strong>{" "}
        <a href={operator.emailHref}>{operator.email}</a>
      </p>
      <p>
        <strong>Телефон:</strong>{" "}
        <a href={operator.phoneHref}>{operator.phone}</a>
      </p>
    </div>
  );
}
