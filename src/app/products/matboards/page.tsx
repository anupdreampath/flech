"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Palette,
  Shield,
  Layers,
  Gem,
  Truck,
  Droplets,
  Package,
  Scissors,
} from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/AnimatedSection";

/* ─── DATA ─── */

const matboardFeatures = [
  {
    icon: Palette,
    title: "75+ Color Selection",
    description:
      "Selection of over 75 colors on cream, white and black core pulp board.",
  },
  {
    icon: Layers,
    title: "7-Ply Extra Thick",
    description:
      "Unique 7-ply Snowstorm (white), Blackout (black) and Heavy Cream (cream). The new standard in extra thick matboard.",
  },
  {
    icon: Shield,
    title: "Archival Quality",
    description:
      "Calcium carbonate buffered, pH neutral. High fade and bleed resistant facing papers.",
  },
  {
    icon: Package,
    title: "Multiple Formats",
    description:
      "Available 4 and 7 ply, 32x40 and 40x60 carton packed or untrimmed bulk on pallets.",
  },
  {
    icon: Scissors,
    title: "Precision Cutting",
    description:
      "Bevel and straight cut mats produced on ten cutters (7 CNCs, 3 die presses).",
  },
  {
    icon: Gem,
    title: "Intricate Designs",
    description:
      "V-grooves, channels and other techniques in any shape imaginable.",
  },
  {
    icon: Droplets,
    title: "Double & Triple Glued",
    description:
      "Double and triple glued mats for layered, dimensional presentation.",
  },
];

const primaryColors = [
  { id: 1, name: "Tablet White #101" },
  { id: 2, name: "Snow #108" },
  { id: 3, name: "Woven White #106" },
  { id: 4, name: "Buttermilk #220" },
  { id: 5, name: "C-Linen #102" },
  { id: 6, name: "Buff #203" },
  { id: 7, name: "Straw #201" },
  { id: 8, name: "Pewter #211" },
  { id: 9, name: "Sage #401" },
  { id: 10, name: "Grey Flannel #210" },
  { id: 11, name: "Warm Grey #212" },
  { id: 12, name: "Biscuit #213" },
  { id: 13, name: "Sienna #501" },
  { id: 14, name: "Crimson #601" },
  { id: 15, name: "Maroon #602" },
  { id: 16, name: "Tangerine #561" },
  { id: 17, name: "Lemon #306" },
  { id: 18, name: "Saffron #309" },
  { id: 19, name: "Olive #404" },
  { id: 20, name: "Evergreen #405" },
  { id: 21, name: "Mocha #502" },
  { id: 22, name: "Espresso #505" },
  { id: 23, name: "Light Blue #621" },
  { id: 24, name: "Icy Blue #625" },
  { id: 25, name: "Cobalt #629" },
  { id: 26, name: "True Blue #624" },
  { id: 27, name: "Liberty #628" },
  { id: 28, name: "Blueberry #627" },
  { id: 29, name: "Eclipse #626" },
  { id: 30, name: "Purple #650" },
  { id: 31, name: "Blackest Black #701" },
  { id: 32, name: "Midnight #702" },
  { id: 33, name: "Storm #710" },
  { id: 34, name: "Charcoal #711" },
  { id: 36, name: "Graphite #712" },
];

const suedeColors = [
  { id: 1, name: "Snowflake #S10" },
  { id: 2, name: "Coconut #S12" },
  { id: 3, name: "Vanilla #S15" },
  { id: 4, name: "Dove #S20" },
  { id: 5, name: "Sand #S22" },
  { id: 6, name: "Mushroom #S25" },
  { id: 7, name: "Rose #S30" },
  { id: 8, name: "Royal #S35" },
  { id: 9, name: "Alpine #S40" },
  { id: 10, name: "Snow #S50" },
  { id: 11, name: "Faux Silver #S972" },
  { id: 12, name: "Faux Gold #S971" },
  { id: 13, name: "Silver Foil #S973" },
  { id: 14, name: "Midnight Suede #S60" },
  { id: 15, name: "Deep Red Suede #S65" },
  { id: 16, name: "Forest Suede #S70" },
  { id: 17, name: "Navy Suede #S75" },
  { id: 18, name: "Espresso Suede #S80" },
];

const coreTypes = [
  {
    name: "White Core",
    description:
      "The industry standard. A clean white bevel reveals a bright, crisp border that complements most artwork and frame finishes.",
    best: "General framing, certificates, photography",
    image: "/images/products/matboard-colors-1.png",
  },
  {
    name: "Cream Core",
    description:
      "A warm, off-white bevel that softens the transition between mat and artwork. Preferred for traditional art, watercolors, and vintage photographs.",
    best: "Fine art, watercolors, vintage photography",
    image: "/images/products/matboard-colors-2.png",
  },
  {
    name: "Black Core",
    description:
      "A dramatic black bevel that creates a bold, contemporary border. Makes colors pop and adds a gallery-quality finish to modern artwork and photography.",
    best: "Contemporary art, photography, high-end retail",
    image: "/images/products/matboard-display.jpg",
  },
];

const specs = [
  {
    label: "Material",
    value: "4-ply and 7-ply cotton rag and alpha-cellulose",
  },
  { label: "Core Options", value: "White, Cream, Black" },
  {
    label: "Surface Colors",
    value: "75+ standard colors, custom colors available",
  },
  {
    label: "Acid-Free",
    value:
      "Yes, calcium carbonate buffered, pH neutral, high fade and bleed resistant",
  },
  {
    label: "Bevel Cut",
    value: "Standard 45-degree bevel, straight cut available",
  },
  {
    label: "Sheet Sizes",
    value: '32x40" and 40x60" (custom available)',
  },
  { label: "Thickness", value: '4-ply (1/16") and 7-ply (1/8")' },
  {
    label: "Window Cuts",
    value:
      "Rectangle, oval, v-grooves, channels, and custom shapes",
  },
  {
    label: "Cutting Equipment",
    value: "10 cutters (7 CNCs, 3 die presses)",
  },
  {
    label: "Packaging",
    value: "Carton packed or untrimmed bulk on pallets",
  },
];


const usps = [
  {
    icon: Shield,
    title: "True Archival Quality",
    description:
      "Our matboards are acid-free, pH neutral, and lignin-free. They will not yellow, fox, or transfer acids to the artwork they protect, even over decades.",
    image: "/images/products/framed-art.jpg",
  },
  {
    icon: Scissors,
    title: "Precision Bevel Cuts",
    description:
      "Every bevel is cut at a consistent 45-degree angle with clean, sharp edges. No ragged fibers, no uneven reveals. The kind of finish that gallery clients expect.",
    image: "/images/products/matboard-display.jpg",
  },
  {
    icon: Palette,
    title: "75+ Standard Colors",
    description:
      "From classic museum whites and creams to bold contemporary colors. Color matching is also available for custom projects.",
    image: "/images/products/matboard-colors-1.png",
  },
  {
    icon: Layers,
    title: "4-Ply and 7-Ply Options",
    description:
      "Standard 4-ply for most framing applications, premium 7-ply for added depth and presence. Both available in cotton rag and alpha-cellulose.",
    image: "/images/products/matboard-colors-2.png",
  },
  {
    icon: Gem,
    title: "Creative & Industrial Appeal",
    description:
      "Whether you are framing a museum acquisition or producing 5,000 corporate awards, our matboards serve both the creative designer and the procurement manager.",
    image: "/images/products/diy-art.jpg",
  },
  {
    icon: Truck,
    title: "Volume Pricing, No Compromise",
    description:
      "Contract pricing for wholesale framers and volume buyers. High quantity does not mean lower quality. Every sheet meets the same archival standard.",
    image: "/images/products/memorable-moments.jpg",
  },
];

const applications = [
  {
    name: "Gallery & Museum Framing",
    description:
      "Archival matboards that protect artwork for decades. Museum-grade acid-free materials meet the highest preservation standards.",
    image: "/images/products/framed-art.jpg",
  },
  {
    name: "Corporate & Certificates",
    description:
      "Professional matting for diplomas, awards, and corporate photography. Clean lines and consistent quality at volume.",
    image: "/images/products/memorable-moments.jpg",
  },
  {
    name: "Creative Design & DIY",
    description:
      "A palette of 75+ colors for interior designers, artists, and crafters. Express creativity with professional-grade materials.",
    image: "/images/products/diy-art.jpg",
  },
  {
    name: "Retail & Commercial Display",
    description:
      "Ready-made matboard sizes for retail framing and commercial display applications. Fast fulfillment, volume pricing.",
    image: "/images/products/iframe-product.jpg",
  },
];

export default function MatboardsPage() {
  return (
    <>
      {/* ═══ 1. HERO ═══ */}
      <section className="relative min-h-[60dvh] flex items-center overflow-hidden">
        <img
          src="/images/products/matboard-colors-1.png"
          alt="Colorful matboard spread"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />
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
          <nav
            className="flex items-center gap-2 text-sm text-white/50 mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-white/80 transition-colors cursor-pointer"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/"
              className="hover:text-white/80 transition-colors cursor-pointer"
            >
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-accent-light">Matboards</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-xs font-medium tracking-wider uppercase text-white/80 mb-8 border border-white/10">
              <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse" />
              Decorative &amp; Archival
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] tracking-tight mb-8 text-white">
              Matboards
              <br />
              <span className="bg-gradient-to-r from-accent-light via-red-300 to-accent bg-clip-text text-transparent">
                in 75+ Colors
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-8 font-light">
              A full line of matboard in sheets and precut to size. Available in
              an array of vibrant colors and core boards to fulfill all of your
              framing needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-[transform,color,background-color,border-color] duration-300 cursor-pointer hover:shadow-lg hover:shadow-accent/20"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#color-line"
                className="group inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 text-sm font-semibold rounded-sm transition-[transform,color,background-color,border-color] duration-300 cursor-pointer border border-white/20"
              >
                <Palette className="w-4 h-4" />
                View Colors
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. MATBOARD & PRECUTS DETAILS ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <AnimatedSection preset="slideLeft">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/products/matboard-colors-2.png"
                  alt="Matboard color selection spread"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-xs font-medium text-white border border-white/20">
                    <Palette className="w-3.5 h-3.5" />
                    75+ Colors Available
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-xs font-medium text-white border border-white/20">
                    <Shield className="w-3.5 h-3.5" />
                    Acid-Free Archival
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection preset="slideRight">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                  Matboard &amp; Precuts
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal mb-6">
                  Where Art Meets{" "}
                  <span className="text-accent">Craft</span>
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  We proudly offer a full line of matboard in sheets and precut
                  to size in an array of vibrant colors and core boards to
                  fulfill all of your framing needs. With a selection of over 75
                  colors on cream, white and black core board, our top-quality
                  mats meet all industry standards and provide limitless
                  possibilities to beautifully accent any frame, photograph or
                  framed art.
                </p>
                <p className="text-accent font-semibold text-sm leading-relaxed mb-8 border-l-4 border-accent pl-4">
                  Whatever your trade, we have the ability to design and cut mats
                  for your needs.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Acid-free archival",
                    "45-degree bevel cut",
                    "White, cream & black core",
                    "4-ply and 7-ply",
                    "Custom window cuts",
                    "Volume pricing",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-dark"
                    >
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Feature Cards Grid */}
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                Capabilities
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal">
                Built for Every{" "}
                <span className="text-accent">Framing Need</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {matboardFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.title} className="h-full">
                  <HoverCard className="h-full">
                    <div className="h-full bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500">
                      <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mb-4 border border-border">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-base font-serif font-bold text-charcoal mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 3. RAINBOW PLUS COLOR LINE - Primary Colors ═══ */}
      <section
        id="color-line"
        className="py-24 sm:py-32 bg-warm-white scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                Color Catalog
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
                Rainbow Plus&trade;{" "}
                <span className="text-accent">Color Line</span>
              </h2>
            </div>
            <p className="text-muted leading-relaxed max-w-3xl mb-16">
              All the basics and then some. An array of vibrant, timeless colors
              available in stock. Color matching is available.
            </p>
          </AnimatedSection>

          {/* Primary Colors */}
          <AnimatedSection>
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-8">
              Primary Colors
            </h3>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
            {primaryColors.map((color) => (
              <StaggerItem key={color.id}>
                <div className="group">
                  <div className="rounded-xl overflow-hidden border border-border bg-surface hover:border-accent/40 hover:shadow-lg transition-[transform,box-shadow,border-color] duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`/images/colors/primary/c${color.id}.png`}
                        alt={color.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-2 py-2">
                      <p className="text-[10px] sm:text-xs text-muted leading-tight text-center truncate">
                        {color.name}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 4. SIMPLY SUEDE & PREMIUM COLORS ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mb-3">
              Simply Suede &amp; Premium Colors
            </h3>
            <p className="text-muted leading-relaxed max-w-3xl mb-12">
              A premium line of suede and specialty finishes for projects that
              demand a tactile, elevated presentation.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
            {suedeColors.map((color) => (
              <StaggerItem key={color.id}>
                <div className="group">
                  <div className="rounded-xl overflow-hidden border border-border bg-surface hover:border-accent/40 hover:shadow-lg transition-[transform,box-shadow,border-color] duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`/images/colors/suede/s${color.id}.png`}
                        alt={color.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-2 py-2">
                      <p className="text-[10px] sm:text-xs text-muted leading-tight text-center truncate">
                        {color.name}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 5. CORE TYPES ═══ */}
      <section className="py-24 sm:py-32 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                Core Options
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
                Three Cores,{" "}
                <span className="text-accent">Infinite Possibilities</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreTypes.map((core) => (
              <StaggerItem key={core.name} className="h-full">
                <HoverCard className="h-full">
                  <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface hover:border-accent/30 hover:shadow-xl transition-[transform,box-shadow,border-color] duration-500 min-h-[420px] h-full">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={core.image}
                        alt={core.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-transparent via-transparent to-white" />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                        {core.name}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                        {core.description}
                      </p>
                      <div className="border-t border-border-light pt-4">
                        <span className="text-xs text-muted uppercase tracking-wider">
                          Best For
                        </span>
                        <p className="text-sm font-medium text-charcoal mt-1">
                          {core.best}
                        </p>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 6. SPECIFICATIONS ═══ */}
      <section
        id="specifications"
        className="bg-charcoal text-white py-24 sm:py-32 scroll-mt-24 relative overflow-hidden"
      >
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
                    <th className="text-left px-6 py-4 font-semibold text-accent-light text-xs uppercase tracking-wider">
                      Specification
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-accent-light text-xs uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec, idx) => (
                    <tr
                      key={spec.label}
                      className={`border-b border-white/5 ${
                        idx % 2 === 0 ? "" : "bg-white/[0.02]"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-white/60">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Easel backs content moved to /products/easel-backs */}

      {/* ═══ 9. WHY FLECH USPs ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                The Flech Difference
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
                Why Source Matboards
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
                      <div className="h-32 overflow-hidden shrink-0">
                        <img
                          src={usp.image}
                          alt={usp.title}
                          loading="lazy"
                          decoding="async"
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

      {/* ═══ 10. APPLICATIONS ═══ */}
      <section className="py-24 sm:py-32 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                Applications
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal leading-tight">
                Your Vision,{" "}
                <span className="text-accent">Our Matboard</span>
              </h2>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app) => (
              <StaggerItem key={app.name}>
                <HoverCard>
                  <div className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer">
                    <img
                      src={app.image}
                      alt={app.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-lg font-serif font-bold text-white mb-1">
                        {app.name}
                      </h3>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 11. CTA SPLIT ═══ */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <img
              src="/images/products/matboard-colors-1.png"
              alt="Matboard color selection"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal/20 lg:bg-gradient-to-r lg:from-transparent lg:to-charcoal" />
          </div>

          <div className="bg-charcoal text-white flex items-center">
            <AnimatedSection className="max-w-lg mx-auto px-8 py-16 lg:px-12 lg:py-20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light mb-4">
                Get Started
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">
                Ready to Order
                <br />
                Matboards?
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 text-lg">
                From sample swatches to volume orders, tell us your colors,
                sizes, and quantities. Quote within 24 hours.
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
                  Request Color Swatches
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
