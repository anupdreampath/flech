"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, Eye, Bold, Italic, Heading1, Heading2, List, Link as LinkIcon, Quote, Code } from "lucide-react";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";

type Values = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  content: string;
  author: string;
  tags: string;
  published: boolean;
};

function wrap(text: string, sel: { start: number; end: number }, before: string, after = before) {
  const selected = text.slice(sel.start, sel.end);
  return text.slice(0, sel.start) + before + selected + after + text.slice(sel.end);
}

export function BlogEditor({ initial }: { initial: Values }) {
  const router = useRouter();
  const [v, setV] = useState<Values>(initial);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState(false);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setV((p) => ({ ...p, [key]: value }));
  }

  async function save(publish?: boolean) {
    setSaving(true);
    const body = { ...v, published: publish ?? v.published };
    const res = await fetch("/api/admin/blogs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/blogs");
      router.refresh();
    }
  }

  async function del() {
    if (!v.id || !confirm("Delete this post permanently?")) return;
    setDeleting(true);
    await fetch("/api/admin/blogs", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: v.id }),
    });
    setDeleting(false);
    router.push("/admin/blogs");
    router.refresh();
  }

  function applyFormat(type: string) {
    const ta = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!ta) return;
    const sel = { start: ta.selectionStart, end: ta.selectionEnd };
    let next = v.content;
    const selText = v.content.slice(sel.start, sel.end) || "text";
    const replace = (block: string) => {
      next = v.content.slice(0, sel.start) + block + v.content.slice(sel.end);
    };
    switch (type) {
      case "bold": next = wrap(v.content, sel, "<strong>", "</strong>"); break;
      case "italic": next = wrap(v.content, sel, "<em>", "</em>"); break;
      case "h1": replace(`<h1>${selText}</h1>`); break;
      case "h2": replace(`<h2>${selText}</h2>`); break;
      case "list": replace(`<ul>\n  <li>${selText}</li>\n</ul>`); break;
      case "quote": replace(`<blockquote>${selText}</blockquote>`); break;
      case "code": next = wrap(v.content, sel, "<code>", "</code>"); break;
      case "link": {
        const url = prompt("URL:", "https://");
        if (url) replace(`<a href="${url}">${selText}</a>`);
        break;
      }
    }
    update("content", next);
  }

  function insertImage(url: string) {
    update("content", v.content + `\n<img src="${url}" alt="" />\n`);
  }

  return (
    <div className="space-y-6">
      {/* Title & slug */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Title</label>
          <input
            value={v.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Slug (URL)</label>
          <input
            value={v.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="auto-generated if blank"
            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent font-mono"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Excerpt</label>
        <textarea
          rows={2}
          value={v.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
        />
      </div>

      {/* Cover image */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Cover Image</label>
        <CloudinaryUpload
          value={v.cover_image}
          onChange={(url) => update("cover_image", url)}
        />
      </div>

      {/* Toolbar */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Content</label>
        <div className="bg-white/5 border border-white/10 border-b-0 rounded-t-sm p-2 flex items-center gap-1 flex-wrap">
          <ToolbarBtn onClick={() => applyFormat("bold")} icon={Bold} label="Bold" />
          <ToolbarBtn onClick={() => applyFormat("italic")} icon={Italic} label="Italic" />
          <ToolbarBtn onClick={() => applyFormat("h1")} icon={Heading1} label="H1" />
          <ToolbarBtn onClick={() => applyFormat("h2")} icon={Heading2} label="H2" />
          <ToolbarBtn onClick={() => applyFormat("list")} icon={List} label="List" />
          <ToolbarBtn onClick={() => applyFormat("quote")} icon={Quote} label="Quote" />
          <ToolbarBtn onClick={() => applyFormat("code")} icon={Code} label="Code" />
          <ToolbarBtn onClick={() => applyFormat("link")} icon={LinkIcon} label="Link" />
          <div className="mx-2 h-5 w-px bg-white/10" />
          <CloudinaryUpload
            className="inline-flex"
            value=""
            onChange={insertImage}
          />
          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/5 text-white/70"
            >
              <Eye className="w-3.5 h-3.5" />
              {preview ? "Edit" : "Preview"}
            </button>
          </div>
        </div>

        {preview ? (
          <div className="bg-white text-charcoal rounded-b-sm p-6 min-h-[400px] prose-article" dangerouslySetInnerHTML={{ __html: v.content }} />
        ) : (
          <textarea
            id="content-editor"
            rows={20}
            value={v.content}
            onChange={(e) => update("content", e.target.value)}
            placeholder="Write your post. Use the toolbar or HTML tags."
            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-b-sm text-white focus:outline-none focus:border-accent font-mono"
          />
        )}
      </div>

      {/* Meta */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Author</label>
          <input
            value={v.author}
            onChange={(e) => update("author", e.target.value)}
            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Tags (comma separated)</label>
          <input
            value={v.tags}
            onChange={(e) => update("tags", e.target.value)}
            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <button
          onClick={() => save(false)}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white px-5 py-2.5 text-sm font-semibold rounded-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Draft
        </button>
        <button
          onClick={() => save(true)}
          disabled={saving || !v.title}
          className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover disabled:opacity-50 text-white px-5 py-2.5 text-sm font-semibold rounded-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          {v.published ? "Update & Keep Published" : "Publish"}
        </button>
        {v.id && (
          <button
            onClick={del}
            disabled={deleting}
            className="inline-flex items-center gap-2 text-white/50 hover:text-accent-light text-sm ml-auto"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>

      <style>{`
        .prose-article h1, .prose-article h2 { font-family: var(--font-serif); margin-top: 1.5em; margin-bottom: .6em; }
        .prose-article h1 { font-size: 2rem; font-weight: 700; }
        .prose-article h2 { font-size: 1.5rem; font-weight: 700; }
        .prose-article p { margin-bottom: 1em; line-height: 1.7; }
        .prose-article a { color: var(--color-accent); text-decoration: underline; }
        .prose-article ul, .prose-article ol { padding-left: 1.4em; margin-bottom: 1em; }
        .prose-article blockquote { border-left: 3px solid var(--color-accent); padding-left: 1em; margin: 1.2em 0; font-style: italic; }
        .prose-article code { background: #eee; padding: .1em .3em; border-radius: 3px; }
        .prose-article img { border-radius: .75rem; margin: 1.5em 0; max-width: 100%; }
      `}</style>
    </div>
  );
}

function ToolbarBtn({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="p-1.5 rounded hover:bg-white/10 text-white/80"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
