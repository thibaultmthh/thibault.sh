import { HookDocumentation } from "@/types/hook-doc";

const useHoverDoc: HookDocumentation = {
  name: "useHover",
  description:
    "A React hook that detects when an element is being hovered over with support for both internal and external ref management.",
  category: "UI/Interaction",
  seo: {
    title: "useHover Hook - React Hover State Detection",
    description: "A React hook for detecting hover state on HTML elements with flexible ref management.",
    keywords: "react hooks, useHover, hover state, mouse events, interaction",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useHover } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useHover<T extends HTMLElement>(
  _ref?: RefObject<T | null> | null
): [RefObject<T>, boolean]`,
    parameters: [
      {
        name: "_ref",
        type: "RefObject<T | null> | null",
        description:
          "Optional React ref object for the element to monitor. If not provided, the hook creates its own ref.",
        optional: true,
      },
    ],
    returns: {
      type: "[RefObject<T>, boolean]",
      description: "A tuple containing the ref object and hover state.",
      properties: [
        {
          name: "ref",
          type: "RefObject<T>",
          description: "React ref object to attach to the target element.",
        },
        {
          name: "isHovered",
          type: "boolean",
          description: "Boolean indicating whether the element is currently being hovered.",
        },
      ],
    },
  },

  examplesFile: "use-hover.example",
};

export default useHoverDoc;
