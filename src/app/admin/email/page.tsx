import { Mail } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { EmailSettingsForm } from "./EmailSettingsForm";

export const dynamic = "force-dynamic";

const fallback = {
  enabled: true,
  smtp_host: "smtp.gmail.com",
  smtp_port: 465,
  smtp_secure: true,
  smtp_user: "nikalp@flech.com",
  from_email: "nikalp@flech.com",
  from_name: "Flech Website",
  to_email: "nikalp@flech.com",
  subject_prefix: "New completed Flech lead",
};

export default async function EmailSettingsPage() {
  const sb = createServerClient();
  const { data } = await sb
    .from("smtp_settings")
    .select(
      "enabled,smtp_host,smtp_port,smtp_secure,smtp_user,from_email,from_name,to_email,subject_prefix,updated_at,updated_by"
    )
    .eq("id", "default")
    .maybeSingle();

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C41E3A] mb-3">
          <Mail className="w-4 h-4" />
          Lead Email
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1A1A2E]">
          Email Settings
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl">
          These credentials are stored in Supabase and read by the Edge Function
          whenever a complete quote questionnaire is submitted.
        </p>
      </div>

      <EmailSettingsForm initial={{ ...fallback, ...(data || {}) }} />
    </div>
  );
}
