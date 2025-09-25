import { HookDocumentation } from "@/types/hook-doc";

const useCountdownDoc: HookDocumentation = {
  name: "useCountdown",
  description:
    "A React hook that creates a countdown timer to a target date with automatic updates and real-time countdown values.",
  category: "Utility",
  seo: {
    title: "useCountdown Hook - React Countdown Timer",
    description: "A React hook for creating countdown timers with automatic updates to target dates.",
    keywords: "react hooks, useCountdown, countdown timer, date countdown, timer, countdown",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useCountdown } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
function useCountdown(
  countDownDate: number, 
  refreshRate?: number
): readonly [number, number, number, number]`,
    parameters: [
      {
        name: "countDownDate",
        type: "number",
        description: "Target date as a timestamp in milliseconds (e.g., new Date('2024-12-31').getTime()).",
      },
      {
        name: "refreshRate",
        type: "number",
        description: "Update interval in milliseconds.",
        optional: true,
        default: "1000",
      },
    ],
    returns: {
      type: "readonly [number, number, number, number]",
      description: "A readonly tuple containing [days, hours, minutes, seconds] representing time remaining.",
      properties: [
        {
          name: "[0] days",
          type: "number",
          description: "Number of days remaining (0 if countdown has ended).",
        },
        {
          name: "[1] hours",
          type: "number",
          description: "Number of hours remaining (0-23, or 0 if countdown has ended).",
        },
        {
          name: "[2] minutes",
          type: "number",
          description: "Number of minutes remaining (0-59, or 0 if countdown has ended).",
        },
        {
          name: "[3] seconds",
          type: "number",
          description: "Number of seconds remaining (0-59, or 0 if countdown has ended).",
        },
      ],
    },
  },

  examplesFile: "use-countdown.example",
};

export default useCountdownDoc;
