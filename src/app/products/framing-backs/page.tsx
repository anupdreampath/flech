import { getContent, getPageContent, LAYOUT_SECTION_KEY } from "@/lib/cms";
import { ProductCmsPage } from "../ProductCmsPage";

export const dynamic = "force-dynamic";

export default async function FramingBacksPage() {
  const content = await getPageContent("product_framing");
  content[LAYOUT_SECTION_KEY] = await getContent("product_framing", LAYOUT_SECTION_KEY, { order: "" });

  return (
    <ProductCmsPage
      pageLabel="Contract Framing Backs"
      pageTitle="Contract Framing Backs"
      content={content}
    />
  );
}
