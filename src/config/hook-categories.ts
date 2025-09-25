export const HOOK_CATEGORIES = {
  "Get Started": "Get Started",
  "State Management": "State Management",
  "UI/Interaction": "UI/Interaction",
  "Layout/Viewport": "Layout/Viewport",
  Utility: "Utility",
  "Data/State": "Data/State",
  Events: "Events",
} as const;

export type HookCategory = keyof typeof HOOK_CATEGORIES;

export interface HookSEO {
  title: string;
  description: string;
  keywords: string;
}
