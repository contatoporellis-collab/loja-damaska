import { Logo } from "./Logo";
import { Container } from "./Container";
import { ButtonLink } from "./Button";
import { Phone } from "./icons";
import { contacts } from "@/lib/site";

/** Лёгкая «шапка» лендинга: логотип + телефон + один CTA. Без JS. */
export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bone/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="flex items-center gap-3">
          <a
            href={contacts.phoneHref}
            className="hidden items-center gap-2 font-display text-[0.95rem] font-semibold text-ink transition-colors hover:text-accent sm:flex"
          >
            <Phone className="h-[18px] w-[18px] text-accent" />
            {contacts.phone}
          </a>
          <a
            href={contacts.phoneHref}
            aria-label="Позвонить"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/[0.05] text-ink transition-colors hover:bg-accent hover:text-white sm:hidden"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <ButtonLink href="#zayavka" size="sm">
            Заказать замер
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
