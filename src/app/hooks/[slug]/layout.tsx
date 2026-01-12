import { Metadata } from "next";
import { PackageHooks } from "../packagehooks";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const hookId = slug;
  // Find the hook in PackageHooks
  for (const category of PackageHooks) {
    const hook = category.items.find((item) => item.href === `/hooks/${hookId}`);
    if (hook?.seo) {
      return {
        title: hook.seo.title,
        description: hook.seo.description,
        keywords: hook.seo.keywords,
        openGraph: {
          title: hook.seo.title,
          description: hook.seo.description,
          type: "website",
          url: `https://thibault.sh/hooks/${hookId}`,
        },
        alternates: {
          canonical: `https://thibault.sh/hooks/${hookId}`,
        },
      };
    }
  }
  return {
    title: "React Hooks Installation - Get Started with Custom React Hooks",
    description:
      "Learn how to install and get started with our collection of custom React hooks for state management, UI interactions, and more.",
    keywords: "react hooks, installation, setup, custom hooks, react components",
  };
}

export default function HooksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
