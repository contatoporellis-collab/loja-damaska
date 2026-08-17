import type { Metadata } from "next";
import { Lp2Page } from "@/components/lp2/Lp2Page";
import { lp2Rostov } from "@/data/lp2";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: lp2Rostov.seo.title },
  description: lp2Rostov.seo.description,
  alternates: { canonical: "/zhalyuzi-rostov" },
  openGraph: {
    title: lp2Rostov.seo.ogTitle,
    description: lp2Rostov.seo.description,
    type: "website",
    locale: "ru_RU",
    siteName: "DAMASKA",
    url: `${site.url}/zhalyuzi-rostov`,
    images: [
      {
        url: `${site.url}/images/lp2/hero-den-noch-more.webp`,
        width: 1200,
        height: 630,
        alt: "Рулонные шторы день-ночь DAMASKA",
      },
    ],
  },
};

export default function ZhalyuziRostovPage() {
  return <Lp2Page v={lp2Rostov} />;
}
