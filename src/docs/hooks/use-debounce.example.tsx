"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@thibault.sh/hooks/useDebounce";

// Demo component showcasing debounce functionality
function DebounceDemo() {
  const [inputValue, setInputValue] = useState("");
  const [delay, setDelay] = useState(300);

  const debouncedValue = useDebounce(inputValue, delay);

  const resetDemo = () => {
    setInputValue("");
  };

  const presetDelays = [100, 300, 500, 1000];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex gap-1">
          {presetDelays.map((presetDelay) => (
            <Button
              key={presetDelay}
              variant={delay === presetDelay ? "default" : "outline"}
              size="sm"
              onClick={() => setDelay(presetDelay)}
            >
              {presetDelay}ms
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={resetDemo}>
          Reset
        </Button>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
          className="w-full"
        />
        <div className="text-xs text-muted-foreground">Current delay: {delay}ms</div>
      </div>

      {/* Value comparison */}
      <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-md border text-sm">
        <div className="space-y-1">
          <div className="font-medium text-muted-foreground">Input Value</div>
          <div className="font-mono break-all">&quot;{inputValue}&quot;</div>
        </div>
        <div className="space-y-1">
          <div className="font-medium text-muted-foreground">Debounced Value</div>
          <div className="font-mono break-all">&quot;{debouncedValue}&quot;</div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2 text-sm">
        <div
          className={`w-3 h-3 rounded-full ${inputValue !== debouncedValue ? "bg-orange-500 animate-pulse" : "bg-green-500"}`}
        ></div>
        <span className={inputValue !== debouncedValue ? "text-orange-600" : "text-green-600"}>
          {inputValue !== debouncedValue ? "Debouncing..." : "Values synced"}
        </span>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Basic Debounce Demo",
    component: DebounceDemo,
    source: `import { useState } from "react";
import { useDebounce } from "@thibault.sh/hooks/useDebounce";

function DebounceDemo() {
  const [inputValue, setInputValue] = useState("");
  const [delay, setDelay] = useState(300);
  
  const debouncedValue = useDebounce(inputValue, delay);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setDelay(100)}>100ms</button>
        <button onClick={() => setDelay(300)}>300ms</button>
        <button onClick={() => setDelay(500)}>500ms</button>
      </div>

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-2 gap-4 p-3 bg-gray-100 rounded">
        <div>
          <div>Input Value:</div>
          <div>"{inputValue}"</div>
        </div>
        <div>
          <div>Debounced Value:</div>
          <div>"{debouncedValue}"</div>
        </div>
      </div>

      <div>
        Status: {inputValue !== debouncedValue ? "Debouncing..." : "Synced"}
      </div>
    </div>
  );
}`,
  },
];

export default examples;
