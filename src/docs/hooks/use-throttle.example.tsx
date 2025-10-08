"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useThrottle } from "@thibault.sh/hooks/useThrottle";

// Demo component showcasing throttle functionality
function ThrottleDemo() {
  const [inputValue, setInputValue] = useState("");
  const [interval, setInterval] = useState(300);
  const [updateCount, setUpdateCount] = useState(0);

  const throttledValue = useThrottle(inputValue, interval);

  // Count throttled updates
  const [throttleUpdateCount, setThrottleUpdateCount] = useState(0);

  // Track when throttled value changes
  useState(() => {
    if (throttledValue !== "") {
      setThrottleUpdateCount((prev) => prev + 1);
    }
  });

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setUpdateCount((prev) => prev + 1);
  };

  const resetDemo = () => {
    setInputValue("");
    setUpdateCount(0);
    setThrottleUpdateCount(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setInterval(100)}>
          100ms
        </Button>
        <Button variant="outline" size="sm" onClick={() => setInterval(300)}>
          300ms
        </Button>
        <Button variant="outline" size="sm" onClick={() => setInterval(1000)}>
          1000ms
        </Button>
        <Button variant="outline" size="sm" onClick={resetDemo}>
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <input
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Type rapidly to test throttling..."
          className="w-full p-2 border rounded"
        />
        <div className="text-xs text-muted-foreground">Interval: {interval}ms</div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded border text-sm">
        <div className="space-y-1">
          <div className="font-medium text-muted-foreground">Input Value</div>
          <div className="font-mono break-all">&quot;{inputValue}&quot;</div>
          <div className="text-xs">Updates: {updateCount}</div>
        </div>
        <div className="space-y-1">
          <div className="font-medium text-muted-foreground">Throttled Value</div>
          <div className="font-mono break-all">&quot;{throttledValue}&quot;</div>
          <div className="text-xs">Updates: {throttleUpdateCount}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <div
          className={`w-3 h-3 rounded-full ${inputValue !== throttledValue ? "bg-orange-500" : "bg-green-500"}`}
        ></div>
        <span>{inputValue !== throttledValue ? "Throttling active" : "Values synced"}</span>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Throttle Demo",
    component: ThrottleDemo,
    source: `import { useState } from "react";
import { useThrottle } from "@thibault.sh/hooks/useThrottle";

function ThrottleDemo() {
  const [inputValue, setInputValue] = useState("");
  const [interval, setInterval] = useState(300);
  
  const throttledValue = useThrottle(inputValue, interval);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setInterval(100)}>100ms</button>
        <button onClick={() => setInterval(300)}>300ms</button>
        <button onClick={() => setInterval(1000)}>1000ms</button>
      </div>

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type rapidly to test throttling..."
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-2 gap-4 p-3 bg-gray-100 rounded">
        <div>
          <div>Input: "{inputValue}"</div>
        </div>
        <div>
          <div>Throttled: "{throttledValue}"</div>
        </div>
      </div>

      <div>
        Status: {inputValue !== throttledValue ? "Throttling" : "Synced"}
      </div>
    </div>
  );
}`,
  },
];

export default examples;


