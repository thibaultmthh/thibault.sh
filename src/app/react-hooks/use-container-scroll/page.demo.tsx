"use client";

import { useRef } from "react";
import { useContainerScroll } from "@/components/hooks/useContainerScroll";
import { Card } from "@/components/ui/card";

export function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useContainerScroll(containerRef);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <p className="text-sm">
          Scroll Position: <span className="font-medium">X: {x}px</span>, <span className="font-medium">Y: {y}px</span>
        </p>
      </div>

      <Card ref={containerRef} className="w-full h-[300px] overflow-auto p-4">
        <div className="w-[150%] h-[600px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            Try scrolling this container both horizontally and vertically to see the scroll position update in
            real-time.
          </p>
        </div>
      </Card>
    </div>
  );
}
