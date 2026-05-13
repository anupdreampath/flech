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
  ArrowRight,
  CheckCircle,
} from "lucide-react";

type SectionContent = Record<string, unknown>;
type PageContent = Record<string, SectionContent>;

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function isHidden(value: unknown) {
  return value === true || value === "true";
}

function parseItems<T extends object>(raw: unknown, fallback: T[] = []): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (typeof raw !== "string") return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export default function ContactClient({ content }: { content: PageContent }) {
  const hero = content.hero || {};
  const form = content.form || {};
  const sidebar = content.sidebar || {};
  const success = content.success || {};
  const productOptions = parseItems<{ label?: string; hidden?: string }>(form.products).filter((item) => !isHidden(item.hidden));
  const industryOptions = parseItems<{ label?: string; hidden?: string }>(form.industries).filter((item) => !isHidden(item.hidden));
  const quantityOptions = parseItems<{ label?: string; hidden?: string }>(form.quantities).filter((item) => !isHidden(item.hidden));
  const expectations = parseItems<{ label?: string; hidden?: string }>(sidebar.expectations).filter((item) => !isHidden(item.hidden));
  const layoutOrder = text(content.__layout?.order)
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);
  const sectionOrder = (key: string) => {
    const ordered = [...layoutOrder.filter((item) => ["hero", "form"].includes(item)), ...["hero", "form"].filter((item) => !layoutOrder.includes(item))];
    return ordered.indexOf(key);
  };
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
          formType: "quote",
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
              {text(success.title, "Inquiry Sent")}
            </h1>
            <p className="text-muted leading-relaxed mb-8">
              {text(
                success.body,
                "Thanks - we've received your inquiry. Our team typically responds within 24 hours with a detailed quote and specification recommendations."
              )}
            </p>
            <Link
              href={text(success.cta_href, "/")}
              className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold text-sm transition-colors cursor-pointer"
            >
              {text(success.cta_label, "Back to Home")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="flex flex-col">
      {!isHidden(hero._hidden) && (
      <section className="bg-charcoal text-white" style={{ order: sectionOrder("hero") }}>
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
            <span className="text-accent-light">{text(hero.breadcrumb, "Contact & RFQ")}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-[1.1] mb-4 text-white">
            {text(hero.title, "Request a Quote")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light">
            {text(hero.subtitle, "Answer a few questions about what you need and we'll send you a detailed quote within 24 hours.")}
          </p>
        </div>
      </section>
      )}

      {/* ═══ FORM + SIDEBAR ═══ */}
      {!isHidden(form._hidden) && (
      <section className="py-16 sm:py-24" style={{ order: sectionOrder("form") }}>
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
                    {text(form.step_1_title, "What product are you interested in?")}
                  </h2>
                  <p className="text-sm text-muted mb-8">
                    {text(form.step_1_body, "Select the product category that best matches your needs.")}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {productOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => updateField("product", text(option.label))}
                        className={`text-left px-5 py-4 rounded-sm border text-sm font-medium transition-colors duration-200 cursor-pointer ${
                          formData.product === option.label
                            ? "border-accent bg-accent/5 text-charcoal"
                            : "border-border bg-surface text-slate-dark hover:border-accent/40"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => canProceedStep1 && setStep(2)}
                    disabled={!canProceedStep1}
                    className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors duration-200 cursor-pointer"
                  >
                    {text(form.continue_label, "Continue")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div className="fade-in">
                  <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2">
                    {text(form.step_2_title, "Tell us about your requirements")}
                  </h2>
                  <p className="text-sm text-muted mb-8">
                    {text(form.step_2_body, "Help us understand your industry and volume so we can provide the most accurate quote.")}
                  </p>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">
                        {text(form.industry_label, "Your Industry")}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {industryOptions.map((option) => (
                          <button
                            key={option.label}
                            onClick={() =>
                              updateField("industry", text(option.label))
                            }
                            className={`text-left px-5 py-3.5 rounded-sm border text-sm transition-colors duration-200 cursor-pointer ${
                              formData.industry === option.label
                                ? "border-accent bg-accent/5 text-charcoal font-medium"
                                : "border-border bg-surface text-slate-dark hover:border-accent/40"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">
                        {text(form.quantity_label, "Estimated Quantity")}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {quantityOptions.map((option) => (
                          <button
                            key={option.label}
                            onClick={() =>
                              updateField("quantity", text(option.label))
                            }
                            className={`text-left px-5 py-3.5 rounded-sm border text-sm transition-colors duration-200 cursor-pointer ${
                              formData.quantity === option.label
                                ? "border-accent bg-accent/5 text-charcoal font-medium"
                                : "border-border bg-surface text-slate-dark hover:border-accent/40"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="customSize"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        {text(form.custom_size_label, "Any size, spec, or deadline notes?")}{" "}
                        <span className="text-muted font-normal">
                          {text(form.custom_size_optional_label, "(optional)")}
                        </span>
                      </label>
                      <textarea
                        id="customSize"
                        rows={3}
                        value={formData.customSize}
                        onChange={(e) =>
                          updateField("customSize", e.target.value)
                        }
                        placeholder={text(
                          form.custom_size_placeholder,
                          "e.g., 9x12 inches, 25 degree viewing angle, white SBS board..."
                        )}
                        className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 bg-warm-white hover:bg-cream text-slate-dark px-6 py-3 text-sm font-medium rounded-sm transition-colors duration-200 cursor-pointer border border-border"
                    >
                      {text(form.back_label, "Back")}
                    </button>
                    <button
                      onClick={() => canProceedStep2 && setStep(3)}
                      disabled={!canProceedStep2}
                      className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors duration-200 cursor-pointer"
                    >
                      {text(form.continue_label, "Continue")}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact info */}
              {step === 3 && (
                <div className="fade-in">
                  <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2">
                    {text(form.step_3_title, "How can we reach you?")}
                  </h2>
                  <p className="text-sm text-muted mb-8">
                    {text(form.step_3_body, "Share your contact details and anything else we should know.")}
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          {text(form.name_label, "Full Name")}{" "}
                          <span className="text-error">{text(form.required_marker, "*")}</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            updateField("name", e.target.value)
                          }
                          placeholder={text(form.name_placeholder, "John Smith")}
                          className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          {text(form.company_label, "Company")}{" "}
                          <span className="text-error">{text(form.required_marker, "*")}</span>
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            updateField("company", e.target.value)
                          }
                          placeholder={text(form.company_placeholder, "Your company name")}
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
                          {text(form.email_label, "Email")}{" "}
                          <span className="text-error">{text(form.required_marker, "*")}</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            updateField("email", e.target.value)
                          }
                          placeholder={text(form.email_placeholder, "john@company.com")}
                          className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          {text(form.phone_label, "Phone")}{" "}
                          <span className="text-muted font-normal">
                            {text(form.phone_optional_label, "(optional)")}
                          </span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            updateField("phone", e.target.value)
                          }
                          placeholder={text(form.phone_placeholder, "(555) 123-4567")}
                          className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        {text(form.message_label, "Additional Details")}{" "}
                        <span className="text-muted font-normal">
                          {text(form.message_optional_label, "(optional)")}
                        </span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          updateField("message", e.target.value)
                        }
                        placeholder={text(
                          form.message_placeholder,
                          "Tell us about your project, timeline, or any specific requirements..."
                        )}
                        className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-surface text-charcoal placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-8 p-5 bg-warm-white rounded-sm border border-border">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                      {text(form.summary_title, "Your Inquiry Summary")}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted block">
                          {text(form.summary_product_label, "Product")}
                        </span>
                        <span className="font-medium text-charcoal">
                          {formData.product}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted block">
                          {text(form.summary_industry_label, "Industry")}
                        </span>
                        <span className="font-medium text-charcoal">
                          {formData.industry}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted block">
                          {text(form.summary_quantity_label, "Quantity")}
                        </span>
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
                      {text(form.back_label, "Back")}
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3 text-sm font-semibold rounded-sm transition-colors duration-200 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      {text(form.submit_label, "Send Inquiry")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {!isHidden(sidebar._hidden) && (
              <div className="bg-warm-white rounded-sm border border-border p-6">
                <h3 className="font-serif font-semibold text-charcoal mb-4">
                  {text(sidebar.title, "Contact Information")}
                </h3>
                {text(sidebar.body) && (
                  <p className="text-sm text-muted leading-relaxed mb-5">{text(sidebar.body)}</p>
                )}
                <div className="space-y-4 text-sm">
                  <a
                    href={`tel:${text(sidebar.phone, "(973) 357-8111").replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-3 text-slate-dark hover:text-charcoal transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-accent" />
                    {text(sidebar.phone, "(973) 357-8111")}
                  </a>
                  <a
                    href={`mailto:${text(sidebar.email, "info@flech.com")}`}
                    className="flex items-center gap-3 text-slate-dark hover:text-charcoal transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-accent" />
                    {text(sidebar.email, "info@flech.com")}
                  </a>
                  <div className="flex items-start gap-3 text-slate-dark">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>
                      {text(sidebar.address, "Paterson, NJ\nUnited States").split("\n").map((line, index) => (
                        <span key={`${line}-${index}`}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-dark">
                    <Clock className="w-4 h-4 text-accent" />
                    {text(sidebar.hours, "Mon-Fri, 8:00am - 5:00pm ET")}
                  </div>
                </div>
              </div>
              )}

              {!isHidden(sidebar._hidden) && (
              <div className="bg-charcoal rounded-sm p-6 text-white">
                <Send className="w-8 h-8 text-accent-light mb-4" />
                <h3 className="font-serif font-semibold text-white mb-2">
                  Fast Response
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {text(sidebar.body, "All inquiries land directly with our sales team. Expect a detailed response with pricing and specifications within 24 hours.")}
                </p>
              </div>
              )}

              {!isHidden(sidebar._hidden) && expectations.length > 0 && (
              <div className="bg-surface rounded-sm border border-border p-6">
                <h3 className="font-serif font-semibold text-charcoal mb-3">
                  What to Expect
                </h3>
                <div className="space-y-3">
                  {expectations.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 text-sm text-slate-dark"
                    >
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
