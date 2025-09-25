"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useInterval } from "@thibault.sh/hooks/useInterval";

// Demo component showcasing interval functionality
function IntervalDemo() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number | null>(1000);

  useInterval(() => {
    setCount((count) => count + 1);
  }, delay);

  const toggleInterval = () => {
    setDelay(delay === null ? 1000 : null);
  };

  const changeSpeed = (newDelay: number) => {
    setDelay(newDelay);
  };

  const reset = () => {
    setCount(0);
    setDelay(1000);
  };

  return (
    <div className="space-y-3">
      <div className="text-center">
        <div className="text-3xl font-mono font-bold">{count}</div>
        <div className="text-xs text-muted-foreground">{delay === null ? "Paused" : `Every ${delay}ms`}</div>
      </div>

      <div className="flex gap-1 justify-center">
        <Button variant="outline" size="sm" onClick={toggleInterval}>
          {delay === null ? "Resume" : "Pause"}
        </Button>
        <Button variant="outline" size="sm" onClick={reset}>
          Reset
        </Button>
        <Button variant="outline" size="sm" onClick={() => changeSpeed(2000)}>
          2s
        </Button>
        <Button variant="outline" size="sm" onClick={() => changeSpeed(1000)}>
          1s
        </Button>
        <Button variant="outline" size="sm" onClick={() => changeSpeed(500)}>
          0.5s
        </Button>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Interval Timer",
    component: IntervalDemo,
    source: `import { useState } from "react";
import { useInterval } from "@thibault.sh/hooks/useInterval";

function IntervalDemo() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number | null>(1000);

  useInterval(() => {
    setCount(count => count + 1);
  }, delay);

  const toggleInterval = () => {
    setDelay(delay === null ? 1000 : null);
  };

  const changeSpeed = (newDelay: number) => {
    setDelay(newDelay);
  };

  const reset = () => {
    setCount(0);
    setDelay(1000);
  };

  return (
    <div className="space-y-3">
      <div className="text-center">
        <div className="text-3xl font-bold">{count}</div>
        <div className="text-xs text-gray-600">
          {delay === null ? "Paused" : \`Every \${delay}ms\`}
        </div>
      </div>

      <div className="flex gap-1 justify-center">
        <button onClick={toggleInterval}>
          {delay === null ? "Resume" : "Pause"}
        </button>
        <button onClick={reset}>Reset</button>
        <button onClick={() => changeSpeed(2000)}>2s</button>
        <button onClick={() => changeSpeed(1000)}>1s</button>
        <button onClick={() => changeSpeed(500)}>0.5s</button>
      </div>
    </div>
  );
}`,
  },
];

export default examples;
