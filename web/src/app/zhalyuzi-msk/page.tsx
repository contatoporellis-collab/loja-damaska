import type { Metadata } from "next";
import { Lp2Page } from "@/components/lp2/Lp2Page";
import { lp2Msk } from "@/data/lp2";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: lp2Msk.seo.title },
  description: lp2Msk.seo.description,
  alternates: { canonical: "/zhalyuzi-msk" },
  openGraph: {
    title: lp2Msk.seo.ogTitle,
    description: lp2Msk.seo.description,
    type: "website",
    locale: "ru_RU",
    siteName: "DAMASKA",
    url: `${site.url}/zhalyuzi-msk`,
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

export default function ZhalyuziMskPage() {
  return <Lp2Page v={lp2Msk} />;
}
