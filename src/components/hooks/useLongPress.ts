import { useCallback, useRef, useState } from "react";

interface UseLongPressOptions {
  delay?: number;
  onStart?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
}

export function useLongPress(options: UseLongPressOptions = {}) {
  const { delay = 400, onStart, onFinish, onCancel } = options;
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const start = useCallback(() => {
    onStart?.();
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => {
      onFinish?.();
      setIsPressed(false);
    }, delay);
  }, [delay, onStart, onFinish]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      onCancel?.();
      setIsPressed(false);
    }
  }, [onCancel]);

  const handlers = {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
  };

  return { isPressed, handlers };
}
