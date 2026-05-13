"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Film } from "lucide-react";

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        opts: Record<string, unknown>,
        cb: (err: unknown, result: { event?: string; info?: { secure_url: string } }) => void
      ) => { open: () => void };
    };
  }
}

type Kind = "image" | "video";
type Variant = "dark" | "light";

export function CloudinaryUpload({
  value,
  onChange,
  className = "",
  kind = "image",
  variant = "dark",
}: {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  kind?: Kind;
  variant?: Variant;
}) {
  const widgetRef = useRef<{ open: () => void } | null>(null);
  const [ready, setReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.cloudinary)
  );
  const missingConfig =
    !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.cloudinary) return;
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!ready || !window.cloudinary) return;
    if (missingConfig) return;
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera"],
        multiple: false,
        resourceType: kind === "video" ? "video" : "image",
        maxFileSize: kind === "video" ? 100_000_000 : 10_000_000,
        clientAllowedFormats:
          kind === "video" ? ["mp4", "webm", "mov"] : undefined,
      },
      (err, result) => {
        if (!err && result?.event === "success" && result.info?.secure_url) {
          onChange(result.info.secure_url);
        }
      }
    );
  }, [ready, onChange, kind, missingConfig]);

  const Icon = kind === "video" ? Film : ImagePlus;
  const inputClass =
    variant === "light"
      ? "flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]/10 focus:border-[#1A1A2E]"
      : "flex-1 px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent";
  const buttonClass =
    variant === "light"
      ? "inline-flex items-center gap-2 bg-[#1A1A2E] hover:bg-[#0f0f1f] disabled:opacity-50 text-white px-3 py-2 text-xs font-semibold rounded-md"
      : "inline-flex items-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white px-3 py-2 text-xs font-semibold rounded-sm";
  const previewClass =
    variant === "light"
      ? "w-full max-w-xs h-32 object-cover rounded-md border border-slate-200 bg-slate-50"
      : "w-full max-w-xs h-32 object-cover rounded-md border border-white/10";

  return (
    <div className={className}>
      {value && (
        <div className="mb-2">
          {kind === "video" ? (
            <video
              src={value}
              muted
              autoPlay
              loop
              playsInline
              className={`${previewClass} bg-black`}
            />
          ) : (
            <img
              src={value}
              alt=""
              className={previewClass}
            />
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={kind === "video" ? "https://.../video.mp4 or upload" : "https://... or upload"}
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => widgetRef.current?.open()}
          disabled={!ready || missingConfig}
          className={buttonClass}
        >
          <Icon className="w-4 h-4" />
          Upload
        </button>
      </div>
      {missingConfig && (
        <p
          className={
            variant === "light"
              ? "mt-2 text-xs text-amber-700"
              : "mt-2 text-xs text-amber-300"
          }
        >
          Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to enable uploads.
        </p>
      )}
    </div>
  );
}
