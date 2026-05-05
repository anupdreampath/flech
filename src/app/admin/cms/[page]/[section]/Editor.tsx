"use client";

import { useState } from "react";
import { Save, Check, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import type { Field, SubField } from "@/lib/cms";

type ItemValue = Record<string, string>;

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
          {f.type !== "repeater" && (
            <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
              {f.label}
            </label>
          )}
          {f.type !== "repeater" && f.helper && (
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
          ) : f.type === "repeater" ? (
            <RepeaterField
              field={f}
              raw={values[f.key]}
              onChange={(json) => set(f.key, json)}
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

function parseItems(raw: string | undefined, fallback: ItemValue[]): ItemValue[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ItemValue[]) : fallback;
  } catch {
    return fallback;
  }
}

function RepeaterField({
  field,
  raw,
  onChange,
}: {
  field: Field;
  raw: string | undefined;
  onChange: (json: string) => void;
}) {
  const subFields: SubField[] = field.subFields || [];
  const fallback: ItemValue[] = field.defaultItems || [];
  const items = parseItems(raw, fallback);

  function commit(next: ItemValue[]) {
    onChange(JSON.stringify(next));
  }

  function update(i: number, key: string, val: string) {
    const next = items.map((it, idx) => (idx === i ? { ...it, [key]: val } : it));
    commit(next);
  }

  function add() {
    const blank: ItemValue = {};
    subFields.forEach((sf) => (blank[sf.key] = ""));
    commit([...items, blank]);
  }

  function remove(i: number) {
    if (!confirm("Remove this item?")) return;
    commit(items.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    commit(next);
  }

  const itemLabel = field.itemLabel || "Item";

  return (
    <div className="border border-white/10 rounded-md bg-white/[0.03]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div>
          <p className="text-sm font-semibold text-white">{field.label}</p>
          {field.helper && (
            <p className="text-xs text-white/50 mt-0.5">{field.helper}</p>
          )}
        </div>
        <span className="text-xs text-white/50">
          {items.length} {items.length === 1 ? itemLabel : `${itemLabel}s`}
        </span>
      </div>

      <div className="divide-y divide-white/10 max-h-[70vh] overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-white/60">
                {itemLabel} #{i + 1}
                {item.name ? ` · ${item.name}` : ""}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="p-1.5 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  className="p-1.5 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-1.5 text-accent-light hover:text-accent"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subFields.map((sf) => (
                <div
                  key={sf.key}
                  className={
                    sf.type === "textarea" || sf.type === "image"
                      ? "sm:col-span-2"
                      : ""
                  }
                >
                  <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
                    {sf.label}
                  </label>
                  {sf.type === "textarea" ? (
                    <textarea
                      rows={2}
                      value={item[sf.key] || ""}
                      onChange={(e) => update(i, sf.key, e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
                    />
                  ) : sf.type === "image" ? (
                    <CloudinaryUpload
                      value={item[sf.key]}
                      onChange={(url) => update(i, sf.key, url)}
                      kind="image"
                    />
                  ) : sf.type === "video" ? (
                    <CloudinaryUpload
                      value={item[sf.key]}
                      onChange={(url) => update(i, sf.key, url)}
                      kind="video"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item[sf.key] || ""}
                      onChange={(e) => update(i, sf.key, e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-white/10">
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2 text-xs font-semibold rounded-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add {itemLabel}
        </button>
      </div>
    </div>
  );
}
