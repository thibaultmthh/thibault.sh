import { HookDocumentation } from "@/types/hook-doc";

const useIntersectionObserverDoc: HookDocumentation = {
  name: "useIntersectionObserver",
  description:
    "A React hook that tracks when an element enters or leaves the viewport using the Intersection Observer API for efficient visibility detection.",
  category: "Layout/Viewport",
  seo: {
    title: "useIntersectionObserver Hook - React Viewport Visibility Tracking",
    description:
      "A React hook for tracking element visibility using Intersection Observer API for lazy loading and scroll animations.",
    keywords: "react hooks, useIntersectionObserver, intersection observer, viewport, visibility, lazy loading, scroll",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useIntersectionObserver } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<HTMLElement>,
  options?: IntersectionOptions
): IntersectionObserverEntry | null`,
    parameters: [
      {
        name: "elementRef",
        type: "RefObject<HTMLElement>",
        description: "React ref object pointing to the target element to observe.",
      },
      {
        name: "options",
        type: "IntersectionOptions",
        description: "Configuration options for the intersection observer.",
        optional: true,
      },
      {
        name: "options.threshold",
        type: "number | number[]",
        description: "Percentage of visibility at which callback should trigger (0-1).",
        optional: true,
        default: "0",
      },
      {
        name: "options.root",
        type: "Element | null",
        description: "Element used as viewport for checking visibility.",
        optional: true,
        default: "null",
      },
      {
        name: "options.rootMargin",
        type: "string",
        description: "Margin around the root element (CSS-like syntax).",
        optional: true,
        default: "0%",
      },
      {
        name: "options.freezeOnceVisible",
        type: "boolean",
        description: "If true, stops observing once element becomes visible.",
        optional: true,
        default: "false",
      },
    ],
    returns: {
      type: "IntersectionObserverEntry | null",
      description: "IntersectionObserverEntry object containing visibility information, or null if element not found.",
      properties: [
        {
          name: "isIntersecting",
          type: "boolean",
          description: "Whether the element is currently intersecting with the viewport.",
        },
        {
          name: "intersectionRatio",
          type: "number",
          description: "Ratio of intersection area to total bounding box area (0-1).",
        },
        {
          name: "boundingClientRect",
          type: "DOMRectReadOnly",
          description: "Bounding rectangle of the target element.",
        },
      ],
    },
  },

  examplesFile: "use-intersection-observer.example",
};

export default useIntersectionObserverDoc;
