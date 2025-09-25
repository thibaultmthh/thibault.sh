import { HOOK_REGISTRY } from "@/config/hook-registry";
import { HookCategory } from "@/config/hook-categories";

interface HookItem {
  href: string;
  label: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

interface CategorySection {
  category: string;
  items: HookItem[];
}

// Generate PackageHooks from the registry
function generatePackageHooks(): CategorySection[] {
  const categorizedHooks: Record<HookCategory, HookItem[]> = {
    "Get Started": [],
    "State Management": [],
    "UI/Interaction": [],
    "Layout/Viewport": [],
    Utility: [],
    "Data/State": [],
    Events: [],
  };

  // Add the installation/get started item
  categorizedHooks["Get Started"].push({
    href: "/hooks",
    label: "Installation",
    seo: {
      title: "React Hooks Installation - Get Started with Custom React Hooks",
      description:
        "Learn how to install and get started with our collection of custom React hooks for state management, UI interactions, and more.",
      keywords: "react hooks, installation, setup, custom hooks, react components",
    },
  });

  // Generate hooks from registry
  Object.entries(HOOK_REGISTRY).forEach(([slug, hookDoc]) => {
    const hookItem: HookItem = {
      href: `/hooks/${slug}`,
      label: hookDoc.name,
      seo: hookDoc.seo,
    };

    categorizedHooks[hookDoc.category].push(hookItem);
  });

  // Convert to the expected format, filtering out empty categories
  return Object.entries(categorizedHooks)
    .filter(([, items]) => items.length > 0)
    .map(([category, items]) => ({
      category,
      items,
    }));
}

export const PackageHooks = generatePackageHooks();
