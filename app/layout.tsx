import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/shared/cookie-banner";
import { HashScroll } from "@/components/shared/hash-scroll";
import { siteConfig } from "@/config/constants";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "DJ",
    "DJ Domza",
    "vjenčanje DJ",
    "DJ za vjenčanje",
    "DJ za vjenčanje Zagreb",
    "DJ za rođendan",
    "korporativni DJ",
    "DJ Zagreb",
    "DJ Hrvatska",
    "glazba za zabavu",
    "profesionalni DJ",
    "DJ eventi",
    "DJ za svadbu",
    "DJ usluge",
    "party DJ",
    "event DJ",
  ],
  authors: [{ name: "DJ Domza" }],
  creator: "DJ Domza",
  publisher: "DJ Domza",
  category: "Music & Entertainment",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: siteConfig.url,
    title: `${siteConfig.name} - Profesionalni DJ za vjenčanja i evente`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Profesionalni DJ`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Profesionalni DJ`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@djdomzaeventi",
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
  verification: {
    google: "verification_token_here",
  },
  icons: {
    icon: "/favicon-dj-domza.ico",
    shortcut: "/favicon-dj-domza.ico",
    apple: "/favicon-dj-domza.ico",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "DJ Domza",
    "alternateName": "DJ Domza Eventi",
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo-djdomza.svg`,
    "image": `${siteConfig.url}/logo-djdomza.svg`,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zagreb",
      "addressCountry": "HR"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Hrvatska"
    },
    "sameAs": [
      siteConfig.links.instagram,
      siteConfig.links.facebook,
      siteConfig.links.youtube,
      siteConfig.links.soundcloud
    ],
    "priceRange": "$$",
    "knowsAbout": ["DJ", "Wedding DJ", "Corporate Events", "Party DJ", "Music Entertainment"],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vjenčanje DJ usluge",
          "description": "Profesionalna glazbena pratnja za vjenčanja"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "DJ za rođendane",
          "description": "DJ usluge za rođendanske zabave"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Korporativni eventi",
          "description": "DJ za korporativne događaje i team buildinge"
        }
      }
    ]
  };

  return (
    <html lang="hr" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className={`${plusJakartaSans.variable} min-h-screen`}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          <HashScroll />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-center" richColors />
        <Analytics />
        <SpeedInsights />
        <CookieBanner />
      </body>
    </html>
  );
}
