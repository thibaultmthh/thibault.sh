import { HookDocumentation } from "@/types/hook-doc";

const useResizeObserverDoc: HookDocumentation = {
  name: "useResizeObserver",
  description:
    "A React hook that observes element size changes using the ResizeObserver API, providing detailed resize information including content rect and box sizes.",
  category: "Layout/Viewport",
  seo: {
    title: "useResizeObserver Hook - React ResizeObserver API",
    description:
      "A React hook for observing element size changes with detailed resize information using ResizeObserver API.",
    keywords: "react hooks, useResizeObserver, resize observer, element resize, size tracking, responsive",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useResizeObserver } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useResizeObserver<T extends HTMLElement>(
  elementRef: RefObject<T>
): ResizeObserverEntry | null`,
    parameters: [
      {
        name: "elementRef",
        type: "RefObject<T extends HTMLElement>",
        description: "React ref object pointing to the target element to observe.",
      },
    ],
    returns: {
      type: "ResizeObserverEntry | null",
      description: "ResizeObserverEntry with detailed size information, or null if no element or resize has occurred.",
      properties: [
        {
          name: "contentRect",
          type: "DOMRectReadOnly",
          description: "The content rectangle of the element.",
        },
        {
          name: "contentBoxSize",
          type: "ReadonlyArray<ResizeObserverSize>",
          description: "Array of content box dimensions.",
        },
        {
          name: "borderBoxSize",
          type: "ReadonlyArray<ResizeObserverSize>",
          description: "Array of border box dimensions.",
        },
        {
          name: "devicePixelContentBoxSize",
          type: "ReadonlyArray<ResizeObserverSize>",
          description: "Array of device pixel content box dimensions.",
        },
        {
          name: "target",
          type: "Element",
          description: "The observed element.",
        },
      ],
    },
  },

  examplesFile: "use-resize-observer.example",
};

export default useResizeObserverDoc;


