import { HookDocumentation } from "@/types/hook-doc";

const useSessionStorageStateDoc: HookDocumentation = {
  name: "useSessionStorageState",
  description:
    "A React hook that manages state synchronized with sessionStorage, persisting data across page refreshes but clearing when the tab closes.",
  category: "State Management",
  seo: {
    title: "useSessionStorageState Hook - React Session Storage State",
    description: "A React hook for managing state with sessionStorage persistence and automatic JSON serialization.",
    keywords: "react hooks, useSessionStorageState, session storage, persistent state, browser storage",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useSessionStorageState } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useSessionStorageState<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void]`,
    parameters: [
      {
        name: "key",
        type: "string",
        description: "The sessionStorage key to store the value under.",
      },
      {
        name: "initialValue",
        type: "T",
        description: "The default value used when no stored value exists.",
      },
    ],
    returns: {
      type: "[T, (value: T | ((val: T) => T)) => void]",
      description: "A tuple containing the current stored value and a setter function.",
      properties: [
        {
          name: "[0]",
          type: "T",
          description: "The current stored value (or initial value if none exists).",
        },
        {
          name: "[1]",
          type: "(value: T | ((val: T) => T)) => void",
          description: "A setter function that updates both state and sessionStorage.",
        },
      ],
    },
  },

  examplesFile: "use-session-storage-state.example",
};

export default useSessionStorageStateDoc;


