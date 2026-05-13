import { Suspense } from "react";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata = { title: "Reset Password · Flech Admin" };

export default function ResetPasswordPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-slate-50 p-6">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
