import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
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
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
