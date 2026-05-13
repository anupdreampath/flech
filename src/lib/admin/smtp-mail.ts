import nodemailer from "nodemailer";
import { createServerClient } from "@/lib/supabase/server";

type SmtpSettings = {
  enabled: boolean;
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_user: string;
  smtp_pass: string;
  from_email: string;
  from_name: string;
};

export async function sendAdminEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const sb = createServerClient();
  const { data, error } = await sb
    .from("smtp_settings")
    .select("enabled,smtp_host,smtp_port,smtp_secure,smtp_user,smtp_pass,from_email,from_name")
    .eq("id", "default")
    .maybeSingle();

  if (error) throw new Error(error.message);
  const settings = data as SmtpSettings | null;
  if (!settings?.enabled) throw new Error("SMTP email is not enabled.");
  if (!settings.smtp_host || !settings.smtp_user || !settings.smtp_pass) {
    throw new Error("SMTP host, user, and password are required.");
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtp_host,
    port: Number(settings.smtp_port || 465),
    secure: Boolean(settings.smtp_secure),
    auth: {
      user: settings.smtp_user,
      pass: settings.smtp_pass,
    },
  });

  await transporter.sendMail({
    from: `"${settings.from_name || "Flech Admin"}" <${settings.from_email || settings.smtp_user}>`,
    to,
    subject,
    text,
    html,
  });
}
