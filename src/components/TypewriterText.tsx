"use client";

import { useEffect, useState } from "react";

type Props = {
  texts: string[];
  typeSpeedMs?: number;
  deleteSpeedMs?: number;
  pauseAfterTypeMs?: number;
  pauseAfterDeleteMs?: number;
  className?: string;
};

export function TypewriterText({
  texts,
  typeSpeedMs = 70,
  deleteSpeedMs = 35,
  pauseAfterTypeMs = 1600,
  pauseAfterDeleteMs = 250,
  className = "",
}: Props) {
  const cleaned = texts.filter((t) => typeof t === "string" && t.length > 0);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "switching">("typing");

  useEffect(() => {
    if (cleaned.length === 0) return;
    const current = cleaned[index % cleaned.length];

    if (phase === "typing") {
      if (typed.length < current.length) {
        const t = setTimeout(
          () => setTyped(current.slice(0, typed.length + 1)),
          typeSpeedMs
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), pauseAfterTypeMs);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (typed.length > 0) {
        const t = setTimeout(
          () => setTyped(current.slice(0, typed.length - 1)),
          deleteSpeedMs
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % cleaned.length);
        setPhase("typing");
      }, pauseAfterDeleteMs);
      return () => clearTimeout(t);
    }
  }, [phase, typed, index, cleaned, typeSpeedMs, deleteSpeedMs, pauseAfterTypeMs, pauseAfterDeleteMs]);

  return (
    <span className={`whitespace-nowrap ${className}`}>
      {typed}
      <span
        aria-hidden="true"
        className="inline-block ml-1 animate-pulse text-accent-light"
      >
        |
      </span>
    </span>
  );
}
