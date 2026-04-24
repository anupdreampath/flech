import { notFound } from "next/navigation";
import { CMS_SCHEMA, sectionDefaults } from "@/lib/cms";
import { createServerClient } from "@/lib/supabase/server";
import { ContentEditor } from "./Editor";
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

  return (
    <div className="p-8 max-w-3xl">
      <Link
        href="/admin/cms"
        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to CMS
      </Link>
      <h1 className="text-3xl font-serif font-bold mb-1">{sectionDef.label}</h1>
      <p className="text-sm text-white/50 mb-8">
        {pageDef.label} · <span className="font-mono">{section}</span>
      </p>

      <ContentEditor
        page={page}
        section={section}
        fields={sectionDef.fields}
        initial={{
          ...sectionDefaults(sectionDef.fields),
          ...((data?.content as Record<string, string>) || {}),
        }}
      />
    </div>
  );
}
