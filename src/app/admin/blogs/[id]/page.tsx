import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BlogEditor } from "../BlogEditor";

export const dynamic = "force-dynamic";

export default async function EditBlog({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sb = createServerClient();
  const { data } = await sb.from("blogs").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold mb-6">Edit Post</h1>
      <BlogEditor
        initial={{
          id: data.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || "",
          cover_image: data.cover_image || "",
          content: data.content || "",
          author: data.author || "Flech Team",
          tags: (data.tags || []).join(", "),
          published: !!data.published,
        }}
      />
    </div>
  );
}
