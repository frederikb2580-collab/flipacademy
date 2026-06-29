import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CookieBanner } from "@/components/cookie-banner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FlipAcademy DK — Lær at tjene penge på tøjflipping",
    template: "%s | FlipAcademy DK",
  },
  description:
    "Det komplette kursus i tøjflipping. Lær at købe og sælge tøj med profit på Vinted, DBA og Facebook Marketplace.",
  keywords: [
    "tøjflipping",
    "reselling",
    "vinted",
    "dba",
    "facebook marketplace",
    "tjene penge",
    "sidehustle",
    "kursus",
  ],
  openGraph: {
    title: "FlipAcademy DK — Lær at tjene penge på tøjflipping",
    description:
      "Det komplette kursus i tøjflipping. Lifetime adgang for kun 399 DKK.",
    type: "website",
    locale: "da_DK",
    siteName: "FlipAcademy DK",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-black text-white font-sans">
        <Providers>
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
