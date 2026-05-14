import { Suspense } from "react";
import { CMS_SCHEMA, getContent, sectionDefaults } from "@/lib/cms";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign In · Flech Admin" };

async function load(section: "brand_panel" | "form") {
  const defaults = sectionDefaults(
    CMS_SCHEMA.admin_login.sections[section]?.fields || []
  );
  return getContent("admin_login", section, defaults);
}

function LoginFallback() {
  return <div className="min-h-dvh bg-slate-50" />;
}

export default async function AdminLoginPage() {
  const [brandPanel, formCopy] = await Promise.all([
    load("brand_panel"),
    load("form"),
  ]);

  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm brandPanel={brandPanel} formCopy={formCopy} />
    </Suspense>
  );
}
