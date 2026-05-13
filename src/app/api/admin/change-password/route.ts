import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/admin/session";
import { createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json().catch(() => ({}));
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ ok: false, error: "Current and new password are required." }, { status: 400 });
  }
  if (String(newPassword).length < 10) {
    return NextResponse.json({ ok: false, error: "New password must be at least 10 characters." }, { status: 400 });
  }

  const sb = createServerClient();
  const { data: user, error } = await sb
    .from("admin_users")
    .select("id,password_hash")
    .eq("id", session.userId)
    .maybeSingle();

  if (error || !user) {
    return NextResponse.json({ ok: false, error: "Admin user not found." }, { status: 404 });
  }

  const ok = bcrypt.compareSync(String(currentPassword), user.password_hash);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Current password is incorrect." }, { status: 401 });
  }

  const password_hash = bcrypt.hashSync(String(newPassword), 12);
  const { error: updateError } = await sb
    .from("admin_users")
    .update({ password_hash })
    .eq("id", session.userId);

  if (updateError) {
    return NextResponse.json({ ok: false, error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
