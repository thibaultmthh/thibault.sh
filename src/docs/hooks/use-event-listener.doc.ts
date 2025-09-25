import { HookDocumentation } from "@/types/hook-doc";

const useEventListenerDoc: HookDocumentation = {
  name: "useEventListener",
  description:
    "A React hook that adds an event listener to a target element with automatic cleanup, supporting all standard DOM events on window, document, or specific HTML elements.",
  category: "Events",
  seo: {
    title: "useEventListener Hook - React Event Listener Management",
    description: "A React hook for managing event listeners with automatic cleanup and support for all DOM events.",
    keywords: "react hooks, useEventListener, event listener, DOM events, automatic cleanup, event handling",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useEventListener } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element?: RefObject<HTMLElement> | null,
  options?: boolean | AddEventListenerOptions
): void`,
    parameters: [
      {
        name: "eventName",
        type: "K",
        description: "The name of the event to listen for (e.g., 'click', 'keydown', 'resize').",
      },
      {
        name: "handler",
        type: "(event: EventMap[K]) => void",
        description: "The event handler function that will be called when the event fires.",
      },
      {
        name: "element",
        type: "RefObject<HTMLElement> | null",
        description: "Optional ref to the target element. Defaults to window if not provided.",
        optional: true,
      },
      {
        name: "options",
        type: "boolean | AddEventListenerOptions",
        description: "Optional event listener options (capture, once, passive, etc.).",
        optional: true,
      },
    ],
    returns: {
      type: "void",
      description: "This hook does not return anything.",
    },
  },

  examplesFile: "use-event-listener.example",
};

export default useEventListenerDoc;
