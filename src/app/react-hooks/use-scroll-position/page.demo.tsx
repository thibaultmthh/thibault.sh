"use client";

import { useScrollPosition } from "@/components/hooks/useScrollPosition";
import { Card } from "@/components/ui/card";

export function Demo() {
  const { x, y } = useScrollPosition();

  return (
    <div className="space-y-4">
      <div className="h-[300px] overflow-y-auto border rounded-lg p-4 relative">
        <Card className="sticky top-4 p-4 mb-4 bg-opacity-90 backdrop-blur-xs">
          <div className="text-sm space-y-2">
            <p>
              Scroll Position X: <span className="font-mono">{Math.round(x)}px</span>
            </p>
            <p>
              Scroll Position Y: <span className="font-mono">{Math.round(y)}px</span>
            </p>
          </div>
        </Card>

        {/* Generate some scrollable content */}
      </div>
    </div>
  );
}
