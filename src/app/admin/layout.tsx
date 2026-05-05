import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  BarChart3,
  FileText,
  BookOpen,
  Edit3,
} from "lucide-react";
import { getSession } from "@/lib/admin/session";
import { AdminLogoutButton } from "@/components/admin/LogoutButton";

export const metadata = { title: "Admin · Flech" };

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/cms", label: "Content", icon: FileText },
  { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
  { href: "/admin/editor", label: "Visual Editor", icon: Edit3 },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return <>{children}</>;
  }

  const initials = session.email
    .split("@")[0]
    .split(/[._-]/)
    .map((s) => s[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <div className="min-h-dvh flex bg-slate-50 text-slate-900">
      <aside className="w-64 shrink-0 bg-[#1A1A2E] text-white flex flex-col sticky top-0 h-dvh">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#C41E3A] flex items-center justify-center font-serif font-bold text-white">
              F
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/50 leading-none mb-1">
                Flech
              </p>
              <h1 className="text-sm font-semibold leading-none">
                Admin Console
              </h1>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.16em] text-white/40">
            Workspace
          </p>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
              >
                <Icon className="w-4 h-4 text-white/50 group-hover:text-[#E53E5B]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[11px] font-semibold">
              {initials || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium truncate">{session.email}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">
                Administrator
              </p>
            </div>
          </div>
          <AdminLogoutButton />
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
    </div>
  );
}
