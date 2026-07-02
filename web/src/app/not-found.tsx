import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="sun-wash">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <span className="font-display text-7xl font-extrabold text-accent sm:text-8xl">
          404
        </span>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Страница не найдена
        </h1>
        <p className="max-w-md text-muted">
          Возможно, ссылка устарела или страница была перемещена. Вернитесь на
          главную — там всё о маркизах DAMASKA и бесплатный замер.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            На главную
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
