import type { MetadataRoute } from "next";
import { getContent } from "@/lib/cms";

function iconType(url: string) {
  const path = url.split("?")[0].toLowerCase();
  if (path.endsWith(".ico")) return "image/x-icon";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".webp")) return "image/webp";
  if (path.endsWith(".svg")) return "image/svg+xml";
  return "image/png";
}

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const branding = await getContent<Record<string, string>>("global", "branding", {
    company: "Flech Paper Products",
    tagline: "Precision Board Manufacturing - Paterson, NJ since 1999",
    logo_url: "/images/brand/flech-logo.jpg",
    logo_alt: "Flech Paper Products",
    favicon_url: "/favicon.ico",
    footer_description: "",
  });
  const faviconUrl = branding.favicon_url || "/favicon.ico";

  return {
    name: "Flech Paper Products",
    short_name: "Flech",
    description:
      "Precision board manufacturing since 1999 — easel backs, matboards, fold lines and framing backs.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F1",
    theme_color: "#1A1A2E",
    icons: [
      { src: faviconUrl, sizes: "any", type: iconType(faviconUrl) },
    ],
  };
}
