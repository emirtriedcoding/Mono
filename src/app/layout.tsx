import localFont from "next/font/local";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";

import type { Metadata } from "next";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "مونو - ساخت تصاویر فوق العاده توسط هوش مصنوعی !",
  description:
    "پلتفرمی جهت ساخت تصاویر مختلف با استفاده از مدل های مختلف هوش مصنوعی !",
  icons: {
    icon: "/assets/logo.png",
  },
  openGraph: {
    title: "مونو - ساخت تصاویر فوق العاده توسط هوش مصنوعی !",
    description:
      "پلتفرمی جهت ساخت تصاویر مختلف با استفاده از مدل های مختلف هوش مصنوعی !",
    url: "https://monoai.ir",
    siteName: "مونو - ساخت تصاویر فوق العاده توسط هوش مصنوعی !",
    images: [
      {
        url: "https://monoai.ir/assets/logo.png",
        width: 512,
        height: 512,
        alt: "مونو - ساخت تصاویر فوق العاده توسط هوش مصنوعی !",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
};

const font = localFont({
  src: "./fonts/IRANSansXV.woff",
  variable: "--font-iran-sans",
  weight: "400 600 800",
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="fa" dir="rtl">
      <body className={font.className}>
        <NextTopLoader height={4} color="#BB4FB9" />
        {children}
        <Toaster className={font.className} richColors theme="dark" closeButton />
      </body>
    </html>
  );
};

export default RootLayout;
