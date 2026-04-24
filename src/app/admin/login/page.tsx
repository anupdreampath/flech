"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [email, setEmail] = useState("admin@flech.com");
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

  return (
    <div className="min-h-dvh flex items-center justify-center bg-charcoal p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white/[0.04] border border-white/10 rounded-2xl p-8"
      >
        <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-6">
          <Lock className="w-5 h-5 text-accent-light" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-white mb-1">
          Flech Admin
        </h1>
        <p className="text-sm text-white/50 mb-8">
          Sign in to manage content & view analytics.
        </p>

        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
          required
        />

        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
          required
        />

        {err && (
          <p className="text-sm text-accent-light mb-4">{err}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cta hover:bg-cta-hover disabled:opacity-50 text-white px-4 py-3 text-sm font-semibold rounded-sm transition-colors"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-xs text-white/40 mt-6 text-center">
          Default: admin@flech.com / flech-admin-2026
        </p>
      </form>
    </div>
  );
}
