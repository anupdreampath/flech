import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata = { title: "Forgot Password · Flech Admin" };

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-slate-50 p-6">
      <ForgotPasswordForm />
    </main>
  );
}
