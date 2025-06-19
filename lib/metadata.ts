import { Metadata, Viewport } from "next";
import { SITE_CONFIG } from "./constants";

export const BASE_METADATA: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url!),
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  icons: {
    icon: SITE_CONFIG.favicon,
  },
  creator: "Sudip Biswas",
  keywords: ["siteof", "siteof.me", "siteof.me", "siteof.me", "siteof.me"],
  authors: [{ name: "Sudip Biswas", url: "https://sudip.codes" }],
  robots: {
    index: true,
    follow: true,
  },
  applicationName: SITE_CONFIG.name,
};

export const VIEWPORT: Viewport = {
  width: "device-width",
  height: "device-height",
  viewportFit: "cover",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const generatePageMetadata = (values: Partial<Metadata>) => {
  return {
    ...BASE_METADATA,
    ...values,
  };
};
