import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Space_Mono, Crimson_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/config/constants";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Profesionalni DJ za nezaboravne događaje`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "DJ",
    "DJ Domzy",
    "vjenčanje DJ",
    "DJ za vjenčanje",
    "DJ za rođendan",
    "korporativni DJ",
    "DJ Zagreb",
    "DJ Hrvatska",
    "glazba za zabavu",
    "profesionalni DJ",
  ],
  authors: [{ name: "DJ Domzy" }],
  creator: "DJ Domzy",
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className="dark" suppressHydrationWarning>
      <body 
        className={`${bebasNeue.variable} ${spaceMono.variable} ${crimsonPro.variable} min-h-screen`}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
