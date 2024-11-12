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
      {
        id: "use-long-press",
        name: "useLongPress",
        description:
          "A React hook for handling long press gestures on elements with customizable duration and callbacks. Supports both mouse and touch events with TypeScript type safety.",
        shortDescription: "Handle long press gestures with customizable duration and callbacks.",
        path: "/react-hooks/use-long-press",
        seo: {
          title: "useLongPress Hook - React Long Press Gesture Handler",
          description: "A React hook for handling long press gestures with customizable duration and callbacks.",
          keywords: "react hooks, useLongPress, long press, gesture, touch events, react ui",
        },
      },
      {
        id: "use-window-size",
        name: "useWindowSize",
        description:
          "A React hook that tracks window dimensions in real-time, providing responsive width and height values with TypeScript support. Perfect for creating responsive layouts and handling window resize events efficiently.",
        shortDescription: "Track window dimensions in real-time with TypeScript support.",
        path: "/react-hooks/use-window-size",
        seo: {
          title: "useWindowSize Hook - React Window Dimensions Tracker",
          description: "A React hook for tracking window dimensions in real-time. Perfect for responsive layouts.",
          keywords: "react hooks, useWindowSize, window size, responsive design, react ui, typescript",
        },
      },
      {
        id: "use-scroll-position",
        name: "useScrollPosition",
        description:
          "A React hook that tracks window scroll position in real-time, providing both vertical and horizontal scroll coordinates. Perfect for implementing scroll-based animations, infinite scrolling, or scroll progress indicators.",
        shortDescription: "Track window scroll position in real-time with TypeScript support.",
        path: "/react-hooks/use-scroll-position",
        seo: {
          title: "useScrollPosition Hook - React Scroll Position Tracker",
          description:
            "A React hook for tracking window scroll position in real-time. Perfect for scroll-based features.",
          keywords: "react hooks, useScrollPosition, scroll position, scroll tracking, react ui, typescript",
        },
      },
      {
        id: "use-container-scroll",
        name: "useContainerScroll",
        description:
          "A React hook that tracks scroll position of a container element in real-time, providing both vertical and horizontal scroll coordinates. Perfect for implementing scroll-based animations, custom scrollbars, or scroll progress indicators within specific containers.",
        shortDescription: "Track container element scroll position in real-time with TypeScript support.",
        path: "/react-hooks/use-container-scroll",
        seo: {
          title: "useContainerScroll Hook - React Container Scroll Position Tracker",
          description:
            "A React hook for tracking container element scroll position in real-time. Perfect for scroll-based features.",
          keywords:
            "react hooks, useContainerScroll, scroll position, scroll tracking, container scroll, react ui, typescript",
        },
      },
      {
        id: "use-element-size",
        name: "useElementSize",
        description:
          "A React hook that tracks element dimensions in real-time using ResizeObserver. Perfect for responsive layouts, dynamic content sizing, and custom resize functionality. Provides accurate width and height measurements with TypeScript support.",
        shortDescription: "Track element dimensions in real-time with ResizeObserver.",
        path: "/react-hooks/use-element-size",
        seo: {
          title: "useElementSize Hook - React Element Dimension Tracker",
          description:
            "A React hook for tracking element dimensions in real-time using ResizeObserver. Perfect for responsive layouts.",
          keywords: "react hooks, useElementSize, ResizeObserver, element size, responsive design, react ui",
        },
      },
      {
        id: "use-timer",
        name: "useTimer",
        description:
          "A flexible timer hook for creating stopwatches, countdowns, and interval-based timers with pause, resume, and reset functionality. Perfect for creating time-based interactions and animations.",
        shortDescription: "Create flexible timers with pause, resume, and reset functionality.",
        path: "/react-hooks/use-timer",
        seo: {
          title: "useTimer Hook - React Timer Management",
          description:
            "A React hook for creating flexible timers with support for countdowns, stopwatches, and interval-based timing.",
          keywords: "react hooks, useTimer, timer, countdown, stopwatch, react ui",
        },
      },
    ],
  },
  "Device & Hardware": {
    icon: "cpu",
    path: "device",
    items: [
      {
        id: "use-battery",
        name: "useBattery",
        description:
          "Monitor device battery status in real-time with TypeScript support. Provides battery level, charging status, and time estimates with automatic updates.",
        shortDescription: "Monitor device battery status in real-time.",
        path: "/react-hooks/use-battery",
        seo: {
          title: "useBattery Hook - React Battery Status Monitor",
          description: "A React hook for monitoring device battery status in real-time with TypeScript support.",
          keywords: "react hooks, useBattery, battery status, device monitoring, react hardware",
        },
      },
      {
        id: "use-geolocation",
        name: "useGeolocation",
        description:
          "Access and track the user's geographic location with real-time updates, high accuracy support, and comprehensive error handling. Perfect for maps, location-based services, and navigation applications.",
        shortDescription: "Track user's geographic location with real-time updates.",
        path: "/react-hooks/use-geolocation",
        seo: {
          title: "useGeolocation Hook - React Geolocation Tracking",
          description:
            "A React hook for accessing and tracking user location with real-time updates and error handling.",
          keywords: "react hooks, useGeolocation, location tracking, GPS, geolocation API, react hardware",
        },
      },
      {
        id: "use-time-zone",
        name: "useTimeZone",
        description:
          "Access and monitor the user's time zone information including UTC offset, abbreviation, and DST status. Perfect for international applications and time-sensitive features.",
        shortDescription: "Access and monitor user's time zone information.",
        path: "/react-hooks/use-time-zone",
        seo: {
          title: "useTimeZone Hook - React Time Zone Information",
          description: "A React hook for accessing and monitoring time zone information with real-time updates.",
          keywords: "react hooks, useTimeZone, time zone, UTC offset, DST, react hardware",
        },
      },
    ],
  },
} as const;
