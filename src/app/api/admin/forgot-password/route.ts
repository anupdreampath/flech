import { NextRequest, NextResponse } from "next/server";
import { createResetToken } from "@/lib/admin/password-reset";
import { sendAdminEmail } from "@/lib/admin/smtp-mail";
import { createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!normalizedEmail) {
    return NextResponse.json({ ok: true });
  }

  const sb = createServerClient();
  const { data: user } = await sb
    .from("admin_users")
    .select("id,email")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const { token, tokenHash } = createResetToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const { error: insertError } = await sb.from("admin_password_reset_tokens").insert({
    admin_user_id: user.id,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });

  if (insertError) {
    return NextResponse.json({ ok: false, error: insertError.message }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  const resetUrl = `${siteUrl.replace(/\/$/, "")}/admin/reset-password?token=${encodeURIComponent(token)}`;
  await sendAdminEmail({
    to: user.email,
    subject: "Reset your Flech admin password",
    text: `Reset your Flech admin password using this link: ${resetUrl}\n\nThis link expires in 1 hour.`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1a1a2e">
        <h2>Reset your Flech admin password</h2>
        <p>Use the button below to set a new admin password. This link expires in 1 hour.</p>
        <p><a href="${resetUrl}" style="display:inline-block;background:#1A1A2E;color:#fff;padding:12px 16px;text-decoration:none;border-radius:4px">Reset password</a></p>
        <p style="font-size:12px;color:#64748b">If the button does not work, open this URL:<br>${resetUrl}</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
