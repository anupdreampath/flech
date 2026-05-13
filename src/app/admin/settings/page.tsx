import { getSession } from "@/lib/admin/session";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await getSession();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">
          Account
        </p>
        <h1 className="text-2xl font-semibold text-[#1A1A2E]">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Signed in as {session?.email}
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
