import type { Metadata } from "next";
import { Lp2Page } from "@/components/lp2/Lp2Page";
import { lp2Coast } from "@/data/lp2";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: lp2Coast.seo.title },
  description: lp2Coast.seo.description,
  alternates: { canonical: "/zhalyuzi" },
  openGraph: {
    title: lp2Coast.seo.ogTitle,
    description: lp2Coast.seo.description,
    type: "website",
    locale: "ru_RU",
    siteName: "DAMASKA",
    url: `${site.url}/zhalyuzi`,
    images: [
      {
        url: `${site.url}/images/lp2/hero-den-noch-more.webp`,
        width: 1200,
        height: 630,
        alt: "Рулонные шторы день-ночь DAMASKA с видом на море",
      },
    ],
  },
};

export default function ZhalyuziPage() {
  return <Lp2Page v={lp2Coast} />;
}
