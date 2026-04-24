import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { Calendar, ArrowLeft, User } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sb = createServerClient();
  const { data } = await sb
    .from("blogs")
    .select("title,excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return {
    title: data?.title,
    description: data?.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sb = createServerClient();
  const { data } = await sb
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!data) notFound();

  return (
    <article className="pb-24">
      <div className="bg-charcoal text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight mb-4">
            {data.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {data.author}
            </span>
            {data.published_at && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(data.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {data.cover_image && (
        <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
          <img
            src={data.cover_image}
            alt={data.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-xl"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div
          className="prose-article text-charcoal"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {data.tags.map((t: string) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-cream text-charcoal"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .prose-article { font-size: 1.05rem; line-height: 1.75; }
        .prose-article h1, .prose-article h2, .prose-article h3 { font-family: var(--font-serif); margin-top: 2em; margin-bottom: .6em; }
        .prose-article h2 { font-size: 1.75rem; font-weight: 700; }
        .prose-article h3 { font-size: 1.35rem; font-weight: 600; }
        .prose-article p { margin-bottom: 1.1em; }
        .prose-article a { color: var(--color-accent); text-decoration: underline; }
        .prose-article ul, .prose-article ol { padding-left: 1.4em; margin-bottom: 1.1em; }
        .prose-article li { margin-bottom: .4em; }
        .prose-article img { border-radius: .75rem; margin: 2em 0; }
        .prose-article blockquote { border-left: 3px solid var(--color-accent); padding-left: 1.2em; margin: 1.5em 0; font-style: italic; color: var(--color-slate-dark); }
        .prose-article code { background: var(--color-cream); padding: .15em .4em; border-radius: 4px; font-size: .92em; }
        .prose-article pre { background: var(--color-charcoal); color: #f0f0f0; padding: 1em; border-radius: .75rem; overflow-x: auto; margin-bottom: 1.2em; }
      `}</style>
    </article>
  );
}
