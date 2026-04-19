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
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "@/components/AnimatedSection";

const industries = [
  {
    id: "signage",
    icon: Monitor,
    name: "Sign & Display Manufacturing",
    tagline: "The backbone of retail displays and trade show graphics",
    image: "/images/products/consumer-display.jpg",
    description: "Sign and display manufacturers need easel backs and display boards that perform reliably at scale. When your client orders 5,000 counter displays, every single easel back needs to stand at the right angle and maintain adhesion over time.",
    needs: ["Self-stick easel backs in single and double-wing", "Custom die-cut display boards and standees", "Precision score lines for folding displays", "High-volume production with consistent quality", "Drop-shipping directly to retail clients"],
    products: ["Easel Backs", "Fold Lines", "Custom Die-Cutting"],
  },
  {
    id: "framing",
    icon: Frame,
    name: "Wholesale Framing",
    tagline: "Contract-quality boards for commercial framing operations",
    image: "/images/framing/frame-samples.jpg",
    description: "Wholesale framers running high-volume operations for certificates, corporate awards, and retail framed art need consistent materials and reliable supply. Our framing backs and matboards are manufactured to contract specifications.",
    needs: ["Archival matboards in 50+ standard colors", "Contract framing backs in standard and custom sizes", "Easel backs for freestanding frames", "Consistent caliper and edge quality sheet-to-sheet", "Inventory programs for repeat orders"],
    products: ["Matboards", "Framing Backs", "Easel Backs"],
  },
  {
    id: "packaging",
    icon: Package,
    name: "Packaging & POP Displays",
    tagline: "Custom-cut boards for retail and promotional applications",
    image: "/images/products/board-stack.jpg",
    description: "Point-of-purchase designers and packaging companies need custom board solutions that integrate with creative concepts. We provide structural components, die-cut boards, scored fold patterns, and easel mechanisms.",
    needs: ["Custom die-cut boards from your dieline files", "Complex fold patterns and multi-score configs", "Self-stick easel backs for counter and floor displays", "Multiple substrate options", "Fast prototyping from dieline to sample"],
    products: ["Fold Lines", "Easel Backs", "Custom Converting"],
  },
  {
    id: "interior",
    icon: Paintbrush,
    name: "Interior Design & Architecture",
    tagline: "Archival boards for gallery and architectural presentations",
    image: "/images/products/diy-art.jpg",
    description: "Interior designers, architects, and gallery professionals need matboards and presentation materials that meet museum-grade preservation standards. Our acid-free, archival-quality products protect artwork for decades.",
    needs: ["Museum-grade acid-free matboards", "Premium 8-ply options for added depth", "Custom color matching for brand consistency", "Archival framing backs for long-term preservation", "Small-batch custom orders"],
    products: ["Matboards", "Framing Backs"],
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[50dvh] flex items-end overflow-hidden">
        <img decoding="async" loading="lazy" src="/images/framing/frame-print.png" alt="Framing industry" className="absolute inset-0 w-full h-full object-cover"  />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 sm:pb-24 pt-40 w-full">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-accent-light">Industries</span>
          </nav>

          <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] text-white"
          >
            Your Industry,
            <br />
            <span className="text-accent-light">Our Expertise</span>
          </h1>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-32">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={industry.id} id={industry.id} className="scroll-mt-24">
                  <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
                    {/* Image */}
                    <AnimatedSection preset={isEven ? "slideLeft" : "slideRight"} className={isEven ? "" : "lg:order-2"}>
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-[440px]">
                        <img decoding="async" loading="lazy" src={industry.image} alt={industry.name} className="absolute inset-0 w-full h-full object-cover"  />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-6 left-6 w-14 h-14 bg-white/25 rounded-xl flex items-center justify-center border border-white/30">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex flex-wrap gap-2">
                            {industry.products.map((product) => (
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
                          {industry.needs.map((need) => (
                            <div key={need} className="flex items-start gap-3 text-sm text-slate-dark">
                              <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {need}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-border">
                          <Link href="/contact" className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors cursor-pointer">
                            Discuss Your Requirements <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[400px]">
          <div className="relative h-48 lg:h-auto overflow-hidden">
            <img decoding="async" loading="lazy" src="/images/framing/gallery-frame.jpg" alt="Gallery frame" className="absolute inset-0 w-full h-full object-cover"  />
          </div>
          <div className="bg-charcoal text-white flex items-center">
            <AnimatedSection className="px-8 py-16 lg:px-16 lg:py-20">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Don&apos;t See Your Industry?</h2>
              <p className="text-white/50 leading-relaxed mb-8 text-lg">
                If you need precision board products, cut, scored, laminated, or finished, there&apos;s a good chance we can help.
              </p>
              <Link href="/contact" className="group inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 text-sm font-semibold rounded-sm transition-colors cursor-pointer">
                Contact Our Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
