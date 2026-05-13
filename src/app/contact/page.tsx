import { getContent, getPageContent, LAYOUT_SECTION_KEY } from "@/lib/cms";
import ContactClient from "./ContactClient";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await getPageContent("contact");
  content[LAYOUT_SECTION_KEY] = await getContent("contact", LAYOUT_SECTION_KEY, { order: "" });

  return <ContactClient content={content} />;
}
