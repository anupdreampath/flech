"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Monitor,
  Smartphone,
  RefreshCw,
  ExternalLink,
  ArrowLeft,
  ChevronUp,
  EyeOff,
} from "lucide-react";
import { ContentEditor } from "./[page]/[section]/Editor";
import type { Field } from "@/lib/cms";

export type StudioSection = {
  pageKey: string;
  pageLabel: string;
  pageUrl: string;
  sectionKey: string;
  sectionLabel: string;
  fields: Field[];
  initial: Record<string, string>;
};

type Viewport = "desktop" | "mobile";
const VIEWPORT_WIDTH: Record<Viewport, number | null> = {
  desktop: null,
  mobile: 390,
};

export function VisualStudio({ sections }: { sections: StudioSection[] }) {
  const [sectionList, setSectionList] = useState(sections);
  const [layoutSaving, setLayoutSaving] = useState(false);
  const pages = useMemo(() => {
    const seen = new Set<string>();
    return sectionList
      .filter((s) => {
        if (seen.has(s.pageKey)) return false;
        seen.add(s.pageKey);
        return true;
      })
      .map((s) => ({
        key: s.pageKey,
        label: s.pageLabel,
        url: s.pageUrl,
      }));
  }, [sectionList]);

  const [activePageKey, setActivePageKey] = useState(pages[0]?.key || "home");
  const [activeSectionKey, setActiveSectionKey] = useState<string | null>(null);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const activePageMeta = pages.find((p) => p.key === activePageKey) || pages[0];
  const activePage = activePageMeta
    ? {
        ...activePageMeta,
        sections: sectionList.filter((s) => s.pageKey === activePageMeta.key),
      }
    : null;

  const activeSection =
    activePage?.sections.find((s) => s.sectionKey === activeSectionKey) || null;

  // Reload the preview after a save.
  useEffect(() => {
    function onSaved() {
      setIframeKey((k) => k + 1);
    }
    window.addEventListener("cms:saved", onSaved);
    return () => window.removeEventListener("cms:saved", onSaved);
  }, []);

  // Listen for click-to-select messages from the preview iframe.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type !== "cms:click" || typeof e.data.section !== "string")
        return;
      const [pageKey, sectionKey] = String(e.data.section).split(":");
      if (!pageKey || !sectionKey) return;
      // Find the section in our sections list — fall back to pageKey only.
      const matchPage = pages.find((p) => p.key === pageKey);
      if (matchPage) setActivePageKey(pageKey);
      const found = sectionList.find(
        (s) => s.pageKey === pageKey && s.sectionKey === sectionKey
      );
      if (found) setActiveSectionKey(sectionKey);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [pages, sectionList]);

  async function persistOrder(pageKey: string, orderedSections: StudioSection[]) {
    setLayoutSaving(true);
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        page: pageKey,
        section_key: "__layout",
        content: { order: JSON.stringify(orderedSections.map((s) => s.sectionKey)) },
      }),
    });
    setLayoutSaving(false);
    setIframeKey((k) => k + 1);
  }

  function moveSection(sectionKey: string, dir: -1 | 1) {
    if (!activePage) return;
    const current = activePage.sections;
    const i = current.findIndex((s) => s.sectionKey === sectionKey);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= current.length) return;
    const ordered = [...current];
    [ordered[i], ordered[j]] = [ordered[j], ordered[i]];
    setSectionList((list) => {
      const index = new Map(ordered.map((s, idx) => [s.sectionKey, idx]));
      return [...list].sort((a, b) => {
        if (a.pageKey !== activePage.key || b.pageKey !== activePage.key) return 0;
        return (index.get(a.sectionKey) ?? 0) - (index.get(b.sectionKey) ?? 0);
      });
    });
    persistOrder(activePage.key, ordered);
  }

  // Compose iframe URL: page URL + cmsEdit + cache-buster.
  const activePageUrl = activePage?.url || "/";
  const iframeSrc = `${activePageUrl}${activePageUrl.includes("?") ? "&" : "?"}cmsEdit=1&v=${iframeKey}`;

  const iframeWidth = VIEWPORT_WIDTH[viewport];

  return (
    <div className="flex h-dvh bg-slate-50 text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-[360px] shrink-0 border-r border-slate-200 bg-white flex flex-col">
        {!activeSection ? (
          <>
            <div className="px-5 py-5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">
                Edit Site
              </p>
              <h1 className="text-lg font-semibold text-[#1A1A2E]">
                Visual Editor
              </h1>
              <p className="text-xs text-slate-500 mt-1.5">
                Pick a section on the right or from the list below.
              </p>
            </div>

            <div className="px-5 py-4 border-b border-slate-200">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Page
              </label>
              <select
                value={activePageKey}
                onChange={(e) => {
                  setActivePageKey(e.target.value);
                  setActiveSectionKey(null);
                }}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]/10 focus:border-[#1A1A2E]"
              >
                {pages.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 overflow-y-auto">
              <p className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Sections on this page
              </p>
              {layoutSaving && (
                <p className="px-5 pb-2 text-xs text-slate-500">Saving section order...</p>
              )}
              <ul>
                {activePage?.sections.map((s, idx) => (
                  <li key={s.sectionKey}>
                    <div className="group flex items-center gap-1 px-3 py-1.5 hover:bg-slate-50">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => moveSection(s.sectionKey, -1)}
                          disabled={idx === 0 || layoutSaving}
                          className="p-1.5 text-slate-400 hover:text-[#1A1A2E] disabled:opacity-25"
                          title="Move section up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection(s.sectionKey, 1)}
                          disabled={idx === activePage.sections.length - 1 || layoutSaving}
                          className="p-1.5 text-slate-400 hover:text-[#1A1A2E] disabled:opacity-25"
                          title="Move section down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveSectionKey(s.sectionKey)}
                        className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-sm text-slate-700 hover:text-[#1A1A2E] transition-colors"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          {s.initial._hidden === "true" && (
                            <EyeOff className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                          )}
                          <span className="truncate">{s.sectionLabel}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 shrink-0 text-slate-300 group-hover:text-[#C41E3A] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="px-5 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <button
                type="button"
                onClick={() => setActiveSectionKey(null)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#1A1A2E] mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sections
              </button>
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                {activeSection.pageLabel}
              </p>
              <h2 className="text-base font-semibold text-[#1A1A2E]">
                {activeSection.sectionLabel}
              </h2>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mt-1">
                {activeSection.sectionKey}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ContentEditor
                key={`${activeSection.pageKey}-${activeSection.sectionKey}`}
                page={activeSection.pageKey}
                section={activeSection.sectionKey}
                fields={activeSection.fields}
                initial={activeSection.initial}
              />
            </div>
          </>
        )}
      </aside>

      {/* PREVIEW */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-white">
          <div className="inline-flex rounded-md border border-slate-300 p-0.5">
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                viewport === "desktop"
                  ? "bg-[#1A1A2E] text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                viewport === "mobile"
                  ? "bg-[#1A1A2E] text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-mono">{activePage?.url}</span>
            <button
              type="button"
              onClick={() => setIframeKey((k) => k + 1)}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-[#1A1A2E]"
              title="Reload preview"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <a
              href={activePage?.url || "/"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-[#1A1A2E]"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="flex-1 bg-slate-100 p-6 overflow-auto">
          <div
            className="mx-auto h-full bg-white shadow-lg ring-1 ring-slate-200 rounded-md overflow-hidden transition-[width] duration-300"
            style={{
              width: iframeWidth ? `${iframeWidth}px` : "100%",
              maxWidth: iframeWidth ? `${iframeWidth}px` : "100%",
            }}
          >
            <iframe
              ref={iframeRef}
              key={iframeKey}
              src={iframeSrc}
              title="Live preview"
              className="w-full h-full block border-0"
              style={{ minHeight: "calc(100dvh - 130px)" }}
            />
          </div>
          <p className="mt-3 text-center text-[11px] text-slate-500">
            Tip: hover anything in the preview to outline it, click to open the
            section editor on the left.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper kept for the `ChevronDown` import; re-exported in case anyone wants
// to render an expanded section list elsewhere.
export const _CHEVRON = ChevronDown;
