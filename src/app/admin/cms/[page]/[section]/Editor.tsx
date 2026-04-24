"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import type { Field } from "@/lib/cms";

export function ContentEditor({
  page,
  section,
  fields,
  initial,
}: {
  page: string;
  section: string;
  fields: Field[];
  initial: Record<string, string>;
}) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set(k: string, v: string) {
    setValues((p) => ({ ...p, [k]: v }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ page, section_key: section, content: values }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  return (
    <div className="space-y-6">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
            {f.label}
          </label>
          {f.helper && (
            <p className="text-xs text-white/45 mb-2 leading-snug">
              {f.helper}
            </p>
          )}
          {f.type === "textarea" ? (
            <textarea
              rows={4}
              value={values[f.key] || ""}
              onChange={(e) => set(f.key, e.target.value)}
              className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
            />
          ) : f.type === "image" ? (
            <CloudinaryUpload
              value={values[f.key]}
              onChange={(url) => set(f.key, url)}
              kind="image"
            />
          ) : f.type === "video" ? (
            <CloudinaryUpload
              value={values[f.key]}
              onChange={(url) => set(f.key, url)}
              kind="video"
            />
          ) : (
            <input
              type="text"
              value={values[f.key] || ""}
              onChange={(e) => set(f.key, e.target.value)}
              className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
            />
          )}
        </div>
      ))}

      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover disabled:opacity-50 text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && (
          <span className="text-xs text-success flex items-center gap-1">
            <Check className="w-4 h-4" /> Saved
          </span>
        )}
      </div>
    </div>
  );
}
