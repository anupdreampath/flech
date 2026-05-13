import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { EditModeBridge } from "@/components/EditModeBridge";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { CmsEditOverlay } from "@/components/admin/CmsEditOverlay";
import { getContent, getRepeaterItems } from "@/lib/cms";
import type { NavLink, ProductLink } from "@/components/Navbar";
import type { FooterLink } from "@/components/Footer";
import { Suspense } from "react";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://flech.com";

const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flech Paper Products | Precision Board Manufacturing Since 1999",
    template: "%s | Flech Paper Products",
  },
  description:
    "Flech Paper Products - specialists in easel backs, matboard, framing backs, and specialty board manufacturing. Serving sign & display, framing, and packaging industries for 25+ years from Paterson, NJ.",
  applicationName: "Flech Paper Products",
  generator: "Next.js",
  keywords: [
    "easel backs",
    "matboard manufacturer",
    "framing backs",
    "fold lines",
    "SBS board",
    "display board",
    "paper products manufacturer",
    "B2B paper products",
    "Paterson NJ manufacturer",
    "custom matboard",
  ],
  authors: [{ name: "Flech Paper Products", url: SITE_URL }],
  creator: "Flech Paper Products",
  publisher: "Flech Paper Products",
  category: "Manufacturing",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Flech Paper Products",
    title: "Flech Paper Products | Precision Board Manufacturing Since 1999",
    description:
      "Specialists in easel backs, matboards, framing backs and fold-line dielines for the framing, sign, packaging, and display industries.",
    images: [
      {
        url: "/images/brand/flech-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Flech Paper Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flech Paper Products",
    description:
      "Precision board manufacturing for the framing, sign, packaging, and display industries since 1999.",
    images: ["/images/brand/flech-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const branding = await getContent<Record<string, string>>("global", "branding", {
    company: "Flech Paper Products",
    tagline: "Precision Board Manufacturing - Paterson, NJ since 1999",
    logo_url: "/images/brand/flech-logo.jpg",
    logo_alt: "Flech Paper Products",
    favicon_url: "/favicon.ico",
    footer_description: "",
  });
  const faviconUrl = branding.favicon_url || "/favicon.ico";
  const logoUrl = branding.logo_url || "/images/brand/flech-logo.jpg";

  return {
    ...defaultMetadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: branding.logo_alt || "Flech Paper Products",
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      images: [logoUrl],
    },
    icons: {
      icon: [{ url: faviconUrl }],
      shortcut: [faviconUrl],
    },
  };
}

export const viewport = {
  themeColor: "#1A1A2E",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [
    analytics,
    branding,
    headerMeta,
    headerProductsMeta,
    contactInfo,
    footerMeta,
    headerLinks,
    headerProducts,
    footerProducts,
    footerCompany,
    footerIndustries,
    footerLegal,
  ] = await Promise.all([
    getContent<{
      ga_id: string;
      gtm_id: string;
      fb_pixel_id: string;
      extra_head_html: string;
    }>("global", "analytics", {
      ga_id: "",
      gtm_id: "",
      fb_pixel_id: "",
      extra_head_html: "",
    }),
    getContent<Record<string, string>>("global", "branding", {
      company: "Flech Paper Products",
      tagline: "Precision Board Manufacturing - Paterson, NJ since 1999",
      logo_url: "/images/brand/flech-logo.jpg",
      logo_alt: "Flech Paper Products",
      favicon_url: "/favicon.ico",
      footer_description:
        "Precision board manufacturing since 1999. Specialists in easel backs, matboard, and specialty board products for the framing, sign, and display industries.",
    }),
    getContent<Record<string, string>>("global", "header_menu", {
      cta_label: "Request a Quote",
      cta_href: "/contact",
      topbar_blurb: "Precision Board Manufacturing - Paterson, NJ since 1999",
      topbar_phone: "(973) 357-8111",
      topbar_phone_href: "tel:+19733578111",
      topbar_email: "info@flech.com",
      topbar_email_href: "mailto:info@flech.com",
    }),
    getContent<Record<string, string>>("global", "header_products", {
      flagship_label: "View Our Flagship: Easel Backs",
      flagship_href: "/products/easel-backs",
    }),
    getContent<Record<string, string>>("global", "contact_info", {
      phone: "(973) 357-8111",
      phone_href: "tel:+19733578111",
      email: "info@flech.com",
      email_href: "mailto:info@flech.com",
      address_line1: "Paterson, NJ",
      address_line2: "United States",
    }),
    getContent<Record<string, string>>("global", "footer", {
      copyright: "",
    }),
    getRepeaterItems<NavLink>("global", "header_menu", "items"),
    getRepeaterItems<ProductLink>("global", "header_products", "items"),
    getRepeaterItems<FooterLink>("global", "footer_products", "items"),
    getRepeaterItems<FooterLink>("global", "footer_company", "items"),
    getRepeaterItems<FooterLink>("global", "footer_industries", "items"),
    getRepeaterItems<FooterLink>("global", "footer_legal", "items"),
  ]);

  const navbarProps = {
    navLinks: headerLinks,
    productLinks: headerProducts,
    ctaLabel: headerMeta.cta_hidden === "true" ? "" : headerMeta.cta_label || "Request a Quote",
    ctaHref: headerMeta.cta_hidden === "true" ? "" : headerMeta.cta_href || "/contact",
    topbar: {
      blurb: headerMeta.topbar_blurb || "",
      phone: headerMeta.topbar_phone || "",
      phoneHref: headerMeta.topbar_phone_href || "",
      email: headerMeta.topbar_email || "",
      emailHref: headerMeta.topbar_email_href || "",
    },
    flagshipLabel: headerProductsMeta.flagship_label || "",
    flagshipHref: headerProductsMeta.flagship_href || "",
    logoUrl: branding.logo_url || "/images/brand/flech-logo.jpg",
    logoAlt: branding.logo_alt || "Flech Paper Products",
  };

  const footerProps = {
    productLinks: footerProducts,
    companyLinks: footerCompany,
    industryLinks: footerIndustries,
    legalLinks: footerLegal,
    contact: {
      phone: contactInfo.phone || "",
      phoneHref: contactInfo.phone_href || "",
      email: contactInfo.email || "",
      emailHref: contactInfo.email_href || "",
      addressLine1: contactInfo.address_line1 || "",
      addressLine2: contactInfo.address_line2 || "",
    },
    copyright: footerMeta.copyright || undefined,
    ctaLabel: headerMeta.cta_hidden === "true" ? "" : headerMeta.cta_label || "Request a Quote",
    ctaHref: headerMeta.cta_hidden === "true" ? "" : headerMeta.cta_href || "/contact",
    logoUrl: branding.logo_url || "/images/brand/flech-logo.jpg",
    logoAlt: branding.logo_alt || "Flech Paper Products",
    description: branding.footer_description || "",
  };
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flech Paper Products",
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/flech-logo.jpg`,
    description:
      "Precision board manufacturing — easel backs, matboards, framing backs, and fold-line dielines.",
    foundingDate: "1999",
    address: {
      "@type": "PostalAddress",
      streetAddress: "55 1st Avenue",
      addressLocality: "Paterson",
      addressRegion: "NJ",
      postalCode: "07514",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-973-357-8111",
        contactType: "sales",
        email: "info@flech.com",
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link key="preconnect-gumlet" rel="preconnect" href="https://video.gumlet.io" crossOrigin="" />
        <link key="dns-imagekit" rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link key="dns-cloudinary" rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          key="organization-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-paper-white text-foreground font-sans antialiased">
        <Suspense fallback={null}>
          <AnalyticsScripts
            gaId={analytics.ga_id}
            gtmId={analytics.gtm_id}
            fbPixelId={analytics.fb_pixel_id}
            extraHeadHtml={analytics.extra_head_html}
          />
        </Suspense>
        <SiteChrome navbar={navbarProps} footer={footerProps}>
          {children}
        </SiteChrome>
        <Suspense fallback={null}>
          <AnalyticsTracker />
          <EditModeBridge />
          <CmsEditOverlay />
        </Suspense>
      </body>
    </html>
  );
}
