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
    <div className="mb-2.5">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-700 truncate pr-2">{label}</span>
        <span className="text-slate-500 tabular-nums shrink-0">{count}</span>
      </div>
      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1A1A2E] rounded-full"
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
    <div className="px-8 py-8">
      <header className="mb-8 pb-6 border-b border-slate-200">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-1">
          Audience
        </p>
        <h1 className="text-2xl font-semibold text-[#1A1A2E] tracking-tight">
          Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Visitor behaviour, traffic sources, and device breakdown.
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <Panel
          title="Traffic Sources · Time on Site"
          subtitle="How long visitors stay, grouped by UTM source / referrer host"
        >
          {sources.map(([k, v]) => {
            const avg = v.count ? Math.round(v.totalSecs / v.count) : 0;
            return (
              <div key={k} className="mb-3">
                <div className="flex justify-between text-xs mb-1 gap-2">
                  <span className="text-slate-700 truncate">{k}</span>
                  <span className="text-slate-500 shrink-0 tabular-nums">
                    {v.count} · {Math.floor(avg / 60)}m {avg % 60}s
                  </span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C41E3A] rounded-full"
                    style={{ width: `${(v.count / maxSource) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
          {sources.length === 0 && <Empty />}
        </Panel>
        <Panel title="Top Campaigns" subtitle="Inbound UTM campaigns">
          {campaigns.map(([k, v]) => (
            <Bar key={k} label={k} count={v} max={maxCampaign} />
          ))}
          {campaigns.length === 0 && <Empty />}
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
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

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
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

      <Panel title="Recent Sessions" subtitle="Most recent 30 visits">
        <div className="overflow-x-auto -mx-6 -mb-2">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-[0.12em] text-slate-500 bg-slate-50 border-y border-slate-200">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Time</th>
                <th className="px-4 py-2.5 text-left font-medium">Location</th>
                <th className="px-4 py-2.5 text-left font-medium">
                  Device / Browser
                </th>
                <th className="px-4 py-2.5 text-left font-medium">Source</th>
                <th className="px-4 py-2.5 text-left font-medium">Landing</th>
                <th className="px-4 py-2.5 text-right font-medium">Duration</th>
                <th className="px-4 py-2.5 text-right font-medium">Pages</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {s.slice(0, 30).map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">
                    {new Date(r.started_at).toLocaleString(undefined, {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 text-slate-700 text-xs">
                    {[r.city, r.region, r.country].filter(Boolean).join(", ") ||
                      "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-700 text-xs">
                    {[r.device_type, r.browser, r.os]
                      .filter(Boolean)
                      .join(" · ")}
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">
                    {sourceOf(r)}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-[200px]">
                    {r.landing_page}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-600 text-xs tabular-nums">
                    {Math.floor((r.duration_seconds || 0) / 60)}m{" "}
                    {(r.duration_seconds || 0) % 60}s
                  </td>
                  <td className="px-4 py-3 text-right text-slate-600 text-xs tabular-nums">
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
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <p className="text-2xl font-semibold text-[#1A1A2E] tabular-nums">
        {value}
      </p>
      <p className="text-xs text-slate-500 uppercase tracking-wider mt-2">
        {label}
      </p>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-[#1A1A2E]">{title}</h2>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-slate-400">No data yet.</p>;
}
