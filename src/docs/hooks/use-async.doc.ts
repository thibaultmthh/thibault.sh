import { HookDocumentation } from "@/types/hook-doc";

const useAsyncDoc: HookDocumentation = {
  name: "useAsync",
  description:
    "A React hook that manages asynchronous operations with built-in loading, error, and success states, making it easy to handle data fetching, form submissions, and other async tasks.",
  category: "Utility",
  seo: {
    title: "useAsync Hook - React Asynchronous State Management",
    description: "A React hook for managing asynchronous operations with loading, error, and success states.",
    keywords: "react hooks, useAsync, async operations, loading state, error handling",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useAsync } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
interface AsyncState<T> {
  isLoading: boolean;
  error: Error | null;
  value: T | null;
}

function useAsync<T>(asyncFunction: (...args: any[]) => Promise<T>): {
    execute: (...args: any[]) => Promise<void>;
    status: AsyncState<T>;
}`,
    parameters: [
      {
        name: "asyncFunction",
        type: "(...args: any[]) => Promise<T>",
        description: "An asynchronous function that returns a Promise.",
      },
    ],
    returns: {
      type: "AsyncHookReturn<T>",
      description: "An object containing the execute function and current status of the async operation.",
      properties: [
        {
          name: "execute",
          type: "(...args: any[]) => Promise<void>",
          description:
            "A function that triggers the async operation. Accepts the same arguments as the input async function.",
        },
        {
          name: "status",
          type: "AsyncState<T>",
          description: "Current state of the async operation containing loading state, error, and result value.",
        },
        {
          name: "status.isLoading",
          type: "boolean",
          description: "Boolean indicating whether the async operation is currently in progress.",
        },
        {
          name: "status.error",
          type: "Error | null",
          description: "Error object if the async operation failed, null otherwise.",
        },
        {
          name: "status.value",
          type: "T | null",
          description: "The result of the async operation if successful, null otherwise.",
        },
      ],
    },
  },

  examplesFile: "use-async.example",
};

export default useAsyncDoc;
