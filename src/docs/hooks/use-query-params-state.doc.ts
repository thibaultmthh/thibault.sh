import { HookDocumentation } from "@/types/hook-doc";

const useQueryParamsStateDoc: HookDocumentation = {
  name: "useQueryParamsState",
  description:
    "A React hook that manages state synchronized with URL query parameters, automatically persisting state and keeping it in sync with browser navigation.",
  category: "State Management",
  seo: {
    title: "useQueryParamsState Hook - React URL State Management",
    description:
      "A React hook for synchronizing state with URL query parameters for shareable URLs and persistent state.",
    keywords: "react hooks, useQueryParamsState, URL state, query parameters, browser navigation, persistent state",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useQueryParamsState } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useQueryParamsState<T>(
  key: string,
  initialValue: T,
  options?: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }
): [T, (value: T | ((val: T) => T)) => void]`,
    parameters: [
      {
        name: "key",
        type: "string",
        description: "The query parameter key to use in the URL.",
      },
      {
        name: "initialValue",
        type: "T",
        description: "Default value when the parameter doesn't exist.",
      },
      {
        name: "options",
        type: "object",
        description: "Configuration options for serialization.",
        optional: true,
      },
      {
        name: "options.serialize",
        type: "(value: T) => string",
        description: "Custom function to convert value to string.",
        optional: true,
        default: "JSON.stringify",
      },
      {
        name: "options.deserialize",
        type: "(value: string) => T",
        description: "Custom function to parse string back to value.",
        optional: true,
        default: "JSON.parse",
      },
    ],
    returns: {
      type: "[T, (value: T | ((val: T) => T)) => void]",
      description: "A tuple containing the current state value and setter function.",
      properties: [
        {
          name: "[0]",
          type: "T",
          description: "Current state value synchronized with URL query parameter.",
        },
        {
          name: "[1]",
          type: "(value: T | ((val: T) => T)) => void",
          description: "Setter function that updates both state and URL query parameter.",
        },
      ],
    },
  },

  examplesFile: "use-query-params-state.example",
};

export default useQueryParamsStateDoc;

