import { LegalCmsPage } from "@/components/LegalCmsPage";
import { getContent, getPageContent, LAYOUT_SECTION_KEY } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const content = await getPageContent("terms");
  content[LAYOUT_SECTION_KEY] = await getContent("terms", LAYOUT_SECTION_KEY, { order: "" });

  return <LegalCmsPage pageKey="terms" content={content} />;
}
