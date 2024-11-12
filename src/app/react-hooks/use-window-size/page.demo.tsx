"use client";

import { useWindowSize } from "@/components/hooks/useWindowSize";
import { Card } from "@/components/ui/card";

export function Demo() {
  const { width, height } = useWindowSize();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Window Width</p>
          <p className="text-2xl font-bold">{width}px</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Window Height</p>
          <p className="text-2xl font-bold">{height}px</p>
        </Card>
      </div>
      <p className="text-sm text-muted-foreground">
        Try resizing your browser window to see the values update in real-time!
      </p>
    </div>
  );
}
