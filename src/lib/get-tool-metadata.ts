import { tools } from "@/config/tools";
import { Metadata } from "next";

export function getToolMetadata(toolId: string): Metadata {
  // Search through all categories to find the tool
  for (const category of Object.values(tools)) {
    const tool = category.items.find((item) => item.id === toolId);
    if (tool?.seo) {
      return {
        title: tool.seo.title,
        description: tool.seo.description,
        keywords: tool.seo.keywords,
        openGraph: {
          title: tool.seo.title,
          description: tool.seo.description,
          type: "website",
          url: `https://thibault.sh${tool.path}`,
        },
        twitter: {
          card: "summary_large_image",
          title: tool.seo.title,
          description: tool.seo.description,
        },
        alternates: {
          canonical: `https://thibault.sh${tool.path}`,
        },
      };
    }
  }

  throw new Error(`No SEO metadata found for tool ${toolId}`);
}
