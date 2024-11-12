"use client";

import { useState } from "react";
import { useLongPress } from "@/components/hooks/useLongPress";
import { Button } from "@/components/ui/button";

export function Demo() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<string>("");

  const { isPressed, handlers } = useLongPress({
    delay: 1000,
    onStart: () => setStatus("Started pressing..."),
    onFinish: () => {
      setCount((prev) => prev + 1);
      setStatus("Long press completed!");
    },
    onCancel: () => setStatus("Press cancelled"),
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Button {...handlers} className={isPressed ? "bg-primary-foreground" : ""}>
          Press and Hold (1s)
        </Button>
        <p className="text-sm text-muted-foreground">
          Long press count: <span className="font-medium">{count}</span>
        </p>
      </div>
      <p className="text-sm text-muted-foreground">{status}</p>
    </div>
  );
}
