"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
  iframeClassName?: string;
  containerClassName?: string;
  rootMargin?: string;
};

/**
 * Mounts the iframe only when the wrapper enters the viewport (with a generous
 * pre-fetch margin). Until then, it renders a lightweight black placeholder.
 *
 * This eliminates concurrent video decoding for videos that aren't on screen,
 * which is what causes scroll jank and frame drops.
 */
export function LazyVideoIframe({
  src,
  title,
  iframeClassName,
  containerClassName,
  rootMargin = "300px",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const node = wrapperRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldLoad(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [shouldLoad, rootMargin]);

  return (
    <div ref={wrapperRef} className={containerClassName}>
      {shouldLoad ? (
        <iframe
          src={src}
          className={iframeClassName}
          allow="autoplay; fullscreen; encrypted-media"
          title={title}
          loading="lazy"
        />
      ) : null}
    </div>
  );
}
