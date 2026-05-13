import {
  CMS_SCHEMA,
  LAYOUT_SECTION_KEY,
  orderedSectionKeys,
  sectionDefaults,
  previewUrlForPage,
  type Field,
} from "@/lib/cms";
import { createServerClient } from "@/lib/supabase/server";
import { VisualStudio, type StudioSection } from "./VisualStudio";

export const dynamic = "force-dynamic";

export default async function CmsHome() {
  const sb = createServerClient();

  // Pull every saved section in one query.
  const { data: rows } = await sb.from("site_content").select("page,section_key,content");
  const saved = new Map<string, Record<string, string>>();
  (rows || []).forEach((r) => {
    saved.set(`${r.page}:${r.section_key}`, (r.content as Record<string, string>) || {});
  });

  const sections: StudioSection[] = [];
  const metaFields: Field[] = [
    {
      key: "_hidden",
      label: "Remove this section from the website",
      type: "checkbox",
      default: "false",
      helper:
        "This hides the section in public pages and keeps its content saved so it can be restored later.",
    },
  ];
  for (const [pageKey, pageDef] of Object.entries(CMS_SCHEMA)) {
    const pageUrl = previewUrlForPage(pageKey);
    const layout = saved.get(`${pageKey}:${LAYOUT_SECTION_KEY}`);
    for (const sectionKey of orderedSectionKeys(pageKey, layout)) {
      const sectionDef = pageDef.sections[sectionKey];
      const initial = {
        ...sectionDefaults(metaFields),
        ...sectionDefaults(sectionDef.fields),
        ...(saved.get(`${pageKey}:${sectionKey}`) || {}),
      };
      sections.push({
        pageKey,
        pageLabel: pageDef.label,
        pageUrl,
        sectionKey,
        sectionLabel: sectionDef.label,
        fields: [...metaFields, ...sectionDef.fields],
        initial,
      });
    }
  }

  return <VisualStudio sections={sections} />;
}
