"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

/*
  Lightweight scroll-reveal using a single IntersectionObserver per page.
  CSS-only transforms (opacity + translate) for 60fps on mobile.
  No framer-motion whileInView, no per-element observers.
*/

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const presetStyles: Record<string, { from: string; to: string }> = {
  fadeUp: {
    from: "opacity-0 translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  fadeIn: {
    from: "opacity-0",
    to: "opacity-100",
  },
  scaleIn: {
    from: "opacity-0 scale-95",
    to: "opacity-100 scale-100",
  },
  slideLeft: {
    from: "opacity-0 -translate-x-10",
    to: "opacity-100 translate-x-0",
  },
  slideRight: {
    from: "opacity-0 translate-x-10",
    to: "opacity-100 translate-x-0",
  },
};

export function AnimatedSection({
  children,
  preset = "fadeUp",
  delay = 0,
  className,
}: {
  children: ReactNode;
  preset?: keyof typeof presetStyles;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  const p = presetStyles[preset] || presetStyles.fadeUp;

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        visible ? p.to : p.from
      } ${className || ""}`}
      style={delay > 0 ? { transitionDelay: `${delay * 1000}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className={`${className || ""}`}
      style={
        {
          "--stagger-visible": visible ? "1" : "0",
        } as React.CSSProperties
      }
      data-visible={visible ? "" : undefined}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div
      className={`transition-[opacity,transform] duration-500 ease-out
        [[data-visible]_&]:opacity-100 [[data-visible]_&]:translate-y-0
        opacity-0 translate-y-6
        ${className || ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {children}
    </div>
  );
}

export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`transition-transform duration-300 ease-out hover:-translate-y-1.5 ${className || ""}`}
    >
      {children}
    </div>
  );
}

export function ParallaxImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className || ""}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
