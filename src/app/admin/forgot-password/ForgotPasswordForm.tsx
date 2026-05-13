"use client";

import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/forgot-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Could not send reset email.");
      return;
    }
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1A1A2E] tracking-tight">
          Reset admin password
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter your admin email and we will send a reset link.
        </p>
      </div>

      {sent ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          If that email is an admin account, a reset link has been sent.
        </div>
      ) : (
        <>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Admin email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-5 px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]/10 focus:border-[#1A1A2E]"
            required
          />
          {error && <p className="text-xs text-[#C41E3A] mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A1A2E] hover:bg-[#0f0f1f] disabled:opacity-50 text-white px-4 py-2.5 text-sm font-semibold rounded-md transition-colors"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </>
      )}

      <Link
        href="/admin/login"
        className="block text-center text-xs text-slate-500 hover:text-[#1A1A2E] mt-6"
      >
        Back to sign in
      </Link>
    </form>
  );
}
