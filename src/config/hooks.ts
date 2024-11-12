export const hooks = {
  "State Management": {
    icon: "store",
    path: "state",
    items: [
      {
        id: "use-local-storage",
        name: "useLocalStorage",
        description:
          "Persist state in localStorage with automatic synchronization across tabs, type-safe storage and retrieval, and fallback value support. Handles JSON serialization and parsing automatically.",
        shortDescription: "Persist state in localStorage with automatic synchronization and type safety.",
        path: "/react-hooks/use-local-storage",

        seo: {
          title: "useLocalStorage Hook - React Local Storage State Management",
          description:
            "A React hook for managing state in localStorage with automatic synchronization and type safety.",
          keywords: "react hooks, useLocalStorage, localStorage, state management, react state",
        },
      },
      {
        id: "use-session-storage",
        name: "useSessionStorage",
        description:
          "Persist state in sessionStorage with automatic synchronization across tabs, type-safe storage and retrieval, and fallback value support.",
        shortDescription: "Persist state in sessionStorage with automatic synchronization and type safety.",
        path: "/react-hooks/use-session-storage",
        seo: {
          title: "useSessionStorage Hook - React Session Storage State Management",
          description:
            "A React hook for managing state in sessionStorage with automatic synchronization and type safety.",
          keywords: "react hooks, useSessionStorage, sessionStorage, state management, react state",
        },
      },
    ],
  },
  "UI & Layout": {
    icon: "layout",
    path: "ui",
    items: [
      {
        id: "use-media-query",
        name: "useMediaQuery",
        description:
          "A React hook for efficiently handling responsive design with media queries. Provides real-time viewport updates, supports complex media queries, and handles SSR gracefully. Perfect for building responsive layouts and implementing device-specific features.",
        shortDescription: "Efficiently handle responsive design with media queries and real-time viewport updates.",
        path: "/react-hooks/use-media-query",
        seo: {
          title: "useMediaQuery Hook - React Responsive Design Hook",
          description: "A React hook for handling responsive design with media queries. Easy to use and performant.",
          keywords: "react hooks, useMediaQuery, responsive design, media queries, react ui",
        },
      },
    ],
  },
  // Add more categories as needed
} as const;
