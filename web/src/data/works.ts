/**
 * Наши работы — реальные объекты с установленными маркизами DAMASKA.
 * Фото предоставлены заказчиком. Две группы: частные дома и бизнес.
 * (work-house-entrance используется в карточках, work-house-terrace и work-dora —
 *  в диптихе-шоукейсе, поэтому в галерее не дублируются.)
 */

export interface Work {
  src: string;
  caption: string;
  alt: string;
}

export interface WorkGroup {
  title: string;
  subtitle: string;
  items: Work[];
}

export const workGroups: WorkGroup[] = [
  {
    title: "Для дома и террас",
    subtitle: "Маркизы для частных домов, террас, веранд и зон отдыха",
    items: [
      {
        src: "/images/works/work-house-modern.jpg",
        caption: "Терраса современного дома",
        alt: "Маркиза для террасы современного частного дома в Краснодаре",
      },
      {
        src: "/images/works/work-house-veranda.jpg",
        caption: "Веранда частного дома",
        alt: "Маркиза для веранды частного дома в Краснодаре",
      },
      {
        src: "/images/works/work-house-lake.jpg",
        caption: "Терраса частного дома у воды",
        alt: "Локтевая маркиза для террасы частного дома у воды в Краснодаре",
      },
      {
        src: "/images/works/work-house-pool.jpg",
        caption: "Зона у бассейна",
        alt: "Маркиза для зоны у бассейна частного дома в Краснодаре",
      },
      {
        src: "/images/works/work-house-loktevaya.jpg",
        caption: "Локтевая маркиза, частный дом",
        alt: "Локтевая маркиза для террасы частного дома в Краснодаре",
      },
    ],
  },
  {
    title: "Для бизнеса",
    subtitle: "Маркизы для ресторанов, кафе, отелей, салонов и магазинов",
    items: [
      {
        src: "/images/works/work-forno-rosso.jpg",
        caption: "Ресторан FORNO ROSSO",
        alt: "Маркиза для ресторана FORNO ROSSO в центре Краснодара",
      },
      {
        src: "/images/works/work-rakov.jpg",
        caption: "Ресторан «Раков и Крабов»",
        alt: "Маркизы для ресторана «Раков и Крабов» в центре Краснодара",
      },
      {
        src: "/images/works/work-shato.webp",
        caption: "Бутик-отель «Шато»",
        alt: "Маркизы для бутик-отеля «Шато» в Краснодаре",
      },
      {
        src: "/images/works/work-tabris.jpg",
        caption: "Супермаркет «ТаБРИС»",
        alt: "Маркизы для супермаркета «ТаБРИС» в Краснодаре",
      },
      {
        src: "/images/works/work-lemi.webp",
        caption: "Салон красоты LÉMI",
        alt: "Маркиза для салона красоты LÉMI в Краснодаре",
      },
      {
        src: "/images/works/work-dim-coffee.webp",
        caption: "Кофейня DIM COFFEE",
        alt: "Маркиза для кофейни DIM COFFEE в Краснодаре",
      },
      {
        src: "/images/works/work-cvetochnaya.webp",
        caption: "Магазин «Цветочная»",
        alt: "Маркизы для цветочного магазина «Цветочная» в Краснодаре",
      },
      {
        src: "/images/works/work-kristal.webp",
        caption: "Кофейня-кондитерская «Кристал»",
        alt: "Маркиза для кофейни-кондитерской «Кристал» в Краснодаре",
      },
    ],
  },
];
