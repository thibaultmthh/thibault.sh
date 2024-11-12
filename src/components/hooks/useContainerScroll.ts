import { RefObject, useEffect, useState } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

export function useContainerScroll(ref: RefObject<HTMLElement> | null): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const handleScroll = () => {
      setScrollPosition({
        x: element.scrollLeft,
        y: element.scrollTop,
      });
    };

    element.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return scrollPosition;
}
