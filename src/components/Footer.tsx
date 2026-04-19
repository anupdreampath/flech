import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const productLinks = [
  { name: "Easel Backs", href: "/products/easel-backs" },
  { name: "Fold Lines & Dielines", href: "/products/fold-lines" },
  { name: "Contract Framing Backs", href: "/products/framing-backs" },
  { name: "Matboards", href: "/products/matboards" },
];

const companyLinks = [
  { name: "About Flech", href: "/about" },
  { name: "Industries We Serve", href: "/industries" },
  { name: "Contact & RFQ", href: "/contact" },
];

const industryLinks = [
  { name: "Sign & Display", href: "/industries#signage" },
  { name: "Wholesale Framing", href: "/industries#framing" },
  { name: "Packaging & POP", href: "/industries#packaging" },
  { name: "Interior Design", href: "/industries#interior" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/images/brand/flech-logo.jpg"
                alt="Flech Paper Products"
                className="h-10 w-auto object-contain brightness-200"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/60 mb-6 max-w-xs">
              Precision board manufacturing since 1999. Specialists in easel
              backs, matboard, and specialty board products for the framing,
              sign, and display industries.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+19733578111"
                className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-accent-light" />
                (973) 357-8111
              </a>
              <a
                href="mailto:info@flech.com"
                className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-accent-light" />
                info@flech.com
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-light shrink-0 mt-0.5" />
                <span>
                  Paterson, NJ
                  <br />
                  United States
                </span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5 mt-8">
              Industries
            </h3>
            <ul className="space-y-3">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              Get Started
            </h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Need custom board solutions? Our team responds within 24 hours
              with detailed quotes and specifications.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors cursor-pointer"
            >
              Request a Quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="mt-8 p-4 bg-white/5 rounded-sm border border-white/10">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
                Certifications
              </p>
              <p className="text-sm text-white/70">
                ISO 9001 Certified
                <br />
                FSC Chain of Custody
                <br />
                Acid-Free & Archival
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/40" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Flech Paper Products. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
