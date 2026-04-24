import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "Insights, updates, and industry notes from Flech Paper Products.",
};

export const dynamic = "force-dynamic";

export default async function BlogIndex() {
  const sb = createServerClient();
  const { data } = await sb
    .from("blogs")
    .select("slug,title,excerpt,cover_image,author,published_at,tags")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const posts = data || [];

  return (
    <>
      <section className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light mb-3">
            Journal
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold leading-tight mb-4">
            Insights & Industry Notes
          </h1>
          <p className="text-white/60 max-w-2xl text-lg font-light">
            Behind-the-scenes from our Paterson manufacturing floor, material
            science, and the business of precision board products.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-muted text-center py-16">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-300"
                >
                  {p.cover_image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={p.cover_image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {p.published_at
                        ? new Date(p.published_at).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : "Draft"}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-charcoal mb-2 group-hover:text-accent transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
                      {p.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                      Read article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
