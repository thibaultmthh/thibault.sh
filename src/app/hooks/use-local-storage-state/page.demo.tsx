"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocalStorageState } from "@thibault.sh/hooks/useLocalStorageState";

export function LocalStorageDemo() {
  const [count, setCount] = useLocalStorageState("demo-counter", 0);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">This counter persists across page refreshes and syncs between tabs:</p>
        <div className="flex items-center gap-4">
          <Button onClick={() => setCount((c) => c - 1)}>-</Button>
          <span className="text-xl font-bold">{count}</span>
          <Button onClick={() => setCount((c) => c + 1)}>+</Button>
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocalStorageState } from "@thibault.sh/hooks/useLocalStorageState";

export function LocalStorageDemo() {
  const [count, setCount] = useLocalStorageState("demo-counter", 0);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          This counter persists across page refreshes and syncs between tabs:
        </p>
        <div className="flex items-center gap-4">
          <Button onClick={() => setCount((c) => c - 1)}>-</Button>
          <span className="text-xl font-bold">{count}</span>
          <Button onClick={() => setCount((c) => c + 1)}>+</Button>
        </div>
      </div>
    </Card>
  );
}`;
