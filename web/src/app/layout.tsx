import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// Один шрифт на весь сайт. latin нужен для «DAMASKA / WhatsApp / ZIP / +7».
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://damaska.net"),
  title: "Маркизы в Краснодаре под ключ | DAMASKA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth" className={manrope.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
