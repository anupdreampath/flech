import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.flech.com";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/products/easel-backs", changeFrequency: "monthly", priority: 0.9 },
  { path: "/products/fold-lines", changeFrequency: "monthly", priority: 0.9 },
  { path: "/products/framing-backs", changeFrequency: "monthly", priority: 0.9 },
  { path: "/products/matboards", changeFrequency: "monthly", priority: 0.9 },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  try {
    const sb = createServerClient();
    const { data: posts } = await sb
      .from("blogs")
      .select("slug,updated_at,published")
      .eq("published", true)
      .order("updated_at", { ascending: false });
    (posts || []).forEach((p: { slug: string; updated_at: string }) => {
      entries.push({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });
  } catch {
    // If the DB is unreachable at build time, ship the static map.
  }

  return entries;
}
