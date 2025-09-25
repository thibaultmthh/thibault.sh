import { HookDocumentation } from "@/types/hook-doc";

const useCookieStateDoc: HookDocumentation = {
  name: "useCookieState",
  description:
    "A React hook for managing state that persists in browser cookies with SSR support, automatic encoding/decoding, and configurable expiration options.",
  category: "State Management",
  seo: {
    title: "useCookieState Hook - React Cookie State Management",
    description:
      "A React hook for managing persistent state in browser cookies with SSR support and configurable options.",
    keywords: "react hooks, useCookieState, cookie state, persistent state, SSR, browser storage",
  },
  installation: {
    package: "@thibault.sh/hooks",
    command: "npm install @thibault.sh/hooks",
  },

  usage: {
    import: `import { useCookieState } from "@thibault.sh/hooks";`,
  },

  api: {
    signature: `
interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

function useCookieState(
  name: string,
  initialValue: string
): [
  string | null,
  (newValue: string, options?: CookieOptions) => void,
  () => void
]`,
    parameters: [
      {
        name: "name",
        type: "string",
        description: "The name of the cookie to manage.",
      },
      {
        name: "initialValue",
        type: "string",
        description: "The default value to use when no cookie exists or on server-side.",
      },
    ],
    returns: {
      type: "[string | null, setCookie, deleteCookie]",
      description: "A tuple containing the current value, setter function, and delete function.",
      properties: [
        {
          name: "value",
          type: "string | null",
          description: "Current cookie value as string, or null if not set.",
        },
        {
          name: "setCookie",
          type: "(newValue: string, options?: CookieOptions) => void",
          description: "Function to update the cookie with optional configuration.",
        },
        {
          name: "deleteCookie",
          type: "() => void",
          description: "Function to remove the cookie from the browser.",
        },
      ],
    },
  },

  examplesFile: "use-cookie-state.example",
};

export default useCookieStateDoc;

