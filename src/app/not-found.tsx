"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const quickLinks = [
  { name: "Easel Backs", href: "/products/easel-backs" },
  { name: "Fold Lines & Dielines", href: "/products/fold-lines" },
  { name: "Contract Framing Backs", href: "/products/framing-backs" },
  { name: "Matboards", href: "/products/matboards" },
];

export default function NotFound() {
  return (
    <section className="min-h-[70dvh] flex items-center justify-center bg-paper-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
          404 — Page Not Found
        </p>
        <h1 className="text-6xl sm:text-8xl font-serif font-bold text-charcoal/10 mb-2 leading-none select-none">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mb-4">
          This Page Doesn&apos;t Exist
        </h2>
        <p className="text-muted leading-relaxed mb-10 max-w-md mx-auto">
          The page you&apos;re looking for may have moved or been removed. Browse our product lines or head back home.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-warm-white hover:bg-cream text-charcoal px-6 py-3 text-sm font-semibold rounded-sm border border-border transition-colors cursor-pointer"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="border-t border-border pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-5">
            Our Products
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-slate-dark bg-surface border border-border rounded-sm hover:border-accent/40 hover:text-charcoal transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
