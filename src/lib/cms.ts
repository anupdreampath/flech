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

export type SubField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "url" | "video";
  helper?: string;
};

export type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "url" | "video" | "repeater";
  default?: string;
  helper?: string;
  // Repeater-specific
  itemLabel?: string;
  subFields?: SubField[];
  defaultItems?: Array<Record<string, string>>;
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
            label: "Rotating Title 1 (bottom line)",
            type: "text",
            default: "Every Great Display",
          },
          {
            key: "title_bottom_2",
            label: "Rotating Title 2",
            type: "text",
            default: "Art and Framing Industry",
          },
          {
            key: "title_bottom_3",
            label: "Rotating Title 3",
            type: "text",
            default: "Sign and Packaging",
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
      primary_colors: {
        label: "Primary Colors (cards)",
        fields: [
          {
            key: "colors",
            label: "Color Cards",
            type: "repeater",
            itemLabel: "Color",
            helper:
              "Each card displays an image on the left and the name, code, size, ply, and a short description on the right. Add, remove, and reorder freely.",
            subFields: [
              { key: "name", label: "Name", type: "text" },
              { key: "code", label: "Code", type: "text" },
              { key: "hex", label: "Color (HEX)", type: "text", helper: "Used as the swatch background. e.g. #F8F8F4" },
              { key: "image", label: "Swatch Image (optional)", type: "image", helper: "If uploaded, this image replaces the flat color block on the left." },
              { key: "size", label: "Sheet Size", type: "text" },
              { key: "ply", label: "Ply / Caliper", type: "text" },
              { key: "tags", label: "Extra Badges", type: "text", helper: "Optional. Comma-separated, e.g. Acid-Free, Bevel-Cut, Archival" },
              { key: "description", label: "Description", type: "textarea" },
            ],
            defaultItems: [
              { name: "Tablet White", code: "#101", hex: "#F8F8F4", size: "32x40", ply: "4-ply White Core", description: "Bright neutral white. Our most-ordered shade for gallery framing." },
              { name: "Snow", code: "#108", hex: "#F4F6F8", size: "32x40", ply: "4-ply White Core", description: "Cool, clean white with a faint blue undertone." },
              { name: "Woven White", code: "#106", hex: "#F1EBE0", size: "32x40", ply: "4-ply White Core", description: "Soft white with a subtle textured surface." },
              { name: "Buttermilk", code: "#220", hex: "#F4ECC9", size: "32x40", ply: "4-ply White Core", description: "Warm cream that flatters photographs and prints." },
              { name: "C-Linen", code: "#102", hex: "#ECE6D2", size: "32x40", ply: "4-ply White Core", description: "Linen-textured natural shade." },
              { name: "Buff", code: "#203", hex: "#E0CFA9", size: "32x40", ply: "4-ply White Core", description: "Soft, neutral beige." },
              { name: "Straw", code: "#201", hex: "#D9C28A", size: "32x40", ply: "4-ply White Core", description: "Warm, earthy yellow tone." },
              { name: "Pewter", code: "#211", hex: "#98989A", size: "32x40", ply: "4-ply White Core", description: "Cool mid-grey for contemporary work." },
              { name: "Sage", code: "#401", hex: "#95A085", size: "32x40", ply: "4-ply White Core", description: "Muted herbal green." },
              { name: "Grey Flannel", code: "#210", hex: "#B2ADA1", size: "32x40", ply: "4-ply White Core", description: "Soft warm grey with a flannel finish." },
              { name: "Warm Grey", code: "#212", hex: "#ABA298", size: "32x40", ply: "4-ply White Core", description: "Neutral warm grey." },
              { name: "Biscuit", code: "#213", hex: "#C7A47B", size: "32x40", ply: "4-ply White Core", description: "Toasted neutral with subtle warmth." },
              { name: "Sienna", code: "#501", hex: "#8B4D2A", size: "32x40", ply: "4-ply White Core", description: "Earthy reddish brown." },
              { name: "Crimson", code: "#601", hex: "#A01B26", size: "32x40", ply: "4-ply White Core", description: "Deep, saturated red." },
              { name: "Maroon", code: "#602", hex: "#5C161D", size: "32x40", ply: "4-ply White Core", description: "Rich oxblood red." },
              { name: "Tangerine", code: "#561", hex: "#E07429", size: "32x40", ply: "4-ply White Core", description: "Vibrant orange." },
              { name: "Lemon", code: "#306", hex: "#F6D955", size: "32x40", ply: "4-ply White Core", description: "Bright sunny yellow." },
              { name: "Saffron", code: "#309", hex: "#E0A93B", size: "32x40", ply: "4-ply White Core", description: "Warm golden yellow." },
              { name: "Olive", code: "#404", hex: "#6E6A2D", size: "32x40", ply: "4-ply White Core", description: "Earthy olive green." },
              { name: "Evergreen", code: "#405", hex: "#1F4D34", size: "32x40", ply: "4-ply White Core", description: "Deep forest green." },
              { name: "Mocha", code: "#502", hex: "#6B4A30", size: "32x40", ply: "4-ply White Core", description: "Warm brown with coffee tones." },
              { name: "Espresso", code: "#505", hex: "#3B2418", size: "32x40", ply: "4-ply White Core", description: "Dark roast brown." },
              { name: "Light Blue", code: "#621", hex: "#B7CFE3", size: "32x40", ply: "4-ply White Core", description: "Soft sky blue." },
              { name: "Icy Blue", code: "#625", hex: "#8FB3D6", size: "32x40", ply: "4-ply White Core", description: "Cool, crisp blue." },
              { name: "Cobalt", code: "#629", hex: "#2858A6", size: "32x40", ply: "4-ply White Core", description: "Saturated mid-blue." },
              { name: "True Blue", code: "#624", hex: "#285AB0", size: "32x40", ply: "4-ply White Core", description: "Classic primary blue." },
              { name: "Liberty", code: "#628", hex: "#1A2D60", size: "32x40", ply: "4-ply White Core", description: "Patriotic deep blue." },
              { name: "Blueberry", code: "#627", hex: "#3F3A7C", size: "32x40", ply: "4-ply White Core", description: "Rich blueberry purple-blue." },
              { name: "Eclipse", code: "#626", hex: "#15203F", size: "32x40", ply: "4-ply White Core", description: "Deep midnight blue." },
              { name: "Purple", code: "#650", hex: "#4B2A6F", size: "32x40", ply: "4-ply White Core", description: "Royal violet." },
              { name: "Blackest Black", code: "#701", hex: "#0A0A0A", size: "32x40", ply: "4-ply White Core", description: "Pure, rich black." },
              { name: "Midnight", code: "#702", hex: "#11131A", size: "32x40", ply: "4-ply White Core", description: "Soft black with a hint of blue." },
              { name: "Storm", code: "#710", hex: "#2D2F33", size: "32x40", ply: "4-ply White Core", description: "Stormcloud grey-black." },
              { name: "Charcoal", code: "#711", hex: "#3A3633", size: "32x40", ply: "4-ply White Core", description: "Warm charcoal grey." },
              { name: "Graphite", code: "#712", hex: "#4A4A4D", size: "32x40", ply: "4-ply White Core", description: "Cool dark grey." },
            ],
          },
        ],
      },
      premium_colors: {
        label: "Simply Suede & Premium Colors (cards)",
        fields: [
          {
            key: "colors",
            label: "Suede / Premium Cards",
            type: "repeater",
            itemLabel: "Color",
            helper:
              "Tactile suede and specialty finishes. Each card shows a flat color swatch on the left and the name, code, size, ply, and description on the right.",
            subFields: [
              { key: "name", label: "Name", type: "text" },
              { key: "code", label: "Code", type: "text" },
              { key: "hex", label: "Color (HEX)", type: "text", helper: "Used as the swatch background. e.g. #B25C68" },
              { key: "image", label: "Swatch Image (optional)", type: "image", helper: "If uploaded, this image replaces the flat color block on the left." },
              { key: "size", label: "Sheet Size", type: "text" },
              { key: "ply", label: "Ply / Caliper", type: "text" },
              { key: "tags", label: "Extra Badges", type: "text", helper: "Optional. Comma-separated, e.g. Acid-Free, Bevel-Cut, Archival" },
              { key: "description", label: "Description", type: "textarea" },
            ],
            defaultItems: [
              { name: "Snowflake", code: "#S10", hex: "#F2F2F0", size: "32x40", ply: "4-ply Suede", description: "Clean snow-white suede with a soft tactile surface." },
              { name: "Coconut", code: "#S12", hex: "#EDE8DC", size: "32x40", ply: "4-ply Suede", description: "Warm off-white suede." },
              { name: "Vanilla", code: "#S15", hex: "#E5D7B6", size: "32x40", ply: "4-ply Suede", description: "Creamy vanilla suede tone." },
              { name: "Dove", code: "#S20", hex: "#B8B0A4", size: "32x40", ply: "4-ply Suede", description: "Muted dove grey." },
              { name: "Sand", code: "#S22", hex: "#C9B391", size: "32x40", ply: "4-ply Suede", description: "Warm sand beige." },
              { name: "Mushroom", code: "#S25", hex: "#8E7E6A", size: "32x40", ply: "4-ply Suede", description: "Earthy mushroom taupe." },
              { name: "Rose", code: "#S30", hex: "#B25C68", size: "32x40", ply: "4-ply Suede", description: "Dusty rose with a velvety hand." },
              { name: "Royal", code: "#S35", hex: "#2A2F73", size: "32x40", ply: "4-ply Suede", description: "Deep royal blue suede." },
              { name: "Alpine", code: "#S40", hex: "#2C5641", size: "32x40", ply: "4-ply Suede", description: "Forest alpine green." },
              { name: "Snow", code: "#S50", hex: "#F8F7F2", size: "32x40", ply: "4-ply Suede", description: "Pure white suede with crisp fibre." },
              { name: "Faux Silver", code: "#S972", hex: "#C2C2C4", size: "32x40", ply: "4-ply Specialty", description: "Brushed silver metallic finish." },
              { name: "Faux Gold", code: "#S971", hex: "#C9A24A", size: "32x40", ply: "4-ply Specialty", description: "Brushed gold metallic finish." },
              { name: "Silver Foil", code: "#S973", hex: "#BCBCBE", size: "32x40", ply: "4-ply Specialty", description: "Reflective silver foil for premium presentation." },
              { name: "Midnight Suede", code: "#S60", hex: "#1A1F30", size: "32x40", ply: "4-ply Suede", description: "Inky midnight suede." },
              { name: "Deep Red Suede", code: "#S65", hex: "#6E1A1A", size: "32x40", ply: "4-ply Suede", description: "Theatre-curtain deep red." },
              { name: "Forest Suede", code: "#S70", hex: "#1F3D2A", size: "32x40", ply: "4-ply Suede", description: "Velvety forest green." },
              { name: "Navy Suede", code: "#S75", hex: "#161D3A", size: "32x40", ply: "4-ply Suede", description: "Rich navy with depth." },
              { name: "Espresso Suede", code: "#S80", hex: "#2E1B12", size: "32x40", ply: "4-ply Suede", description: "Dark espresso brown suede." },
            ],
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
      header_menu: {
        label: "Header — Main Menu",
        fields: [
          {
            key: "items",
            label: "Top-level Links",
            type: "repeater",
            itemLabel: "Link",
            helper: "Top navigation entries shown on every page (excluding the Products dropdown).",
            subFields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "URL", type: "text", helper: "Internal path (e.g. /about) or full URL." },
            ],
            defaultItems: [
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Industries", href: "/industries" },
              { label: "Contact", href: "/contact" },
            ],
          },
          {
            key: "cta_label",
            label: "CTA Button Label",
            type: "text",
            default: "Request a Quote",
          },
          {
            key: "cta_href",
            label: "CTA Button URL",
            type: "text",
            default: "/contact",
          },
          {
            key: "topbar_phone",
            label: "Top Bar Phone",
            type: "text",
            default: "(973) 357-8111",
          },
          {
            key: "topbar_phone_href",
            label: "Top Bar Phone Link (tel:…)",
            type: "text",
            default: "tel:+19733578111",
          },
          {
            key: "topbar_email",
            label: "Top Bar Email",
            type: "text",
            default: "info@flech.com",
          },
          {
            key: "topbar_email_href",
            label: "Top Bar Email Link (mailto:…)",
            type: "text",
            default: "mailto:info@flech.com",
          },
          {
            key: "topbar_blurb",
            label: "Top Bar Blurb",
            type: "text",
            default: "Precision Board Manufacturing - Paterson, NJ since 1999",
          },
        ],
      },
      header_products: {
        label: "Header — Products Dropdown",
        fields: [
          {
            key: "items",
            label: "Products in Dropdown",
            type: "repeater",
            itemLabel: "Product",
            helper: "Items shown when hovering / tapping the Products menu in the navbar.",
            subFields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "URL", type: "text" },
              { key: "description", label: "Short Description", type: "text" },
            ],
            defaultItems: [
              { label: "Easel Backs", href: "/products/easel-backs", description: "Self-stick & custom display stands" },
              { label: "Fold Lines & Dielines", href: "/products/fold-lines", description: "Precision score lines for accurate bends" },
              { label: "Contract Framing Backs", href: "/products/framing-backs", description: "Standardized backing boards for framing" },
              { label: "Matboards", href: "/products/matboards", description: "Acid-free decorative borders & mats" },
            ],
          },
          {
            key: "flagship_label",
            label: "Flagship Footer Label",
            type: "text",
            default: "View Our Flagship: Easel Backs",
          },
          {
            key: "flagship_href",
            label: "Flagship Footer URL",
            type: "text",
            default: "/products/easel-backs",
          },
        ],
      },
      footer_products: {
        label: "Footer — Products Column",
        fields: [
          {
            key: "items",
            label: "Footer Product Links",
            type: "repeater",
            itemLabel: "Link",
            subFields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "URL", type: "text" },
            ],
            defaultItems: [
              { label: "Easel Backs", href: "/products/easel-backs" },
              { label: "Fold Lines & Dielines", href: "/products/fold-lines" },
              { label: "Contract Framing Backs", href: "/products/framing-backs" },
              { label: "Matboards", href: "/products/matboards" },
            ],
          },
        ],
      },
      footer_company: {
        label: "Footer — Company Column",
        fields: [
          {
            key: "items",
            label: "Footer Company Links",
            type: "repeater",
            itemLabel: "Link",
            subFields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "URL", type: "text" },
            ],
            defaultItems: [
              { label: "About Flech", href: "/about" },
              { label: "Industries We Serve", href: "/industries" },
              { label: "Contact & RFQ", href: "/contact" },
            ],
          },
        ],
      },
      footer_industries: {
        label: "Footer — Industries Column",
        fields: [
          {
            key: "items",
            label: "Footer Industry Links",
            type: "repeater",
            itemLabel: "Link",
            subFields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "URL", type: "text" },
            ],
            defaultItems: [
              { label: "Sign & Display", href: "/industries#signage" },
              { label: "Wholesale Framing", href: "/industries#framing" },
              { label: "Packaging & POP", href: "/industries#packaging" },
              { label: "Interior Design", href: "/industries#interior" },
            ],
          },
        ],
      },
      footer_legal: {
        label: "Footer — Legal Links",
        fields: [
          {
            key: "items",
            label: "Bottom Bar Links",
            type: "repeater",
            itemLabel: "Link",
            subFields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "URL", type: "text" },
            ],
            defaultItems: [
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ],
          },
        ],
      },
      contact_info: {
        label: "Contact Info (shared)",
        fields: [
          { key: "phone", label: "Phone (display)", type: "text", default: "(973) 357-8111" },
          { key: "phone_href", label: "Phone (tel: link)", type: "text", default: "tel:+19733578111" },
          { key: "email", label: "Email", type: "text", default: "info@flech.com" },
          { key: "email_href", label: "Email link (mailto:)", type: "text", default: "mailto:info@flech.com" },
          { key: "address_line1", label: "Address Line 1", type: "text", default: "Paterson, NJ" },
          { key: "address_line2", label: "Address Line 2", type: "text", default: "United States" },
        ],
      },
      analytics: {
        label: "Analytics & Tracking",
        fields: [
          {
            key: "ga_id",
            label: "Google Analytics 4 Measurement ID",
            type: "text",
            default: "",
            helper: "Format: G-XXXXXXXXXX. Loads gtag.js and fires page_view on every route change.",
          },
          {
            key: "gtm_id",
            label: "Google Tag Manager Container ID",
            type: "text",
            default: "",
            helper: "Format: GTM-XXXXXXX. If set, GTM is loaded; configure tags inside GTM.",
          },
          {
            key: "fb_pixel_id",
            label: "Meta (Facebook) Pixel ID",
            type: "text",
            default: "",
            helper: "Numeric pixel ID. Loads fbevents.js and fires PageView on every route change.",
          },
          {
            key: "extra_head_html",
            label: "Additional Head Scripts (raw HTML)",
            type: "textarea",
            default: "",
            helper: "Optional. Pasted verbatim into <head>. Use for custom verification meta tags or one-off scripts.",
          },
        ],
      },
    },
  },
};

// Helper: given a section's fields, return an object of { key: default } for all fields with a default.
// Helper: load a section's data and parse the repeater field at `key` into an array.
// If parsing fails or the row is missing, returns the schema's defaultItems.
export async function getRepeaterItems<T = Record<string, string>>(
  page: string,
  section: string,
  key: string
): Promise<T[]> {
  const sec = CMS_SCHEMA[page]?.sections?.[section];
  const field = sec?.fields.find((f) => f.key === key);
  const fallback = (field?.defaultItems as T[] | undefined) || [];
  if (!field) return fallback;
  const data = await getContent<Record<string, string>>(page, section, {
    [key]: JSON.stringify(fallback),
  });
  try {
    const parsed = JSON.parse(data[key] || "[]");
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function sectionDefaults(fields: Field[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of fields) {
    if (f.type === "repeater" && Array.isArray(f.defaultItems)) {
      out[f.key] = JSON.stringify(f.defaultItems);
    } else if (typeof f.default === "string") {
      out[f.key] = f.default;
    }
  }
  return out;
}
