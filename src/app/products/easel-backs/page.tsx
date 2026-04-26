"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Grip,
  Shield,
  Ruler,
  Zap,
  Layers,
  Target,
  Factory,
  Truck,
  Package,
  Sparkles,
  Palette,
  Scissors,
  Boxes,
} from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/AnimatedSection";

const easelTypes = [
  {
    name: "Single-Wing",
    description: "A single hinged flap that props up smaller, lighter frames and signs.",
    features: ["Items under 11×14\"", "Clean minimal profile", "Self-stick adhesive", "White, kraft & black"],
    sizes: "3\" to 14\"",
    weight: "Up to 2 lbs",
    image: "https://excess-teal-sqkeb1lapu.edgeone.app/DSC04587.png",
  },
  {
    name: "Double-Wing",
    description: "Two hinged support flaps providing superior stability for larger displays.",
    features: ["Items 11×14\" and larger", "Superior stability", "Adhesive on both wings", "Custom colors available"],
    sizes: "8\" to 24\"",
    weight: "Up to 8 lbs",
    image: "https://economic-pink-kz1ihw7vxy.edgeone.app/DSC04591.png",
  },
  {
    name: "Locking Easel",
    description: "Tab-lock mechanism prevents collapse during transport and retail display.",
    features: ["Tab-lock prevents collapse", "Ideal for retail & trade", "Heavy-duty stock", "Custom locking angles"],
    sizes: "5\" to 20\"",
    weight: "Up to 5 lbs",
    image: "https://ik.imagekit.io/l7qlh4sga/DSC04959-Enhanced-NR.png?updatedAt=1777114589658",
  },
];

const specs = [
  { label: "Board Stock", value: "14pt to 36pt SBS, Chip, or Poly board" },
  { label: "Adhesive", value: "Permanent PSA, hot melt, or custom" },
  { label: "Finish", value: "Raw, clay-coated, laminated, or custom printed" },
  { label: "Colors", value: "White, Kraft, Black, or custom match" },
  { label: "Sizes", value: "3\" to 24\" (custom sizes available)" },
  { label: "Viewing Angles", value: "15°, 20°, 25°, 30°, or custom" },
  { label: "Packing", value: "Bulk, shrink-wrapped, or retail-ready" },
  { label: "Minimum Order", value: "Contact for quote, all volumes welcome" },
];

const usps = [
  { icon: Ruler, title: "Precision Score Lines", description: "CNC scoring creates fold lines that bend cleanly at exact angles. No cracking, no variance." },
  { icon: Shield, title: "Substrate Expertise", description: "SBS for clean finish, chip for economy, poly for moisture resistance. We recommend the right one." },
  { icon: Zap, title: "Adhesive That Holds", description: "Permanent PSA tested to maintain bond strength over time. No peeling, no sliding." },
  { icon: Target, title: "Custom Viewing Angles", description: "Standard or custom angles. We engineer score line placement to deliver the exact angle you need." },
  { icon: Factory, title: "All Under One Roof", description: "Die-cutting, scoring, adhesive, assembly, packing, single-source manufacturing in Paterson, NJ." },
  { icon: Truck, title: "Drop-Ship Ready", description: "We ship directly to your client. Retail-ready, bulk, or custom packing configurations." },
];

const applications = [
  "Picture frames & photo displays", "Certificate & award frames", "Retail POP displays",
  "Trade show signage", "Menu & table holders", "Real estate signs",
  "Promotional standees", "Desktop calendars",
];

export default function EaselBacksPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[60dvh] flex items-end overflow-hidden">
        <iframe
          src="https://play.gumlet.io/embed/69ec653451e0355695cb0f3f?autoplay=true&loop=true&background=true&muted=true&preload=none"
          className="absolute border-0 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
          allow="autoplay; fullscreen"
          title="Industrial machine pressing stacked materials during fabrication"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 sm:pb-24 pt-40 w-full">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/50">Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-accent-light">Easel Backs</span>
          </nav>

          <div className="animate-[fadeUp_0.8s_0.3s_both]">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/25 rounded-full text-xs font-bold tracking-wider uppercase text-accent-light mb-6 border border-accent/30">
              <Grip className="w-3.5 h-3.5" />
              Flagship Product
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] tracking-tight mb-6 text-white">
              Easel Backs
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
              The invisible hero behind every freestanding display. Engineered for precise viewing angles,
              reliable adhesion, and the consistency that lets you promise your clients perfection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-[transform,color,background-color,border-color] duration-300 cursor-pointer">
                Get a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#specifications" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer border border-white/20">
                View Specifications
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS + IMAGE ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection preset="slideLeft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">What Is an Easel Back?</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-6">
                The Stand Behind the Display
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                An easel back is a supportive flap attached to the back of a frame, sign, or display to make it
                stand upright. It&apos;s the component your customers never see, but the first thing they notice when it fails.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                We manufacture easel backs in single-wing and double-wing configurations with self-stick adhesive
                for effortless assembly. Every fold line is precision-scored for exact viewing angles.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Precision CNC scoring", "Self-stick PSA adhesive", "Custom sizes & angles", "Multiple substrates", "Volume pricing", "Drop-ship capability"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-dark">
                    <Check className="w-4 h-4 text-accent shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection preset="slideRight">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img decoding="async" loading="lazy" src="https://ik.imagekit.io/l7qlh4sga/DSC04967-Enhanced-NR.png?updatedAt=1777114588032" alt="Easel back manufacturing process" className="w-full h-auto"  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-accent text-white rounded-xl p-4 shadow-lg">
                  <p className="text-3xl font-serif font-bold">25°</p>
                  <p className="text-xs opacity-80">Viewing Angle</p>
                </div>
                <div className="absolute -top-4 -right-4 bg-charcoal text-white rounded-xl p-4 shadow-lg">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-60">Tolerance</p>
                  <p className="text-lg font-mono font-bold">±0.005&quot;</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ EASEL TYPES ═══ */}
      <section className="bg-warm-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Product Range</p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal">
                Choose Your <span className="text-accent">Configuration</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {easelTypes.map((type) => (
              <StaggerItem key={type.name} className="h-full">
                <HoverCard className="h-full">
                  <div className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500 h-full flex flex-col">
                    <div className="h-48 overflow-hidden relative shrink-0">
                      <img decoding="async" loading="lazy" src={type.image} alt={type.name} className="w-full h-full object-cover"  />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                    </div>
                    <div className="p-8 -mt-8 relative z-10 flex flex-col flex-1">
                      <h3 className="text-xl font-serif font-bold text-charcoal mb-3">{type.name}</h3>
                      <p className="text-sm text-muted leading-relaxed mb-6">{type.description}</p>
                      <div className="space-y-2 mb-6">
                        {type.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm text-slate-dark">
                            <Check className="w-4 h-4 text-accent shrink-0" /> {f}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm border-t border-border-light pt-4">
                        <div><span className="text-muted">Sizes</span><br /><span className="font-semibold text-charcoal">{type.sizes}</span></div>
                        <div className="text-right"><span className="text-muted">Capacity</span><br /><span className="font-semibold text-charcoal">{type.weight}</span></div>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ SPECIFICATIONS ═══ */}
      <section id="specifications" className="py-24 sm:py-32 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Technical Details</p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal">Specifications</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection preset="scaleIn">
            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-border bg-charcoal text-white">
                    <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Specification</th>
                    <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec, idx) => (
                    <tr key={spec.label} className={`border-b border-border-light ${idx % 2 === 0 ? "" : "bg-warm-white"} hover:bg-accent/5 transition-colors`}>
                      <td className="px-6 py-4 font-semibold text-charcoal whitespace-nowrap">{spec.label}</td>
                      <td className="px-6 py-4 text-muted">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ USPs ═══ */}
      <section className="bg-charcoal text-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          <iframe
            src="https://play.gumlet.io/embed/69ec63fb80df8787f2c15fb5?autoplay=true&loop=true&background=true&muted=true&preload=none"
            className="absolute border-0 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
            allow="autoplay; fullscreen"
            title="Industrial machine compressing stacked sheets"
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/90" />

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light mb-3">The Flech Difference</p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold">
                Why Source Easel Backs <span className="text-accent-light">From Flech?</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map((usp) => {
              const Icon = usp.icon;
              return (
                <StaggerItem key={usp.title} className="h-full">
                  <HoverCard className="h-full">
                    <div className="bg-white/[0.07] border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-[transform,box-shadow,border-color] duration-500 h-full">
                      <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 border border-accent/30">
                        <Icon className="w-5 h-5 text-accent-light" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-white mb-2">{usp.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{usp.description}</p>
                    </div>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ DOOR BACKS & PAD BACKS ═══ */}
      <section className="py-24 sm:py-32 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                Back Styles
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
                Door Backs &amp; <span className="text-accent">Pad Backs</span>
              </h2>
              <p className="text-muted leading-relaxed mt-4">
                We can make any door back (window opening for photo insertion) or pad back (straight cut without opening) to meet your framing requirements.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {[
              { name: "Door Backs", description: "Window opening for photo insertion. The door swings open to allow easy loading and swapping of photos and artwork.", image: "https://ik.imagekit.io/l7qlh4sga/DSC04886-Enhanced-NR.png?updatedAt=1777114595977" },
              { name: "Pad Backs", description: "Straight cut without opening. A clean, simple backing for frames where photo access from the rear is not required.", image: "https://ik.imagekit.io/l7qlh4sga/DSC04887.png?updatedAt=1777114595719" },
            ].map((item) => (
              <AnimatedSection key={item.name} className="h-full">
                <HoverCard className="h-full">
                  <div className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500 h-full flex flex-col">
                    <div className="h-56 overflow-hidden shrink-0">
                      <img decoding="async" loading="lazy" src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-serif font-bold text-charcoal mb-2">{item.name}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </HoverCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Standard Features */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { icon: Sparkles, title: "Three Standard Finishes", description: "Black velour, spanish linen, and matte black paperboard finishes available as standard." },
              { icon: Ruler, title: "Variety of Calipers", description: "80 pt backs and 120 pt legs standard. Customization available for specific projects." },
              { icon: Grip, title: "Easel Configurations", description: "Two-way (corner, vertical/horizontal) and one-way (center, best support) designs." },
              { icon: Package, title: "Hardware Options", description: "Saw tooth hangers, rings, turnbuttons and more for versatile hanging and display." },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.title} className="h-full">
                  <HoverCard className="h-full">
                    <div className="h-full bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 transition-[transform,box-shadow,border-color] duration-500">
                      <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center mb-4 border border-border">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h4 className="text-base font-serif font-bold text-charcoal mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                    </div>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Customization */}
          <AnimatedSection>
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-8">Customization Options</h3>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Palette, title: "Custom Finishes", description: "Over 75 paper colors, foils and high-end suede finishes available." },
              { icon: Scissors, title: "Die Cut Shapes", description: "Extensive die cutting operation for unique jobs and custom shapes." },
              { icon: Boxes, title: "Full Size Sheets", description: "We supply full size sheets at excellent prices for your own fabrication." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title} className="h-full">
                  <HoverCard className="h-full">
                    <div className="h-full bg-charcoal text-white rounded-2xl p-6 border border-charcoal hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mb-4 border border-accent/30">
                        <Icon className="w-5 h-5 text-accent-light" />
                      </div>
                      <h4 className="text-base font-serif font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                    </div>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ STOCK EASEL FINISHES ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Finish Options</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
                Stock Easel <span className="text-accent">Finishes</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Straight Leg", image: "https://ik.imagekit.io/l7qlh4sga/DSC04978-Enhanced-NR.png?updatedAt=1777114589491" },
              { name: "Velour Door Back", image: "https://ik.imagekit.io/l7qlh4sga/DSC04850-Enhanced-NR.png?updatedAt=1777114586181" },
              { name: "Wrapped Velour Door Back w/ Ribbon", image: "https://ik.imagekit.io/l7qlh4sga/DSC04894-Enhanced-NR.png?updatedAt=1777114590632" },
            ].map((finish) => (
              <StaggerItem key={finish.name} className="h-full">
                <HoverCard className="h-full">
                  <div className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500 h-full flex flex-col">
                    <div className="h-56 overflow-hidden shrink-0">
                      <img decoding="async" loading="lazy" src={finish.image} alt={finish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5 flex-1 flex items-center justify-center">
                      <h3 className="text-sm font-semibold text-charcoal text-center">{finish.name}</h3>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ APPLICATIONS + CUSTOM CTA ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection preset="slideLeft">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Applications</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-8">
                Where Our Easel Backs Work
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {applications.map((app) => (
                  <div key={app} className="flex items-center gap-3 text-sm text-slate-dark py-2">
                    <div className="w-2 h-2 bg-accent rounded-full shrink-0" /> {app}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection preset="slideRight">
              <div className="relative rounded-2xl overflow-hidden">
                <img decoding="async" loading="lazy" src="https://ik.imagekit.io/l7qlh4sga/DSC05088-Enhanced-NR.png?updatedAt=1777114599811" alt="Quality inspection of finished products" className="w-full h-80 object-cover"  />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <Package className="w-10 h-10 text-accent-light mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">Need a Custom Solution?</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Non-standard size? Unusual substrate? We manufacture custom easel backs to your exact specifications.
                  </p>
                  <Link href="/contact" className="group inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors cursor-pointer">
                    Discuss Your Requirements <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* ═══ PROCESS GALLERY ═══ */}
      <section className="py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">Built to Perform</h2>
          <p className="text-muted mt-2 max-w-xl">The machinery and hardware behind every easel back we produce.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 px-2">
          {[
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04612.png?updatedAt=1777114536890", alt: "Close-up industrial machine wheel in workshop" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04615.png?updatedAt=1777114537022", alt: "Metal handwheel on heavy machinery in factory" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04623.png?updatedAt=1777114536167", alt: "Machine wheel with workshop background" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04631-Enhanced-NR.png?updatedAt=1777114523360", alt: "Industrial rollers and controls in manufacturing facility" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04639.png?updatedAt=1777114535979", alt: "Overhead cables and pulleys on industrial equipment" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04642.png?updatedAt=1777114535474", alt: "Overhead pulley system with steel cables in warehouse" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04647-Enhanced-NR.png?updatedAt=1777114536135", alt: "Vintage industrial wheel with worn metal and grease" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04651-Enhanced-NR.png?updatedAt=1777114537447", alt: "Old factory gear wheel with detailed mechanical texture" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04882.png?updatedAt=1777114595376", alt: "Metal screws piled inside small container" },
            { src: "https://ik.imagekit.io/l7qlh4sga/DSC04890.png?updatedAt=1777114594829", alt: "Screwdriver resting in container filled with metal screws" },
          ].map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg bg-muted/10">
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[400px]">
          <div className="relative h-48 lg:h-auto overflow-hidden">
            <img decoding="async" loading="lazy" src="https://ik.imagekit.io/l7qlh4sga/DSC05211-Enhanced-NR.png?updatedAt=1777114600730" alt="Manufacturing process" className="absolute inset-0 w-full h-full object-cover"  />
          </div>
          <div className="bg-charcoal text-white flex items-center">
            <AnimatedSection className="px-8 py-16 lg:px-16 lg:py-20">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Get Your Easel Back Quote</h2>
              <p className="text-white/50 leading-relaxed mb-8 text-lg">
                Type, size, quantity, and custom requirements. We&apos;ll respond within 24 hours with pricing and lead time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer">
                  Request a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer border border-white/20">
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
