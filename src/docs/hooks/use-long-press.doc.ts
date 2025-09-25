import { HookDocumentation } from "@/types/hook-doc";

const useLongPressDoc: HookDocumentation = {
  name: "useLongPress",
  description:
    "A React hook that handles both normal press and long press interactions with progress tracking, supporting mouse and touch events.",
  category: "UI/Interaction",
  seo: {
    title: "useLongPress Hook - React Long Press Detection",
    description: "A React hook for detecting long press gestures with progress tracking and customizable timing.",
    keywords: "react hooks, useLongPress, long press, touch events, mouse events, gesture detection",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useLongPress } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
interface LongPressOptions {
  delay?: number;
  preventContext?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  onLongPressCanceled?: () => void;
}

interface PressState {
  isPressed: boolean;
  isLongPressed: boolean;
  progress: number;
}

function useLongPress(options?: LongPressOptions): {
  handlers: EventHandlers;
  state: PressState;
}`,
    parameters: [
      {
        name: "options",
        type: "LongPressOptions",
        description: "Configuration options for the long press behavior.",
        optional: true,
      },
      {
        name: "options.delay",
        type: "number",
        description: "Duration in milliseconds before triggering long press.",
        optional: true,
        default: "400",
      },
      {
        name: "options.preventContext",
        type: "boolean",
        description: "Whether to prevent context menu on long press.",
        optional: true,
        default: "true",
      },
      {
        name: "options.onPress",
        type: "() => void",
        description: "Callback for normal press (when released before delay).",
        optional: true,
      },
      {
        name: "options.onLongPress",
        type: "() => void",
        description: "Callback for successful long press (when delay is reached).",
        optional: true,
      },
      {
        name: "options.onLongPressCanceled",
        type: "() => void",
        description: "Callback when long press is interrupted.",
        optional: true,
      },
    ],
    returns: {
      type: "{ handlers: EventHandlers; state: PressState }",
      description: "An object containing event handlers and current press state.",
      properties: [
        {
          name: "handlers",
          type: "EventHandlers",
          description: "Event handlers to spread on your element.",
        },
        {
          name: "state.isPressed",
          type: "boolean",
          description: "Whether the element is currently being pressed.",
        },
        {
          name: "state.isLongPressed",
          type: "boolean",
          description: "Whether the press has exceeded the long press threshold.",
        },
        {
          name: "state.progress",
          type: "number",
          description: "Progress towards completing a long press (0 to 1).",
        },
      ],
    },
  },

  examplesFile: "use-long-press.example",
};

export default useLongPressDoc;
