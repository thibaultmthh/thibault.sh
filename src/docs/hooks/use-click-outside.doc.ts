import { HookDocumentation } from "@/types/hook-doc";

const useClickOutsideDoc: HookDocumentation = {
  name: "useClickOutside",
  description:
    "A React hook that detects clicks outside a referenced element and executes a callback. Useful for implementing dropdown menus, modals, or any component that should close when the user clicks outside of it. Handles both mouse and touch events.",
  category: "UI/Interaction",
  seo: {
    title: "useClickOutside Hook - React Click Outside Detection",
    description: "A React hook for detecting clicks outside of elements. Ideal for modals and dropdowns.",
    keywords: "react hooks, useClickOutside, click outside, modal, dropdown, react ui",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useClickOutside } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
type Handler = (event: MouseEvent | TouchEvent) => void;

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null> | null,
  handler: Handler
): void`,
    parameters: [
      {
        name: "ref",
        type: "RefObject<T | null> | null",
        description: "React ref object pointing to the element to monitor for outside clicks.",
      },
      {
        name: "handler",
        type: "Handler",
        description:
          "Callback function executed when a click occurs outside the referenced element. Receives the mouse or touch event as parameter.",
      },
    ],
    returns: {
      type: "void",
      description:
        "This hook doesn't return anything. It sets up event listeners and executes the handler when clicks occur outside the referenced element.",
    },
  },

  examplesFile: "use-click-outside.example",
};

export default useClickOutsideDoc;
