import { HookDocumentation } from "@/types/hook-doc";

const useScrollPositionDoc: HookDocumentation = {
  name: "useScrollPosition",
  description: "A React hook that tracks the current window scroll position in real-time with SSR-safe initialization.",
  category: "Layout/Viewport",
  seo: {
    title: "useScrollPosition Hook - React Window Scroll Tracking",
    description: "A React hook for tracking window scroll position with real-time updates and SSR support.",
    keywords: "react hooks, useScrollPosition, scroll position, window scroll, scroll tracking, viewport",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useScrollPosition } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
interface ScrollPosition {
  x: number;
  y: number;
}

function useScrollPosition(): ScrollPosition`,
    returns: {
      type: "ScrollPosition",
      description: "An object containing the current horizontal and vertical scroll positions.",
      properties: [
        {
          name: "x",
          type: "number",
          description: "Horizontal scroll position in pixels.",
        },
        {
          name: "y",
          type: "number",
          description: "Vertical scroll position in pixels.",
        },
      ],
    },
  },

  examplesFile: "use-scroll-position.example",
};

export default useScrollPositionDoc;

