type Props = {
  src: string;
  poster?: string;
  containerClassName?: string;
  videoClassName?: string;
  /** Kept for backward-compat; ignored. Every video now loads eagerly. */
  priority?: boolean;
  /** Kept for backward-compat; ignored. */
  rootMargin?: string;
};

/**
 * Native HTML5 background video. Autoplay, muted, looped, no controls.
 * No lazy mounting — every video starts loading immediately so it's painted
 * before scroll reaches it. Hosted on Gumlet, so there's no load on the app
 * server regardless of how many of these are on the page.
 */
export function LazyVideo({
  src,
  poster,
  containerClassName,
  videoClassName,
}: Props) {
  return (
    <div className={containerClassName}>
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        className={videoClassName}
      />
    </div>
  );
}
