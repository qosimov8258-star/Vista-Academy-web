import type { Metadata } from "next";
import { Alfa_Slab_One, Baloo_2, Courgette } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import "./globals.css";
import { BusIntro } from "@/components/bus-intro";
import { absoluteMediaUrl, cdn } from "@/lib/cdn";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
});

const alfaSlabOne = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alfa-slab-one",
});

const courgette = Courgette({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-courgette",
});

const SITE_URL = "https://vista-academy.uz";

const OG_LOCALES: Record<string, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("siteMeta");
  const locale = await getLocale();
  const title = t("title");
  const description = t("description");
  const keywords = t.raw("keywords") as string[];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    applicationName: "Vista Academy",
    icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: cdn("/homepage/logo.png"),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale] ?? "uz_UZ",
      url: SITE_URL,
      siteName: "Vista Academy",
      title,
      description,
      images: [{ url: cdn("/title-log.png"), width: 1262, height: 848, alt: "Vista Academy" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cdn("/title-log.png")],
    },
    // Google Search Console / Yandex Webmaster egalikni tasdiqlash kodlari (.env'dan).
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "3raC3y1dKcCCNuJlJBIGqw-gUV7HOPqf75OGdBnTllQ",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("siteMeta");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: "Vista Academy",
    alternateName: "Vista Academy bog'chalar tarmog'i",
    description: t("description"),
    url: SITE_URL,
    logo: absoluteMediaUrl("/homepage/logo.png", SITE_URL),
    image: absoluteMediaUrl("/title-log.png", SITE_URL),
    email: "info@vista-academy.uz",
    telephone: "+998905290555",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Andijon",
      addressCountry: "UZ",
    },
    areaServed: {
      "@type": "City",
      name: "Andijon",
    },
    sameAs: ["https://t.me/vistaoriginal", "https://www.instagram.com/vista_academy_uz"],
  };

  // Google'ga sayt nomi "Vista Academy" ekanini aytadi (qidiruvda brend nomi bilan chiqishi uchun).
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vista Academy",
    alternateName: ["Vista Academy Andijon", "Vista Academy bog'cha"],
    url: SITE_URL,
  };

  return (
    <html lang={locale} className={`${baloo2.variable} ${alfaSlabOne.variable} ${courgette.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BusIntro />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
