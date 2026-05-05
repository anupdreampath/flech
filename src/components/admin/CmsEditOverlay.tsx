"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Injected into the public site when the URL contains `?cmsEdit=1`.
 *
 * - Highlights every `[data-cms-section="page:section"]` element on hover.
 * - Forwards every click on such an element to the parent (admin studio)
 *   via postMessage so the studio can open that section's editor.
 * - Suppresses real link/button navigation while the overlay is active so
 *   editors can roam the page freely.
 */
export function CmsEditOverlay() {
  const params = useSearchParams();
  const active = params?.get("cmsEdit") === "1";

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;

    // Inject overlay CSS once.
    const style = document.createElement("style");
    style.id = "cms-edit-overlay-style";
    style.textContent = `
      [data-cms-section] { outline: 1px dashed transparent; outline-offset: -2px; transition: outline-color 120ms; cursor: pointer; }
      [data-cms-section]:hover { outline-color: #C41E3A; }
      [data-cms-section][data-cms-active="1"] { outline: 2px solid #C41E3A !important; outline-offset: -2px; }
      a, button { pointer-events: none !important; }
      [data-cms-section] * { pointer-events: none !important; }
    `;
    document.head.appendChild(style);

    function onClick(e: MouseEvent) {
      // Find the nearest data-cms-section ancestor of the click target.
      let node: HTMLElement | null = e.target as HTMLElement;
      while (node && !node.dataset?.cmsSection) {
        node = node.parentElement;
      }
      if (!node) return;
      e.preventDefault();
      e.stopPropagation();
      const section = node.dataset.cmsSection!;
      // Mark active visually (clear others first).
      document
        .querySelectorAll<HTMLElement>("[data-cms-active='1']")
        .forEach((el) => delete el.dataset.cmsActive);
      node.dataset.cmsActive = "1";
      window.parent?.postMessage({ type: "cms:click", section }, "*");
    }

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.getElementById("cms-edit-overlay-style")?.remove();
    };
  }, [active]);

  return null;
}
