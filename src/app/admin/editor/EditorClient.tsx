"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Check, Monitor, Tablet, Smartphone, RefreshCw, ExternalLink } from "lucide-react";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import type { Field } from "@/lib/cms";

type Schema = Record<
  string,
  {
    label: string;
    sections: Record<string, { label: string; fields: Field[] }>;
  }
>;

const VIEWPORTS = {
  desktop: { w: "100%", h: "100%", icon: Monitor },
  tablet: { w: "820px", h: "1180px", icon: Tablet },
  mobile: { w: "390px", h: "844px", icon: Smartphone },
};

export function EditorClient({
  schema,
  pageKey,
  sectionKey,
  previewUrl,
  initialContent,
}: {
  schema: Schema;
  pageKey: string;
  sectionKey: string;
  previewUrl: string;
  initialContent: Record<string, Record<string, string>>;
}) {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activePage, setActivePage] = useState(pageKey);
  const [activeSection, setActiveSection] = useState(sectionKey);
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [viewport, setViewport] = useState<keyof typeof VIEWPORTS>("desktop");
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    // Listen for clicks from iframe
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "cms-select") {
        const [page, section] = (e.data.key || "").split(":");
        if (page && section) {
          setActivePage(page);
          setActiveSection(section);
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const pageDef = schema[activePage];
  const sectionDef = pageDef?.sections[activeSection];
  const values = content[activeSection] || {};

  function setValue(k: string, v: string) {
    setContent((prev) => ({
      ...prev,
      [activeSection]: { ...(prev[activeSection] || {}), [k]: v },
    }));
    setSaved(false);
  }

  async function save() {
    if (!sectionDef) return;
    setSaving(true);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        page: activePage,
        section_key: activeSection,
        content: content[activeSection] || {},
      }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setIframeKey((k) => k + 1); // reload iframe
      setTimeout(() => setSaved(false), 2500);
      router.refresh();
    }
  }

  function changePage(p: string) {
    // Navigate so the server component re-fetches this page's DB content and
    // schema defaults. This guarantees pre-filled fields for every page.
    router.push(`/admin/editor?page=${encodeURIComponent(p)}`);
  }

  const previewHref = (() => {
    const urls: Record<string, string> = {
      home: "/",
      contact: "/contact",
      about: "/about",
      industries: "/industries",
      product_easel: "/products/easel-backs",
      product_foldlines: "/products/fold-lines",
      product_framing: "/products/framing-backs",
      product_matboards: "/products/matboards",
      global: "/",
    };
    return `${urls[activePage] || "/"}?edit=1`;
  })();

  const vp = VIEWPORTS[viewport];
  const ViewportIcon = vp.icon;

  return (
    <div className="h-dvh flex flex-col">
      {/* Top bar */}
      <header className="h-14 shrink-0 bg-[#0b0b17] border-b border-white/10 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-serif font-semibold">Visual Editor</h1>
          <select
            value={activePage}
            onChange={(e) => changePage(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-sm text-sm px-3 py-1.5 text-white"
          >
            {Object.entries(schema).map(([k, p]) => (
              <option key={k} value={k}>{p.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-sm p-0.5">
          {(Object.entries(VIEWPORTS) as [keyof typeof VIEWPORTS, typeof vp][]).map(
            ([k, v]) => {
              const Icon = v.icon;
              return (
                <button
                  key={k}
                  onClick={() => setViewport(k)}
                  className={`p-2 rounded ${viewport === k ? "bg-white/15" : "hover:bg-white/10"}`}
                  title={k}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            }
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIframeKey((k) => k + 1)}
            className="p-2 rounded hover:bg-white/10"
            title="Reload preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <a
            href={previewHref.replace("?edit=1", "")}
            target="_blank"
            className="p-2 rounded hover:bg-white/10"
            title="Open live page"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover disabled:opacity-50 text-white px-4 py-2 text-sm font-semibold rounded-sm"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving…" : saved ? "Saved" : "Save"}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Section list */}
        <aside className="w-56 shrink-0 border-r border-white/10 bg-[#0b0b17] overflow-y-auto">
          <div className="p-4">
            <p className="text-xs uppercase tracking-wider text-white/50 mb-3">
              Sections
            </p>
            <div className="space-y-1">
              {Object.entries(pageDef.sections).map(([k, s]) => (
                <button
                  key={k}
                  onClick={() => setActiveSection(k)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === k
                      ? "bg-accent/20 text-accent-light border border-accent/30"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center: Iframe preview */}
        <main className="flex-1 overflow-auto bg-[#1f1f2e] p-6 flex items-start justify-center">
          <div
            className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300"
            style={{
              width: vp.w,
              maxWidth: "100%",
              height: viewport === "desktop" ? "calc(100dvh - 6.5rem)" : vp.h,
            }}
          >
            <iframe
              key={`${activePage}-${iframeKey}`}
              ref={iframeRef}
              src={previewHref}
              className="w-full h-full border-0 bg-white"
              title="Preview"
            />
          </div>
        </main>

        {/* Right: Section editor */}
        <aside className="w-96 shrink-0 border-l border-white/10 bg-[#0b0b17] overflow-y-auto">
          {sectionDef ? (
            <div className="p-6">
              <h2 className="font-serif font-semibold text-lg mb-1">
                {sectionDef.label}
              </h2>
              <p className="text-xs text-white/40 font-mono mb-6">
                {activePage}:{activeSection}
              </p>

              <div className="space-y-5">
                {sectionDef.fields.map((f) => (
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
                        rows={3}
                        value={values[f.key] || ""}
                        onChange={(e) => setValue(f.key, e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
                      />
                    ) : f.type === "image" ? (
                      <CloudinaryUpload
                        value={values[f.key]}
                        onChange={(url) => setValue(f.key, url)}
                        kind="image"
                      />
                    ) : f.type === "video" ? (
                      <CloudinaryUpload
                        value={values[f.key]}
                        onChange={(url) => setValue(f.key, url)}
                        kind="video"
                      />
                    ) : (
                      <input
                        type="text"
                        value={values[f.key] || ""}
                        onChange={(e) => setValue(f.key, e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
                      />
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-white/40 leading-relaxed">
                Tip: click any highlighted section in the preview to jump
                directly to its editor here.
              </p>
            </div>
          ) : (
            <div className="p-6 text-white/40 text-sm">No section selected.</div>
          )}
        </aside>
      </div>
    </div>
  );
}
