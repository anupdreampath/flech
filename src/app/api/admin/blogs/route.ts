import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/admin/session";

export const runtime = "nodejs";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const sb = createServerClient();
  const { data } = await sb
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  return NextResponse.json({ ok: true, data: data || [] });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json();
  const {
    id,
    slug,
    title,
    excerpt,
    cover_image,
    content,
    author,
    tags,
    published,
  } = body;

  const sb = createServerClient();

  const record: Record<string, unknown> = {
    slug: slug || slugify(title || ""),
    title,
    excerpt,
    cover_image,
    content,
    author,
    tags: Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [],
    published: !!published,
    published_at: published ? new Date().toISOString() : null,
  };

  if (id) {
    const { error } = await sb.from("blogs").update(record).eq("id", id);
    if (error)
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
  } else {
    const { error } = await sb.from("blogs").insert(record);
    if (error)
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  const sb = createServerClient();
  const { error } = await sb.from("blogs").delete().eq("id", id);
  if (error)
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  return NextResponse.json({ ok: true });
}
