import { getContent, getPageContent, LAYOUT_SECTION_KEY } from "@/lib/cms";
import { ProductCmsPage } from "../ProductCmsPage";

export const dynamic = "force-dynamic";

export default async function MatboardsPage() {
  const content = await getPageContent("product_matboards");
  content[LAYOUT_SECTION_KEY] = await getContent("product_matboards", LAYOUT_SECTION_KEY, { order: "" });

  return (
    <ProductCmsPage
      pageLabel="Matboards"
      pageTitle="Matboards"
      content={content}
    />
  );
}
