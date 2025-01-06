export const PackageHooks = [
  {
    category: "Get Started",
    items: [{ href: "/hooks", label: "Installation" }],
  },
  {
    category: "State Management",
    items: [
      { href: "/hooks/use-local-storage-state", label: "useLocalStorageState" },
      { href: "/hooks/use-session-storage-state", label: "useSessionStorageState" },
      { href: "/hooks/use-cookie-state", label: "useCookieState" },
      { href: "/hooks/use-query-params-state", label: "useQueryParamsState" },
    ],
  },
  {
    category: "UI/Interaction",
    items: [
      { href: "/hooks/use-click-outside", label: "useClickOutside" },
      { href: "/hooks/use-hover", label: "useHover" },
      { href: "/hooks/use-key-press", label: "useKeyPress" },
      { href: "/hooks/use-key-combo", label: "useKeyCombo" },
      { href: "/hooks/use-long-press", label: "useLongPress" },
    ],
  },
  {
    category: "Layout/Viewport",
    items: [
      { href: "/hooks/use-media-query", label: "useMediaQuery" },
      { href: "/hooks/use-window-size", label: "useWindowSize" },
      { href: "/hooks/use-scroll-position", label: "useScrollPosition" },
      { href: "/hooks/use-container-scroll", label: "useContainerScroll" },
      { href: "/hooks/use-element-size", label: "useElementSize" },
      { href: "/hooks/use-intersection-observer", label: "useIntersectionObserver" },
      { href: "/hooks/use-resize-observer", label: "useResizeObserver" },
    ],
  },
  {
    category: "Utility",
    items: [
      { href: "/hooks/use-async", label: "useAsync" },
      { href: "/hooks/use-debounce", label: "useDebounce" },
      { href: "/hooks/use-throttle", label: "useThrottle" },
      { href: "/hooks/use-timer", label: "useTimer" },
      { href: "/hooks/use-interval", label: "useInterval" },
      { href: "/hooks/use-event-listener", label: "useEventListener" },
    ],
  },
];
