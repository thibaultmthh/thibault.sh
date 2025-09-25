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
