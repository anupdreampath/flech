"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const productLinks = [
  {
    name: "Easel Backs",
    href: "/products/easel-backs",
    description: "Self-stick & custom display stands",
  },
  {
    name: "Fold Lines & Dielines",
    href: "/products/fold-lines",
    description: "Precision score lines for accurate bends",
  },
  {
    name: "Contract Framing Backs",
    href: "/products/framing-backs",
    description: "Standardized backing boards for framing",
  },
  {
    name: "Matboards",
    href: "/products/matboards",
    description: "Acid-free decorative borders & mats",
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Industries", href: "/industries" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-charcoal text-white/80 text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <p className="font-sans tracking-wide">
            Precision Board Manufacturing - Paterson, NJ since 1999
          </p>
          <div className="flex items-center gap-6">
            <a
              href="tel:+19733578111"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              (973) 357-8111
            </a>
            <a
              href="mailto:info@flech.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              info@flech.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className="sticky top-0 z-50 bg-surface border-b border-border"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/brand/flech-logo.jpg"
              alt="Flech Paper Products"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-base font-medium text-slate-dark hover:text-charcoal transition-colors duration-200 cursor-pointer"
            >
              Home
            </Link>

            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-4 py-2 text-base font-medium text-slate-dark hover:text-charcoal transition-colors duration-200 cursor-pointer"
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 w-80 bg-surface rounded-lg shadow-xl border border-border p-2 mt-0.5 fade-in">
                  {productLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col gap-0.5 px-4 py-3 rounded-md hover:bg-warm-white transition-colors duration-150 cursor-pointer group"
                    >
                      <span className="text-sm font-semibold text-charcoal group-hover:text-accent-dark transition-colors">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                  <div className="border-t border-border-light mt-1 pt-1">
                    <Link
                      href="/products/easel-backs"
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-accent hover:text-accent-dark transition-colors cursor-pointer"
                    >
                      View Our Flagship: Easel Backs
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="px-4 py-2 text-base font-medium text-slate-dark hover:text-charcoal transition-colors duration-200 cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/industries"
              className="px-4 py-2 text-base font-medium text-slate-dark hover:text-charcoal transition-colors duration-200 cursor-pointer"
            >
              Industries
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-base font-medium text-slate-dark hover:text-charcoal transition-colors duration-200 cursor-pointer"
            >
              Contact
            </Link>
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-6 py-3 text-base font-semibold rounded-sm transition-colors duration-200 cursor-pointer"
            >
              Request a Quote
            </Link>

            <button
              className="lg:hidden p-2 text-charcoal cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-surface fade-in">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-charcoal rounded-md hover:bg-warm-white transition-colors cursor-pointer"
              >
                Home
              </Link>

              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                  Products
                </p>
                {productLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 pl-2 text-sm text-slate-dark hover:text-charcoal border-l-2 border-border hover:border-accent transition-colors cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-charcoal rounded-md hover:bg-warm-white transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 border-t border-border-light">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-cta hover:bg-cta-hover text-white px-5 py-3 text-sm font-semibold rounded-sm transition-colors cursor-pointer"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
