"use client";

import { useEffect, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Instant fade-in on route change — CSS only, no layout cost
    el.style.opacity = "0";
    // Force reflow then animate
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.2s ease-out";
      el.style.opacity = "1";
    });
  }, []);

  return <div ref={ref}>{children}</div>;
}
