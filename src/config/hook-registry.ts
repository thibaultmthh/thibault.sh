import { HookDocumentation } from "@/types/hook-doc";
import useAsyncDoc from "@/docs/hooks/use-async.doc";
import useClickOutsideDoc from "@/docs/hooks/use-click-outside.doc";
import useContainerScrollDoc from "@/docs/hooks/use-container-scroll.doc";
import useCookieStateDoc from "@/docs/hooks/use-cookie-state.doc";
import useCountdownDoc from "@/docs/hooks/use-countdown.doc";
import useDebounceDoc from "@/docs/hooks/use-debounce.doc";
import useElementSizeDoc from "@/docs/hooks/use-element-size.doc";
import useEventListenerDoc from "@/docs/hooks/use-event-listener.doc";
import useHoverDoc from "@/docs/hooks/use-hover.doc";
import useIntersectionObserverDoc from "@/docs/hooks/use-intersection-observer.doc";
import useIntervalDoc from "@/docs/hooks/use-interval.doc";
import useKeyComboDoc from "@/docs/hooks/use-key-combo.doc";
import useKeyPressDoc from "@/docs/hooks/use-key-press.doc";
import useLocalStorageStateDoc from "@/docs/hooks/use-local-storage-state.doc";
import useLongPressDoc from "@/docs/hooks/use-long-press.doc";
import useMediaQueryDoc from "@/docs/hooks/use-media-query.doc";
import useQueryParamsStateDoc from "@/docs/hooks/use-query-params-state.doc";
import useResizeObserverDoc from "@/docs/hooks/use-resize-observer.doc";
import useScrollPositionDoc from "@/docs/hooks/use-scroll-position.doc";
import useSessionStorageStateDoc from "@/docs/hooks/use-session-storage-state.doc";
import useThrottleDoc from "@/docs/hooks/use-throttle.doc";
import useWindowSizeDoc from "@/docs/hooks/use-window-size.doc";

// Registry of all hook documentation
export const HOOK_REGISTRY: Record<string, HookDocumentation> = {
  "use-async": useAsyncDoc,
  "use-click-outside": useClickOutsideDoc,
  "use-container-scroll": useContainerScrollDoc,
  "use-cookie-state": useCookieStateDoc,
  "use-countdown": useCountdownDoc,
  "use-debounce": useDebounceDoc,
  "use-element-size": useElementSizeDoc,
  "use-event-listener": useEventListenerDoc,
  "use-hover": useHoverDoc,
  "use-intersection-observer": useIntersectionObserverDoc,
  "use-interval": useIntervalDoc,
  "use-key-combo": useKeyComboDoc,
  "use-key-press": useKeyPressDoc,
  "use-local-storage-state": useLocalStorageStateDoc,
  "use-long-press": useLongPressDoc,
  "use-media-query": useMediaQueryDoc,
  "use-query-params-state": useQueryParamsStateDoc,
  "use-resize-observer": useResizeObserverDoc,
  "use-scroll-position": useScrollPositionDoc,
  "use-session-storage-state": useSessionStorageStateDoc,
  "use-throttle": useThrottleDoc,
  "use-window-size": useWindowSizeDoc,
};

// Helper function to get hook documentation by slug
export function getHookDoc(slug: string): HookDocumentation | null {
  return HOOK_REGISTRY[slug] || null;
}

// Helper function to get all hook slugs
export function getAllHookSlugs(): string[] {
  return Object.keys(HOOK_REGISTRY);
}

// Helper function to check if a hook exists
export function hookExists(slug: string): boolean {
  return slug in HOOK_REGISTRY;
}
