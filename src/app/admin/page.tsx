import { createServerClient } from "@/lib/supabase/server";
import { Inbox, Users, Activity, BookOpen, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  const sb = createServerClient();
  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 3600_000).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 3600_000).toISOString();

  const [subs, sessions, events, blogs, recentSubs, topCities] =
    await Promise.all([
      sb
        .from("form_submissions")
        .select("id", { count: "exact", head: true })
        .gte("created_at", weekAgo),
      sb
        .from("analytics_sessions")
        .select("id", { count: "exact", head: true })
        .gte("started_at", weekAgo),
      sb
        .from("analytics_events")
        .select("id", { count: "exact", head: true })
        .gte("created_at", dayAgo),
      sb.from("blogs").select("id", { count: "exact", head: true }),
      sb
        .from("form_submissions")
        .select("id,name,company,email,product,created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      sb
        .from("analytics_sessions")
        .select("city,country")
        .gte("started_at", weekAgo)
        .not("city", "is", null)
        .limit(500),
    ]);

  const cityCounts = new Map<string, number>();
  (topCities.data || []).forEach((r) => {
    const key = `${r.city}, ${r.country || ""}`;
    cityCounts.set(key, (cityCounts.get(key) || 0) + 1);
  });
  const cities = [...cityCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return {
    submissions: subs.count || 0,
    sessions: sessions.count || 0,
    events: events.count || 0,
    blogs: blogs.count || 0,
    recent: recentSubs.data || [],
    cities,
  };
}

export default async function AdminDashboard() {
  const s = await getStats();
  const cards = [
    {
      label: "Submissions",
      sub: "Last 7 days",
      value: s.submissions,
      icon: Inbox,
      tone: "bg-[#C41E3A]/10 text-[#C41E3A]",
    },
    {
      label: "Sessions",
      sub: "Last 7 days",
      value: s.sessions,
      icon: Users,
      tone: "bg-[#1A1A2E]/5 text-[#1A1A2E]",
    },
    {
      label: "Events",
      sub: "Last 24 hours",
      value: s.events,
      icon: Activity,
      tone: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Blog posts",
      sub: "All time",
      value: s.blogs,
      icon: BookOpen,
      tone: "bg-amber-500/10 text-amber-600",
    },
  ];

  return (
    <div className="px-8 py-8 max-w-7xl">
      <header className="flex items-end justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-1">
            Overview
          </p>
          <h1 className="text-2xl font-semibold text-[#1A1A2E] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Operational summary across enquiries, content, and visitor activity.
          </p>
        </div>
        <p className="text-xs text-slate-400 hidden md:block">
          Updated{" "}
          {new Date().toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-9 h-9 rounded-md flex items-center justify-center ${c.tone}`}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
              <p className="text-3xl font-semibold text-[#1A1A2E] tracking-tight tabular-nums">
                {c.value}
              </p>
              <p className="text-sm font-medium text-slate-700 mt-1">
                {c.label}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{c.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-semibold text-[#1A1A2E]">
                Recent Submissions
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest enquiries from contact and quote forms
              </p>
            </div>
            <Link
              href="/admin/submissions"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#C41E3A] hover:text-[#9B1527]"
            >
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {s.recent.length === 0 && (
              <p className="px-6 py-10 text-sm text-slate-400 text-center">
                No submissions yet.
              </p>
            )}
            {s.recent.map((r) => (
              <div
                key={r.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#1A1A2E] truncate">
                    {r.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {[r.company, r.product].filter(Boolean).join(" · ") || "—"}
                  </p>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <p className="text-xs text-slate-500">
                    {new Date(r.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {new Date(r.created_at).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-semibold text-[#1A1A2E]">
                Top Cities
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Last 7 days</p>
            </div>
            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#C41E3A] hover:text-[#9B1527]"
            >
              Analytics <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="px-6 py-4 space-y-3">
            {s.cities.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">
                No visits yet.
              </p>
            )}
            {s.cities.map(([city, count]) => {
              const max = s.cities[0]?.[1] || 1;
              const pct = (count / max) * 100;
              return (
                <div key={city}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-700 inline-flex items-center gap-1.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{city}</span>
                    </span>
                    <span className="text-xs font-medium text-slate-500 tabular-nums">
                      {count}
                    </span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1A1A2E] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
