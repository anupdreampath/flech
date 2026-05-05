"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  containerClassName?: string;
  videoClassName?: string;
  priority?: boolean; // above-the-fold hero videos: load immediately
  rootMargin?: string;
};

/**
 * Native HTML5 background video. Autoplay, muted, looped, no controls.
 * Below-fold instances mount only when scrolled near the viewport so they
 * don't fight for bandwidth / decode time on initial paint.
 */
export function LazyVideo({
  src,
  poster,
  containerClassName,
  videoClassName,
  priority = false,
  rootMargin = "300px",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    if (shouldLoad) return;
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
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
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          disablePictureInPicture
          className={videoClassName}
        />
      ) : null}
    </div>
  );
}
