import HomeClient from "./HomeClient";
import { getContent, CMS_SCHEMA, LAYOUT_SECTION_KEY, sectionDefaults } from "@/lib/cms";

export const dynamic = "force-dynamic";

async function load(section: string) {
  const defaults = sectionDefaults(
    CMS_SCHEMA.home.sections[section]?.fields || []
  );
  return getContent("home", section, defaults);
}

export default async function Page() {
  const [
    hero,
    stats,
    products_heading,
    products_list,
    why_heading,
    differentiators,
    industries_heading,
    industries_preview,
    how_we_work_heading,
    how_we_work_steps,
    testimonials_heading,
    testimonials,
    factory_videos,
    gallery_strip,
    cta,
    layout,
  ] = await Promise.all([
    load("hero"),
    load("stats"),
    load("products_heading"),
    load("products_list"),
    load("why_heading"),
    load("differentiators"),
    load("industries_heading"),
    load("industries_preview"),
    load("how_we_work_heading"),
    load("how_we_work_steps"),
    load("testimonials_heading"),
    load("testimonials"),
    load("factory_videos"),
    load("gallery_strip"),
    load("cta"),
    getContent("home", LAYOUT_SECTION_KEY, { order: "" }),
  ]);
  return (
    <HomeClient
      cms={{
        hero,
        stats,
        products_heading,
        products_list,
        why_heading,
        differentiators,
        industries_heading,
        industries_preview,
        how_we_work_heading,
        how_we_work_steps,
        testimonials_heading,
        testimonials,
        factory_videos,
        gallery_strip,
        cta,
        layout,
      }}
    />
  );
}
