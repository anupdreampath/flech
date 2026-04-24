import { createServerClient } from "@/lib/supabase/server";
import { CMS_SCHEMA, sectionDefaults } from "@/lib/cms";
import { EditorClient } from "./EditorClient";

export const dynamic = "force-dynamic";

const PAGE_URL: Record<string, string> = {
  home: "/",
  contact: "/contact",
  about: "/about",
  industries: "/industries",
  product_easel: "/products/easel-backs",
  product_foldlines: "/products/fold-lines",
  product_framing: "/products/framing-backs",
  product_matboards: "/products/matboards",
  global: "/",
};

export default async function VisualEditor({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; section?: string }>;
}) {
  const sp = await searchParams;
  const pageKey = sp.page && CMS_SCHEMA[sp.page] ? sp.page : "home";
  const sections = CMS_SCHEMA[pageKey].sections;
  const sectionKeys = Object.keys(sections);
  const sectionKey =
    sp.section && sections[sp.section] ? sp.section : sectionKeys[0];

  const sb = createServerClient();
  const { data } = await sb
    .from("site_content")
    .select("section_key,content")
    .eq("page", pageKey);

  const dbByKey: Record<string, Record<string, string>> = {};
  (data || []).forEach((r) => {
    dbByKey[r.section_key] = (r.content as Record<string, string>) || {};
  });

  // Pre-fill every section with schema defaults so the editor never shows empty
  // fields for content that is currently rendered on the live site.
  const contentByKey: Record<string, Record<string, string>> = {};
  for (const [secKey, secDef] of Object.entries(sections)) {
    contentByKey[secKey] = {
      ...sectionDefaults(secDef.fields),
      ...(dbByKey[secKey] || {}),
    };
  }

  return (
    <EditorClient
      key={pageKey}
      schema={CMS_SCHEMA}
      pageKey={pageKey}
      sectionKey={sectionKey}
      previewUrl={`${PAGE_URL[pageKey] || "/"}?edit=1`}
      initialContent={contentByKey}
    />
  );
}
