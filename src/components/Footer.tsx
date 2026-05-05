import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export type FooterLink = { label: string; href: string };

export type FooterProps = {
  productLinks: FooterLink[];
  companyLinks: FooterLink[];
  industryLinks: FooterLink[];
  legalLinks: FooterLink[];
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    addressLine1: string;
    addressLine2: string;
  };
  copyright?: string;
  ctaLabel: string;
  ctaHref: string;
};

export function Footer({
  productLinks,
  companyLinks,
  industryLinks,
  legalLinks,
  contact,
  copyright,
  ctaLabel,
  ctaHref,
}: FooterProps) {
  return (
    <footer className="bg-charcoal text-white/80" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
                href={contact.phoneHref}
                className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-accent-light" />
                {contact.phone}
              </a>
              <a
                href={contact.emailHref}
                className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-accent-light" />
                {contact.email}
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-light shrink-0 mt-0.5" />
                <span>
                  {contact.addressLine1}
                  <br />
                  {contact.addressLine2}
                </span>
              </div>
            </div>
          </div>

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
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            {industryLinks.length > 0 && (
              <>
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
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              Get Started
            </h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Need custom board solutions? Our team responds within 24 hours
              with detailed quotes and specifications.
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors cursor-pointer"
            >
              {ctaLabel}
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

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/40" suppressHydrationWarning>
            {copyright || `© ${new Date().getFullYear()} Flech Paper Products. All rights reserved.`}
          </p>
          {legalLinks.length > 0 && (
            <div className="flex items-center gap-6 text-xs text-white/40">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-white/70 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
