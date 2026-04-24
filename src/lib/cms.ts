import { createServerClient } from "@/lib/supabase/server";

export type ContentMap = Record<string, unknown>;

export async function getContent<T extends ContentMap>(
  page: string,
  sectionKey: string,
  defaults: T
): Promise<T> {
  try {
    const sb = createServerClient();
    const { data } = await sb
      .from("site_content")
      .select("content")
      .eq("page", page)
      .eq("section_key", sectionKey)
      .maybeSingle();
    if (!data?.content) return defaults;
    return { ...defaults, ...(data.content as T) };
  } catch {
    return defaults;
  }
}

export async function getAllContent(page: string) {
  const sb = createServerClient();
  const { data } = await sb
    .from("site_content")
    .select("section_key,content,updated_at")
    .eq("page", page);
  return data || [];
}

export type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "url" | "video";
  default?: string;
  helper?: string;
};

// Registry: pages and editable sections. Defaults here mirror the live rendered copy
// so the admin editor always opens with current content pre-filled for editing.
export const CMS_SCHEMA: Record<
  string,
  { label: string; sections: Record<string, { label: string; fields: Field[] }> }
> = {
  home: {
    label: "Home",
    sections: {
      hero: {
        label: "Hero Section",
        fields: [
          {
            key: "badge",
            label: "Badge Text",
            type: "text",
            default: "Family-Owned Manufacturer, Paterson, NJ Since 1999",
          },
          {
            key: "title_top",
            label: "Title (top line)",
            type: "text",
            default: "The Backbone of",
          },
          {
            key: "title_bottom",
            label: "Title (bottom line)",
            type: "text",
            default: "Every Great Display",
          },
          {
            key: "subtitle",
            label: "Subtitle",
            type: "textarea",
            default:
              "From the easel back that holds your frame upright to the matboard that frames your art, Flech manufactures the precision board products that the framing, sign, and display industries depend on.",
          },
          {
            key: "cta_primary",
            label: "Primary CTA Label",
            type: "text",
            default: "Request a Quote",
          },
          {
            key: "cta_secondary",
            label: "Secondary CTA Label",
            type: "text",
            default: "Watch Process",
          },
          {
            key: "video_url",
            label: "Background Video (MP4)",
            type: "video",
            default: "/videos/manufacturing-process.mp4",
            helper:
              "This is the looping video shown in the hero. Paste an MP4 URL or upload a new clip.",
          },
          {
            key: "poster_url",
            label: "Video Thumbnail (poster)",
            type: "image",
            default: "/images/home/warehouse-boards.jpg",
            helper:
              "Still frame shown before the video loads, or if the video can't be played. Not visible while the video is playing.",
          },
        ],
      },
      products_heading: {
        label: "Products Heading",
        fields: [
          {
            key: "eyebrow",
            label: "Eyebrow",
            type: "text",
            default: "Our Product Lines",
          },
          {
            key: "title",
            label: "Title",
            type: "text",
            default: "Four Pillars of Precision",
          },
        ],
      },
      why_heading: {
        label: "Why Flech Heading",
        fields: [
          {
            key: "eyebrow",
            label: "Eyebrow",
            type: "text",
            default: "Why Flech",
          },
          {
            key: "title",
            label: "Title",
            type: "text",
            default: "Built Different, Not Just Better",
          },
          {
            key: "subtitle",
            label: "Subtitle",
            type: "textarea",
            default:
              "Anyone can cut board. The difference is precision, material science, and 25 years of knowing what works.",
          },
        ],
      },
      stats: {
        label: "Stats Bar (4 items)",
        fields: [
          { key: "stat_1_value", label: "Stat 1 · Value", type: "text", default: "25+" },
          { key: "stat_1_label", label: "Stat 1 · Label", type: "text", default: "Years Manufacturing" },
          { key: "stat_2_value", label: "Stat 2 · Value", type: "text", default: "1000+" },
          { key: "stat_2_label", label: "Stat 2 · Label", type: "text", default: "Custom Orders / Year" },
          { key: "stat_3_value", label: "Stat 3 · Value", type: "text", default: "600+" },
          { key: "stat_3_label", label: "Stat 3 · Label", type: "text", default: "B2B Clients Served" },
          { key: "stat_4_value", label: "Stat 4 · Value", type: "text", default: "100%" },
          { key: "stat_4_label", label: "Stat 4 · Label", type: "text", default: "Made in USA" },
        ],
      },
      products_list: {
        label: "Products (4 cards)",
        fields: [
          { key: "p1_name", label: "Card 1 · Name", type: "text", default: "Easel Backs" },
          { key: "p1_tagline", label: "Card 1 · Tagline", type: "text", default: "Our Flagship Product" },
          { key: "p1_description", label: "Card 1 · Description", type: "textarea", default: "Single-wing and double-wing display stands with self-stick adhesive for frames, signs, and POP displays." },
          { key: "p1_href", label: "Card 1 · Link", type: "text", default: "/products/easel-backs" },
          { key: "p1_image", label: "Card 1 · Image", type: "image", default: "/images/products/easel-back.png" },
          { key: "p2_name", label: "Card 2 · Name", type: "text", default: "Fold Lines & Dielines" },
          { key: "p2_tagline", label: "Card 2 · Tagline", type: "text", default: "Precision Hinges" },
          { key: "p2_description", label: "Card 2 · Description", type: "textarea", default: "Pre-creased score lines that bend accurately without cracking. The foundation of every reliable display." },
          { key: "p2_href", label: "Card 2 · Link", type: "text", default: "/products/fold-lines" },
          { key: "p2_image", label: "Card 2 · Image", type: "image", default: "/images/products/board-closeup-1.png" },
          { key: "p3_name", label: "Card 3 · Name", type: "text", default: "Contract Framing Backs" },
          { key: "p3_tagline", label: "Card 3 · Tagline", type: "text", default: "Protection & Support" },
          { key: "p3_description", label: "Card 3 · Description", type: "textarea", default: "High-volume standardized backing boards for commercial framing operations. Consistent quality, every sheet." },
          { key: "p3_href", label: "Card 3 · Link", type: "text", default: "/products/framing-backs" },
          { key: "p3_image", label: "Card 3 · Image", type: "image", default: "/images/framing/frame-samples.jpg" },
          { key: "p4_name", label: "Card 4 · Name", type: "text", default: "Matboards" },
          { key: "p4_tagline", label: "Card 4 · Tagline", type: "text", default: "Decorative & Archival" },
          { key: "p4_description", label: "Card 4 · Description", type: "textarea", default: "Bevel-cut decorative borders in acid-free, archival quality. 50+ colors with white, cream, or black core." },
          { key: "p4_href", label: "Card 4 · Link", type: "text", default: "/products/matboards" },
          { key: "p4_image", label: "Card 4 · Image", type: "image", default: "/images/products/matboard-colors-1.png" },
          { key: "view_all_label", label: "View All Button Label", type: "text", default: "View all products" },
          { key: "view_all_href", label: "View All Link", type: "text", default: "/products/easel-backs" },
        ],
      },
      differentiators: {
        label: "Why Flech · Cards (6)",
        fields: [
          { key: "d1_title", label: "Card 1 · Title", type: "text", default: "Precision Manufacturing" },
          { key: "d1_description", label: "Card 1 · Description", type: "textarea", default: "CNC equipment ensures ±0.005\" tolerances. Consistency from piece #1 to piece #50,000." },
          { key: "d1_image", label: "Card 1 · Image", type: "image", default: "/images/products/board-closeup-2.jpg" },
          { key: "d2_title", label: "Card 2 · Title", type: "text", default: "Material Expertise" },
          { key: "d2_description", label: "Card 2 · Description", type: "textarea", default: "25 years working with SBS, pulp, chip, and poly boards. We know which substrate works for your job." },
          { key: "d2_image", label: "Card 2 · Image", type: "image", default: "/images/products/tuff-white-1.jpg" },
          { key: "d3_title", label: "Card 3 · Title", type: "text", default: "Vertically Integrated" },
          { key: "d3_description", label: "Card 3 · Description", type: "textarea", default: "Die-cutting, laminating, scoring, finishing, all under one roof in Paterson, NJ. No middlemen." },
          { key: "d3_image", label: "Card 3 · Image", type: "image", default: "/images/home/warehouse-boards.jpg" },
          { key: "d4_title", label: "Card 4 · Title", type: "text", default: "Custom Is Standard" },
          { key: "d4_description", label: "Card 4 · Description", type: "textarea", default: "Custom sizes, angles, adhesives. We don't charge extra for thinking. We engineer solutions." },
          { key: "d4_image", label: "Card 4 · Image", type: "image", default: "/images/products/tuff-gloss.png" },
          { key: "d5_title", label: "Card 5 · Title", type: "text", default: "Reliable Fulfillment" },
          { key: "d5_description", label: "Card 5 · Description", type: "textarea", default: "Drop-shipping, just-in-time delivery, and inventory programs. When you commit, we commit." },
          { key: "d5_image", label: "Card 5 · Image", type: "image", default: "/images/products/board-stack.jpg" },
          { key: "d6_title", label: "Card 6 · Title", type: "text", default: "Industry Knowledge" },
          { key: "d6_description", label: "Card 6 · Description", type: "textarea", default: "We serve sign, display, framing, POP, and packaging professionals. We've solved your constraints before." },
          { key: "d6_image", label: "Card 6 · Image", type: "image", default: "/images/framing/frame-collection.jpg" },
        ],
      },
      industries_heading: {
        label: "Industries Preview · Heading",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Industries We Serve" },
          { key: "title", label: "Title", type: "text", default: "Your Industry, Our Expertise" },
        ],
      },
      industries_preview: {
        label: "Industries Preview (4 cards)",
        fields: [
          { key: "i1_name", label: "Card 1 · Name", type: "text", default: "Sign & Display" },
          { key: "i1_description", label: "Card 1 · Description", type: "textarea", default: "Easel backs and display boards for retail, trade shows, and POP." },
          { key: "i1_image", label: "Card 1 · Image", type: "image", default: "/images/products/consumer-display.jpg" },
          { key: "i2_name", label: "Card 2 · Name", type: "text", default: "Wholesale Framing" },
          { key: "i2_description", label: "Card 2 · Description", type: "textarea", default: "Matboards, framing backs, and easel stands for commercial operations." },
          { key: "i2_image", label: "Card 2 · Image", type: "image", default: "/images/framing/frame-print.png" },
          { key: "i3_name", label: "Card 3 · Name", type: "text", default: "Packaging & POP" },
          { key: "i3_description", label: "Card 3 · Description", type: "textarea", default: "Custom die-cut boards for product packaging and retail displays." },
          { key: "i3_image", label: "Card 3 · Image", type: "image", default: "/images/products/poly-tuff.jpg" },
          { key: "i4_name", label: "Card 4 · Name", type: "text", default: "Interior Design" },
          { key: "i4_description", label: "Card 4 · Description", type: "textarea", default: "Archival matboards and specialty boards for gallery installations." },
          { key: "i4_image", label: "Card 4 · Image", type: "image", default: "/images/products/diy-art.jpg" },
        ],
      },
      how_we_work_heading: {
        label: "How We Work · Heading",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "How We Work" },
          { key: "title", label: "Title", type: "text", default: "From Spec to Shipment" },
        ],
      },
      how_we_work_steps: {
        label: "How We Work · Steps (4)",
        fields: [
          { key: "s1_title", label: "Step 1 · Title", type: "text", default: "Consult" },
          { key: "s1_description", label: "Step 1 · Description", type: "textarea", default: "Tell us what you need. Upload dielines or artwork if you have them." },
          { key: "s2_title", label: "Step 2 · Title", type: "text", default: "Engineer" },
          { key: "s2_description", label: "Step 2 · Description", type: "textarea", default: "We recommend substrate, adhesive, and finishing for your application." },
          { key: "s3_title", label: "Step 3 · Title", type: "text", default: "Manufacture" },
          { key: "s3_description", label: "Step 3 · Description", type: "textarea", default: "CNC die-cutting, scoring, laminating, quality inspected at every stage." },
          { key: "s4_title", label: "Step 4 · Title", type: "text", default: "Deliver" },
          { key: "s4_description", label: "Step 4 · Description", type: "textarea", default: "On-time to your door or direct to your client. Drop-shipping available." },
        ],
      },
      testimonials_heading: {
        label: "Testimonials · Heading",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Client Stories" },
          { key: "title", label: "Title", type: "text", default: "Trusted by Industry Leaders" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "600+ B2B partners rely on Flech for precision manufacturing. Here's what they say." },
        ],
      },
      testimonials: {
        label: "Testimonials (4)",
        fields: [
          { key: "t1_quote", label: "T1 · Quote", type: "textarea", default: "Flech has been our go-to for easel backs for over a decade. The consistency in quality and the ability to get custom sizes without minimums is unmatched in the industry." },
          { key: "t1_author", label: "T1 · Author", type: "text", default: "Marcus Chen" },
          { key: "t1_role", label: "T1 · Role", type: "text", default: "Operations Director, FrameCraft Wholesale" },
          { key: "t2_quote", label: "T2 · Quote", type: "textarea", default: "We switched to Flech for all our matboard needs and saw an immediate 15% reduction in waste. Their precision cutting is exactly what high-volume operations need." },
          { key: "t2_author", label: "T2 · Author", type: "text", default: "Sarah Williams" },
          { key: "t2_role", label: "T2 · Role", type: "text", default: "Production Manager, Gallery Direct" },
          { key: "t3_quote", label: "T3 · Quote", type: "textarea", default: "The custom die-line engineering saved us weeks on our last POP display rollout. Flech doesn't just manufacture—they solve problems." },
          { key: "t3_author", label: "T3 · Author", type: "text", default: "David Park" },
          { key: "t3_role", label: "T3 · Role", type: "text", default: "Creative Director, Retail Concepts Inc" },
          { key: "t4_quote", label: "T4 · Quote", type: "textarea", default: "Fast turnaround, competitive pricing, and the rare ability to handle both small custom runs and bulk orders with equal precision. A true manufacturing partner." },
          { key: "t4_author", label: "T4 · Author", type: "text", default: "Jennifer Torres" },
          { key: "t4_role", label: "T4 · Role", type: "text", default: "Procurement Lead, SignMax Solutions" },
        ],
      },
      cta: {
        label: "Final CTA",
        fields: [
          {
            key: "eyebrow",
            label: "Eyebrow",
            type: "text",
            default: "Get Started",
          },
          {
            key: "title",
            label: "Title",
            type: "text",
            default: "Ready to Build Something?",
          },
          {
            key: "body",
            label: "Body copy",
            type: "textarea",
            default:
              "Whether you need 100 easel backs or 100,000, tell us what you need and we'll have a quote to you within 24 hours.",
          },
          {
            key: "primary_label",
            label: "Primary Button Label",
            type: "text",
            default: "Request a Quote",
          },
          {
            key: "secondary_label",
            label: "Secondary Button Label",
            type: "text",
            default: "Request Samples",
          },
          {
            key: "primary_href",
            label: "Primary Button Link",
            type: "text",
            default: "/contact",
          },
          {
            key: "secondary_href",
            label: "Secondary Button Link",
            type: "text",
            default: "/contact",
          },
        ],
      },
    },
  },
  contact: {
    label: "Contact",
    sections: {
      hero: {
        label: "Header",
        fields: [
          {
            key: "title",
            label: "Title",
            type: "text",
            default: "Let's Build Something Together",
          },
          {
            key: "subtitle",
            label: "Subtitle",
            type: "textarea",
            default:
              "Tell us about your project. We'll have a detailed quote and spec sheet back to you within 24 hours.",
          },
        ],
      },
      sidebar: {
        label: "Sidebar Contact Info",
        fields: [
          {
            key: "phone",
            label: "Phone",
            type: "text",
            default: "(973) 357-8111",
          },
          {
            key: "email",
            label: "Email",
            type: "text",
            default: "info@flech.com",
          },
          {
            key: "address",
            label: "Address",
            type: "textarea",
            default: "Paterson, NJ\nUnited States",
          },
          {
            key: "hours",
            label: "Hours",
            type: "text",
            default: "Mon–Fri, 8:00am – 5:00pm ET",
          },
          {
            key: "whatsapp",
            label: "WhatsApp Number (digits only)",
            type: "text",
            default: "19733578111",
          },
        ],
      },
    },
  },
  about: {
    label: "About",
    sections: {
      hero: {
        label: "Hero Section",
        fields: [
          { key: "breadcrumb", label: "Breadcrumb Label", type: "text", default: "About" },
          { key: "title_top", label: "Title (top line)", type: "text", default: "25 Years of Knowing" },
          { key: "title_bottom", label: "Title (bottom line)", type: "text", default: "What Works" },
          { key: "poster_url", label: "Hero Background Image", type: "image", default: "/images/home/warehouse-boards.jpg" },
        ],
      },
      stats: {
        label: "Stats Bar (4 items)",
        fields: [
          { key: "stat_1_value", label: "Stat 1 · Value", type: "text", default: "25+" },
          { key: "stat_1_label", label: "Stat 1 · Label", type: "text", default: "Years Manufacturing" },
          { key: "stat_2_value", label: "Stat 2 · Value", type: "text", default: "600+" },
          { key: "stat_2_label", label: "Stat 2 · Label", type: "text", default: "B2B Clients" },
          { key: "stat_3_value", label: "Stat 3 · Value", type: "text", default: "4" },
          { key: "stat_3_label", label: "Stat 3 · Label", type: "text", default: "Product Lines" },
          { key: "stat_4_value", label: "Stat 4 · Value", type: "text", default: "100%" },
          { key: "stat_4_label", label: "Stat 4 · Label", type: "text", default: "Made in USA" },
        ],
      },
      story: {
        label: "Our Story",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Story" },
          { key: "title", label: "Title", type: "text", default: "From Local Converter to National Manufacturer" },
          { key: "paragraph_1", label: "Paragraph 1", type: "textarea", default: "Flech Paper Products started as a small specialty board converting operation in Paterson, New Jersey, a city with deep roots in American manufacturing." },
          { key: "paragraph_2", label: "Paragraph 2", type: "textarea", default: "Over 25 years, we grew by doing one thing well: manufacturing precision board products that work exactly as specified, every single time." },
          { key: "paragraph_3", label: "Paragraph 3", type: "textarea", default: "Today, we serve sign & display manufacturers, wholesale framers, POP designers, and commercial printers across the United States with four core product lines." },
          { key: "image_1", label: "Image 1", type: "image", default: "/images/home/stacked-boards.jpg" },
          { key: "image_2", label: "Image 2", type: "image", default: "/images/products/matboard-display.jpg" },
        ],
      },
      values: {
        label: "What Drives Us (4 values)",
        fields: [
          { key: "heading", label: "Section Heading", type: "text", default: "What Drives Us" },
          { key: "v1_title", label: "Value 1 · Title", type: "text", default: "Precision First" },
          { key: "v1_desc", label: "Value 1 · Description", type: "textarea", default: "Every measurement, cut, and fold line held to tolerances that matter." },
          { key: "v2_title", label: "Value 2 · Title", type: "text", default: "Quality Without Shortcuts" },
          { key: "v2_desc", label: "Value 2 · Description", type: "textarea", default: "Right substrate for each application, not the cheapest one." },
          { key: "v3_title", label: "Value 3 · Title", type: "text", default: "Partnership, Not Transactions" },
          { key: "v3_desc", label: "Value 3 · Description", type: "textarea", default: "We learn our clients' businesses to anticipate their needs." },
          { key: "v4_title", label: "Value 4 · Title", type: "text", default: "Responsible Manufacturing" },
          { key: "v4_desc", label: "Value 4 · Description", type: "textarea", default: "FSC certified, responsible sourcing, acid-free archival products." },
        ],
      },
      timeline_heading: {
        label: "Timeline · Heading",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Milestones" },
          { key: "title", label: "Title", type: "text", default: "Our Journey" },
        ],
      },
      timeline: {
        label: "Timeline (6 milestones)",
        fields: [
          { key: "m1_year", label: "Milestone 1 · Year", type: "text", default: "1999" },
          { key: "m1_title", label: "Milestone 1 · Title", type: "text", default: "Founded in Paterson, NJ" },
          { key: "m1_desc", label: "Milestone 1 · Description", type: "textarea", default: "Flech opens as a specialty board converter, serving local framing and sign shops." },
          { key: "m2_year", label: "Milestone 2 · Year", type: "text", default: "2004" },
          { key: "m2_title", label: "Milestone 2 · Title", type: "text", default: "CNC Equipment Investment" },
          { key: "m2_desc", label: "Milestone 2 · Description", type: "textarea", default: "Major upgrade to CNC die-cutting and scoring, precision tolerances and high-volume capability." },
          { key: "m3_year", label: "Milestone 3 · Year", type: "text", default: "2010" },
          { key: "m3_title", label: "Milestone 3 · Title", type: "text", default: "National Distribution" },
          { key: "m3_desc", label: "Milestone 3 · Description", type: "textarea", default: "Expanded to serve sign & display, framing, and packaging clients across the United States." },
          { key: "m4_year", label: "Milestone 4 · Year", type: "text", default: "2015" },
          { key: "m4_title", label: "Milestone 4 · Title", type: "text", default: "Custom Converting Division" },
          { key: "m4_desc", label: "Milestone 4 · Description", type: "textarea", default: "Dedicated custom converting, laminating, die-cutting, and specialty finishing under one roof." },
          { key: "m5_year", label: "Milestone 5 · Year", type: "text", default: "2020" },
          { key: "m5_title", label: "Milestone 5 · Title", type: "text", default: "Archival Product Line" },
          { key: "m5_desc", label: "Milestone 5 · Description", type: "textarea", default: "Acid-free, archival-quality matboards and framing backs for museum-grade preservation." },
          { key: "m6_year", label: "Milestone 6 · Year", type: "text", default: "Today" },
          { key: "m6_title", label: "Milestone 6 · Title", type: "text", default: "25+ Years of Precision" },
          { key: "m6_desc", label: "Milestone 6 · Description", type: "textarea", default: "Four core product lines, 600+ B2B clients, same commitment to quality that started it all." },
        ],
      },
      founder: {
        label: "Founder Note",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "A Note From Our Founder" },
          { key: "name", label: "Founder Name", type: "text", default: "Joseph Kandel" },
          { key: "quote", label: "Quote", type: "textarea", default: "After over 40 years in the paperboard industry, I decided to start my own company that could offer customers the benefits of BOTH: the competitive pricing of larger suppliers with the unbeatable service of smaller ones." },
          { key: "body", label: "Body copy", type: "textarea", default: "Many customers have responded to this philosophy by making Flech a trusted partner, some even call us their \"secret weapon.\" We would welcome the chance to prove to you that Flech could be your secret weapon too." },
          { key: "image", label: "Founder Image", type: "image", default: "/images/brand/flech-product-box.jpg" },
        ],
      },
      cta: {
        label: "Final CTA",
        fields: [
          { key: "title", label: "Title", type: "text", default: "Let's Build Something Together" },
          { key: "body", label: "Body", type: "textarea", default: "25 years of precision. 600+ satisfied B2B clients. Your project is next." },
          { key: "cta_label", label: "Button Label", type: "text", default: "Request a Quote" },
          { key: "cta_href", label: "Button Link", type: "text", default: "/contact" },
          { key: "bg_image", label: "Background Image", type: "image", default: "/images/framing/frame-samples.jpg" },
        ],
      },
    },
  },
  industries: {
    label: "Industries",
    sections: {
      hero: {
        label: "Hero Section",
        fields: [
          {
            key: "breadcrumb",
            label: "Breadcrumb Label",
            type: "text",
            default: "Industries",
          },
          {
            key: "title_top",
            label: "Title (top line)",
            type: "text",
            default: "Your Industry,",
          },
          {
            key: "title_bottom",
            label: "Title (bottom line)",
            type: "text",
            default: "Our Expertise",
          },
          {
            key: "poster_url",
            label: "Hero Background Image",
            type: "image",
            default: "/images/framing/frame-print.png",
          },
        ],
      },
    },
  },
  product_easel: {
    label: "Product · Easel Backs",
    sections: {
      hero: {
        label: "Hero Section",
        fields: [
          {
            key: "badge",
            label: "Badge Text",
            type: "text",
            default: "Flagship Product",
          },
          {
            key: "title",
            label: "Title",
            type: "text",
            default: "Easel Backs",
          },
          {
            key: "subtitle",
            label: "Subtitle",
            type: "textarea",
            default:
              "The invisible hero behind every freestanding display. Engineered for precise viewing angles, reliable adhesion, and the consistency that lets you promise your clients perfection.",
          },
          {
            key: "cta_primary",
            label: "Primary CTA Label",
            type: "text",
            default: "Get a Quote",
          },
          {
            key: "cta_secondary",
            label: "Secondary CTA Label",
            type: "text",
            default: "View Specifications",
          },
        ],
      },
    },
  },
  product_foldlines: {
    label: "Product · Fold Lines & Dielines",
    sections: {
      hero: {
        label: "Hero Section",
        fields: [
          {
            key: "badge",
            label: "Badge Text",
            type: "text",
            default: "Precision Scoring",
          },
          {
            key: "title_top",
            label: "Title (top line)",
            type: "text",
            default: "Fold Lines &",
          },
          {
            key: "title_bottom",
            label: "Title (bottom line)",
            type: "text",
            default: "Dielines",
          },
          {
            key: "subtitle",
            label: "Subtitle",
            type: "textarea",
            default:
              "The invisible engineering that makes everything else possible. Our precision score lines create hinges that bend accurately without cracking, the foundation of every reliable easel back and display structure.",
          },
          {
            key: "cta_primary",
            label: "Primary CTA Label",
            type: "text",
            default: "Get a Quote",
          },
        ],
      },
    },
  },
  product_framing: {
    label: "Product · Contract Framing Backs",
    sections: {
      hero: {
        label: "Hero Section",
        fields: [
          {
            key: "badge",
            label: "Badge Text",
            type: "text",
            default: "Protection & Support",
          },
          {
            key: "title_top",
            label: "Title (top line)",
            type: "text",
            default: "Contract",
          },
          {
            key: "title_bottom",
            label: "Title (bottom line)",
            type: "text",
            default: "Framing Backs",
          },
          {
            key: "subtitle",
            label: "Subtitle",
            type: "textarea",
            default:
              "The silent guardian behind the artwork. Our contract framing backs hold art flat, protect from rear damage, and deliver the consistency that high-volume commercial framing demands.",
          },
          {
            key: "cta_primary",
            label: "Primary CTA Label",
            type: "text",
            default: "Get a Quote",
          },
        ],
      },
    },
  },
  product_matboards: {
    label: "Product · Matboards",
    sections: {
      hero: {
        label: "Hero Section",
        fields: [
          {
            key: "badge",
            label: "Badge Text",
            type: "text",
            default: "Decorative & Archival",
          },
          {
            key: "title_top",
            label: "Title (top line)",
            type: "text",
            default: "Matboards",
          },
          {
            key: "title_bottom",
            label: "Title (bottom line)",
            type: "text",
            default: "in 75+ Colors",
          },
          {
            key: "subtitle",
            label: "Subtitle",
            type: "textarea",
            default:
              "A full line of matboard in sheets and precut to size. Available in an array of vibrant colors and core boards to fulfill all of your framing needs.",
          },
          {
            key: "cta_primary",
            label: "Primary CTA Label",
            type: "text",
            default: "Get a Quote",
          },
        ],
      },
    },
  },
  global: {
    label: "Global (Nav/Footer)",
    sections: {
      branding: {
        label: "Branding",
        fields: [
          {
            key: "company",
            label: "Company Name",
            type: "text",
            default: "Flech Paper Products",
          },
          {
            key: "tagline",
            label: "Tagline",
            type: "text",
            default: "Precision Board Manufacturing - Paterson, NJ since 1999",
          },
        ],
      },
      footer: {
        label: "Footer",
        fields: [
          {
            key: "copyright",
            label: "Copyright Line",
            type: "text",
            default: "© 2026 Flech Paper Products. All rights reserved.",
          },
          {
            key: "address",
            label: "Address",
            type: "textarea",
            default: "Paterson, NJ\nUnited States",
          },
        ],
      },
    },
  },
};

// Helper: given a section's fields, return an object of { key: default } for all fields with a default.
export function sectionDefaults(fields: Field[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of fields) {
    if (typeof f.default === "string") out[f.key] = f.default;
  }
  return out;
}
