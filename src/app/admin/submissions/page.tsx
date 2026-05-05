import { createServerClient } from "@/lib/supabase/server";
import { Mail, Phone, MapPin, Inbox } from "lucide-react";

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
    <div className="px-8 py-8">
      <header className="flex items-end justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-1">
            Inbox
          </p>
          <h1 className="text-2xl font-semibold text-[#1A1A2E] tracking-tight">
            Submissions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Inbound enquiries and quote requests from the public site.
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-[#1A1A2E] tabular-nums">
            {rows.length}
          </p>
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Records
          </p>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-[0.12em] text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Industry</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-4 align-top whitespace-nowrap text-xs text-slate-500">
                    {new Date(r.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {new Date(r.created_at).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <p className="font-medium text-[#1A1A2E]">
                      {r.name || "—"}
                    </p>
                    <p className="text-xs text-slate-500">{r.company}</p>
                  </td>
                  <td className="px-4 py-4 align-top">
                    {r.email && (
                      <a
                        href={`mailto:${r.email}`}
                        className="inline-flex items-center gap-1.5 text-xs text-[#C41E3A] hover:underline mb-1"
                      >
                        <Mail className="w-3 h-3" /> {r.email}
                      </a>
                    )}
                    {r.phone && (
                      <a
                        href={`tel:${r.phone}`}
                        className="flex items-center gap-1.5 text-xs text-slate-600"
                      >
                        <Phone className="w-3 h-3" /> {r.phone}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <span className="inline-flex items-center text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      {r.product || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-top text-xs text-slate-600">
                    {r.industry || "—"}
                  </td>
                  <td className="px-4 py-4 align-top text-xs text-slate-600">
                    {r.quantity || "—"}
                  </td>
                  <td className="px-4 py-4 align-top">
                    {(r.city || r.country) && (
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {[r.city, r.country].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 align-top max-w-xs">
                    <p className="text-xs text-slate-600 line-clamp-3">
                      {r.custom_size && (
                        <span className="block">
                          <b className="text-slate-700">Size:</b>{" "}
                          {r.custom_size}
                        </span>
                      )}
                      {r.message}
                    </p>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <div className="inline-flex flex-col items-center gap-3 text-slate-400">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                        <Inbox className="w-5 h-5" />
                      </div>
                      <p className="text-sm">No submissions yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
