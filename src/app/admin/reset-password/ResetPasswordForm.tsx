"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    const json = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(json.error || "Could not reset password.");
      return;
    }
    setDone(true);
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1A1A2E] tracking-tight">
          Set new password
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Choose a new admin password. Reset links expire after 1 hour.
        </p>
      </div>

      {done ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Password reset. You can sign in with the new password now.
        </div>
      ) : (
        <>
          <PasswordField label="New password" value={newPassword} onChange={setNewPassword} />
          <PasswordField label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} />
          {error && <p className="text-xs text-[#C41E3A] mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full bg-[#1A1A2E] hover:bg-[#0f0f1f] disabled:opacity-50 text-white px-4 py-2.5 text-sm font-semibold rounded-md transition-colors"
          >
            {loading ? "Saving..." : "Reset password"}
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

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-medium text-slate-700 mb-1.5">{label}</span>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        minLength={10}
        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]/10 focus:border-[#1A1A2E]"
        required
      />
    </label>
  );
}
