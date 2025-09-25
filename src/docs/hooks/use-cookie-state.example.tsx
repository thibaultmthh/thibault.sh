"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCookieState } from "@thibault.sh/hooks/useCookieState";

// Simple demo showcasing the three main features of useCookieState
function CookieStateDemo() {
  const [name, setName, deleteName] = useCookieState("demo-name", "");
  const [count, setCount, deleteCount] = useCookieState("demo-count", "0");

  return (
    <div className="space-y-4">
      {/* Basic string cookie */}
      <div className="space-y-2">
        <Label>Name (persists in cookie)</Label>
        <div className="flex gap-2">
          <Input value={name || ""} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          <Button variant="outline" onClick={deleteName}>
            Clear
          </Button>
        </div>
      </div>

      {/* Counter with custom expiry */}
      <div className="space-y-2">
        <Label>Counter (30-day expiry)</Label>
        <div className="flex gap-2 items-center">
          <Button onClick={() => setCount(String(parseInt(count || "0") + 1), { days: 30 })}>
            Count: {count || "0"}
          </Button>
          <Button variant="outline" onClick={deleteCount}>
            Reset
          </Button>
        </div>
      </div>

      {/* Current values display */}
      <div className="p-3 bg-muted/30 rounded border text-sm">
        <div>
          Name: <code>{name || "not set"}</code>
        </div>
        <div>
          Count: <code>{count || "0"}</code>
        </div>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Cookie State Management",
    component: CookieStateDemo,
    source: `import { useCookieState } from "@thibault.sh/hooks/useCookieState";

function CookieStateDemo() {
  const [name, setName, deleteName] = useCookieState("demo-name", "");
  const [count, setCount, deleteCount] = useCookieState("demo-count", "0");

  return (
    <div className="space-y-4">
      {/* Basic string cookie */}
      <div>
        <label>Name (persists in cookie)</label>
        <input
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={deleteName}>Clear</button>
      </div>

      {/* Counter with custom expiry */}
      <div>
        <label>Counter (30-day expiry)</label>
        <button 
          onClick={() => setCount(String(parseInt(count || "0") + 1), { days: 30 })}
        >
          Count: {count || "0"}
        </button>
        <button onClick={deleteCount}>Reset</button>
      </div>

      {/* Current values display */}
      <div>
        <div>Name: {name || "not set"}</div>
        <div>Count: {count || "0"}</div>
      </div>
    </div>
  );
}`,
  },
];

export default examples;
