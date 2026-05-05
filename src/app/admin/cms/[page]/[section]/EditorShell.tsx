"use client";

import { useEffect, useState } from "react";
import { Monitor, Smartphone, RefreshCw, ExternalLink } from "lucide-react";

type Viewport = "desktop" | "mobile";

const VIEWPORT_WIDTH: Record<Viewport, number | null> = {
  desktop: null, // fluid, fills the column
  mobile: 390, // iPhone 12/13/14 logical width
};

export function EditorShell({
  children,
  previewUrl,
  pageLabel,
  sectionLabel,
}: {
  children: React.ReactNode;
  previewUrl: string;
  pageLabel: string;
  sectionLabel: string;
}) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [iframeKey, setIframeKey] = useState(0);

  // Reload preview after every successful save.
  useEffect(() => {
    function onSaved() {
      setIframeKey((k) => k + 1);
    }
    window.addEventListener("cms:saved", onSaved);
    return () => window.removeEventListener("cms:saved", onSaved);
  }, []);

  const iframeWidth = VIEWPORT_WIDTH[viewport];

  return (
    <div className="flex min-h-[calc(100dvh-0px)] bg-slate-50 text-slate-900">
      {/* Left: editor */}
      <div className="w-[420px] shrink-0 border-r border-slate-200 bg-white overflow-y-auto h-dvh sticky top-0">
        <div className="px-6 py-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">
            {pageLabel}
          </p>
          <h1 className="text-lg font-semibold text-[#1A1A2E]">
            {sectionLabel}
          </h1>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>

      {/* Right: live preview */}
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
            <span className="font-mono">{previewUrl}</span>
            <button
              type="button"
              onClick={() => setIframeKey((k) => k + 1)}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-[#1A1A2E]"
              title="Reload preview"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <a
              href={previewUrl}
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
              key={iframeKey}
              src={previewUrl + (previewUrl.includes("?") ? "&" : "?") + "preview=" + iframeKey}
              title="Live preview"
              className="w-full h-full block border-0"
              style={{ minHeight: "calc(100dvh - 130px)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
