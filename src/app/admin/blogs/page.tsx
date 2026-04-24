import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { PlusCircle, Edit3 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogsAdmin() {
  const sb = createServerClient();
  const { data } = await sb
    .from("blogs")
    .select("id,slug,title,published,published_at,updated_at,author")
    .order("updated_at", { ascending: false });

  const rows = data || [];

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-4 py-2.5 text-sm font-semibold rounded-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <div className="bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider text-white/50 border-b border-white/10">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Author</th>
              <th className="p-4 text-left">Updated</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-white/5">
                <td className="p-4">
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs text-white/40 font-mono">/blog/{r.slug}</p>
                </td>
                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      r.published
                        ? "bg-success/15 text-success"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {r.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4 text-white/70">{r.author}</td>
                <td className="p-4 text-white/50 text-xs">
                  {new Date(r.updated_at).toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/blogs/${r.id}`}
                    className="inline-flex items-center gap-1 text-accent-light hover:underline text-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-white/40">
                  No blog posts yet. Click &ldquo;New Post&rdquo; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
