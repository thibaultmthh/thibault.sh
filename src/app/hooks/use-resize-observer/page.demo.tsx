"use client";

import { Card } from "@/components/ui/card";
import { useResizeObserver } from "@thibault.sh/hooks/useResizeObserver";
import { useRef } from "react";

function ResizeBox() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(boxRef as React.RefObject<HTMLElement>);

  const contentRect = entry?.contentRect;
  const contentBoxSize = entry?.contentBoxSize[0];
  const borderBoxSize = entry?.borderBoxSize[0];

  return (
    <div className="space-y-4">
      <div
        ref={boxRef}
        className="resize overflow-hidden border-4 border-orange-200 bg-orange-50 p-4 rounded-lg min-w-[200px] min-h-[100px]"
      >
        <div className="text-sm text-muted-foreground">Drag any edge or corner to resize this box</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <h4 className="text-sm font-medium mb-2">Content Box</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Width:</span>
              <span className="font-mono text-orange-500">{Math.round(contentRect?.width ?? 0)}px</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Height:</span>
              <span className="font-mono text-orange-500">{Math.round(contentRect?.height ?? 0)}px</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="text-sm font-medium mb-2">Border Box</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Width:</span>
              <span className="font-mono text-orange-500">{Math.round(borderBoxSize?.inlineSize ?? 0)}px</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Height:</span>
              <span className="font-mono text-orange-500">{Math.round(borderBoxSize?.blockSize ?? 0)}px</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="text-sm font-medium mb-2">Content Box Size</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Inline:</span>
              <span className="font-mono text-orange-500">{Math.round(contentBoxSize?.inlineSize ?? 0)}px</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Block:</span>
              <span className="font-mono text-orange-500">{Math.round(contentBoxSize?.blockSize ?? 0)}px</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ResponsiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(gridRef as React.RefObject<HTMLElement>);
  const width = entry?.contentRect.width ?? 0;
  const columns = Math.max(1, Math.floor(width / 100));

  return (
    <div ref={gridRef} className="space-y-4">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center font-medium text-orange-600"
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="text-sm text-muted-foreground text-center">
        Current width: {Math.round(width)}px ({columns} columns)
      </div>
    </div>
  );
}

export function ResizeObserverDemo() {
  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">1. Resizable Box with Detailed Metrics</h3>
          <ResizeBox />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">2. Responsive Grid</h3>
          <ResponsiveGrid />
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useResizeObserver } from "@thibault.sh/hooks/useResizeObserver";
import { useRef } from "react";

// Example 1: Tracking Detailed Size Metrics
function ResizeBox() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(boxRef);

  const contentRect = entry?.contentRect;
  const contentBoxSize = entry?.contentBoxSize[0];
  const borderBoxSize = entry?.borderBoxSize[0];

  return (
    <div>
      <div ref={boxRef} className="resize border-4 p-4">
        Resize me!
      </div>
      <div>
        Content: {contentRect?.width}x{contentRect?.height}
        Border: {borderBoxSize?.inlineSize}x{borderBoxSize?.blockSize}
      </div>
    </div>
  );
}

// Example 2: Responsive Grid
function ResponsiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(gridRef);
  const width = entry?.contentRect.width ?? 0;
  const columns = Math.max(1, Math.floor(width / 100));

  return (
    <div ref={gridRef}>
      <div style={{ gridTemplateColumns: \`repeat(\${columns}, 1fr)\` }}>
        {items.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    </div>
  );
}`;
