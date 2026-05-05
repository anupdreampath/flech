import { notFound } from "next/navigation";
import { CMS_SCHEMA, sectionDefaults, previewUrlForPage } from "@/lib/cms";
import { createServerClient } from "@/lib/supabase/server";
import { ContentEditor } from "./Editor";
import { EditorShell } from "./EditorShell";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CmsEditPage({
  params,
}: {
  params: Promise<{ page: string; section: string }>;
}) {
  const { page, section } = await params;
  const pageDef = CMS_SCHEMA[page];
  if (!pageDef) notFound();
  const sectionDef = pageDef.sections[section];
  if (!sectionDef) notFound();

  const sb = createServerClient();
  const { data } = await sb
    .from("site_content")
    .select("content")
    .eq("page", page)
    .eq("section_key", section)
    .maybeSingle();

  const previewUrl = previewUrlForPage(page);
  const initial = {
    ...sectionDefaults(sectionDef.fields),
    ...((data?.content as Record<string, string>) || {}),
  };

  return (
    <EditorShell
      previewUrl={previewUrl}
      pageLabel={pageDef.label}
      sectionLabel={sectionDef.label}
    >
      <Link
        href="/admin/cms"
        className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-[#1A1A2E] mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        All sections
      </Link>
      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mb-4">
        {section}
      </p>
      <ContentEditor
        page={page}
        section={section}
        fields={sectionDef.fields}
        initial={initial}
      />
    </EditorShell>
  );
}
