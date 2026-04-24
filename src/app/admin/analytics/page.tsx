import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function bucket<T extends Record<string, unknown>>(
  rows: T[],
  key: keyof T
): [string, number][] {
  const m = new Map<string, number>();
  rows.forEach((r) => {
    const v = String((r[key] ?? "Unknown") || "Unknown");
    m.set(v, (m.get(v) || 0) + 1);
  });
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

function Bar({
  label,
  count,
  max,
}: {
  label: string;
  count: number;
  max: number;
}) {
  const pct = max ? (count / max) * 100 : 0;
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/80">{label}</span>
        <span className="text-white/50">{count}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default async function AnalyticsPage() {
  const sb = createServerClient();
  const { data: sessions } = await sb
    .from("analytics_sessions")
    .select(
      "id,city,country,region,device_type,device_vendor,browser,os,duration_seconds,page_views,started_at,referrer,landing_page,utm_source,utm_medium,utm_campaign"
    )
    .order("started_at", { ascending: false })
    .limit(500);

  const s = sessions || [];
  const cities = bucket(s, "city").slice(0, 10);
  const countries = bucket(s, "country").slice(0, 10);
  const devices = bucket(s, "device_type");
  const browsers = bucket(s, "browser").slice(0, 8);
  const os = bucket(s, "os").slice(0, 8);

  // Traffic sources: resolve "source" = utm_source || referrer host || "Direct"
  const sourceOf = (r: (typeof s)[number]): string => {
    if (r.utm_source) return String(r.utm_source);
    const ref = r.referrer ? String(r.referrer) : "";
    if (!ref) return "Direct";
    try {
      return new URL(ref).hostname.replace(/^www\./, "");
    } catch {
      return ref;
    }
  };

  // Aggregate: count + total seconds per source so time-on-site is
  // queryable by traffic source (utm / referrer).
  const sourceAgg = new Map<string, { count: number; totalSecs: number }>();
  s.forEach((r) => {
    const k = sourceOf(r);
    const cur = sourceAgg.get(k) || { count: 0, totalSecs: 0 };
    cur.count += 1;
    cur.totalSecs += r.duration_seconds || 0;
    sourceAgg.set(k, cur);
  });
  const sources = [...sourceAgg.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);
  const campaigns = bucket(s, "utm_campaign").slice(0, 8);

  const avgTime =
    s.length > 0
      ? Math.round(
          s.reduce((a, b) => a + (b.duration_seconds || 0), 0) / s.length
        )
      : 0;
  const avgPages =
    s.length > 0
      ? (s.reduce((a, b) => a + (b.page_views || 0), 0) / s.length).toFixed(1)
      : "0";

  const maxCity = Math.max(1, ...cities.map(([, c]) => c));
  const maxCountry = Math.max(1, ...countries.map(([, c]) => c));
  const maxDevice = Math.max(1, ...devices.map(([, c]) => c));
  const maxBrowser = Math.max(1, ...browsers.map(([, c]) => c));
  const maxOs = Math.max(1, ...os.map(([, c]) => c));
  const maxSource = Math.max(1, ...sources.map(([, v]) => v.count));
  const maxCampaign = Math.max(1, ...campaigns.map(([, c]) => c));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card label="Total Sessions" value={s.length} />
        <Card
          label="Avg Time on Site"
          value={`${Math.floor(avgTime / 60)}m ${avgTime % 60}s`}
        />
        <Card label="Avg Pages / Session" value={avgPages} />
        <Card
          label="Unique Cities"
          value={cities.filter(([k]) => k !== "Unknown").length}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Panel title="Traffic Sources · Time on Site">
          <p className="text-xs text-white/40 mb-3">
            How long visitors stay, grouped by UTM source / referrer host.
          </p>
          {sources.map(([k, v]) => {
            const avg = v.count ? Math.round(v.totalSecs / v.count) : 0;
            return (
              <div key={k} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/80">{k}</span>
                  <span className="text-white/50">
                    {v.count} sessions · avg {Math.floor(avg / 60)}m{" "}
                    {avg % 60}s
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                    style={{ width: `${(v.count / maxSource) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
          {sources.length === 0 && <Empty />}
        </Panel>
        <Panel title="Top Campaigns">
          {campaigns.map(([k, v]) => (
            <Bar key={k} label={k} count={v} max={maxCampaign} />
          ))}
          {campaigns.length === 0 && <Empty />}
        </Panel>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Panel title="Top Cities">
          {cities.map(([k, v]) => (
            <Bar key={k} label={k} count={v} max={maxCity} />
          ))}
          {cities.length === 0 && <Empty />}
        </Panel>
        <Panel title="Top Countries">
          {countries.map(([k, v]) => (
            <Bar key={k} label={k} count={v} max={maxCountry} />
          ))}
          {countries.length === 0 && <Empty />}
        </Panel>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Panel title="Devices">
          {devices.map(([k, v]) => (
            <Bar key={k} label={k} count={v} max={maxDevice} />
          ))}
          {devices.length === 0 && <Empty />}
        </Panel>
        <Panel title="Browsers">
          {browsers.map(([k, v]) => (
            <Bar key={k} label={k} count={v} max={maxBrowser} />
          ))}
          {browsers.length === 0 && <Empty />}
        </Panel>
        <Panel title="Operating Systems">
          {os.map(([k, v]) => (
            <Bar key={k} label={k} count={v} max={maxOs} />
          ))}
          {os.length === 0 && <Empty />}
        </Panel>
      </div>

      <Panel title="Recent Sessions">
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-white/50">
              <tr>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Device / Browser</th>
                <th className="p-3 text-left">Source</th>
                <th className="p-3 text-left">Landing</th>
                <th className="p-3 text-right">Duration</th>
                <th className="p-3 text-right">Pages</th>
              </tr>
            </thead>
            <tbody>
              {s.slice(0, 30).map((r) => (
                <tr key={r.id} className="border-t border-white/5">
                  <td className="p-3 text-white/70 text-xs whitespace-nowrap">
                    {new Date(r.started_at).toLocaleString()}
                  </td>
                  <td className="p-3 text-white/80 text-xs">
                    {[r.city, r.region, r.country].filter(Boolean).join(", ") ||
                      "—"}
                  </td>
                  <td className="p-3 text-white/80 text-xs">
                    {[r.device_type, r.browser, r.os]
                      .filter(Boolean)
                      .join(" · ")}
                  </td>
                  <td className="p-3 text-white/70 text-xs">{sourceOf(r)}</td>
                  <td className="p-3 text-white/60 text-xs truncate max-w-[200px]">
                    {r.landing_page}
                  </td>
                  <td className="p-3 text-right text-white/70 text-xs">
                    {Math.floor((r.duration_seconds || 0) / 60)}m{" "}
                    {(r.duration_seconds || 0) % 60}s
                  </td>
                  <td className="p-3 text-right text-white/70 text-xs">
                    {r.page_views || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
      <p className="text-3xl font-serif font-bold">{value}</p>
      <p className="text-xs text-white/50 uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
      <h2 className="font-serif font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-white/40">No data yet.</p>;
}
