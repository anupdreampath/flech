"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Factory,
  Users,
  Clock,
  MapPin,
  Leaf,
  Shield,
  Ruler,
} from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/AnimatedSection";

const VALUE_ICONS = [Ruler, Shield, Users, Leaf];
const STAT_ICONS = [Clock, Users, Factory, MapPin];

type CmsMap = Record<string, string>;

type AboutCms = {
  hero?: CmsMap;
  stats?: CmsMap;
  story?: CmsMap;
  values?: CmsMap;
  timeline_heading?: CmsMap;
  timeline?: CmsMap;
  founder?: CmsMap;
  cta?: CmsMap;
};

export default function AboutPage({ cms = {} }: { cms?: AboutCms }) {
  const h = cms.hero || {};
  const st = cms.stats || {};
  const sy = cms.story || {};
  const va = cms.values || {};
  const th = cms.timeline_heading || {};
  const tl = cms.timeline || {};
  const fo = cms.founder || {};
  const ct = cms.cta || {};

  const stats = [1, 2, 3, 4].map((n, i) => ({
    value: st[`stat_${n}_value`] || "",
    label: st[`stat_${n}_label`] || "",
    icon: STAT_ICONS[i],
  }));

  const values = [1, 2, 3, 4].map((n, i) => ({
    title: va[`v${n}_title`] || "",
    desc: va[`v${n}_desc`] || "",
    icon: VALUE_ICONS[i],
  }));

  const timeline = [1, 2, 3, 4, 5, 6].map((n) => ({
    year: tl[`m${n}_year`] || "",
    title: tl[`m${n}_title`] || "",
    desc: tl[`m${n}_desc`] || "",
  }));

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50dvh] flex items-end overflow-hidden bg-black" data-cms-section="about:hero">
        <iframe
          src="https://play.gumlet.io/embed/69ec633f4779ed7c8b5cb7de?autoplay=true&loop=true&background=true&muted=true&preload=true&disable_logo=true"
          className="absolute border-0 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
          allow="autoplay; fullscreen"
          title="Inside the Flech factory"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 sm:pb-24 pt-40 w-full">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-accent-light">{h.breadcrumb || "About"}</span>
          </nav>

          <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] text-white"
          >
            {h.title_top || "25 Years of Knowing"}
            <br />
            <span className="text-accent-light">{h.title_bottom || "What Works"}</span>
          </h1>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="bg-charcoal text-white" data-cms-section="about:stats">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={stat.label}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                      <Icon className="w-6 h-6 text-accent-light" />
                    </div>
                    <div>
                      <p className="text-3xl font-serif font-bold text-white leading-none">{stat.value}</p>
                      <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ STORY + VALUES ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection preset="slideLeft">
              <div data-cms-section="about:story">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">{sy.eyebrow || "Our Story"}</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-6">
                {sy.title || "From Local Converter to National Manufacturer"}
              </h2>
              <div className="space-y-6 text-muted leading-relaxed">
                <p>{sy.paragraph_1}</p>
                <p>{sy.paragraph_2}</p>
                <p>{sy.paragraph_3}</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden h-32">
                  <img decoding="async" loading="lazy" src={sy.image_1 || "/images/home/stacked-boards.jpg"} alt="Stacked boards" className="w-full h-full object-cover"  />
                </div>
                <div className="rounded-xl overflow-hidden h-32">
                  <img decoding="async" loading="lazy" src={sy.image_2 || "/images/products/matboard-display.jpg"} alt="Matboard" className="w-full h-full object-cover"  />
                </div>
              </div>
              </div>
            </AnimatedSection>

            <AnimatedSection preset="slideRight">
              <div data-cms-section="about:values">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">{va.heading || "What Drives Us"}</p>
              <div className="space-y-6">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <HoverCard key={value.title}>
                      <div className="flex gap-4 items-start bg-warm-white rounded-xl p-5 border border-border hover:border-accent/30 transition-colors">
                        <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-serif font-bold text-charcoal mb-1">{value.title}</h3>
                          <p className="text-sm text-muted leading-relaxed">{value.desc}</p>
                        </div>
                      </div>
                    </HoverCard>
                  );
                })}
              </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="bg-warm-white py-24 sm:py-32" data-cms-section="about:timeline">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16" data-cms-section="about:timeline_heading">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">{th.eyebrow || "Milestones"}</p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal">{th.title || "Our Journey"}</h2>
            </div>
          </AnimatedSection>

          <div className="space-y-0">
            {timeline.map((item, idx) => (
              <AnimatedSection key={item.year} delay={idx * 0.1}>
                <div className="flex gap-6 sm:gap-10">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full shrink-0 border-4 ${idx === timeline.length - 1 ? "bg-accent border-accent/30" : "bg-accent/40 border-accent/20"}`} />
                    {idx < timeline.length - 1 && <div className="w-px flex-1 bg-border min-h-16" />}
                  </div>
                  <div className="pb-10">
                    <span className="text-sm font-bold text-accent">{item.year}</span>
                    <h3 className="text-lg font-serif font-bold text-charcoal mt-1 mb-1">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOUNDER NOTE + IMAGE ═══ */}
      <section className="py-24 sm:py-32" data-cms-section="about:founder">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection preset="slideLeft">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img decoding="async" loading="lazy" src={fo.image || "/images/brand/flech-product-box.jpg"} alt="Flech Paper Products" className="w-full h-auto"  />
              </div>
            </AnimatedSection>
            <AnimatedSection preset="slideRight">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">{fo.eyebrow || "A Note From Our Founder"}</p>
              <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">{fo.name || "Joseph Kandel"}</h2>
              <blockquote className="text-lg text-muted leading-relaxed italic border-l-4 border-accent pl-6 mb-8">
                &ldquo;{fo.quote}&rdquo;
              </blockquote>
              <p className="text-muted leading-relaxed">
                {fo.body}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-charcoal text-white py-20 sm:py-28 relative overflow-hidden" data-cms-section="about:cta">
        <div className="absolute inset-0 opacity-10">
          <img decoding="async" loading="lazy" src={ct.bg_image || "/images/framing/frame-samples.jpg"} alt="" className="w-full h-full object-cover"  />
        </div>
        <div className="absolute inset-0 bg-charcoal/90" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{ct.title || "Let's Build Something Together"}</h2>
            <p className="text-white/50 leading-relaxed mb-10 text-lg">{ct.body || "25 years of precision. 600+ satisfied B2B clients. Your project is next."}</p>
            <Link href={ct.cta_href || "/contact"} className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer">
              {ct.cta_label || "Request a Quote"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
