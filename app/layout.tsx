import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/shared/cookie-banner";
import { HashScroll } from "@/components/shared/hash-scroll";
import { AttributionCapture } from "@/components/shared/attribution-capture";
import { MobileCtaBar } from "@/components/shared/mobile-cta-bar";
import { siteConfig, CONSENT_STORAGE_KEY } from "@/config/constants";
import "./globals.css";

/**
 * Google Consent Mode v2 – runs BEFORE GTM loads. Everything is denied by default;
 * a previously saved decision is restored immediately from localStorage.
 */
const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  var saved = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}') || 'null');
  if (saved) gtag('consent', 'update', saved);
} catch (e) {}
`;

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
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Profesionalni DJ`,
    description: siteConfig.description,
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
    "@type": ["LocalBusiness", "EntertainmentBusiness"],
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
    "areaServed": [
      "Grad Zagreb",
      "Zagrebačka županija",
      "Karlovačka županija",
      "Krapinsko-zagorska županija",
      "Hrvatska"
    ],
    "sameAs": [
      siteConfig.links.instagram,
      siteConfig.links.facebook,
      siteConfig.links.youtube,
      siteConfig.links.soundcloud
    ],
    "priceRange": "€€",
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
        {/* Consent default MUST be the first script, before GTM */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body 
        className={`${plusJakartaSans.variable} min-h-screen`}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          <HashScroll />
          <AttributionCapture />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-center" richColors />
        <Analytics />
        <SpeedInsights />
        <CookieBanner />
        <MobileCtaBar />
      </body>
    </html>
  );
}
