import { getContent, getPageContent, LAYOUT_SECTION_KEY } from "@/lib/cms";
import { ProductCmsPage } from "../ProductCmsPage";

export const dynamic = "force-dynamic";

export default async function FoldLinesPage() {
  const content = await getPageContent("product_foldlines");
  content[LAYOUT_SECTION_KEY] = await getContent("product_foldlines", LAYOUT_SECTION_KEY, { order: "" });

  return (
    <ProductCmsPage
      pageLabel="Fold Lines & Dielines"
      pageTitle="Fold Lines & Dielines"
      content={content}
    />
  );
}
