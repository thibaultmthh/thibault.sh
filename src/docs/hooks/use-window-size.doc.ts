import { HookDocumentation } from "@/types/hook-doc";

const useWindowSizeDoc: HookDocumentation = {
  name: "useWindowSize",
  description: "A React hook that tracks browser window dimensions and updates on resize events, with SSR safety.",
  category: "Layout/Viewport",
  seo: {
    title: "useWindowSize Hook - React Window Size Tracking",
    description: "A React hook for tracking browser window dimensions with automatic resize detection.",
    keywords: "react hooks, useWindowSize, window size, viewport, responsive, resize",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useWindowSize } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize`,
    returns: {
      type: "WindowSize",
      description: "An object containing the current window width and height.",
      properties: [
        {
          name: "width",
          type: "number",
          description: "Current window inner width in pixels.",
        },
        {
          name: "height",
          type: "number",
          description: "Current window inner height in pixels.",
        },
      ],
    },
  },

  examplesFile: "use-window-size.example",
};

export default useWindowSizeDoc;
