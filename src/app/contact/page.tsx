"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const productOptions = [
  "Easel Backs",
  "Fold Lines & Dielines",
  "Contract Framing Backs",
  "Matboards",
  "Custom / Other",
];

const industryOptions = [
  "Sign & Display Manufacturing",
  "Wholesale Framing",
  "POP / Retail Displays",
  "Packaging & Print",
  "Interior Design / Architecture",
  "Other",
];

const quantityOptions = [
  "Under 500 units",
  "500 – 2,500 units",
  "2,500 – 10,000 units",
  "10,000 – 50,000 units",
  "50,000+ units",
  "Not sure yet",
];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    industry: "",
    quantity: "",
    customSize: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pageUrl: window.location.href,
          referrer: document.referrer,
          answers: {
            product: formData.product,
            industry: formData.industry,
            quantity: formData.quantity,
            customSize: formData.customSize,
          },
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      alert(
        "We couldn't submit your inquiry. Please try again or call us at (973) 357-8111."
      );
    }
  };

  const canProceedStep1 = formData.product !== "";
  const canProceedStep2 = formData.industry !== "" && formData.quantity !== "";
  const canSubmit =
    formData.name !== "" && formData.email !== "" && formData.company !== "";

  if (submitted) {
    return (
      <>
        <section className="py-28 sm:py-40">
          <div className="max-w-xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-3xl font-serif font-semibold text-charcoal mb-4">
              Inquiry Sent
            </h1>
            <p className="text-muted leading-relaxed mb-8">
              Thanks — we&apos;ve received your inquiry. Our team typically
              responds within 24 hours with a detailed quote and specification
              recommendations.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold text-sm transition-colors cursor-pointer"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
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
            <span className="text-accent-light">Contact & RFQ</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-[1.1] mb-4 text-white">
            Request a Quote
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light">
            Answer a few questions about what you need and we&apos;ll send
            you a detailed quote within 24 hours.
          </p>
        </div>
      </section>

      {/* ═══ FORM + SIDEBAR ═══ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Progress indicator */}
              <div className="flex items-center gap-3 mb-10">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <button
                      onClick={() => s < step && setStep(s)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer ${
                        s === step
                          ? "bg-accent text-white"
                          : s < step
                            ? "bg-accent/20 text-accent"
                            : "bg-cream text-muted"
                      }`}
                      aria-label={`Step ${s}`}
                    >
                      {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                    </button>
                    {s < 3 && (
                      <div
                        className={`w-16 sm:w-24 h-0.5 rounded ${
                          s < step ? "bg-accent/30" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                ))}
                <span className="text-xs text-muted ml-2">
                  Step {step} of 3
                </span>
              </div>

              {/* Step 1: Product */}
              {step === 1 && (
                <div className="fade-in">
                  <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2">
                    What product are you interested in?
                  </h2>
                  <p className="text-sm text-muted mb-8">
                    Select the product category that best matches your needs.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {productOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => updateField("product", option)}
                        className={`text-left px-5 py-4 rounded-sm border text-sm font-medium transition-colors duration-200 cursor-pointer ${
                          formData.product === option
                            ? "border-accent bg-accent/5 text-charcoal"
                            : "border-border bg-surface text-slate-dark hover:border-accent/40"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => canProceedStep1 && setStep(2)}
                    disabled={!canProceedStep1}
                    className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors duration-200 cursor-pointer"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div className="fade-in">
                  <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2">
                    Tell us about your requirements
                  </h2>
                  <p className="text-sm text-muted mb-8">
                    Help us understand your industry and volume so we can
                    provide the most accurate quote.
                  </p>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">
                        Your Industry
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {industryOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              updateField("industry", option)
                            }
                            className={`text-left px-5 py-3.5 rounded-sm border text-sm transition-colors duration-200 cursor-pointer ${
                              formData.industry === option
                                ? "border-accent bg-accent/5 text-charcoal font-medium"
                                : "border-border bg-surface text-slate-dark hover:border-accent/40"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">
                        Estimated Quantity
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {quantityOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              updateField("quantity", option)
                            }
                            className={`text-left px-5 py-3.5 rounded-sm border text-sm transition-colors duration-200 cursor-pointer ${
                              formData.quantity === option
                                ? "border-accent bg-accent/5 text-charcoal font-medium"
                                : "border-border bg-surface text-slate-dark hover:border-accent/40"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="customSize"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Custom Size or Specifications{" "}
                        <span className="text-muted font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="customSize"
                        rows={3}
                        value={formData.customSize}
                        onChange={(e) =>
                          updateField("customSize", e.target.value)
                        }
                        placeholder="e.g., 9×12 inches, 25° viewing angle, white SBS board..."
                        className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 bg-warm-white hover:bg-cream text-slate-dark px-6 py-3 text-sm font-medium rounded-sm transition-colors duration-200 cursor-pointer border border-border"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => canProceedStep2 && setStep(3)}
                      disabled={!canProceedStep2}
                      className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors duration-200 cursor-pointer"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact info */}
              {step === 3 && (
                <div className="fade-in">
                  <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2">
                    Your Contact Information
                  </h2>
                  <p className="text-sm text-muted mb-8">
                    Share your details and our sales team will respond within
                    24 hours.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          Full Name <span className="text-error">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            updateField("name", e.target.value)
                          }
                          placeholder="John Smith"
                          className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          Company <span className="text-error">*</span>
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            updateField("company", e.target.value)
                          }
                          placeholder="Your company name"
                          className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          Email <span className="text-error">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateField("email", e.target.value)
                          }
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          Phone{" "}
                          <span className="text-muted font-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            updateField("phone", e.target.value)
                          }
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Additional Details{" "}
                        <span className="text-muted font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          updateField("message", e.target.value)
                        }
                        placeholder="Tell us about your project, timeline, or any specific requirements..."
                        className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-8 p-5 bg-warm-white rounded-sm border border-border">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                      Your Inquiry Summary
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted block">Product</span>
                        <span className="font-medium text-charcoal">
                          {formData.product}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted block">Industry</span>
                        <span className="font-medium text-charcoal">
                          {formData.industry}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted block">Quantity</span>
                        <span className="font-medium text-charcoal">
                          {formData.quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 bg-warm-white hover:bg-cream text-slate-dark px-6 py-3 text-sm font-medium rounded-sm transition-colors duration-200 cursor-pointer border border-border"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3 text-sm font-semibold rounded-sm transition-colors duration-200 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-warm-white rounded-sm border border-border p-6">
                <h3 className="font-serif font-semibold text-charcoal mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4 text-sm">
                  <a
                    href="tel:+19733578111"
                    className="flex items-center gap-3 text-slate-dark hover:text-charcoal transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-accent" />
                    (973) 357-8111
                  </a>
                  <a
                    href="mailto:info@flech.com"
                    className="flex items-center gap-3 text-slate-dark hover:text-charcoal transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-accent" />
                    info@flech.com
                  </a>
                  <div className="flex items-start gap-3 text-slate-dark">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>
                      55 1st Avenue
                      <br />
                      Paterson, NJ 07514
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-dark">
                    <Clock className="w-4 h-4 text-accent" />
                    Mon–Fri: 8am – 5pm EST
                  </div>
                </div>
              </div>

              <div className="bg-charcoal rounded-sm p-6 text-white">
                <Send className="w-8 h-8 text-accent-light mb-4" />
                <h3 className="font-serif font-semibold text-white mb-2">
                  Fast Response
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  All inquiries land directly with our sales team. Expect a
                  detailed response with pricing and specifications within 24
                  hours.
                </p>
              </div>

              <div className="bg-surface rounded-sm border border-border p-6">
                <h3 className="font-serif font-semibold text-charcoal mb-3">
                  What to Expect
                </h3>
                <div className="space-y-3">
                  {[
                    "Quote within 24 hours",
                    "Substrate recommendation",
                    "Sample available on request",
                    "Custom engineering included",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-dark"
                    >
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
