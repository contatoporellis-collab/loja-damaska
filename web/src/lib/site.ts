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
  // Выделенный номер колл-трекинга damaska123.ru (закреплён за сайтом
  // в телефонии): звонки попадают к операторам и в amoCRM.
  phone: "+7 (928) 268-40-85",
  phoneHref: "tel:+79282684085",
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
  hours: "Вт–Сб, 9:00–18:00",
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
  // ИНН и ОГРНИП сверены с ЕГРИП (egrul.nalog.ru) 13.07.2026.
  inn: "231135893926",
  ogrnip: "322237500279057",
  // Юридический адрес ИП (по данным заказчика)
  legalAddress: "г. Краснодар, ул. Тургенева, д. 183, офис 3",
  // Фактический адрес / офис-шоурум
  officeAddress: "г. Краснодар, ул. Дальняя, д. 43, офис 306",
  // Контакты для обращений по вопросам обработки персональных данных
  email: "damaskad@yandex.ru",
  emailHref: "mailto:damaskad@yandex.ru",
  phone: "+7 (928) 883-50-53",
  phoneHref: "tel:+79288835053",
  hours: "Вт–Сб, 9:00–18:00",
  // Дата последней редакции юридических документов
  docsUpdated: "3 июля 2026 г.",
};
