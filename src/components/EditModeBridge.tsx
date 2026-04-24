"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Mounted in the root layout. When the page is opened with `?edit=1`
 * (from the /admin/editor iframe), it:
 *   - injects a CSS outline overlay for elements with data-cms-section
 *   - on hover highlights them, on click posts a message to the parent
 */
export function EditModeBridge() {
  const params = useSearchParams();
  const editMode = params.get("edit") === "1";

  useEffect(() => {
    if (!editMode) return;
    const style = document.createElement("style");
    style.textContent = `
      [data-cms-section] { position: relative; cursor: pointer !important; transition: outline 120ms ease; outline: 1px dashed rgba(196,30,58,.35); outline-offset: 4px; }
      [data-cms-section]:hover { outline: 2px solid #C41E3A; outline-offset: 4px; background: rgba(196,30,58,.04); }
      [data-cms-section]::after {
        content: attr(data-cms-section);
        position: absolute; top: 4px; left: 4px;
        background: #C41E3A; color: white;
        padding: 2px 8px; font-size: 10px; font-family: ui-monospace,monospace;
        border-radius: 3px; pointer-events: none;
        opacity: 0; transition: opacity 120ms;
        z-index: 9999;
      }
      [data-cms-section]:hover::after { opacity: 1; }
      body { cursor: crosshair; }
    `;
    document.head.appendChild(style);

    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cms-section]");
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      const key = target.getAttribute("data-cms-section");
      if (key) {
        window.parent?.postMessage({ type: "cms-select", key }, "*");
      }
    }
    document.addEventListener("click", onClick, true);
    return () => {
      style.remove();
      document.removeEventListener("click", onClick, true);
    };
  }, [editMode]);

  return null;
}
