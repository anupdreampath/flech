import { CMS_SCHEMA, sectionDefaults, previewUrlForPage } from "@/lib/cms";
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
  for (const [pageKey, pageDef] of Object.entries(CMS_SCHEMA)) {
    const pageUrl = previewUrlForPage(pageKey);
    for (const [sectionKey, sectionDef] of Object.entries(pageDef.sections)) {
      const initial = {
        ...sectionDefaults(sectionDef.fields),
        ...(saved.get(`${pageKey}:${sectionKey}`) || {}),
      };
      sections.push({
        pageKey,
        pageLabel: pageDef.label,
        pageUrl,
        sectionKey,
        sectionLabel: sectionDef.label,
        fields: sectionDef.fields,
        initial,
      });
    }
  }

  return <VisualStudio sections={sections} />;
}
