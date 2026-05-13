import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/admin/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const smtpPort = Number(body.smtp_port || 465);
  const update: Record<string, unknown> = {
    id: "default",
    enabled: Boolean(body.enabled),
    smtp_host: String(body.smtp_host || "smtp.gmail.com").trim(),
    smtp_port: Number.isFinite(smtpPort) ? smtpPort : 465,
    smtp_secure: Boolean(body.smtp_secure),
    smtp_user: String(body.smtp_user || "").trim(),
    from_email: String(body.from_email || "").trim(),
    from_name: String(body.from_name || "Flech Website").trim(),
    to_email: String(body.to_email || "").trim(),
    subject_prefix: String(body.subject_prefix || "New completed Flech lead").trim(),
    updated_by: session.email,
  };

  if (typeof body.smtp_pass === "string" && body.smtp_pass.trim()) {
    update.smtp_pass = body.smtp_pass;
  }

  if (!update.smtp_user || !update.from_email || !update.to_email) {
    return NextResponse.json(
      { ok: false, error: "SMTP user, from email, and recipient email are required." },
      { status: 400 }
    );
  }

  const sb = createServerClient();
  const { data: existing } = await sb
    .from("smtp_settings")
    .select("id")
    .eq("id", "default")
    .maybeSingle();

  const query = existing
    ? sb.from("smtp_settings").update(update).eq("id", "default")
    : sb.from("smtp_settings").insert(update);

  const { error } = await query;

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
