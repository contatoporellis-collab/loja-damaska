import { contacts } from "@/lib/site";
import { Whatsapp } from "./icons";

/** Плавающая кнопка WhatsApp — на десктопе (на мобильных есть нижняя панель). */
export function FloatingWhatsApp() {
  return (
    <a
      href={contacts.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-200 hover:scale-105 lg:flex"
    >
      <Whatsapp className="h-7 w-7" />
    </a>
  );
}
