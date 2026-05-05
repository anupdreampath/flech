"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

export type NavLink = { label: string; href: string };
export type ProductLink = NavLink & { description?: string };

export type NavbarProps = {
  navLinks: NavLink[];
  productLinks: ProductLink[];
  ctaLabel: string;
  ctaHref: string;
  topbar: {
    blurb: string;
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
  };
  flagshipLabel: string;
  flagshipHref: string;
};

export function Navbar({
  navLinks,
  productLinks,
  ctaLabel,
  ctaHref,
  topbar,
  flagshipLabel,
  flagshipHref,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProducts = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setProductsOpen(true);
  };

  const scheduleCloseProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 180);
  };

  // Filter out the "Home" or "Products" entries that are rendered separately.
  const sideLinks = navLinks.filter(
    (l) => l.label.toLowerCase() !== "home" && l.label.toLowerCase() !== "products"
  );
  const homeLink = navLinks.find((l) => l.label.toLowerCase() === "home") || {
    label: "Home",
    href: "/",
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-charcoal text-white/80 text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <p className="font-sans tracking-wide">{topbar.blurb}</p>
          <div className="flex items-center gap-6">
            <a
              href={topbar.phoneHref}
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              {topbar.phone}
            </a>
            <a
              href={topbar.emailHref}
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              {topbar.email}
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
          <Link href={homeLink.href} className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/flech-logo.jpg"
              alt="Flech Paper Products"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href={homeLink.href}
              className="px-4 py-2 text-base font-medium text-slate-dark hover:text-charcoal transition-colors duration-200 cursor-pointer"
            >
              {homeLink.label}
            </Link>

            {/* Products dropdown */}
            <div
              className="relative"
              onMouseEnter={openProducts}
              onMouseLeave={scheduleCloseProducts}
            >
              <button
                className="flex items-center gap-1 px-4 py-2 text-base font-medium text-slate-dark hover:text-charcoal transition-colors duration-200 cursor-pointer"
                aria-expanded={productsOpen}
                aria-haspopup="true"
                onFocus={openProducts}
                onClick={() => setProductsOpen((v) => !v)}
              >
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {productsOpen && (
                <div
                  className="absolute top-full left-0 w-80 pt-3"
                  onMouseEnter={openProducts}
                  onMouseLeave={scheduleCloseProducts}
                >
                  <div className="bg-surface rounded-lg shadow-xl border border-border p-2 fade-in">
                    {productLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col gap-0.5 px-4 py-3 rounded-md hover:bg-warm-white transition-colors duration-150 cursor-pointer group"
                      >
                        <span className="text-sm font-semibold text-charcoal group-hover:text-accent-dark transition-colors">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-xs text-muted">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    ))}
                    {flagshipHref && flagshipLabel && (
                      <div className="border-t border-border-light mt-1 pt-1">
                        <Link
                          href={flagshipHref}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-accent hover:text-accent-dark transition-colors cursor-pointer"
                        >
                          {flagshipLabel}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {sideLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-base font-medium text-slate-dark hover:text-charcoal transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={ctaHref}
              className="hidden sm:inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-6 py-3 text-base font-semibold rounded-sm transition-colors duration-200 cursor-pointer"
            >
              {ctaLabel}
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
                href={homeLink.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-charcoal rounded-md hover:bg-warm-white transition-colors cursor-pointer"
              >
                {homeLink.label}
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
                    {item.label}
                  </Link>
                ))}
              </div>

              {sideLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-charcoal rounded-md hover:bg-warm-white transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-border-light">
                <Link
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-cta hover:bg-cta-hover text-white px-5 py-3 text-sm font-semibold rounded-sm transition-colors cursor-pointer"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
