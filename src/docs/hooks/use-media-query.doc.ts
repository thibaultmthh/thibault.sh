import { HookDocumentation } from "@/types/hook-doc";

const useMediaQueryDoc: HookDocumentation = {
  name: "useMediaQuery",
  description:
    "A React hook that tracks the state of a CSS media query and updates when it changes, providing reactive viewport and media condition detection.",
  category: "Layout/Viewport",
  seo: {
    title: "useMediaQuery Hook - React Media Query State Tracking",
    description: "A React hook for tracking CSS media query states with real-time updates for responsive design.",
    keywords: "react hooks, useMediaQuery, media query, responsive design, viewport, screen size, breakpoints",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useMediaQuery } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useMediaQuery(query: string): boolean`,
    parameters: [
      {
        name: "query",
        type: "string",
        description: "The CSS media query string to track (e.g., '(min-width: 768px)').",
      },
    ],
    returns: {
      type: "boolean",
      description: "Boolean indicating whether the media query currently matches.",
    },
  },

  examplesFile: "use-media-query.example",
};

export default useMediaQueryDoc;
