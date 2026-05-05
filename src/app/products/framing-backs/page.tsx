"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Frame,
  Shield,
  Layers,
  Package,
  Ruler,
  Award,
  Truck,
  Play,
} from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/AnimatedSection";
import { LazyVideo } from "@/components/LazyVideo";

const specs = [
  { label: "Board Types", value: "SBS, chip board, corrugated, and poly board" },
  { label: "Thickness Range", value: "18pt to 60pt (custom available)" },
  { label: "Standard Sizes", value: "4\u00d76 to 24\u00d736 inches (custom cut available)" },
  { label: "Finish", value: "Raw, clay-coated, laminated, or kraft-lined" },
  { label: "Colors", value: "White, Kraft, Gray, Black" },
  { label: "Cutting Tolerance", value: "\u00b10.010\" standard" },
  { label: "Packing", value: "Shrink-wrapped bundles or bulk cartons" },
  { label: "Certifications", value: "Acid-free and archival options available" },
];

const usps = [
  {
    icon: Shield,
    title: "Archival Protection",
    description:
      "Our acid-free framing backs prevent the artwork they protect from yellowing or deteriorating over time. Archival quality for museum-grade applications.",
    image: "https://ik.imagekit.io/l7qlh4sga/DSC05195-Enhanced-NR.png?updatedAt=1777114595151",
  },
  {
    icon: Ruler,
    title: "Precision Cut to Size",
    description:
      "Every backing board is cut to exact dimensions with clean, square edges. No trimming required on your end. They fit the frame perfectly out of the box.",
    image: "https://ik.imagekit.io/l7qlh4sga/DSC04811.png?updatedAt=1777114599948",
  },
  {
    icon: Layers,
    title: "Consistent Caliper",
    description:
      "Sheet-to-sheet caliper consistency means your framing operation runs smoothly. No jamming, no fitting issues, no wasted time.",
    image: "https://hard-black-tg68fklpa2.edgeone.app/DSC04474.png",
  },
  {
    icon: Package,
    title: "High-Volume Ready",
    description:
      "Contract framing means contract volume. We're equipped for runs of thousands with the same consistency as a run of ten.",
    image: "https://ik.imagekit.io/l7qlh4sga/DSC04855-Enhanced-NR.png?updatedAt=1777114588617",
  },
  {
    icon: Award,
    title: "Multiple Board Options",
    description:
      "SBS for clean white finish, chip board for economy, corrugated for rigidity, poly board for moisture resistance. We match the substrate to your application.",
    image: "https://ik.imagekit.io/l7qlh4sga/DSC04543.png?updatedAt=1777114536452",
  },
  {
    icon: Truck,
    title: "Inventory Programs",
    description:
      "Set up a standing order and we'll hold inventory for scheduled shipments. Reduce your warehousing costs and never run short on backing boards.",
    image: "https://ik.imagekit.io/l7qlh4sga/DSC05210-Enhanced-NR.png?updatedAt=1777114600662",
  },
];

const boardOptions = [
  {
    name: "SBS (Solid Bleached Sulfate)",
    description:
      "The premium choice. Clean white surface on both sides with excellent rigidity. Ideal for applications where the back of the frame may be visible or where a professional finish matters.",
    image: "https://ik.imagekit.io/l7qlh4sga/DSC05147-Enhanced-NR.png?updatedAt=1777114595483",
    best: "Gallery framing, retail, high-end applications",
  },
  {
    name: "Chip Board",
    description:
      "The industry workhorse. Gray recycled board that delivers solid rigidity at an economical price point. Perfect for high-volume contract work where cost efficiency is critical.",
    image: "https://sick-bronze-qlywkamcqc.edgeone.app/DSC04478.png",
    best: "High-volume contracts, certificates, economy framing",
  },
  {
    name: "Corrugated Board",
    description:
      "Maximum rigidity for oversized frames. The fluted construction provides structural support that prevents bowing in large format applications.",
    image: "https://ik.imagekit.io/l7qlh4sga/DSC04874-Enhanced-NR.png?updatedAt=1777114598763",
    best: "Large formats, heavy artwork, shipping protection",
  },
  {
    name: "Poly Board",
    description:
      "Moisture-resistant synthetic board that won't warp, swell, or degrade in humid environments. The modern solution for bathrooms, kitchens, and outdoor-adjacent displays.",
    image: "https://ik.imagekit.io/l7qlh4sga/DSC04539-Enhanced-NR.png?updatedAt=1777114527017",
    best: "Humid environments, outdoor-adjacent, long-term stability",
  },
];

export default function FramingBacksPage() {
  return (
    <>
      {/* ═══ IMAGE HERO ═══ */}
      <section className="relative min-h-[60dvh] flex items-center overflow-hidden bg-black">
        <LazyVideo
          src="https://video.gumlet.io/69f9bb7465082997b529b9bf/69f9c0986af59f257260c13e/download.mp4"
          priority
          containerClassName="absolute inset-0"
          videoClassName="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover pointer-events-none"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />

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
            <span className="text-accent-light">Contract Framing Backs</span>
          </nav>

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-xs font-medium tracking-wider uppercase text-white/80 mb-8 border border-white/10"
            >
              <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse" />
              Protection &amp; Support
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] tracking-tight mb-8 text-white"
            >
              Contract
              <br />
              <span className="bg-gradient-to-r from-accent-light via-red-300 to-accent bg-clip-text text-transparent">
                Framing Backs
              </span>
            </h1>

            <p
              className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-8 font-light"
            >
              The silent guardian behind the artwork. Our contract framing
              backs hold art flat, protect from rear damage, and deliver the
              consistency that high-volume commercial framing demands.
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

      {/* ═══ EXPLANATION — Image + Text Split ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection preset="slideLeft">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://ik.imagekit.io/l7qlh4sga/DSC05169-Enhanced-NR.png?updatedAt=1777114597584"
                  alt="Handling framing back board in workshop"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-xs font-medium text-white border border-white/20">
                    <Frame className="w-3.5 h-3.5" />
                    Behind Every Frame
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection preset="slideRight">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                  What Are Contract Framing Backs?
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-6">
                  The Board Behind <span className="text-accent">the Art</span>
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  A contract framing back is the flat board that sits directly
                  behind the artwork inside a frame. Unlike an easel back
                  (which makes a frame stand), a framing back is designed to
                  hold the artwork flat and protect it from dust, moisture, and
                  physical damage from the rear.
                </p>
                <p className="text-muted leading-relaxed mb-8">
                  &ldquo;Contract&rdquo; quality refers to high-volume,
                  standardized backing boards used by commercial framing
                  companies for large orders of certificates, corporate
                  awards, diplomas, and retail framed art. Consistency across
                  thousands of pieces is not optional. It&apos;s the entire
                  point.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Acid-free options",
                    "Precision cut edges",
                    "Consistent caliper",
                    "Multiple substrates",
                    "Custom sizes",
                    "Inventory programs",
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

      {/* ═══ BOARD OPTIONS — Bento Cards ═══ */}
      <section className="py-24 sm:py-32 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                Board Options
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
                The Right Board for <span className="text-accent">Every Job</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boardOptions.map((option) => (
              <StaggerItem key={option.name} className="h-full">
                <HoverCard className="h-full">
                  <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface hover:border-accent/30 hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500 min-h-[340px] h-full">
                    {/* Image */}
                    <div className="h-44 overflow-hidden">
                      <img
                        src={option.image}
                        alt={option.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-transparent via-transparent to-white" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                        {option.name}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                        {option.description}
                      </p>
                      <div className="border-t border-border-light pt-4">
                        <span className="text-xs text-muted uppercase tracking-wider">Best For</span>
                        <p className="text-sm font-medium text-charcoal mt-1">{option.best}</p>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ FRAMING BACK vs EASEL BACK — Reverse Split ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection preset="slideLeft">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                  Know the Difference
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-8">
                  Framing Back vs. <span className="text-accent">Easel Back</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { label: "Purpose", framing: "Holds artwork flat and secure", easel: "Makes the frame stand upright" },
                    { label: "Position", framing: "Internal, behind the artwork", easel: "External, on the back of the frame" },
                    { label: "Visibility", framing: "Never seen by the viewer", easel: "Partially visible when deployed" },
                    { label: "Key Quality", framing: "Flatness, rigidity, acid-free", easel: "Hinge accuracy, adhesion strength" },
                  ].map((row) => (
                    <div key={row.label} className="border-b border-border-light pb-4 last:border-0 last:pb-0">
                      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">{row.label}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-cream/50 rounded-xl p-3">
                          <span className="text-xs text-accent font-medium block mb-1">Framing Back</span>
                          <span className="text-slate-dark">{row.framing}</span>
                        </div>
                        <div className="bg-warm-white rounded-xl p-3">
                          <span className="text-xs text-muted font-medium block mb-1">Easel Back</span>
                          <span className="text-slate-dark">{row.easel}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection preset="slideRight">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://ik.imagekit.io/l7qlh4sga/DSC04876.png?updatedAt=1777114597405"
                  alt="Factory cutting system trimming panel materials"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                  <div className="bg-white/15 border border-white/20 rounded-2xl p-4 flex-1">
                    <p className="text-3xl font-serif font-bold text-white">\u00b10.010&quot;</p>
                    <p className="text-xs text-white/60 uppercase tracking-wider mt-1">Cut Tolerance</p>
                  </div>
                  <div className="bg-white/15 border border-white/20 rounded-2xl p-4 flex-1">
                    <p className="text-3xl font-serif font-bold text-white">18-60pt</p>
                    <p className="text-xs text-white/60 uppercase tracking-wider mt-1">Thickness Range</p>
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
                Why Source Framing Backs
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


      {/* ═══ FRAME WORKSHOP GALLERY ═══ */}
      <section className="py-16 sm:py-20 bg-warm-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">Our Framing Workshop</h2>
          <p className="text-muted mt-2 max-w-xl">Frame moldings, wood samples, and the craftsmanship that goes into every backing board we pair with a frame.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 px-2">
          {[
            { src: "https://written-orange-bawezaktt9.edgeone.app/DSC04415-Enhanced-NR.png", alt: "Stacked wooden frame moldings wrapped and organized in workshop" },
            { src: "https://familiar-olive-bocpixkjal.edgeone.app/DSC04431-Enhanced-NR.png", alt: "Workshop corner with framing machine and stacked molding strips" },
            { src: "https://convinced-amaranth-ymc8mybfhb.edgeone.app/DSC04442-Enhanced-NR.png", alt: "Various picture frame moldings leaning in workshop storage area" },
            { src: "https://unknown-bronze-za3rvjadl5.edgeone.app/DSC04451.png", alt: "Close-up of wooden frame edges with subtle grain patterns" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04556-Enhanced-NR.png?updatedAt=1777114530607", alt: "Stacked wooden frames in workshop storage area" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04562-Enhanced-NR.png?updatedAt=1777114523757", alt: "Industrial workshop process cutting shaping assembling frame components" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04564.png?updatedAt=1777114525120", alt: "Stacked wooden frames awaiting assembly in workshop" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04568.png?updatedAt=1777114536602", alt: "Assorted wooden frames stacked showcasing craftsmanship" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04572.png?updatedAt=1777114536882", alt: "Layered wooden frames in workshop varied tones and textures" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04575.png?updatedAt=1777114536863", alt: "Assorted wooden frames stacked diagonally with warm tones" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04579.png?updatedAt=1777114535643", alt: "Vertical arrangement of wooden frames showing varied textures" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04582-Enhanced-NR.png?updatedAt=1777114527481", alt: "Layered wooden frames stacked horizontally with contrasting finishes" },
            { src: "https://ancient-scarlet-7fxploevcv.edgeone.app/DSC04579.png", alt: "Wood samples display shallow depth of field indoor lighting" },
            { src: "https://developing-gray-5uv9apohe3.edgeone.app/DSC04582-Enhanced-NR.png", alt: "Stacked wood samples mixed finishes indoor workshop lighting" },
          ].map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg bg-muted/10">
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ IMAGE + CTA SPLIT ═══ */}
      <section className="relative isolate overflow-hidden bg-black">
        <LazyVideo
          src="https://video.gumlet.io/69f9bb7465082997b529b9bf/69f9c0fd65082997b52a47f4/download.mp4"
          containerClassName="absolute inset-0"
          videoClassName="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/40 to-charcoal/95 lg:from-transparent lg:via-charcoal/30 lg:to-charcoal" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 min-h-[500px] items-center">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="text-white flex items-center">
            <AnimatedSection className="max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light mb-4">
                Get Started
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">
                Ready to Order
                <br />
                Framing Backs?
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 text-lg">
                Tell us your sizes, volumes, and substrate preferences.
                Quote within 24 hours, inventory programs available.
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
                  Request Samples
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

