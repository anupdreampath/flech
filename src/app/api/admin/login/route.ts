import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createServerClient } from "@/lib/supabase/server";
import { createSession } from "@/lib/admin/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
  }

  const sb = createServerClient();
  const { data: user } = await sb
    .from("admin_users")
    .select("id,email,password_hash")
    .eq("email", email)
    .maybeSingle();

  if (!user) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  await createSession({ userId: user.id, email: user.email });
  return NextResponse.json({ ok: true });
}
