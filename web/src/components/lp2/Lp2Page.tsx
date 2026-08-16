import { Cormorant_Garamond } from "next/font/google";
import { contacts, site } from "@/lib/site";
import { type Lp2Variant } from "@/data/lp2";
import { Lp2Form } from "./Lp2Form";
import { Lp2Quiz } from "./Lp2Quiz";
import { Lp2Effects } from "./Lp2Effects";
import "./lp2.css";

// Акцидентный шрифт дизайна LP v2; self-host через next/font (без Google CDN).
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const IMG = "/images/lp2";

const PRODUCTS = [
  {
    img: "product-kassetnye.webp",
    alt: "Рулонные шторы мини на створку окна",
    badge: "Хит продаж",
    name: "Рулонные шторы Мини",
    text: "Компактный рулон на створку окна. Возможна установка без сверления — идеально для съёмных квартир.",
    price: "от 3 600 ₽",
    unit: "/изделие",
    select: "Рулонные шторы Мини",
  },
  {
    img: "product-den-noch.webp",
    alt: "Рулонные шторы день-ночь (зебра)",
    name: "День-Ночь (зебра)",
    text: "Чередующиеся полосы ткани: одним движением меняете комнату от яркого света к мягкому полумраку.",
    price: "от 4 500 ₽",
    unit: "/изделие",
    select: "Шторы День-Ночь",
  },
  {
    img: "product-blackout.webp",
    alt: "Рулонные шторы блэкаут",
    name: "Рулонные Блэкаут",
    text: "Полное затемнение: ткань не пропускает свет даже в южный полдень. Для спален и детских.",
    price: "от 4 000 ₽",
    unit: "/изделие",
    select: "Рулонные шторы Блэкаут",
  },
  {
    img: "product-gorizontalnye.webp",
    alt: "Горизонтальные алюминиевые жалюзи на кухне",
    name: "Горизонтальные жалюзи",
    text: "Алюминиевая классика для кухни и офиса. Не боятся влаги и перепадов температур.",
    price: "от 7 500 ₽",
    unit: "/м²",
    select: "Горизонтальные жалюзи",
  },
  {
    img: "product-vertikalnye.webp",
    alt: "Вертикальные жалюзи в офисе",
    name: "Вертикальные жалюзи",
    text: "Для больших окон и панорамного остекления. Мягкое рассеивание света во всю высоту проёма.",
    price: "от 2 200 ₽",
    unit: "/м²",
    select: "Вертикальные жалюзи",
  },
  {
    img: "product-derevyannye.webp",
    alt: "Деревянные жалюзи на террасе",
    name: "Деревянные жалюзи",
    text: "Натуральное дерево и бамбук. Благородная фактура для гостиных, кабинетов и террас.",
    price: "от 13 750 ₽",
    unit: "/м²",
    select: "Деревянные жалюзи",
  },
];

const GALLERY = [
  { img: "gallery-tabris-office.webp", alt: "Рулонные шторы в переговорной сети супермаркетов Табрис", cap: "Рулонные шторы · переговорная «Табрис»", wide: true },
  { img: "gallery-den-noch-lodzhiya.webp", alt: "Шторы день-ночь на лоджии", cap: "День-Ночь · лоджия, Краснодар" },
  { img: "gallery-blackout-dom.webp", alt: "Рулонные шторы блэкаут в квартире", cap: "Рулонные блэкаут · квартира" },
  { img: "gallery-derevyannye-ofis.webp", alt: "Деревянные жалюзи в офисе", cap: "Деревянные жалюзи · офис" },
  { img: "gallery-gorod-detey.webp", alt: "Рулонные шторы в ресторане Город Детей", cap: "Рулонные шторы · ресторан «Город Детей»" },
  { img: "gallery-kassetnye-kuhnya.webp", alt: "Кассетные рулонные шторы на кухне", cap: "Кассетные рулонные · кухня" },
  { img: "gallery-den-noch-closeup.webp", alt: "Шторы день-ночь крупным планом", cap: "День-Ночь · спальня" },
  { img: "gallery-rulonnye-komnata.webp", alt: "Рулонные шторы в комнате", cap: "Рулонные шторы · квартира" },
  { img: "gallery-derevyannye-vid.webp", alt: "Деревянные жалюзи в загородном доме", cap: "Деревянные жалюзи · загородный дом" },
];

/* Реальные отзывы с сайта компании damaska.ru (синхронизированы с Яндекс
   Картами) — НЕ выдуманные. Полные версии: yandex.ru/profile/1356773915 */
const REVIEWS = [
  {
    text: "«Все быстро, качественно, опытные специалисты — и замерщик, и парень, который устанавливал рулонные шторы: все сделали четко»",
    name: "Юлия А.",
    what: "рулонные шторы",
  },
  {
    text: "«Качество и цена хорошая. Быстрое производство. Установка и обслуживание без пыли. Все понравилось.»",
    name: "Tikhotik",
    what: "отзыв на Яндекс Картах",
  },
  {
    text: "«Заказывал вертикальные жалюзи в офис. Быстро, качественно, надежно! Спасибо, очень рекомендую!»",
    name: "Булатов Д.",
    what: "вертикальные жалюзи, офис",
  },
];

const NAV = [
  ["#catalog", "Каталог"],
  ["#factory", "Производство"],
  ["#process", "Как заказать"],
  ["#gallery", "Наши работы"],
  ["#reviews", "Отзывы"],
  ["#contacts", "Контакты"],
] as const;

export function Lp2Page({ v }: { v: Lp2Variant }) {
  const jsonLdBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DAMASKA — фабрика жалюзи и рулонных штор",
    image: `${site.url}${IMG}/hero-den-noch-more.webp`,
    telephone: "+79282684085",
    email: contacts.email,
    priceRange: "от 2 200 ₽",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Дальняя, 43, офис 306",
      addressLocality: "Краснодар",
      addressCountry: "RU",
    },
    openingHours: "Mo-Sa 09:00-18:00",
    foundingDate: "2011",
    areaServed: v.areaServed,
    sameAs: [contacts.vkHref],
    url: `${site.url}${v.path}`,
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Я боюсь ошибиться в размерах. Что делать?", acceptedAnswer: { "@type": "Answer", text: "Риск минимален: мы даём простую инструкцию по замеру, а перед запуском в производство менеджер перепроверяет каждый размер вместе с вами." } },
      { "@type": "Question", name: "Сложно ли установить шторы самостоятельно?", acceptedAnswer: { "@type": "Answer", text: "Нет. Рулонная штора или жалюзи ставятся на два кронштейна за 15–20 минут. В комплекте крепёж и видеоинструкция." } },
      { "@type": "Question", name: "Сколько времени займёт изготовление?", acceptedAnswer: { "@type": "Answer", text: "2–3 рабочих дня с момента подтверждения заказа на собственной фабрике в Краснодаре." } },
      { "@type": "Question", name: "Какая гарантия на изделия?", acceptedAnswer: { "@type": "Answer", text: "От 24 месяцев на механизм и полотно. Каждое изделие проходит двойной контроль качества." } },
      { "@type": "Question", name: "Вы доставляете в другие города?", acceptedAnswer: { "@type": "Answer", text: v.deliveryFaqAnswer } },
    ],
  };

  return (
    <div className={`lp2 ${cormorant.variable}`}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBusiness) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <header>
        <div className="container nav">
          <a href="#" className="logo">
            DAMASKA<small>фабрика солнцезащиты · с 2011</small>
          </a>
          <nav className="nav-links">
            {NAV.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <a href={contacts.phoneHref} className="nav-phone">
              {contacts.phone}
              <small>Пн–Сб 9:00–18:00</small>
            </a>
            <a
              href={contacts.phoneHref}
              className="nav-phone-mini"
              aria-label="Позвонить"
            >
              <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </a>
            <a href="#order" className="btn btn-primary">
              Рассчитать стоимость
            </a>
            <button className="burger" aria-label="Меню">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-menu">
        <button className="close-menu" aria-label="Закрыть">
          &times;
        </button>
        {NAV.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
        <a href={contacts.phoneHref}>{contacts.phone}</a>
      </div>

      {/* ------------------------------------------------------------ HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="reveal visible">
            <div className="eyebrow">{v.hero.eyebrow}</div>
            <h1>
              {v.hero.h1Before}
              <em>{v.hero.h1Em}</em>
            </h1>
            <p className="hero-sub">{v.hero.sub}</p>
            <div className="hero-actions">
              <a href="#quiz" className="btn btn-primary">
                Подобрать за 4 вопроса
              </a>
              <a
                href={contacts.whatsappHref}
                className="btn btn-wa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Написать в WhatsApp
              </a>
            </div>
            <div className="hero-chips">
              <span className="chip">
                от <b>2 200 ₽</b>/м²
              </span>
              <span className="chip">
                изготовление <b>2–3 дня</b>
              </span>
              <span className="chip">
                гарантия <b>от 24 мес.</b>
              </span>
              <span className="chip">
                замер <b>без выезда</b> — 5 минут
              </span>
            </div>
          </div>
          <div className="hero-visual reveal visible">
            <div className="frame"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG}/hero-den-noch-more.webp`}
              alt="Рулонные шторы день-ночь DAMASKA с видом на море"
              fetchPriority="high"
            />
            <div className="hero-card">
              <div className="num">39 000+</div>
              <p>
                проектов выполнено
                <br />с 2011 года
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- STATS */}
      <div className="stats">
        <div className="container stats-grid">
          <div className="stat reveal">
            <div className="num">
              15<span> лет</span>
            </div>
            <p>собственному производству</p>
          </div>
          <div className="stat reveal">
            <div className="num">
              450<span>+</span>
            </div>
            <p>тканей и материалов в каталоге</p>
          </div>
          <div className="stat reveal">
            <div className="num">
              5.0<span> ★</span>
            </div>
            <p>рейтинг на Яндекс Картах, 350+ отзывов</p>
          </div>
          <div className="stat reveal">
            <div className="num">ТОП-3</div>
            <p>производителей юга России</p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ QUIZ */}
      <section id="quiz">
        <div className="container">
          <div
            className="section-head reveal"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center", maxWidth: 720 }}
          >
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Подбор за 1 минуту
            </div>
            <h2>Ответьте на 4 вопроса — пришлём расчёт</h2>
            <p>
              Не нужно разбираться в каталоге: подберём решение под ваши окна
              и посчитаем точную стоимость.
            </p>
          </div>
          <div className="quiz-wrap reveal">
            <Lp2Quiz source={v.source} />
            <p className="quiz-phone">
              Удобнее голосом? Звоните:{" "}
              <a href={contacts.phoneHref}>{contacts.phone}</a> · Пн–Сб
              9:00–18:00
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- CATALOG */}
      <section id="catalog" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Каталог</div>
            <h2>Решения для дома и офиса</h2>
            <p>
              Все изделия шьём и собираем на своей фабрике в Краснодаре — точно
              под размер вашего окна.
            </p>
          </div>
          <div className="products-grid">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="product reveal">
                <div className="ph">
                  {p.badge ? <span className="badge">{p.badge}</span> : null}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/${p.img}`} alt={p.alt} loading="lazy" />
                </div>
                <div className="body">
                  <h3>{p.name}</h3>
                  <p>{p.text}</p>
                  <div className="row">
                    <div className="price">
                      {p.price} <small>{p.unit}</small>
                    </div>
                    <button className="link" data-product={p.select}>
                      Рассчитать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- VIDEO */}
      <section id="video" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="section-head reveal"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center", maxWidth: 720 }}
          >
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Вживую
            </div>
            <h2>Посмотрите, как это работает</h2>
            <p>
              Рулонные шторы Мини на створке и день-ночь на большом окне — те
              же модели, что мы изготовим по вашим размерам.
            </p>
          </div>
          <div className="video-wrap reveal">
            <video
              muted
              playsInline
              loop
              preload="none"
              poster="/images/lp2/demo-poster.jpg"
              data-autoplay="1"
              aria-label="Видео: рулонные шторы DAMASKA в работе"
            >
              <source src="/images/lp2/demo-rulonnye.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- FACTORY */}
      <section id="factory" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="factory reveal">
            <div className="factory-inner">
              <div>
                <div className="eyebrow">Почему DAMASKA</div>
                <h2>Фабрика, а не посредник</h2>
                <p className="lead">
                  Вы заказываете напрямую у производителя — поэтому получаете
                  честную цену, точные сроки и гарантию, которую мы
                  действительно исполняем.
                </p>
                <div className="adv-list">
                  <div className="adv-item">
                    <div className="ico">
                      <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                      </svg>
                    </div>
                    <div>
                      <h4>Собственное производство с 2011 года</h4>
                      <p>Свой цех в Краснодаре: контролируем каждое изделие от раскроя ткани до упаковки.</p>
                    </div>
                  </div>
                  <div className="adv-item">
                    <div className="ico">
                      <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <h4>Изготовление за 2–3 рабочих дня</h4>
                      <p>Не ждёте месяц: своя фабрика позволяет держать короткие и честные сроки.</p>
                    </div>
                  </div>
                  <div className="adv-item">
                    <div className="ico">
                      <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-5M12 3l7 3v5c0 4.5-3 8.6-7 10-4-1.4-7-5.5-7-10V6l7-3Z" />
                      </svg>
                    </div>
                    <div>
                      <h4>Двойной контроль качества</h4>
                      <p>Каждое изделие проверяем дважды перед отправкой. Гарантия от 24 месяцев на механизм и полотно.</p>
                    </div>
                  </div>
                  <div className="adv-item">
                    <div className="ico">
                      <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
                      </svg>
                    </div>
                    <div>
                      <h4>Более 450 тканей</h4>
                      <p>Однотонные, фактурные, с рисунком, блэкаут, screen — подберём под любой интерьер.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="factory-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/proizvodstvo-1.webp`} alt="Раскрой ткани на производстве DAMASKA" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/proizvodstvo-2.webp`} alt="Цех фабрики DAMASKA в Краснодаре" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- PROCESS */}
      <section id="process" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Как заказать</div>
            <h2>Четыре простых шага — без выезда замерщика</h2>
            <p>
              Закажите дистанционно: это быстрее и ничего не стоит. Если
              сомневаетесь — поможем по видеосвязи.
            </p>
          </div>
          <div className="process-grid">
            <div className="step reveal">
              <span className="n">01</span>
              <h3>Измерьте окно</h3>
              <p>5 минут по нашей простой инструкции. Достаточно рулетки — мы всё перепроверим.</p>
            </div>
            <div className="step reveal">
              <span className="n">02</span>
              <h3>Отправьте размеры</h3>
              <p>В WhatsApp, MAX или через форму на сайте. Поможем выбрать ткань и модель, пришлём расчёт.</p>
            </div>
            <div className="step reveal">
              <span className="n">03</span>
              <h3>Мы изготовим</h3>
              <p>2–3 рабочих дня на собственной фабрике, с двойным контролем качества.</p>
            </div>
            <div className="step reveal">
              <span className="n">04</span>
              <h3>Установите за 15–20 минут</h3>
              <p>Изделие крепится на два кронштейна. Подробная видеоинструкция в комплекте.</p>
            </div>
          </div>
          <div className="process-note reveal">
            <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>
              Риск ошибки в размерах минимален: перед запуском в производство мы
              проверяем каждый замер вместе с вами.
            </span>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- GALLERY */}
      <section id="gallery" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Наши работы</div>
            <h2>Реальные проекты — от квартир до ресторанов</h2>
            <p>{v.gallerySub}</p>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((g) => (
              <div key={g.img} className={`g-item reveal${g.wide ? " wide" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/${g.img}`} alt={g.alt} loading="lazy" />
                <div className="cap">{g.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- REVIEWS */}
      <section id="reviews" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="reviews-head reveal">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <div className="eyebrow">Отзывы</div>
              <h2>Нам доверяют дома, офисы и рестораны</h2>
            </div>
            <div className="ya-badge">
              <div className="score">5.0</div>
              <div>
                <div className="stars">★★★★★</div>
                <p>
                  350+ отзывов
                  <br />
                  на Яндекс Картах
                </p>
              </div>
            </div>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((r) => (
              <div key={r.name} className="review reveal">
                <div className="stars">★★★★★</div>
                <p>{r.text}</p>
                <div className="who">
                  <div className="ava">{r.name[0]}</div>
                  <div>
                    <b>{r.name}</b>
                    <small>{r.what}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-more reveal">
            <a
              href="https://yandex.ru/profile/1356773915"
              target="_blank"
              rel="noopener noreferrer"
            >
              Читать все отзывы на Яндекс Картах →
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQ */}
      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="section-head reveal"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center", maxWidth: 720 }}
          >
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Вопросы и ответы
            </div>
            <h2>Частые вопросы</h2>
          </div>
          <div className="faq-wrap">
            {[
              ["Я боюсь ошибиться в размерах. Что делать?", "Риск минимален: мы даём простую инструкцию по замеру (5 минут с рулеткой), а перед запуском в производство менеджер перепроверяет каждый размер вместе с вами. Если сомневаетесь — проведём замер по видеосвязи."],
              ["Сложно ли установить шторы самостоятельно?", "Нет. Рулонная штора или жалюзи ставятся на два кронштейна за 15–20 минут. В комплекте — крепёж и видеоинструкция. Для многих моделей есть вариант установки без сверления."],
              ["Сколько времени займёт изготовление?", "2–3 рабочих дня с момента подтверждения заказа — изделия шьются на нашей собственной фабрике в Краснодаре, поэтому мы не зависим от сторонних поставщиков."],
              ["Какая гарантия на изделия?", "От 24 месяцев на механизм и полотно. Перед отправкой каждое изделие проходит двойной контроль качества."],
              ["Вы доставляете в другие города?", v.deliveryFaqAnswer],
              ["Как выбрать ткань, если я заказываю дистанционно?", "Пришлём фото и видео тканей под ваш интерьер, подскажем по светопропусканию и уходу. В каталоге более 450 вариантов: однотонные, фактурные, блэкаут, screen и ткани с рисунком."],
            ].map(([q, a]) => (
              <div key={q} className="faq-item reveal">
                <button className="faq-q">
                  {q}
                  <span className="plus">+</span>
                </button>
                <div className="faq-a">
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CTA FORM */}
      <section id="order" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta reveal">
            <div className="cta-inner">
              <div>
                <div className="eyebrow" style={{ color: "#B9E3C6" }}>
                  Бесплатный расчёт
                </div>
                <h2>Узнайте точную стоимость за 15 минут</h2>
                <p className="lead">
                  Оставьте заявку — менеджер поможет с замером, подберёт ткань
                  и пришлёт расчёт в WhatsApp, MAX или по телефону.
                </p>
                <ul>
                  <li>
                    <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                    </svg>
                    Расчёт бесплатный и ни к чему не обязывает
                  </li>
                  <li>
                    <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                    </svg>
                    Подберём решение под ваш бюджет — от 2 200 ₽
                  </li>
                  <li>
                    <svg fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                    </svg>
                    Ответим в рабочее время в течение 15 минут
                  </li>
                </ul>
              </div>
              <Lp2Form source={v.source} />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- CONTACTS */}
      <section id="contacts" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="container contacts-grid">
          <div className="reveal">
            <div className="eyebrow">Контакты</div>
            <h2>Напишите нам или приезжайте в шоурум</h2>
            <div className="contact-list">
              <div className="contact-item">
                <div className="ico">
                  <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <a href={contacts.phoneHref}>
                  <b>{contacts.phone}</b>
                  <small>звонок по России</small>
                </a>
              </div>
              <div className="contact-item">
                <div className="ico">
                  <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                </div>
                <a href={contacts.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <b>Написать в WhatsApp</b>
                  <small>быстрый расчёт и фото тканей</small>
                </a>
              </div>
              <div className="contact-item">
                <div className="ico">
                  <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                </div>
                <a href={contacts.maxHref} target="_blank" rel="noopener noreferrer">
                  <b>Написать в MAX</b>
                  <small>мессенджер — расчёт и консультация</small>
                </a>
              </div>
              <div className="contact-item">
                <div className="ico">
                  <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <b>Краснодар, ул. Дальняя, 43, офис 306</b>
                  <small>шоурум и офис · Пн–Сб с 9:00 до 18:00</small>
                </div>
              </div>
              <div className="contact-item">
                <div className="ico">
                  <svg fill="none" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <a href={contacts.emailHref}>
                  <b>{contacts.email}</b>
                  <small>для заявок и вопросов</small>
                </a>
              </div>
            </div>
          </div>
          <div className="geo reveal">
            <h3>{v.geo.heading}</h3>
            <p>{v.geo.text}</p>
            <div className="geo-tags">
              {v.geo.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p style={{ marginTop: 22, marginBottom: 0 }}>
              <b style={{ color: "var(--ink)" }}>Дистанционный заказ</b> —{" "}
              {v.geo.note}
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo">
                DAMASKA<small>фабрика солнцезащиты · с 2011</small>
              </div>
            </div>
            <nav className="footer-nav">
              {NAV.slice(0, 5).map(([href, label]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© 2011–2026 DAMASKA · ИП Васильева А.О., ИНН 231135893926</span>
            <span>
              <a href="/privacy">Политика конфиденциальности</a>
              {" · "}
              <a href="/consent">Согласие на обработку данных</a>
            </span>
          </div>
        </div>
      </footer>

      <div className="mobile-bar" data-wa={contacts.whatsappHref}>
        <a href={contacts.phoneHref} className="btn btn-ghost">
          Позвонить
        </a>
        <a href="#quiz" className="btn btn-primary">
          Подобрать шторы
        </a>
      </div>

      <div className="lightbox">
        <button className="close" aria-label="Закрыть">
          &times;
        </button>
        {/* src проставляет Lp2Effects при открытии — пустой src="" нельзя */}
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img alt="" />
      </div>

      <Lp2Effects />
    </div>
  );
}
