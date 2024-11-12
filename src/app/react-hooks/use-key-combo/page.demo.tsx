"use client";

import { useState } from "react";
import { useKeyCombo } from "@/components/hooks/useKeyCombo";
import { Card } from "@/components/ui/card";

export function Demo() {
  const [lastCombo, setLastCombo] = useState<string>("");
  const [count, setCount] = useState(0);

  useKeyCombo(["Control", "s"], () => {
    setLastCombo("Ctrl + S");
    setCount((prev) => prev + 1);
  });

  useKeyCombo(["Control", "k"], () => {
    setLastCombo("Ctrl + K");
    setCount((prev) => prev + 1);
  });

  useKeyCombo(["Shift", "?"], () => {
    setLastCombo("Shift + ?");
    setCount((prev) => prev + 1);
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Try these keyboard combinations:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Ctrl + S</li>
            <li>Ctrl + K</li>
            <li>Shift + ?</li>
          </ul>
        </Card>

        <div className="text-sm space-y-2">
          <p>
            Last triggered combo: <span className="font-mono bg-muted px-2 py-1 rounded">{lastCombo || "None"}</span>
          </p>
          <p>
            Times triggered: <span className="font-medium">{count}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
