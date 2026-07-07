/** Глобальные данные сайта: бренд и контакты. */

export const site = {
  name: "DAMASKA",
  legalName: "Фабрика солнцезащитных систем «Дамаска»",
  tagline: "Маркизы под ключ — внешние солнцезащитные системы",
  city: "Краснодар",
  since: 2011,
  url: "https://damaska123.ru",
};

export const contacts = {
  phone: "+7 (938) 412-47-93",
  phoneHref: "tel:+79384124793",
  whatsapp: "+7 (928) 268-41-06",
  // WhatsApp привязан к номеру +7 (928) 268-41-06 (тот же номер, что и MAX).
  whatsappHref: "https://wa.me/79282684106",
  // MAX (мессенджер). Личная ссылка на профиль (у MAX нет ссылки по номеру).
  max: "MAX",
  maxNumber: "+7 (928) 268-41-06",
  maxHref:
    "https://max.ru/u/f9LHodD0cOJYFjJ29wKhJjdJL1dr4Xncckq3zHzO3OdXH4cyVnxcl1frmAA",
  vk: "vk.com/jaluzikrasnodar",
  vkHref: "https://vk.com/jaluzikrasnodar",
  email: "damaskad@yandex.ru",
  emailHref: "mailto:damaskad@yandex.ru",
  address: "Краснодар, ул. Дальняя, 43, офис 306",
  addressShort: "ул. Дальняя, 43 · офис 306",
  hours: "Пн–Сб, 9:00–18:00",
};

/** Мягкий CTA: каталог тканей и цены в WhatsApp с преднастроенным сообщением. */
export const catalogWhatsappHref =
  `${contacts.whatsappHref}?text=` +
  encodeURIComponent(
    "Здравствуйте! Пришлите, пожалуйста, каталог тканей и цены на маркизы.",
  );

/**
 * Реквизиты оператора персональных данных — для юридических страниц
 * (Политика конфиденциальности, Согласие, Cookie). Источник — заказчик (ИП).
 */
export const operator = {
  // Полное и краткое наименование ИП
  legalName: "Индивидуальный предприниматель Васильева Анастасия Олеговна",
  shortName: "ИП Васильева А. О.",
  inn: "231135839326",
  // Юридический адрес ИП (по данным заказчика)
  legalAddress: "г. Краснодар, ул. Тургенева, д. 183, офис 3",
  // Фактический адрес / офис-шоурум
  officeAddress: "г. Краснодар, ул. Дальняя, д. 43, офис 306",
  // Контакты для обращений по вопросам обработки персональных данных
  email: "damaskad@yandex.ru",
  emailHref: "mailto:damaskad@yandex.ru",
  phone: "+7 (928) 883-50-53",
  phoneHref: "tel:+79288835053",
  hours: "Пн–Сб, 9:00–18:00",
  // Дата последней редакции юридических документов
  docsUpdated: "3 июля 2026 г.",
};
