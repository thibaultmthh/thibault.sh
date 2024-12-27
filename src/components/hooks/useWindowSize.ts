import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Hook that tracks the window dimensions and updates when window is resized
 * @returns An object containing the current window width and height
 * @example
 * ```tsx
 * function Component() {
 *   const { width, height } = useWindowSize();
 *   return (
 *     <div>
 *       Window size: {width} x {height}
 *     </div>
 *   );
 * }
 * ```
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
