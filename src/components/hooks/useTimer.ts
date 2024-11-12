import { useState, useEffect, useCallback } from "react";

interface TimerOptions {
  initialTime?: number;
  interval?: number;
  autostart?: boolean;
  endTime?: number;
  countdown?: boolean;
  onEnd?: () => void;
}

export function useTimer({
  initialTime = 0,
  interval = 1000,
  autostart = false,
  endTime,
  countdown = false,
  onEnd,
}: TimerOptions = {}) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autostart);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(initialTime);
  }, [initialTime]);

  const toggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTime((currentTime) => {
        const newTime = countdown ? currentTime - interval : currentTime + interval;

        if (endTime !== undefined) {
          if ((countdown && newTime <= endTime) || (!countdown && newTime >= endTime)) {
            setIsRunning(false);
            onEnd?.();
            return endTime;
          }
        }

        return newTime;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [isRunning, interval, endTime, countdown, onEnd]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    toggle,
  } as const;
}
