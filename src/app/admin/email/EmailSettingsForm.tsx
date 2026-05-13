"use client";

import { useState } from "react";
import { Check, Save } from "lucide-react";

type Settings = {
  enabled: boolean;
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_user: string;
  from_email: string;
  from_name: string;
  to_email: string;
  subject_prefix: string;
  updated_at?: string;
  updated_by?: string;
};

const inputClass =
  "w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]/10 focus:border-[#1A1A2E]";

export function EmailSettingsForm({ initial }: { initial: Settings }) {
  const [values, setValues] = useState({ ...initial, smtp_pass: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setError("");
  }

  async function save() {
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/smtp-settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(json.error || "Could not save SMTP settings.");
      return;
    }
    set("smtp_pass", "");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-[#1A1A2E]">
          SMTP configuration
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Completed quote questionnaires use these settings for lead emails.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="flex items-center gap-3 md:col-span-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={values.enabled}
            onChange={(e) => set("enabled", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#1A1A2E]"
          />
          Enable lead email notifications
        </label>

        <Field label="SMTP Host">
          <input
            value={values.smtp_host}
            onChange={(e) => set("smtp_host", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="SMTP Port">
          <input
            type="number"
            value={values.smtp_port}
            onChange={(e) => set("smtp_port", Number(e.target.value))}
            className={inputClass}
          />
        </Field>

        <label className="flex items-center gap-3 md:col-span-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={values.smtp_secure}
            onChange={(e) => set("smtp_secure", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#1A1A2E]"
          />
          Use secure SMTP connection
        </label>

        <Field label="SMTP Email / Username">
          <input
            type="email"
            value={values.smtp_user}
            onChange={(e) => set("smtp_user", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="SMTP Password">
          <input
            type="password"
            value={values.smtp_pass}
            onChange={(e) => set("smtp_pass", e.target.value)}
            placeholder="Leave blank to keep current password"
            className={inputClass}
          />
        </Field>

        <Field label="From Email">
          <input
            type="email"
            value={values.from_email}
            onChange={(e) => set("from_email", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="From Name">
          <input
            value={values.from_name}
            onChange={(e) => set("from_name", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Recipient Email">
          <input
            type="email"
            value={values.to_email}
            onChange={(e) => set("to_email", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Subject Prefix">
          <input
            value={values.subject_prefix}
            onChange={(e) => set("subject_prefix", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="px-6 py-4 border-t border-slate-200 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#1A1A2E] hover:bg-[#0f0f1f] disabled:opacity-50 text-white px-4 py-2.5 text-sm font-semibold rounded-md transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save SMTP settings"}
        </button>
        {saved && (
          <span className="text-xs text-emerald-700 inline-flex items-center gap-1">
            <Check className="w-4 h-4" /> Saved
          </span>
        )}
        {error && <span className="text-xs text-red-700">{error}</span>}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
