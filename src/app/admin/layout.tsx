import { getSession } from "@/lib/admin/session";
import { AdminShell } from "./AdminShell";

export const metadata = { title: "Admin · Flech" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return <>{children}</>;
  }

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
