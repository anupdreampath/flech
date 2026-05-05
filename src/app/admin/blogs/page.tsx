import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { PlusCircle, Edit3, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogsAdmin() {
  const sb = createServerClient();
  const { data } = await sb
    .from("blogs")
    .select("id,slug,title,published,published_at,updated_at,author")
    .order("updated_at", { ascending: false });

  const rows = data || [];

  return (
    <div className="px-8 py-8 max-w-6xl">
      <header className="flex items-end justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-1">
            Editorial
          </p>
          <h1 className="text-2xl font-semibold text-[#1A1A2E] tracking-tight">
            Blogs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Author and publish long-form content for the Flech site.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 bg-[#1A1A2E] hover:bg-[#0f0f1f] text-white px-4 py-2.5 text-sm font-semibold rounded-md transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          New Post
        </Link>
      </header>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-[0.12em] text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Author</th>
              <th className="px-4 py-3 text-left font-medium">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-4">
                  <p className="font-medium text-[#1A1A2E]">{r.title}</p>
                  <p className="text-xs text-slate-400 font-mono">
                    /blog/{r.slug}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-md ${
                      r.published
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        r.published ? "bg-emerald-500" : "bg-slate-400"
                      }`}
                    />
                    {r.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-slate-700">{r.author}</td>
                <td className="px-4 py-4 text-xs text-slate-500">
                  {new Date(r.updated_at).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    href={`/admin/blogs/${r.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#C41E3A] hover:text-[#9B1527]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="inline-flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <p className="text-sm">
                      No blog posts yet. Click{" "}
                      <span className="font-medium text-slate-600">
                        New Post
                      </span>{" "}
                      to create one.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
