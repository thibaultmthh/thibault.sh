import { HookDocumentation } from "@/types/hook-doc";

const useElementSizeDoc: HookDocumentation = {
  name: "useElementSize",
  description:
    "A React hook that tracks an element's dimensions and updates when the element is resized using ResizeObserver for efficient monitoring.",
  category: "Layout/Viewport",
  seo: {
    title: "useElementSize Hook - React Element Size Tracking",
    description: "A React hook for tracking element dimensions with ResizeObserver and real-time updates.",
    keywords: "react hooks, useElementSize, element size, resize observer, dimensions, width, height",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useElementSize } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
interface ElementSize {
  width: number;
  height: number;
}

function useElementSize(elementRef: RefObject<HTMLElement>): ElementSize`,
    parameters: [
      {
        name: "elementRef",
        type: "RefObject<HTMLElement>",
        description: "React ref object pointing to the target HTML element.",
      },
    ],
    returns: {
      type: "ElementSize",
      description: "An object containing the current width and height of the element.",
      properties: [
        {
          name: "width",
          type: "number",
          description: "Current width of the element in pixels.",
        },
        {
          name: "height",
          type: "number",
          description: "Current height of the element in pixels.",
        },
      ],
    },
  },

  examplesFile: "use-element-size.example",
};

export default useElementSizeDoc;
