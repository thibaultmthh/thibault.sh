import { HookDocumentation } from "@/types/hook-doc";

const useIntervalDoc: HookDocumentation = {
  name: "useInterval",
  description:
    "A React hook that creates a setInterval with automatic cleanup and the ability to pause/resume by passing null as the delay.",
  category: "Utility",
  seo: {
    title: "useInterval Hook - React Interval Management",
    description: "A React hook for managing intervals with automatic cleanup and pause/resume functionality.",
    keywords: "react hooks, useInterval, interval, timer, setInterval, cleanup, pause, resume",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useInterval } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useInterval(callback: () => void, delay: number | null): void`,
    parameters: [
      {
        name: "callback",
        type: "() => void",
        description: "The function to execute on each interval tick.",
      },
      {
        name: "delay",
        type: "number | null",
        description: "The delay in milliseconds between executions, or null to pause the interval.",
      },
    ],
    returns: {
      type: "void",
      description: "This hook does not return anything.",
    },
  },

  examplesFile: "use-interval.example",
};

export default useIntervalDoc;
