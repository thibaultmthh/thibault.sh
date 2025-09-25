import { HookDocumentation } from "@/types/hook-doc";

const useContainerScrollDoc: HookDocumentation = {
  name: "useContainerScroll",
  description:
    "A React hook that tracks scroll position, dimensions, and scrolling state of a container element with real-time updates and debounced scrolling indicator.",
  category: "Layout/Viewport",
  seo: {
    title: "useContainerScroll Hook - React Container Scroll Tracking",
    description: "A React hook for tracking scroll position, dimensions, and scrolling state of container elements.",
    keywords: "react hooks, useContainerScroll, scroll tracking, container scroll, scroll position, viewport",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useContainerScroll } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
interface ContainerScroll {
  scrollTop: number;
  scrollLeft: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
  isScrolling: boolean;
}

function useContainerScroll(
  containerRef: RefObject<HTMLElement | null>, 
  delay?: number
): ContainerScroll`,
    parameters: [
      {
        name: "containerRef",
        type: "RefObject<HTMLElement | null>",
        description: "React ref object pointing to the scrollable container element.",
      },
      {
        name: "delay",
        type: "number",
        description: "Delay in milliseconds before setting isScrolling to false.",
        optional: true,
        default: "150",
      },
    ],
    returns: {
      type: "ContainerScroll",
      description: "An object containing scroll position, dimensions, and scrolling state.",
      properties: [
        {
          name: "scrollTop",
          type: "number",
          description: "Vertical scroll position in pixels.",
        },
        {
          name: "scrollLeft",
          type: "number",
          description: "Horizontal scroll position in pixels.",
        },
        {
          name: "scrollWidth",
          type: "number",
          description: "Total scrollable width of the content.",
        },
        {
          name: "scrollHeight",
          type: "number",
          description: "Total scrollable height of the content.",
        },
        {
          name: "clientWidth",
          type: "number",
          description: "Visible width of the container.",
        },
        {
          name: "clientHeight",
          type: "number",
          description: "Visible height of the container.",
        },
        {
          name: "isScrolling",
          type: "boolean",
          description: "Boolean indicating if the user is currently scrolling (debounced).",
        },
      ],
    },
  },

  examplesFile: "use-container-scroll.example",
};

export default useContainerScrollDoc;
