import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { hashResetToken } from "@/lib/admin/password-reset";
import { createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json().catch(() => ({}));
  if (!token || !newPassword) {
    return NextResponse.json({ ok: false, error: "Reset token and new password are required." }, { status: 400 });
  }
  if (String(newPassword).length < 10) {
    return NextResponse.json({ ok: false, error: "New password must be at least 10 characters." }, { status: 400 });
  }

  const sb = createServerClient();
  const tokenHash = hashResetToken(String(token));
  const { data: reset, error } = await sb
    .from("admin_password_reset_tokens")
    .select("id,admin_user_id,expires_at,used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (error || !reset || reset.used_at || new Date(reset.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ ok: false, error: "This reset link is invalid or expired." }, { status: 400 });
  }

  const password_hash = bcrypt.hashSync(String(newPassword), 12);
  const { error: updateError } = await sb
    .from("admin_users")
    .update({ password_hash })
    .eq("id", reset.admin_user_id);

  if (updateError) {
    return NextResponse.json({ ok: false, error: updateError.message }, { status: 500 });
  }

  await sb
    .from("admin_password_reset_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("id", reset.id);

  return NextResponse.json({ ok: true });
}
