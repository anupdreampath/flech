"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Scissors,
  Ruler,
  Shield,
  Target,
  Zap,
  Settings,
  Play,
} from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/AnimatedSection";

const specs = [
  { label: "Score Method", value: "CNC rotary scoring, flatbed die-cutting" },
  { label: "Board Compatibility", value: "SBS, chip, poly, and pulp boards, 10pt to 40pt" },
  { label: "Tolerance", value: "\u00b10.005\" standard, tighter on request" },
  { label: "Angle Range", value: "Any angle from 5\u00b0 to 180\u00b0" },
  { label: "Score Depth", value: "Calibrated per caliper. Partial penetration prevents cracking" },
  { label: "Pattern Complexity", value: "Simple single-fold to multi-fold complex dielines" },
  { label: "File Formats", value: "AI, PDF, DXF, DWG. We accept all standard dieline formats" },
  { label: "Proofing", value: "Digital proof + physical prototype available" },
];

const usps = [
  {
    icon: Ruler,
    title: "\u00b10.005\" Tolerance",
    description:
      "Our CNC scoring heads are calibrated daily. The fold line on piece #1 is identical to piece #50,000, guaranteed.",
    image: "/images/products/board-closeup-1.png",
  },
  {
    icon: Shield,
    title: "No Cracking, No Breaking",
    description:
      "Score depth is calibrated to each substrate's caliper. We penetrate just enough to create a clean hinge without compromising the board's structural integrity.",
    image: "/images/products/board-closeup-2.jpg",
  },
  {
    icon: Target,
    title: "Exact Angles, Every Time",
    description:
      "The placement of each score line determines the final standing angle. Our engineering ensures the geometry is right before a single sheet is scored.",
    image: "/images/products/board-closeup-3.jpg",
  },
  {
    icon: Scissors,
    title: "Complex Dieline Capability",
    description:
      "Multi-fold patterns, compound angles, nested scores. We handle dielines that other converters turn down.",
    image: "/images/products/tuff-white-1.jpg",
  },
  {
    icon: Zap,
    title: "Fast Prototyping",
    description:
      "Send us your dieline file and we'll produce physical prototypes within days. Test the fold, verify the angle, approve for production.",
    image: "/images/products/tuff-white-2.jpg",
  },
  {
    icon: Settings,
    title: "Engineering Support",
    description:
      "Don't have a dieline? Tell us what the finished product needs to do and we'll engineer the fold pattern to achieve it.",
    image: "/images/home/warehouse-boards.jpg",
  },
];

const scoreTypes = [
  {
    name: "CNC Rotary Scoring",
    description:
      "High-speed rotary scoring wheels apply precise, consistent pressure across the full sheet. Ideal for long production runs where speed and repeatability matter.",
    image: "/images/products/board-closeup-1.png",
    best: "High-volume runs, consistent caliper boards",
  },
  {
    name: "Flatbed Die-Cutting",
    description:
      "Steel-rule dies on flatbed presses create complex multi-fold patterns in a single pass. Perfect for intricate dielines with multiple score lines at varying angles.",
    image: "/images/products/board-closeup-2.jpg",
    best: "Complex dielines, multi-fold patterns",
  },
  {
    name: "Custom Angle Engineering",
    description:
      "When the finished product must stand at a specific angle, we reverse-engineer the fold geometry. Score placement, depth, and spacing are all calculated before cutting begins.",
    image: "/images/products/board-closeup-3.jpg",
    best: "Display stands, easel backs, POP structures",
  },
];

export default function FoldLinesPage() {
  return (
    <>
      {/* ═══ VIDEO HERO ═══ */}
      <section className="relative min-h-[60dvh] flex items-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/home/warehouse-boards.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/manufacturing-process.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-white/50 mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white/80 transition-colors cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/" className="hover:text-white/80 transition-colors cursor-pointer">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-accent-light">Fold Lines &amp; Dielines</span>
          </nav>

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-xs font-medium tracking-wider uppercase text-white/80 mb-8 border border-white/10"
            >
              <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse" />
              Precision Scoring
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] tracking-tight mb-8 text-white"
            >
              Fold Lines &amp;
              <br />
              <span className="bg-gradient-to-r from-accent-light via-red-300 to-accent bg-clip-text text-transparent">
                Dielines
              </span>
            </h1>

            <p
              className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-8 font-light"
            >
              The invisible engineering that makes everything else possible.
              Our precision score lines create hinges that bend accurately
              without cracking, the foundation of every reliable easel back
              and display structure.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-[transform,color,background-color,border-color] duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/20"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#specifications"
                className="group inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 text-sm font-semibold rounded-sm transition-[transform,color,background-color,border-color] duration-300 cursor-pointer border border-white/20"
              >
                <Play className="w-4 h-4" />
                View Specifications
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT ARE FOLD LINES — Image + Text Split ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection preset="slideLeft">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/products/board-closeup-1.png"
                  alt="Precision fold line scoring on board"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-xs font-medium text-white border border-white/20">
                    <Scissors className="w-3.5 h-3.5" />
                    CNC Scoring Process
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection preset="slideRight">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                  Understanding Fold Lines
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-6">
                  The Hidden <span className="text-accent">Hinge</span>
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  In manufacturing, a fold line, also called a score line or
                  dieline, is a pre-creased mark on a flat sheet of board. It
                  acts as a hinge, allowing the flat material to bend
                  accurately at a specific point without cracking or breaking.
                </p>
                <p className="text-muted leading-relaxed mb-8">
                  For easel backs and display structures, these lines are
                  precisely measured to ensure the final product stands at the
                  correct viewing angle. The score depth, position, and
                  technique must all be calibrated to the specific substrate
                  being used. Get any of these wrong and the fold either
                  cracks through or doesn&apos;t bend cleanly.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "CNC rotary scoring",
                    "Flatbed die-cutting",
                    "Custom angle engineering",
                    "Multi-fold patterns",
                    "Prototype service",
                    "Dieline file support",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-dark">
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ SCORE TYPES — Bento Cards ═══ */}
      <section className="py-24 sm:py-32 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                Scoring Methods
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
                Three Ways to <span className="text-accent">Score</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scoreTypes.map((type) => (
              <StaggerItem key={type.name} className="h-full">
                <HoverCard className="h-full">
                  <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface hover:border-accent/30 hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500 min-h-[420px] h-full">
                    {/* Image */}
                    <div className="h-48 overflow-hidden">
                      <img
                        src={type.image}
                        alt={type.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-transparent via-transparent to-white" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                        {type.name}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                        {type.description}
                      </p>
                      <div className="border-t border-border-light pt-4">
                        <span className="text-xs text-muted uppercase tracking-wider">Best For</span>
                        <p className="text-sm font-medium text-charcoal mt-1">{type.best}</p>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ WHY SCORE LINES MATTER — Reverse Image/Text ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection preset="slideLeft">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                  Why Score Lines Matter
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-8">
                  Precision at <span className="text-accent">Every Point</span>
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Accuracy",
                      desc: "A score line placed 1mm off can change the viewing angle by several degrees. Our CNC equipment eliminates human variance.",
                    },
                    {
                      title: "Consistency",
                      desc: "In a run of 10,000 pieces, every single fold line must be identical. Batch-to-batch consistency is where CNC scoring outperforms manual methods.",
                    },
                    {
                      title: "Material Integrity",
                      desc: "Too deep and the board cracks through. Too shallow and it won't fold cleanly. We calibrate score depth to each substrate's caliper.",
                    },
                    {
                      title: "Downstream Quality",
                      desc: "Every other component, the easel back, the display angle, the adhesive bond, depends on the fold line being right. It's the foundation.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center shrink-0 border border-border mt-0.5">
                        <Check className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-charcoal mb-1">{item.title}</h4>
                        <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection preset="slideRight">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/products/tuff-white-1.jpg"
                  alt="Flech scored board detail"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                  <div className="bg-white/15 border border-white/20 rounded-2xl p-4 flex-1">
                    <p className="text-3xl font-serif font-bold text-white">\u00b10.005&quot;</p>
                    <p className="text-xs text-white/60 uppercase tracking-wider mt-1">Tolerance</p>
                  </div>
                  <div className="bg-white/15 border border-white/20 rounded-2xl p-4 flex-1">
                    <p className="text-3xl font-serif font-bold text-white">5\u00b0-180\u00b0</p>
                    <p className="text-xs text-white/60 uppercase tracking-wider mt-1">Angle Range</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ SPECIFICATIONS ═══ */}
      <section id="specifications" className="bg-charcoal text-white py-24 sm:py-32 scroll-mt-24 relative overflow-hidden">
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light mb-3">
                Technical Details
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight">
                Specifications
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white/[0.07] border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-6 py-4 font-semibold text-accent-light text-xs uppercase tracking-wider">Specification</th>
                    <th className="text-left px-6 py-4 font-semibold text-accent-light text-xs uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec, idx) => (
                    <tr key={spec.label} className={`border-b border-white/5 ${idx % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                      <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{spec.label}</td>
                      <td className="px-6 py-4 text-white/60">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ WHY FLECH — Image-Backed USP Grid ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                The Flech Difference
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
                Why Source Fold Lines
                <br />
                <span className="text-accent">From Flech?</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map((usp) => {
              const Icon = usp.icon;
              return (
                <StaggerItem key={usp.title} className="h-full">
                  <HoverCard className="h-full">
                    <div className="group relative h-full flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500">
                      {/* Image strip at top */}
                      <div className="h-32 overflow-hidden shrink-0">
                        <img
                          src={usp.image}
                          alt={usp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-white/90" />
                      </div>

                      <div className="p-6 -mt-6 relative z-10 flex flex-col flex-1">
                        <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mb-4 border border-border">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-charcoal mb-2">
                          {usp.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed flex-1">
                          {usp.description}
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

      {/* ═══ IMAGE + CTA SPLIT ═══ */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          {/* Image side */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <img
              src="/images/home/warehouse-boards.jpg"
              alt="Flech manufacturing facility"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal/20 lg:bg-gradient-to-r lg:from-transparent lg:to-charcoal" />
          </div>

          {/* CTA side */}
          <div className="bg-charcoal text-white flex items-center">
            <AnimatedSection className="max-w-lg mx-auto px-8 py-16 lg:px-12 lg:py-20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light mb-4">
                Get Started
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">
                Need Precision
                <br />
                Fold Lines?
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 text-lg">
                Send us your dieline file or describe what you need. We&apos;ll
                engineer the scoring pattern and quote it within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-[transform,color,background-color,border-color] duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/20"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer border border-white/20"
                >
                  Send a Dieline
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
