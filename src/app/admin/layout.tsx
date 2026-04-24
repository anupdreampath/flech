import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  BarChart3,
  FileText,
  BookOpen,
  Edit3,
  LogOut,
} from "lucide-react";
import { getSession } from "@/lib/admin/session";
import { AdminLogoutButton } from "@/components/admin/LogoutButton";

export const metadata = { title: "Admin" };

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/cms", label: "Content (CMS)", icon: FileText },
  { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
  { href: "/admin/editor", label: "Visual Editor", icon: Edit3 },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Login page is outside this layout tree? It's a sub-route /admin/login so it
  // also uses this layout unless we special-case. Return bare children for login.
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh flex bg-[#0b0b17] text-white">
      <aside className="w-60 shrink-0 border-r border-white/10 p-5 flex flex-col">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-light">
            Flech
          </p>
          <h1 className="font-serif text-xl font-bold">Admin</h1>
        </div>

        <nav className="flex-1 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/40 mb-2 truncate">{session.email}</p>
          <AdminLogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
