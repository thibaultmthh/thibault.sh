"use client";

import { useRef, useState } from "react";
import { useElementSize } from "@/components/hooks/useElementSize";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const size = useElementSize(ref);
  const [padding, setPadding] = useState(4);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Button onClick={() => setPadding((p) => Math.max(1, p - 1))} variant="outline">
          Decrease Padding
        </Button>
        <Button onClick={() => setPadding((p) => Math.min(12, p + 1))} variant="outline">
          Increase Padding
        </Button>
      </div>

      <Card ref={ref} className="bg-muted transition-all duration-200" style={{ padding: `${padding * 0.25}rem` }}>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">This card&apos;s dimensions are being tracked in real-time.</p>
          <p className="font-mono text-sm">Width: {Math.round(size.width)}px</p>
          <p className="font-mono text-sm">Height: {Math.round(size.height)}px</p>
        </div>
      </Card>
    </div>
  );
}
