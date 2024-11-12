import { useEffect, RefObject } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(mouseEvent, listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, mouseEvent]);
}
