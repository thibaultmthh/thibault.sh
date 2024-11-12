import { hooks } from "@/config/hooks";
import { Metadata } from "next";

export function getHookMetadata(hookId: string): Metadata {
  // Search through all categories to find the hook
  for (const category of Object.values(hooks)) {
    const hook = category.items.find((item) => item.id === hookId);
    if (hook?.seo) {
      return {
        title: hook.seo.title,
        description: hook.seo.description,
        keywords: hook.seo.keywords,
        openGraph: {
          title: hook.seo.title,
          description: hook.seo.description,
          type: "website",
          url: `https://thibault.sh${hook.path}`,
        },
        twitter: {
          card: "summary_large_image",
          title: hook.seo.title,
          description: hook.seo.description,
        },
        alternates: {
          canonical: `https://thibault.sh${hook.path}`,
        },
      };
    }
  }

  throw new Error(`No SEO metadata found for hook ${hookId}`);
}
