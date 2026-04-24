import { createServerClient } from "@/lib/supabase/server";
import { Mail, Phone, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const sb = createServerClient();
  const { data } = await sb
    .from("form_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = data || [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Submissions</h1>
        <p className="text-sm text-white/50">{rows.length} records</p>
      </div>

      <div className="bg-white/[0.04] border border-white/10 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-white/50 border-b border-white/10">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Product</th>
              <th className="p-4">Industry</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Location</th>
              <th className="p-4">Message</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-white/5 hover:bg-white/[0.02]"
              >
                <td className="p-4 align-top whitespace-nowrap text-white/70">
                  {new Date(r.created_at).toLocaleString()}
                </td>
                <td className="p-4 align-top">
                  <p className="font-semibold">{r.name || "—"}</p>
                  <p className="text-xs text-white/50">{r.company}</p>
                </td>
                <td className="p-4 align-top">
                  {r.email && (
                    <a
                      href={`mailto:${r.email}`}
                      className="flex items-center gap-2 text-accent-light hover:underline text-xs mb-1"
                    >
                      <Mail className="w-3 h-3" /> {r.email}
                    </a>
                  )}
                  {r.phone && (
                    <a
                      href={`tel:${r.phone}`}
                      className="flex items-center gap-2 text-white/70 text-xs"
                    >
                      <Phone className="w-3 h-3" /> {r.phone}
                    </a>
                  )}
                </td>
                <td className="p-4 align-top text-white/80">{r.product || "—"}</td>
                <td className="p-4 align-top text-white/70">{r.industry || "—"}</td>
                <td className="p-4 align-top text-white/70">{r.quantity || "—"}</td>
                <td className="p-4 align-top">
                  {(r.city || r.country) && (
                    <span className="flex items-center gap-1 text-xs text-white/60">
                      <MapPin className="w-3 h-3" />
                      {[r.city, r.country].filter(Boolean).join(", ")}
                    </span>
                  )}
                </td>
                <td className="p-4 align-top max-w-xs">
                  <p className="text-xs text-white/60 line-clamp-3">
                    {r.custom_size && <span className="block"><b>Size:</b> {r.custom_size}</span>}
                    {r.message}
                  </p>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="p-10 text-center text-white/40">
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
