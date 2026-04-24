import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/admin/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { page, section_key, content } = await req.json();
  if (!page || !section_key) {
    return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
  }

  const sb = createServerClient();
  const { error } = await sb.from("site_content").upsert(
    {
      page,
      section_key,
      content: content || {},
      updated_by: session.email,
    },
    { onConflict: "page,section_key" }
  );

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
