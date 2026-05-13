import { LegalCmsPage } from "@/components/LegalCmsPage";
import { getContent, getPageContent, LAYOUT_SECTION_KEY } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const content = await getPageContent("privacy");
  content[LAYOUT_SECTION_KEY] = await getContent("privacy", LAYOUT_SECTION_KEY, { order: "" });

  return <LegalCmsPage pageKey="privacy" content={content} />;
}
