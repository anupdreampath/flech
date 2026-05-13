import { getContent, getPageContent, LAYOUT_SECTION_KEY } from "@/lib/cms";
import { ProductCmsPage } from "../ProductCmsPage";

export const dynamic = "force-dynamic";

export default async function EaselBacksPage() {
  const content = await getPageContent("product_easel");
  content[LAYOUT_SECTION_KEY] = await getContent("product_easel", LAYOUT_SECTION_KEY, { order: "" });

  return (
    <ProductCmsPage
      pageLabel="Easel Backs"
      pageTitle="Easel Backs"
      content={content}
    />
  );
}
