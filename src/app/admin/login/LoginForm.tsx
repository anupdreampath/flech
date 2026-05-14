"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck } from "lucide-react";

type CmsMap = Record<string, string>;

export function LoginForm({
  brandPanel,
  formCopy,
}: {
  brandPanel: CmsMap;
  formCopy: CmsMap;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [email, setEmail] = useState("admin@flech.test");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push(next);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data.error || "Invalid credentials");
    }
  }

  const errorText =
    err === "invalid"
      ? formCopy.error_invalid || "Invalid email or password."
      : err === "missing"
        ? formCopy.error_missing || "Please enter both email and password."
        : err;

  return (
    <div className="min-h-dvh grid lg:grid-cols-2 bg-slate-50">
      {brandPanel._hidden !== "true" && (
        <aside
          className="hidden lg:flex flex-col justify-between bg-[#1A1A2E] text-white p-12 relative overflow-hidden"
          data-cms-section="admin_login:brand_panel"
        >
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #C41E3A 0px, transparent 40%), radial-gradient(circle at 80% 70%, #E53E5B 0px, transparent 50%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#C41E3A] flex items-center justify-center font-serif font-bold text-white">
                {brandPanel.logo_letter || "F"}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">
                  {brandPanel.eyebrow || "Flech"}
                </p>
                <p className="text-sm font-semibold">
                  {brandPanel.console_name || "Admin Console"}
                </p>
              </div>
            </div>
          </div>

          <div className="relative max-w-sm">
            <h2 className="font-serif text-3xl leading-tight mb-4">
              {brandPanel.title ||
                "Operate the Flech digital surface from a single console."}
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              {brandPanel.body ||
                "Manage inbound enquiries, content, blogs, and visitor analytics for every Flech product line."}
            </p>
          </div>

          <div className="relative text-[11px] text-white/40 uppercase tracking-wider">
            {brandPanel.copyright || "© Flech Manufacturing"}
          </div>
        </aside>
      )}

      <section className="flex items-center justify-center p-6 lg:p-12">
        <form
          onSubmit={submit}
          className="w-full max-w-sm"
          data-cms-section="admin_login:form"
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#1A1A2E] text-white mb-5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-semibold text-[#1A1A2E] tracking-tight">
              {formCopy.title || "Sign in to Admin"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {formCopy.subtitle ||
                "Use your administrator credentials to continue."}
            </p>
          </div>

          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            {formCopy.email_label || "Email"}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]/10 focus:border-[#1A1A2E]"
            required
          />

          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            {formCopy.password_label || "Password"}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-5 px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]/10 focus:border-[#1A1A2E]"
            required
          />

          {err && (
            <div className="text-xs text-[#C41E3A] bg-[#C41E3A]/5 border border-[#C41E3A]/20 rounded-md px-3 py-2 mb-4">
              {errorText}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A1A2E] hover:bg-[#0f0f1f] disabled:opacity-50 text-white px-4 py-2.5 text-sm font-semibold rounded-md transition-colors"
          >
            {loading
              ? formCopy.button_loading_label || "Signing in…"
              : formCopy.button_label || "Sign in"}
          </button>

          <Link
            href="/admin/forgot-password"
            className="block text-center text-xs text-slate-500 hover:text-[#1A1A2E] mt-5"
          >
            {formCopy.forgot_label || "Forgot password?"}
          </Link>

          <p className="text-[11px] text-slate-400 mt-8 text-center">
            {formCopy.footer_note || "Authorized personnel only · Sessions are audited."}
          </p>
        </form>
      </section>
    </div>
  );
}
