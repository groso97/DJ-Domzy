import type { Metadata } from "next";
import type { LandingPageData } from "@/types";
import { siteConfig } from "@/config/constants";

/** Builds the per-page metadata (own title, description, canonical and Open Graph) for a landing page. */
export function buildLandingMetadata(data: LandingPageData): Metadata {
  const path = `/${data.slug}`;
  // Pages that define their own openGraph/twitter do not inherit the generated image, so reference it explicitly.
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} – DJ za vjenčanja i evente, Zagreb` };
  return {
    title: { absolute: data.metaTitle },
    description: data.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "hr_HR",
      url: `${siteConfig.url}${path}`,
      title: data.metaTitle,
      description: data.metaDescription,
      siteName: siteConfig.name,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: [image],
    },
  };
}
