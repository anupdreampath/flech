import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

type SectionContent = Record<string, unknown>;
type PageContent = Record<string, SectionContent>;

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function isHidden(content: SectionContent | undefined) {
  return content?._hidden === "true" || content?._hidden === true;
}

function parseItems<T extends object>(raw: unknown, fallback: T[] = []): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (typeof raw !== "string") return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function paragraphs(raw: unknown) {
  return text(raw)
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function orderedKeys(content: PageContent) {
  const fallback = ["hero", "content", "cta"];
  const raw = text(content.__layout?.order);
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    const saved = parsed.filter((key): key is string => fallback.includes(key));
    return [...saved, ...fallback.filter((key) => !saved.includes(key))];
  } catch {
    const saved = raw
      .split(",")
      .map((key) => key.trim())
      .filter((key) => fallback.includes(key));
    return [...saved, ...fallback.filter((key) => !saved.includes(key))];
  }
}

export function LegalCmsPage({
  pageKey,
  content,
}: {
  pageKey: "privacy" | "terms";
  content: PageContent;
}) {
  const render = (key: string) => {
    const section = content[key] || {};
    if (isHidden(section)) return null;

    if (key === "hero") {
      return (
        <section
          key={key}
          data-cms-section={`${pageKey}:hero`}
          className="bg-charcoal text-white"
        >
          <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
            <nav
              className="flex items-center gap-2 text-sm text-white/50 mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white/80 transition-colors cursor-pointer">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-accent-light">
                {text(section.breadcrumb, text(section.title))}
              </span>
            </nav>
            <h1 className="text-3xl sm:text-5xl font-serif font-semibold leading-[1.08] mb-5 text-white">
              {text(section.title)}
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              {text(section.subtitle)}
            </p>
            {(text(section.updated_label) || text(section.updated_date)) && (
              <p className="text-xs uppercase tracking-[0.18em] text-white/45 mt-8">
                {text(section.updated_label, "Last updated")} {text(section.updated_date)}
              </p>
            )}
          </div>
        </section>
      );
    }

    if (key === "content") {
      const items = parseItems<{ title?: string; body?: string; hidden?: string }>(
        section.items
      ).filter((item) => !isHidden(item as SectionContent));
      return (
        <section
          key={key}
          data-cms-section={`${pageKey}:content`}
          className="py-16 sm:py-24"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-12">
              {items.map((item, index) => (
                <article key={`${item.title}-${index}`} className="border-b border-border pb-10 last:border-b-0 last:pb-0">
                  <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-charcoal mb-4">
                    {item.title}
                  </h2>
                  <div className="space-y-4">
                    {paragraphs(item.body).map((paragraph, paragraphIndex) => (
                      <p
                        key={`${item.title}-${paragraphIndex}`}
                        className="text-muted leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (key === "cta") {
      return (
        <section
          key={key}
          data-cms-section={`${pageKey}:cta`}
          className="bg-warm-white py-16 sm:py-20"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border border-border bg-surface rounded-lg p-8">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-charcoal mb-3">
                  {text(section.title)}
                </h2>
                <p className="text-muted leading-relaxed max-w-2xl">
                  {text(section.body)}
                </p>
              </div>
              {section.button_hidden !== "true" && (
                <Link
                  href={text(section.button_href, "/contact")}
                  className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors cursor-pointer shrink-0"
                >
                  {text(section.button_label, "Contact Flech")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </section>
      );
    }

    return null;
  };

  return <>{orderedKeys(content).map(render)}</>;
}
