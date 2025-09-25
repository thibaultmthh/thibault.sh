"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSessionStorageState } from "@thibault.sh/hooks/useSessionStorageState";

// Demo component showcasing session storage state
function SessionStorageDemo() {
  const [text, setText] = useSessionStorageState("demo-text", "");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Text (persists on refresh):</label>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
      </div>

      <Button variant="outline" size="sm" onClick={() => setText("")}>
        Clear
      </Button>

      <div className="text-xs text-muted-foreground p-3 bg-blue-50 border border-blue-200 rounded">
        <div className="font-medium mb-1">Try this:</div>
        <div>1. Type some text above</div>
        <div>2. Refresh the page - text persists!</div>
        <div>3. Close tab and reopen - text is cleared</div>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Session Storage State",
    component: SessionStorageDemo,
    source: `import { useSessionStorageState } from "@thibault.sh/hooks/useSessionStorageState";

function SessionStorageDemo() {
  const [text, setText] = useSessionStorageState("demo-text", "");

  return (
    <div className="space-y-4">
      <div>
        <label>Text (persists on refresh):</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
      </div>

      <button onClick={() => setText("")}>
        Clear
      </button>
    </div>
  );
}`,
  },
];

export default examples;
