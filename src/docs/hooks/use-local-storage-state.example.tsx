"use client";

import { Button } from "@/components/ui/button";
import { useLocalStorageState } from "@thibault.sh/hooks/useLocalStorageState";

// Demo component showcasing localStorage state
function LocalStorageDemo() {
  const [count, setCount] = useLocalStorageState("demo-count", 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="sm" onClick={() => setCount(count - 1)}>
          -
        </Button>
        <span className="font-mono text-lg w-16 text-center">{count}</span>
        <Button variant="outline" size="sm" onClick={() => setCount(count + 1)}>
          +
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">Counter persists across page refreshes</div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Persistent Counter",
    component: LocalStorageDemo,
    source: `import { useLocalStorageState } from "@thibault.sh/hooks/useLocalStorageState";

function LocalStorageDemo() {
  const [count, setCount] = useLocalStorageState("demo-count", 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      
      <div>Counter persists across page refreshes</div>
    </div>
  );
}`,
  },
];

export default examples;
