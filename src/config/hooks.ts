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
      {
        id: "use-click-outside",
        name: "useClickOutside",
        description:
          "A React hook that detects clicks outside of a specified element. Perfect for implementing dismissible UI components like modals, dropdowns, and popups. Supports both mouse and touch events with TypeScript type safety.",
        shortDescription: "Detect clicks outside of a specified element for dismissible UI components.",
        path: "/react-hooks/use-click-outside",
        seo: {
          title: "useClickOutside Hook - React Click Outside Detection",
          description: "A React hook for detecting clicks outside of elements. Ideal for modals and dropdowns.",
          keywords: "react hooks, useClickOutside, click outside, modal, dropdown, react ui",
        },
      },
      {
        id: "use-hover",
        name: "useHover",
        description:
          "A React hook that tracks hover state of DOM elements with TypeScript support. Provides a simple interface for handling hover interactions and implementing hover effects. Includes ref-based tracking and optimized re-renders.",
        shortDescription: "Track hover state of DOM elements with TypeScript support.",
        path: "/react-hooks/use-hover",
        seo: {
          title: "useHover Hook - React Hover State Management",
          description:
            "A React hook for managing hover states with TypeScript support. Perfect for interactive UI elements.",
          keywords: "react hooks, useHover, hover state, mouse events, react ui, typescript",
        },
      },
      {
        id: "use-key-press",
        name: "useKeyPress",
        description:
          "A React hook that tracks keyboard key states. Provides real-time feedback for key press events, perfect for implementing keyboard shortcuts, game controls, or accessibility features. Supports any keyboard key with TypeScript type safety.",
        shortDescription: "Track keyboard key states with real-time feedback.",
        path: "/react-hooks/use-key-press",
        seo: {
          title: "useKeyPress Hook - React Keyboard Event Handler",
          description:
            "A React hook for handling keyboard events and tracking key states. Perfect for shortcuts and games.",
          keywords: "react hooks, useKeyPress, keyboard events, key press, react ui, typescript",
        },
      },
      {
        id: "use-key-combo",
        name: "useKeyCombo",
        description:
          "A React hook for handling keyboard shortcuts and key combinations with a simple callback-based API. Perfect for implementing application-wide shortcuts, command palettes, and keyboard navigation.",
        shortDescription: "Handle keyboard combinations and shortcuts with ease.",
        path: "/react-hooks/use-key-combo",
        seo: {
          title: "useKeyCombo Hook - React Keyboard Shortcuts Handler",
          description:
            "A React hook for handling keyboard shortcuts and combinations. Perfect for application shortcuts.",
          keywords: "react hooks, useKeyCombo, keyboard shortcuts, key combinations, react ui, typescript",
        },
      },
    ],
  },
  // Add more categories as needed
} as const;
