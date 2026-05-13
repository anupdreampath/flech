import { getContent, getPageContent, LAYOUT_SECTION_KEY } from "@/lib/cms";
import IndustriesClient from "./IndustriesClient";

export const dynamic = "force-dynamic";

export default async function IndustriesPage() {
  const content = await getPageContent("industries");
  content[LAYOUT_SECTION_KEY] = await getContent("industries", LAYOUT_SECTION_KEY, { order: "" });

  return <IndustriesClient content={content} />;
}
