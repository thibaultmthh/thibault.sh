import { HookDocumentation } from "@/types/hook-doc";

const useThrottleDoc: HookDocumentation = {
  name: "useThrottle",
  description:
    "A React hook that throttles a value, limiting how often it can update to at most once per specified interval for performance optimization.",
  category: "Utility",
  seo: {
    title: "useThrottle Hook - React Value Throttling",
    description:
      "A React hook for throttling values to limit update frequency for scroll events, resize handlers, and high-frequency updates.",
    keywords: "react hooks, useThrottle, throttle, performance optimization, scroll events, rate limiting",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useThrottle } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `function useThrottle<T>(value: T, interval: number): T`,
    parameters: [
      {
        name: "value",
        type: "T",
        description: "The value to throttle.",
      },
      {
        name: "interval",
        type: "number",
        description: "The minimum time interval between updates in milliseconds.",
      },
    ],
    returns: {
      type: "T",
      description: "The throttled value that updates at most once per interval.",
    },
  },

  examplesFile: "use-throttle.example",
};

export default useThrottleDoc;

