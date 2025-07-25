"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInterval } from "@thibault.sh/hooks/useInterval";
import { useState } from "react";

function CounterExample() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number | null>(1000);

  useInterval(() => {
    setCount(count + 1);
  }, delay);

  const handlePause = () => {
    setDelay(null);
  };

  const handleResume = () => {
    setDelay(1000);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        A simple counter that increments every second. You can pause and resume the interval.
      </div>

      <div className="rounded-lg border bg-muted/50 p-6">
        <div className="text-4xl font-mono text-center mb-6 tabular-nums">{count}</div>

        <div className="flex gap-4 justify-center">
          <Button variant={delay === null ? "default" : "outline-solid"} onClick={handlePause} disabled={delay === null}>
            Pause
          </Button>
          <Button variant={delay !== null ? "outline-solid" : "default"} onClick={handleResume} disabled={delay !== null}>
            Resume
          </Button>
        </div>
      </div>
    </div>
  );
}

function TimerExample() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setTime((t) => t + 0.1);
    },
    isRunning ? 100 : null
  );

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">A stopwatch timer with start, stop, and reset functionality.</div>

      <div className="rounded-lg border bg-muted/50 p-6">
        <div className="text-4xl font-mono text-center mb-6 tabular-nums">{time.toFixed(1)}s</div>

        <div className="flex gap-4 justify-center">
          {!isRunning ? (
            <Button onClick={handleStart} variant="default">
              Start
            </Button>
          ) : (
            <Button onClick={handleStop} variant="outline">
              Stop
            </Button>
          )}
          <Button onClick={handleReset} variant="outline" disabled={time === 0 && !isRunning}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProgressExample() {
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number | null>(50);

  useInterval(() => {
    setProgress((p) => {
      if (p >= 100) {
        setSpeed(null);
        return 100;
      }
      return p + 1;
    });
  }, speed);

  const handleRestart = () => {
    setProgress(0);
    setSpeed(50);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">A progress bar that automatically fills up and stops at 100%.</div>

      <div className="rounded-lg border bg-muted/50 p-6">
        <div className="h-4 rounded-full bg-muted mb-4 overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm font-mono">{progress}%</div>
          {progress === 100 && (
            <Button onClick={handleRestart} variant="outline" size="sm">
              Restart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function IntervalDemo() {
  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">1. Simple Counter</h3>
          <CounterExample />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">2. Stopwatch Timer</h3>
          <TimerExample />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">3. Progress Bar</h3>
          <ProgressExample />
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useInterval } from "@thibault.sh/hooks/useInterval";
import { useState } from "react";

// Example 1: Simple Counter
function CounterExample() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number | null>(1000);

  useInterval(() => {
    setCount(count + 1);
  }, delay);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setDelay(null)}>Pause</button>
      <button onClick={() => setDelay(1000)}>Resume</button>
    </div>
  );
}

// Example 2: Stopwatch Timer
function TimerExample() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setTime(t => t + 0.1);
    },
    isRunning ? 100 : null
  );

  return (
    <div>
      <div>{time.toFixed(1)}s</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}`;
