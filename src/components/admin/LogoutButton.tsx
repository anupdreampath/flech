"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors w-full px-3 py-2 rounded-md hover:bg-white/5"
    >
      <LogOut className="w-4 h-4" />
      Log out
    </button>
  );
}
