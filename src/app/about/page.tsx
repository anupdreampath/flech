"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Factory,
  Users,
  Award,
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

const timeline = [
  { year: "1999", title: "Founded in Paterson, NJ", desc: "Flech opens as a specialty board converter, serving local framing and sign shops." },
  { year: "2004", title: "CNC Equipment Investment", desc: "Major upgrade to CNC die-cutting and scoring, precision tolerances and high-volume capability." },
  { year: "2010", title: "National Distribution", desc: "Expanded to serve sign & display, framing, and packaging clients across the United States." },
  { year: "2015", title: "Custom Converting Division", desc: "Dedicated custom converting, laminating, die-cutting, and specialty finishing under one roof." },
  { year: "2020", title: "Archival Product Line", desc: "Acid-free, archival-quality matboards and framing backs for museum-grade preservation." },
  { year: "Today", title: "25+ Years of Precision", desc: "Four core product lines, 600+ B2B clients, same commitment to quality that started it all." },
];

const values = [
  { icon: Ruler, title: "Precision First", desc: "Every measurement, cut, and fold line held to tolerances that matter.", image: "/images/products/board-closeup-2.jpg" },
  { icon: Shield, title: "Quality Without Shortcuts", desc: "Right substrate for each application, not the cheapest one.", image: "/images/products/tuff-white-1.jpg" },
  { icon: Users, title: "Partnership, Not Transactions", desc: "We learn our clients' businesses to anticipate their needs.", image: "/images/framing/frame-collection.jpg" },
  { icon: Leaf, title: "Responsible Manufacturing", desc: "FSC certified, responsible sourcing, acid-free archival products.", image: "/images/products/ebony-board.png" },
];

export default function AboutPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50dvh] flex items-end overflow-hidden">
        <img decoding="async" loading="lazy" src="/images/home/warehouse-boards.jpg" alt="Flech Warehouse" className="absolute inset-0 w-full h-full object-cover"  />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 sm:pb-24 pt-40 w-full">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-accent-light">About</span>
          </nav>

          <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] text-white"
          >
            25 Years of Knowing
            <br />
            <span className="text-accent-light">What Works</span>
          </h1>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "25+", label: "Years Manufacturing", icon: Clock },
              { value: "600+", label: "B2B Clients", icon: Users },
              { value: "4", label: "Product Lines", icon: Factory },
              { value: "100%", label: "Made in USA", icon: MapPin },
            ].map((stat) => {
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Our Story</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-6">
                From Local Converter to National Manufacturer
              </h2>
              <div className="space-y-6 text-muted leading-relaxed">
                <p>Flech Paper Products started as a small specialty board converting operation in Paterson, New Jersey, a city with deep roots in American manufacturing.</p>
                <p>Over 25 years, we grew by doing one thing well: manufacturing precision board products that work exactly as specified, every single time.</p>
                <p>Today, we serve sign & display manufacturers, wholesale framers, POP designers, and commercial printers across the United States with four core product lines.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden h-32">
                  <img decoding="async" loading="lazy" src="/images/home/stacked-boards.jpg" alt="Stacked boards" className="w-full h-full object-cover"  />
                </div>
                <div className="rounded-xl overflow-hidden h-32">
                  <img decoding="async" loading="lazy" src="/images/products/matboard-display.jpg" alt="Matboard" className="w-full h-full object-cover"  />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection preset="slideRight">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">What Drives Us</p>
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
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="bg-warm-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Milestones</p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal">Our Journey</h2>
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
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection preset="slideLeft">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img decoding="async" loading="lazy" src="/images/brand/flech-product-box.jpg" alt="Flech Paper Products" className="w-full h-auto"  />
              </div>
            </AnimatedSection>
            <AnimatedSection preset="slideRight">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">A Note From Our Founder</p>
              <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">Joseph Kandel</h2>
              <blockquote className="text-lg text-muted leading-relaxed italic border-l-4 border-accent pl-6 mb-8">
                &ldquo;After over 40 years in the paperboard industry, I decided to start my own company
                that could offer customers the benefits of BOTH: the competitive pricing of larger suppliers
                with the unbeatable service of smaller ones.&rdquo;
              </blockquote>
              <p className="text-muted leading-relaxed">
                Many customers have responded to this philosophy by making Flech a trusted partner,
                some even call us their &ldquo;secret weapon.&rdquo; We would welcome the chance to prove
                to you that Flech could be your secret weapon too.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-charcoal text-white py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img decoding="async" loading="lazy" src="/images/framing/frame-samples.jpg" alt="" className="w-full h-full object-cover"  />
        </div>
        <div className="absolute inset-0 bg-charcoal/90" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Let&apos;s Build Something Together</h2>
            <p className="text-white/50 leading-relaxed mb-10 text-lg">25 years of precision. 600+ satisfied B2B clients. Your project is next.</p>
            <Link href="/contact" className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer">
              Request a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
