"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { LazyVideo } from "@/components/LazyVideo";
import { ColorCatalog, type ColorCard, type ColorCatalogLabels } from "./matboards/ColorCatalog";

type SectionContent = Record<string, unknown>;
type PageContent = Record<string, SectionContent>;

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function isHidden(value: unknown) {
  return value === true || value === "true";
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

function parseLayoutOrder(raw: unknown): string[] {
  const value = text(raw);
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    // Older layout values were comma-separated strings.
  }
  return value
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);
}

function orderedKeys(content: PageContent, preferred: string[]) {
  const saved = parseLayoutOrder(content.__layout?.order);
  return [...saved.filter((key) => preferred.includes(key)), ...preferred.filter((key) => !saved.includes(key))];
}

function titleFromHero(hero: SectionContent, fallback: string) {
  const single = text(hero.title);
  if (single) return single;
  return [text(hero.title_top), text(hero.title_bottom)].filter(Boolean).join(" ") || fallback;
}

export function ProductCmsPage({
  pageLabel,
  pageTitle,
  content,
}: {
  pageLabel: string;
  pageTitle: string;
  content: PageContent;
}) {
  const sectionKeys = orderedKeys(content, [
    "hero",
    "overview",
    "capabilities",
    "specifications",
    "easel_styles",
    "primary_colors",
    "premium_colors",
    "cta",
  ]);

  const renderSection = (key: string) => {
    const section = content[key];
    if (!section) return null;
    if (isHidden(section._hidden)) return null;

    if (key === "hero") {
      const title = titleFromHero(section, pageTitle);
      const heroVideo = text(section.video_url);
      const poster = text(section.poster_url, "/images/products/board-stack.jpg");

      return (
        <section key={key} className="relative min-h-[60dvh] flex items-end overflow-hidden bg-black">
          {heroVideo ? (
            <LazyVideo
              src={heroVideo}
              priority
              containerClassName="absolute inset-0"
              videoClassName="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/45" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 sm:pb-24 pt-40 w-full">
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/80 transition-colors cursor-pointer">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/products" className="hover:text-white/80 transition-colors cursor-pointer">Products</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-accent-light">{pageLabel}</span>
            </nav>

            <div className="max-w-3xl">
              {text(section.badge) && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/25 rounded-full text-xs font-bold tracking-wider uppercase text-accent-light mb-6 border border-accent/30">
                  {text(section.badge)}
                </div>
              )}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] tracking-tight mb-6 text-white">
                {title}
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl mb-8">{text(section.subtitle)}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isHidden(section.cta_primary_hidden) && text(section.cta_primary) && (
                  <Link href={text(section.cta_primary_href, "/contact")} className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer">
                    {text(section.cta_primary)}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                {!isHidden(section.cta_secondary_hidden) && text(section.cta_secondary) && (
                  <Link href={text(section.cta_secondary_href, "#specifications")} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer border border-white/20">
                    {text(section.cta_secondary)}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (key === "overview") {
      const bullets = parseItems<{ label?: string; hidden?: string }>(section.bullets).filter((item) => !isHidden(item.hidden));
      return (
        <section key={key} className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection preset="slideLeft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">{text(section.eyebrow)}</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-6">{text(section.title)}</h2>
                <p className="text-muted leading-relaxed mb-8">{text(section.body)}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {bullets.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm text-slate-dark">
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
              <AnimatedSection preset="slideRight">
                <div className="rounded-lg overflow-hidden shadow-2xl bg-warm-white">
                  <img src={text(section.image, "/images/products/board-stack.jpg")} alt={text(section.title)} className="w-full aspect-[4/3] object-cover" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      );
    }

    if (key === "capabilities") {
      const items = parseItems<{ title?: string; description?: string; image?: string; hidden?: string }>(section.items).filter((item) => !isHidden(item.hidden));
      return (
        <section key={key} className="bg-warm-white py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <div className="max-w-2xl mb-14">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">{text(section.eyebrow)}</p>
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal">{text(section.title)}</h2>
              </div>
            </AnimatedSection>
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {items.map((item) => (
                <StaggerItem key={item.title} className="h-full">
                  <article className="bg-surface border border-border rounded-lg overflow-hidden h-full">
                    <img src={text(item.image, "/images/products/consumer-display.jpg")} alt={text(item.title)} className="w-full aspect-[4/3] object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-charcoal mb-3">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      );
    }

    if (key === "specifications") {
      const specs = parseItems<{ label?: string; value?: string; hidden?: string }>(section.items).filter((item) => !isHidden(item.hidden));
      return (
        <section key={key} id="specifications" className="py-24 sm:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-10 text-center">{text(section.title)}</h2>
            <div className="border border-border rounded-lg overflow-hidden">
              {specs.map((spec, index) => (
                <div key={`${spec.label}-${index}`} className="grid sm:grid-cols-[220px_1fr] border-b border-border last:border-b-0">
                  <div className="bg-warm-white px-5 py-4 text-sm font-semibold text-charcoal">{spec.label}</div>
                  <div className="px-5 py-4 text-sm text-muted">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (key === "primary_colors" || key === "premium_colors" || key === "easel_styles") {
      const colors = parseItems<ColorCard & Record<string, string>>(section.colors).filter(
        (item) => !isHidden(item.hidden)
      );
      const fallbackTitle =
        key === "primary_colors"
          ? "Primary Colors"
          : key === "premium_colors"
            ? "Simply Suede & Premium Colors"
            : "Easel Back Black Styles";
      const labels: ColorCatalogLabels = {
        filterTitle: text(section.filter_title, "Filter colors"),
        mobileFilterLabel: text(section.mobile_filter_label, "Filters"),
        searchPlaceholder: text(section.search_placeholder, "Search by name or code..."),
        sizeFilterLabel: text(section.size_filter_label, "Sheet Size"),
        plyFilterLabel: text(section.ply_filter_label, "Ply / Caliper"),
        tagFilterLabel: text(section.tag_filter_label, "Badges"),
        emptyText: text(section.empty_text, "No colors match the current filters."),
        clearLabel: text(section.clear_label, "Clear filters"),
      };
      return (
        <section key={key} id={key.replace("_", "-")} className="bg-warm-white py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                {text(section.eyebrow, key === "easel_styles" ? "Easel Back Finishes" : "Matboard Catalog")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
                {text(section.title, fallbackTitle)}
              </h2>
              {text(section.intro) && (
                <p className="mt-4 max-w-2xl text-muted leading-relaxed">{text(section.intro)}</p>
              )}
            </div>
            <ColorCatalog colors={colors} idPrefix={key} labels={labels} />
          </div>
        </section>
      );
    }

    if (key === "cta") {
      return (
        <section key={key} className="relative overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[420px]">
            <div className="relative h-56 lg:h-auto overflow-hidden">
              <img src={text(section.image, "/images/framing/gallery-frame.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="bg-charcoal text-white flex items-center">
              <div className="px-8 py-16 lg:px-16 lg:py-20 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{text(section.title)}</h2>
                <p className="text-white/60 leading-relaxed mb-8 text-lg">{text(section.body)}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {!isHidden(section.primary_hidden) && (
                    <Link href={text(section.primary_href, "/contact")} className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer">
                      {text(section.primary_label, "Request a Quote")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  {!isHidden(section.secondary_hidden) && (
                    <Link href={text(section.secondary_href, "/industries")} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer border border-white/20">
                      {text(section.secondary_label, "View Industries")}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return null;
  };

  return <>{sectionKeys.map(renderSection)}</>;
}
