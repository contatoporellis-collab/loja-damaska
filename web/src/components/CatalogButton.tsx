import { ButtonLink } from "./Button";
import { Whatsapp } from "./icons";
import { catalogWhatsappHref } from "@/lib/site";

/**
 * Мягкий CTA для тех, кто ещё не готов оставить заявку: каталог тканей и цены
 * в WhatsApp (без звонка). Клик шлёт цель Метрики catalog_request.
 */
export function CatalogButton({ className }: { className?: string }) {
  return (
    <ButtonLink
      href={catalogWhatsappHref}
      variant="outline"
      size="md"
      dataGoal="catalog_request"
      className={className}
    >
      <Whatsapp className="h-4 w-4" />
      Получить каталог тканей и цены в WhatsApp
    </ButtonLink>
  );
}
