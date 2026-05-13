import AboutClient from "./AboutClient";
import { getContent, CMS_SCHEMA, LAYOUT_SECTION_KEY, sectionDefaults } from "@/lib/cms";

export const dynamic = "force-dynamic";

async function load(section: string) {
  const defaults = sectionDefaults(
    CMS_SCHEMA.about.sections[section]?.fields || []
  );
  return getContent("about", section, defaults);
}

export default async function Page() {
  const [hero, stats, story, values, timeline_heading, timeline, founder, cta, layout] =
    await Promise.all([
      load("hero"),
      load("stats"),
      load("story"),
      load("values"),
      load("timeline_heading"),
      load("timeline"),
      load("founder"),
      load("cta"),
      getContent("about", LAYOUT_SECTION_KEY, { order: "" }),
    ]);

  return (
    <AboutClient
      cms={{
        hero,
        stats,
        story,
        values,
        timeline_heading,
        timeline,
        founder,
        cta,
        layout,
      }}
    />
  );
}
