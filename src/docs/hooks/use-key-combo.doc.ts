import { HookDocumentation } from "@/types/hook-doc";

const useKeyComboDoc: HookDocumentation = {
  name: "useKeyCombo",
  description:
    "A React hook that detects when a specific combination of keys is pressed simultaneously, useful for implementing keyboard shortcuts and hotkeys.",
  category: "Events",
  seo: {
    title: "useKeyCombo Hook - React Keyboard Shortcuts",
    description:
      "A React hook for detecting key combinations and implementing keyboard shortcuts in your applications.",
    keywords: "react hooks, useKeyCombo, keyboard shortcuts, hotkeys, key combinations, key press",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useKeyCombo } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
type KeyCombo = string[];

function useKeyCombo(targetCombo: KeyCombo): boolean`,
    parameters: [
      {
        name: "targetCombo",
        type: "KeyCombo (string[])",
        description: "Array of key names that make up the combination.",
      },
    ],
    returns: {
      type: "boolean",
      description: "Boolean indicating if all keys in the combination are currently pressed.",
    },
  },

  examplesFile: "use-key-combo.example",
};

export default useKeyComboDoc;
