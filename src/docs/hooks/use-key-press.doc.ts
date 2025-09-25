import { HookDocumentation } from "@/types/hook-doc";

const useKeyPressDoc: HookDocumentation = {
  name: "useKeyPress",
  description:
    "A React hook that detects when a specific key is pressed and held down, returning true while pressed and false when released.",
  category: "Events",
  seo: {
    title: "useKeyPress Hook - React Key Press Detection",
    description: "A React hook for detecting individual key presses and tracking key hold states in real-time.",
    keywords: "react hooks, useKeyPress, key press, keyboard events, key detection, key state",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useKeyPress } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useKeyPress(targetKey: string): boolean`,
    parameters: [
      {
        name: "targetKey",
        type: "string",
        description: "The key to detect (e.g., 'Enter', 'Escape', 'ArrowUp', 'a').",
      },
    ],
    returns: {
      type: "boolean",
      description: "Boolean indicating if the target key is currently pressed.",
    },
  },

  examplesFile: "use-key-press.example",
};

export default useKeyPressDoc;
