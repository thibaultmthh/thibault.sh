"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryParamsState } from "@thibault.sh/hooks/useQueryParamsState";

// Demo component showcasing URL state synchronization
function QueryParamsDemo() {
  const [text, setText] = useQueryParamsState("text", "");
  const [count, setCount] = useQueryParamsState("count", 0);

  return (
    <div className="space-y-4">
      {/* Text input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Text (synced to URL)</label>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
      </div>

      {/* Counter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Count (synced to URL)</label>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCount(count - 1)}>
            -1
          </Button>
          <span className="font-mono text-lg w-12 text-center">{count}</span>
          <Button variant="outline" size="sm" onClick={() => setCount(count + 1)}>
            +1
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
      </div>

      {/* Current URL display */}
      <div className="p-3 bg-muted/30 rounded border">
        <div className="text-sm font-medium text-muted-foreground mb-1">Current URL:</div>
        <div className="text-xs font-mono break-all">{typeof window !== "undefined" ? window.location.href : ""}</div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div>• Change values above to see URL update automatically</div>
        <div>• Use browser back/forward buttons to navigate through changes</div>
        <div>• Refresh page to see state persist from URL</div>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "URL State Synchronization",
    component: QueryParamsDemo,
    source: `import { useQueryParamsState } from "@thibault.sh/hooks/useQueryParamsState";

function QueryParamsDemo() {
  const [text, setText] = useQueryParamsState("text", "");
  const [count, setCount] = useQueryParamsState("count", 0);

  return (
    <div className="space-y-4">
      <div>
        <label>Text (synced to URL)</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
      </div>

      <div>
        <label>Count (synced to URL)</label>
        <div className="flex gap-2">
          <button onClick={() => setCount(count - 1)}>-1</button>
          <span>{count}</span>
          <button onClick={() => setCount(count + 1)}>+1</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
      </div>

      <div className="p-3 bg-gray-100 rounded">
        <div>Current URL:</div>
        <div className="text-xs break-all">
          {window.location.href}
        </div>
      </div>
    </div>
  );
}`,
  },
];

export default examples;

