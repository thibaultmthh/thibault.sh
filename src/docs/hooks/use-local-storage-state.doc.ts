import { HookDocumentation } from "@/types/hook-doc";

const useLocalStorageStateDoc: HookDocumentation = {
  name: "useLocalStorageState",
  description:
    "A React hook that manages state synchronized with localStorage, providing automatic persistence and SSR compatibility with a useState-like interface.",
  category: "State Management",
  seo: {
    title: "useLocalStorageState Hook - React localStorage State Management",
    description: "A React hook for managing state with localStorage persistence and automatic serialization.",
    keywords: "react hooks, useLocalStorageState, localStorage, persistent state, state management, SSR",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useLocalStorageState } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useLocalStorageState<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void]`,
    parameters: [
      {
        name: "key",
        type: "string",
        description: "The localStorage key to use for persistence.",
      },
      {
        name: "initialValue",
        type: "T",
        description: "The default value to use if no stored value exists.",
      },
    ],
    returns: {
      type: "[T, (value: T | ((val: T) => T)) => void]",
      description: "A tuple containing the current stored value and a setter function.",
      properties: [
        {
          name: "[0]",
          type: "T",
          description: "Current stored value from localStorage or initial value.",
        },
        {
          name: "[1]",
          type: "(value: T | ((val: T) => T)) => void",
          description: "Setter function that updates both state and localStorage.",
        },
      ],
    },
  },

  examplesFile: "use-local-storage-state.example",
};

export default useLocalStorageStateDoc;
