import { createServerClient } from "@/lib/supabase/server";
import { Inbox, Users, BarChart3, BookOpen } from "lucide-react";
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
    { label: "Submissions (7d)", value: s.submissions, icon: Inbox },
    { label: "Sessions (7d)", value: s.sessions, icon: Users },
    { label: "Events (24h)", value: s.events, icon: BarChart3 },
    { label: "Blog posts", value: s.blogs, icon: BookOpen },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-serif font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="bg-white/[0.04] border border-white/10 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5 text-accent-light" />
              </div>
              <p className="text-3xl font-serif font-bold">{c.value}</p>
              <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">
                {c.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-semibold">Recent Submissions</h2>
            <Link
              href="/admin/submissions"
              className="text-xs text-accent-light hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {s.recent.length === 0 && (
              <p className="text-sm text-white/40">No submissions yet.</p>
            )}
            {s.recent.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-medium">{r.name || "—"}</p>
                  <p className="text-xs text-white/50">
                    {r.company} · {r.product}
                  </p>
                </div>
                <p className="text-xs text-white/40">
                  {new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-semibold">Top Cities (7d)</h2>
            <Link
              href="/admin/analytics"
              className="text-xs text-accent-light hover:underline"
            >
              Full analytics
            </Link>
          </div>
          <div className="space-y-2">
            {s.cities.length === 0 && (
              <p className="text-sm text-white/40">No visits yet.</p>
            )}
            {s.cities.map(([city, count]) => (
              <div key={city} className="flex items-center justify-between text-sm">
                <span>{city}</span>
                <span className="text-white/50">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
