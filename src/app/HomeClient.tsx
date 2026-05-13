"use client";

import Link from "next/link";
import Image from "next/image";
import { TypewriterText } from "@/components/TypewriterText";
import { LazyVideo } from "@/components/LazyVideo";
import {
  ArrowRight,
  Shield,
  Ruler,
  Layers,
  Truck,
  Factory,
  Award,
  Clock,
  Users,
  Scissors,
  Frame,
  Palette,
  Grip,
  Play,
  ArrowUpRight,
  Quote,
  Star,
} from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/AnimatedSection";

const STAT_ICONS = [Clock, Layers, Users, Factory];
const PRODUCT_ICONS = [Grip, Scissors, Frame, Palette];
const DIFFERENTIATOR_ICONS = [Ruler, Shield, Factory, Award, Truck, Users];
const TESTIMONIAL_COLORS = [
  "from-red-500/20 to-rose-500/10",
  "from-blue-500/20 to-cyan-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-violet-500/20 to-purple-500/10",
];

type CmsMap = Record<string, string>;

type CmsContent = {
  hero?: CmsMap;
  stats?: CmsMap;
  products_heading?: CmsMap;
  products_list?: CmsMap;
  why_heading?: CmsMap;
  differentiators?: CmsMap;
  industries_heading?: CmsMap;
  industries_preview?: CmsMap;
  how_we_work_heading?: CmsMap;
  how_we_work_steps?: CmsMap;
  testimonials_heading?: CmsMap;
  testimonials?: CmsMap;
  factory_videos?: CmsMap;
  gallery_strip?: CmsMap;
  cta?: CmsMap;
  layout?: CmsMap;
};

type MediaItem = { src?: string; alt?: string };

const HOME_SECTION_ORDER = [
  "hero",
  "stats",
  "products_list",
  "differentiators",
  "factory_videos",
  "gallery_strip",
  "industries_preview",
  "how_we_work_steps",
  "testimonials",
  "cta",
];

function parseItems<T>(raw: string | undefined, fallback: T[]): T[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function isHidden(section: CmsMap | undefined) {
  return section?._hidden === "true";
}

export default function Home({ cms = {} }: { cms?: CmsContent }) {
  const h = cms.hero || {};
  const st = cms.stats || {};
  const ph = cms.products_heading || {};
  const pl = cms.products_list || {};
  const wh = cms.why_heading || {};
  const dif = cms.differentiators || {};
  const ih = cms.industries_heading || {};
  const ip = cms.industries_preview || {};
  const hh = cms.how_we_work_heading || {};
  const hs = cms.how_we_work_steps || {};
  const th = cms.testimonials_heading || {};
  const tl = cms.testimonials || {};
  const fv = cms.factory_videos || {};
  const gs = cms.gallery_strip || {};
  const ct = cms.cta || {};
  const orderedSections = parseItems<string>(cms.layout?.order, HOME_SECTION_ORDER);
  const sectionOrder = (key: string) => {
    const idx = orderedSections.indexOf(key);
    return idx === -1 ? HOME_SECTION_ORDER.indexOf(key) : idx;
  };
  const sectionStyle = (key: string, hidden?: boolean) => ({
    order: sectionOrder(key),
    display: hidden ? "none" : undefined,
  });

  const stats = [1, 2, 3, 4].map((n, i) => ({
    value: st[`stat_${n}_value`] || "",
    label: st[`stat_${n}_label`] || "",
    icon: STAT_ICONS[i],
  }));

  const products = [1, 2, 3, 4].map((n, i) => ({
    name: pl[`p${n}_name`] || "",
    tagline: pl[`p${n}_tagline`] || "",
    description: pl[`p${n}_description`] || "",
    href: pl[`p${n}_href`] || "#",
    image: pl[`p${n}_image`] || "",
    icon: PRODUCT_ICONS[i],
    featured: n === 1,
  }));

  const differentiators = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    title: dif[`d${n}_title`] || "",
    description: dif[`d${n}_description`] || "",
    image: dif[`d${n}_image`] || "",
    icon: DIFFERENTIATOR_ICONS[i],
  }));

  const industries = [1, 2, 3, 4].map((n) => ({
    name: ip[`i${n}_name`] || "",
    description: ip[`i${n}_description`] || "",
    image: ip[`i${n}_image`] || "",
  }));

  const processSteps = [1, 2, 3, 4].map((n) => ({
    step: String(n).padStart(2, "0"),
    title: hs[`s${n}_title`] || "",
    desc: hs[`s${n}_description`] || "",
    color:
      n === 1
        ? "from-accent/20 to-red-50/50"
        : n === 2
          ? "from-blue-100/50 to-slate-100/50"
          : n === 3
            ? "from-green-100/50 to-emerald-50/50"
            : "from-purple-100/50 to-violet-50/50",
  }));

  const testimonials = [1, 2, 3, 4].map((n, i) => {
    const author = tl[`t${n}_author`] || "";
    const avatar = author
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return {
      quote: tl[`t${n}_quote`] || "",
      author,
      role: tl[`t${n}_role`] || "",
      rating: 5,
      avatar,
      color: TESTIMONIAL_COLORS[i],
    };
  });
  const factoryVideos = parseItems<MediaItem>(fv.items, [
    { src: "https://video.gumlet.io/69f9bb7465082997b529b9bf/69f9c26865082997b52a6d6e/download.mp4" },
    { src: "https://video.gumlet.io/69f9bb7465082997b529b9bf/69f9c2686af59f257260f000/download.mp4" },
    { src: "https://video.gumlet.io/69f9bb7465082997b529b9bf/69f9c2686af59f257260f003/download.mp4" },
    { src: "https://video.gumlet.io/69f9bb7465082997b529b9bf/69f9c26865082997b52a6d6c/download.mp4" },
    { src: "https://video.gumlet.io/69f9bb7465082997b529b9bf/69f9c36a65082997b52a8c83/download.mp4" },
    { src: "https://video.gumlet.io/69f9bb7465082997b529b9bf/69f9c36a65082997b52a8c88/download.mp4" },
  ]).filter((item) => item.src);
  const galleryImages = parseItems<MediaItem>(gs.items, [
    { src: "https://minimum-amber-a4qmprk7vs.edgeone.app/DSC04395.png", alt: "" },
    { src: "https://fantastic-chocolate-zf9kjl0vke.edgeone.app/DSC04373.png", alt: "" },
    { src: "https://agreed-azure-zjezxiows0.edgeone.app/DSC04411-Enhanced-NR.png", alt: "" },
    { src: "https://ugliest-lavender-csj1iqaayz.edgeone.app/DSC04404-2-Enhanced-NR.png", alt: "" },
    { src: "https://absolute-moccasin-prou3nhs4n.edgeone.app/DSC04456-Enhanced-NR.png", alt: "" },
    { src: "https://zygotic-turquoise-ytseh49sgl.edgeone.app/DSC04379.png", alt: "" },
  ]).filter((item) => item.src);
  const trustBadges = [tl.badge_1, tl.badge_2, tl.badge_3].filter(Boolean);
  return (
    <div className="flex flex-col">
      {/* ═══ VIDEO HERO ═══ */}
      <section className="relative h-[100dvh] max-h-[844px] flex items-center overflow-hidden" data-cms-section="home:hero" style={sectionStyle("hero", isHidden(h))}>
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={h.poster_url || "https://logical-blush-jna8rcxone.edgeone.app/DSC04491.png"}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={h.video_url || "/videos/manufacturing-process.mp4"} type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-0 w-full">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-xs font-medium tracking-wider uppercase text-white/80 mb-6 border border-white/10 animate-[fadeUp_0.8s_0.3s_both]"
            >
              <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse" />
              {h.badge || "Family-Owned Manufacturer, Paterson, NJ Since 1999"}
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-[1.05] tracking-tight mb-6 text-white animate-[fadeUp_0.9s_0.5s_both]"
            >
              {h.title_top || "The Backbone of"}
              <br />
              <TypewriterText
                texts={[
                  h.title_bottom || "Every Great Display",
                  h.title_bottom_2 || "Art and Framing Industry",
                  h.title_bottom_3 || "Sign and Packaging",
                ]}
                className="bg-gradient-to-r from-accent-light via-red-300 to-accent bg-clip-text text-transparent"
                style={{ fontSize: "clamp(1.5rem, 6vw, 4.5rem)", lineHeight: 1.1 }}
              />
            </h1>

            <p
              className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-8 font-light animate-[fadeUp_0.8s_0.7s_both]"
            >
              {h.subtitle || "From the easel back that holds your frame upright to the matboard that frames your art, Flech manufactures the precision board products that the framing, sign, and display industries depend on."}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-[fadeUp_0.8s_0.9s_both]"
            >
              <Link
                href={h.cta_primary_href || "/contact"}
                style={{ display: h.cta_primary_hidden === "true" ? "none" : undefined }}
                className="group inline-flex items-center justify-center gap-3 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-[transform,color,background-color,border-color] duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/20"
              >
                {h.cta_primary || "Request a Quote"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={h.cta_secondary_href || "/products/easel-backs"}
                style={{ display: h.cta_secondary_hidden === "true" ? "none" : undefined }}
                className="group inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 text-sm font-semibold rounded-sm transition-[transform,color,background-color,border-color] duration-300 cursor-pointer border border-white/20"
              >
                <Play className="w-4 h-4" />
                {h.cta_secondary || "Explore Easel Backs"}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block animate-[fadeUp_0.6s_1.5s_both]">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 animate-bounce">
            <div className="w-1.5 h-2.5 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="relative bg-charcoal border-b border-white/10 overflow-hidden" data-cms-section="home:stats" style={sectionStyle("stats", isHidden(st))}>
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={stat.label}>
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-white/10 group-hover:border-accent/30 group-hover:bg-accent/10 transition-[transform,color,background-color,border-color] duration-300">
                      <Icon className="w-6 h-6 text-accent-light" />
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-serif font-bold text-white leading-none">
                        {stat.value}
                      </p>
                      <p className="text-xs text-white/50 mt-1.5 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ PRODUCTS — Bento Grid ═══ */}
      <section className="py-24 sm:py-32" data-cms-section="home:products_list" style={sectionStyle("products_list", isHidden(pl))}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3" data-cms-section="home:products_heading">
                  {ph.eyebrow || "Our Product Lines"}
                </p>
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
                  {ph.title ? ph.title : <>Four Pillars of<span className="text-accent"> Precision</span></>}
                </h2>
              </div>
              <Link
                href={pl.view_all_href || "/products/easel-backs"}
                style={{ display: pl.view_all_hidden === "true" ? "none" : undefined }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors cursor-pointer group"
              >
                {pl.view_all_label || "View all products"}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Balanced 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {products.map((product, idx) => {
              const Icon = product.icon;
              const isLarge = product.featured;
              return (
                <AnimatedSection
                  key={product.name}
                  delay={idx * 0.1}
                  className="h-full"
                >
                  <HoverCard className="h-full">
                    <Link
                      href={product.href}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-surface border-border hover:border-accent/30 hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500 cursor-pointer h-full min-h-[380px]"
                    >
                      {/* Product image */}
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/60" />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-end h-full p-8">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-cream border border-border">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-serif font-bold text-charcoal">
                            {product.name}
                          </h3>
                          {isLarge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
                              Flagship
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-accent">
                          {product.tagline}
                        </p>

                        <p className="text-sm leading-relaxed mb-6 max-w-md text-muted">
                          {product.description}
                        </p>

                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:text-accent-dark">
                          {pl.card_cta_label || "Explore Product"}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </HoverCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ WHY FLECH — Image Grid ═══ */}
      <section className="bg-charcoal text-white py-24 sm:py-32 relative overflow-hidden" data-cms-section="home:differentiators" style={sectionStyle("differentiators", isHidden(dif))}>
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 50px)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light mb-3" data-cms-section="home:why_heading">
                {wh.eyebrow || "Why Flech"}
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight mb-4">
                {wh.title ? wh.title : <>Built Different,<br /><span className="text-accent-light">Not Just Better</span></>}
              </h2>
              <p className="text-white/50 leading-relaxed text-lg">
                {wh.subtitle || "Anyone can cut board. The difference is precision, material science, and 25 years of knowing what works."}
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {differentiators.map((item, idx) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title} index={idx} className="h-full">
                  <HoverCard className="h-full">
                    <div className="group relative h-full flex flex-col bg-white/[0.07] border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-[transform,box-shadow,border-color] duration-500">
                      {/* Image strip at top */}
                      <div className="h-32 overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-charcoal/90" />
                      </div>

                      <div className="p-6 -mt-6 relative z-10 flex flex-col flex-1">
                        <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 border border-accent/30">
                          <Icon className="w-5 h-5 text-accent-light" />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/50 leading-relaxed flex-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>


      {/* ═══ PROCESS VIDEOS ═══ */}
      <section className="py-16 sm:py-20 bg-charcoal overflow-hidden" data-cms-section="home:factory_videos" style={sectionStyle("factory_videos", isHidden(fv))}>
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {fv.title || "Inside the Factory"}
          </h2>
          <p className="text-white/60 mt-2 max-w-xl">
            {fv.subtitle || "A closer look at the machinery, precision, and people behind every product we ship."}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
          {factoryVideos.map(({ src }) => (
            <LazyVideo
              key={src}
              src={src || ""}
              containerClassName="relative aspect-video rounded-xl overflow-hidden bg-black ring-1 ring-white/10"
              videoClassName="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          ))}
        </div>
      </section>

      {/* ═══ GALLERY STRIP ═══ */}
      <section className="py-4 bg-warm-white overflow-hidden" data-cms-section="home:gallery_strip" style={sectionStyle("gallery_strip", isHidden(gs))}>
        <div className="flex gap-4 animate-[marquee_40s_linear_infinite] will-change-transform">
          {galleryImages.map(({ src, alt }, idx) => (
            <div
              key={idx}
              className="relative w-56 h-36 sm:w-64 sm:h-44 rounded-xl overflow-hidden shrink-0 bg-warm-white"
            >
              <Image
                src={src || ""}
                alt={alt || ""}
                fill
                sizes="(min-width:640px) 256px, 224px"
                className="object-cover"
                priority={idx < 6}
                fetchPriority={idx < 6 ? "high" : "auto"}
                loading={idx < 6 ? "eager" : "lazy"}
                quality={70}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-24 sm:py-32 bg-warm-white" data-cms-section="home:industries_preview" style={sectionStyle("industries_preview", isHidden(ip))}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16" data-cms-section="home:industries_heading">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                {ih.eyebrow || "Industries We Serve"}
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
                {ih.title || "Your Industry, Our Expertise"}
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <StaggerItem key={industry.name}>
                <HoverCard>
                  <div className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-lg font-serif font-bold text-white mb-1">
                        {industry.name}
                      </h3>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16" data-cms-section="home:how_we_work_steps" style={sectionStyle("how_we_work_steps", isHidden(hs))}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-20" data-cms-section="home:how_we_work_heading">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                {hh.eyebrow || "How We Work"}
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal">
                {hh.title || "From Spec to Shipment"}
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item) => (
              <StaggerItem key={item.step} className="h-full">
                <HoverCard className="h-full">
                  <div
                    className={`relative p-8 rounded-2xl bg-gradient-to-br ${item.color} border border-border h-full`}
                  >
                    <span className="text-7xl font-serif font-black text-charcoal/5 absolute top-4 right-4">
                      {item.step}
                    </span>
                    <div className="relative z-10">
                      <div className="text-sm font-mono font-bold text-accent mb-4">
                        Step {item.step}
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — 21st Dev Style ═══ */}
      <section className="pt-12 sm:pt-16 pb-24 sm:pb-32 relative overflow-hidden bg-gradient-to-b from-paper-white to-warm-white" style={sectionStyle("testimonials", isHidden(tl))}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, #C41E3A 0%, transparent 40%),
                              radial-gradient(circle at 80% 20%, #1A1A2E 0%, transparent 40%)`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6" data-cms-section="home:testimonials">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16" data-cms-section="home:testimonials_heading">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                {th.eyebrow || "Client Stories"}
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight mb-4">
                {th.title || "Trusted by Industry Leaders"}
              </h2>
              <p className="text-muted leading-relaxed">
                {th.subtitle ||
                  "600+ B2B partners rely on Flech for precision manufacturing. Here's what they say."}
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {testimonials.map((testimonial, idx) => (
              <StaggerItem key={testimonial.author} index={idx} className="h-full">
                <HoverCard className="h-full">
                  <div className="group relative h-full flex flex-col bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-lg shadow-charcoal/5 overflow-hidden hover:shadow-xl hover:shadow-charcoal/10 transition-all duration-500">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.color}`} />

                    {/* Decorative quote */}
                    <div className="absolute top-6 right-6 opacity-10">
                      <Quote className="w-16 h-16 text-accent" />
                    </div>

                    <div className="relative p-8 flex flex-col flex-1">
                      {/* Star rating */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-accent text-accent"
                          />
                        ))}
                      </div>

                      {/* Quote text */}
                      <blockquote className="text-charcoal/90 text-lg leading-relaxed font-light mb-8">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      {/* Author info */}
                      <div className="flex items-center gap-4 mt-auto">
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center border border-white/50 shadow-sm`}>
                          <span className="text-sm font-bold text-charcoal/80">
                            {testimonial.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="font-serif font-semibold text-charcoal">
                            {testimonial.author}
                          </p>
                          <p className="text-xs text-muted">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Trust badges */}
          {trustBadges.length > 0 && (
          <AnimatedSection delay={0.4}>
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-muted/60">
              {trustBadges.map((badge) => (
                <span key={badge} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  {badge}
                </span>
              ))}
            </div>
          </AnimatedSection>
          )}
        </div>
      </section>

      {/* ═══ BRAND IMAGE + CTA ═══ */}
      <section className="relative isolate overflow-hidden bg-black" data-cms-section="home:cta" style={sectionStyle("cta", isHidden(ct))}>
        <LazyVideo
          src={ct.video_url || "https://video.gumlet.io/69f9bb7465082997b529b9bf/69f9c26865082997b52a6d6a/download.mp4"}
          containerClassName="absolute inset-0"
          videoClassName="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/40 to-charcoal/95 lg:from-transparent lg:via-charcoal/30 lg:to-charcoal" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 min-h-[500px] items-center">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="text-white flex items-center">
            <AnimatedSection className="max-w-lg" data-cms-section="home:cta">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light mb-4">
                {ct.eyebrow || "Get Started"}
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">
                {ct.title || <>Ready to Build<br />Something?</>}
              </h2>
              <p className="text-white/50 leading-relaxed mb-10 text-lg">
                {ct.body || "Whether you need 100 easel backs or 100,000, tell us what you need and we'll have a quote to you within 24 hours."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={ct.primary_href || "/contact"}
                  style={{ display: ct.primary_hidden === "true" ? "none" : undefined }}
                  className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-[transform,color,background-color,border-color] duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/20"
                >
                  {ct.primary_label || "Request a Quote"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={ct.secondary_href || "/contact"}
                  style={{ display: ct.secondary_hidden === "true" ? "none" : undefined }}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer border border-white/20"
                >
                  {ct.secondary_label || "Request Samples"}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
