import { HookDocumentation } from "@/types/hook-doc";

const useDebounceDoc: HookDocumentation = {
  name: "useDebounce",
  description:
    "A React hook that debounces a value, delaying updates until after a specified delay to optimize performance and reduce unnecessary operations.",
  category: "Utility",
  seo: {
    title: "useDebounce Hook - React Value Debouncing",
    description: "A React hook for debouncing values to optimize performance in search inputs, API calls, and more.",
    keywords: "react hooks, useDebounce, debounce, performance optimization, search input, delay",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useDebounce } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useDebounce<T>(value: T, delay: number): T`,
    parameters: [
      {
        name: "value",
        type: "T",
        description: "The value to debounce.",
      },
      {
        name: "delay",
        type: "number",
        description: "The delay in milliseconds before the value updates.",
      },
    ],
    returns: {
      type: "T",
      description: "The debounced value that only updates after the delay period.",
    },
  },

  examplesFile: "use-debounce.example",
};

export default useDebounceDoc;
