"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Monitor,
  Frame,
  Package,
  Paintbrush,
  Check,
} from "lucide-react";
import {
  AnimatedSection,
} from "@/components/AnimatedSection";

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

function splitList(raw: unknown) {
  return text(raw)
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

const iconMap = { Monitor, Frame, Package, Paintbrush };

export default function IndustriesClient({ content }: { content: PageContent }) {
  const hero = content.hero || {};
  const list = content.industries_list || {};
  const cta = content.cta || {};
  const cmsIndustries = parseItems<{
    id?: string;
    icon?: keyof typeof iconMap;
    name?: string;
    tagline?: string;
    image?: string;
    description?: string;
    needs?: string;
    products?: string;
    cta_label?: string;
    cta_href?: string;
    hidden?: string;
  }>(list.items).filter((industry) => !isHidden(industry.hidden));
  const layoutOrder = text(content.__layout?.order)
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);
  const sectionOrder = (key: string) => {
    const preferred = ["hero", "industries_list", "cta"];
    const ordered = [...layoutOrder.filter((item) => preferred.includes(item)), ...preferred.filter((item) => !layoutOrder.includes(item))];
    return ordered.indexOf(key);
  };

  return (
    <div className="flex flex-col">
      {/* ═══ HERO ═══ */}
      {!isHidden(hero._hidden) && (
      <section className="relative min-h-[50dvh] flex items-end overflow-hidden" style={{ order: sectionOrder("hero") }}>
        <img decoding="async" loading="lazy" src={text(hero.poster_url, "/images/framing/frame-print.png")} alt="Framing industry" className="absolute inset-0 w-full h-full object-cover"  />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 sm:pb-24 pt-40 w-full">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-accent-light">{text(hero.breadcrumb, "Industries")}</span>
          </nav>

          <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] text-white"
          >
            {text(hero.title_top, "Your Industry,")}
            <br />
            <span className="text-accent-light">{text(hero.title_bottom, "Our Expertise")}</span>
          </h1>
        </div>
      </section>
      )}

      {/* ═══ INDUSTRIES ═══ */}
      {!isHidden(list._hidden) && (
      <section className="py-24 sm:py-32" style={{ order: sectionOrder("industries_list") }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32">
            {cmsIndustries.map((industry, idx) => {
              const Icon = iconMap[industry.icon || "Monitor"] || Monitor;
              const isEven = idx % 2 === 0;

              return (
                <div key={`${industry.id}-${industry.name}`} id={text(industry.id)} className="scroll-mt-24">
                  <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
                    {/* Image */}
                    <AnimatedSection preset={isEven ? "slideLeft" : "slideRight"} className={isEven ? "" : "lg:order-2"}>
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-[440px]">
                        <img decoding="async" loading="lazy" src={text(industry.image, "/images/products/consumer-display.jpg")} alt={text(industry.name)} className="absolute inset-0 w-full h-full object-cover"  />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-6 left-6 w-14 h-14 bg-white/25 rounded-xl flex items-center justify-center border border-white/30">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex flex-wrap gap-2">
                            {splitList(industry.products).map((product) => (
                              <span key={product} className="text-xs font-bold bg-white/25 text-white px-3 py-1.5 rounded-full border border-white/20">
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    {/* Content */}
                    <AnimatedSection preset={isEven ? "slideRight" : "slideLeft"} className={isEven ? "" : "lg:order-1"}>
                      <span className="text-6xl font-serif font-black text-cream">0{idx + 1}</span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mt-2 mb-2">{industry.name}</h2>
                      <p className="text-sm font-semibold text-accent mb-6">{industry.tagline}</p>
                      <p className="text-muted leading-relaxed mb-8">{industry.description}</p>

                      <div className="bg-warm-white rounded-xl border border-border p-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-4">What You Need From Us</h3>
                        <div className="space-y-3">
                          {splitList(industry.needs).map((need) => (
                            <div key={need} className="flex items-start gap-3 text-sm text-slate-dark">
                              <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {need}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-border">
                          <Link href={text(industry.cta_href, "/contact")} className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors cursor-pointer">
                            {text(industry.cta_label, "Discuss Your Requirements")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ═══ CTA ═══ */}
      {!isHidden(cta._hidden) && (
      <section className="relative overflow-hidden" style={{ order: sectionOrder("cta") }}>
        <div className="grid lg:grid-cols-2 min-h-[400px]">
          <div className="relative h-48 lg:h-auto overflow-hidden">
            <img decoding="async" loading="lazy" src={text(cta.image, "/images/framing/gallery-frame.jpg")} alt="Gallery frame" className="absolute inset-0 w-full h-full object-cover"  />
          </div>
          <div className="bg-charcoal text-white flex items-center">
            <AnimatedSection className="px-8 py-16 lg:px-16 lg:py-20">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{text(cta.title, "Don't See Your Industry?")}</h2>
              <p className="text-white/50 leading-relaxed mb-8 text-lg">
                {text(cta.body, "If you need precision board products, cut, scored, laminated, or finished, there's a good chance we can help.")}
              </p>
              {!isHidden(cta.button_hidden) && (
                <Link href={text(cta.button_href, "/contact")} className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer">
                  {text(cta.button_label, "Contact Our Team")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
