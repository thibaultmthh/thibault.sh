"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useResizeObserver } from "@thibault.sh/hooks/useResizeObserver";

// Demo component showcasing resize observer
function ResizeObserverDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(boxRef);

  const resizeBox = (width: string, height: string) => {
    if (boxRef.current) {
      boxRef.current.style.width = width;
      boxRef.current.style.height = height;
    }
  };

  const contentRect = entry?.contentRect;
  const contentBoxSize = entry?.contentBoxSize?.[0];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => resizeBox("200px", "100px")}>
          Small
        </Button>
        <Button variant="outline" size="sm" onClick={() => resizeBox("300px", "150px")}>
          Large
        </Button>
        <Button variant="outline" size="sm" onClick={() => resizeBox("100%", "80px")}>
          Full Width
        </Button>
      </div>

      <div className="space-y-2 p-3 bg-muted/30 rounded border text-sm">
        <div>
          <strong>Content Rect:</strong>{" "}
          {contentRect ? `${Math.round(contentRect.width)} × ${Math.round(contentRect.height)}px` : "No data"}
        </div>
        <div>
          <strong>Content Box:</strong>{" "}
          {contentBoxSize
            ? `${Math.round(contentBoxSize.inlineSize)} × ${Math.round(contentBoxSize.blockSize)}px`
            : "No data"}
        </div>
      </div>

      <div
        ref={boxRef}
        className="bg-purple-100 border border-purple-300 p-4 resize overflow-auto"
        style={{ width: "250px", height: "120px", minWidth: "100px", minHeight: "60px" }}
      >
        Drag corner to resize
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Resize Observer",
    component: ResizeObserverDemo,
    source: `import { useRef } from "react";
import { useResizeObserver } from "@thibault.sh/hooks/useResizeObserver";

function ResizeObserverDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(boxRef);

  const resizeBox = (width, height) => {
    if (boxRef.current) {
      boxRef.current.style.width = width;
      boxRef.current.style.height = height;
    }
  };

  const contentRect = entry?.contentRect;
  const contentBoxSize = entry?.contentBoxSize?.[0];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => resizeBox("200px", "100px")}>Small</button>
        <button onClick={() => resizeBox("300px", "150px")}>Large</button>
        <button onClick={() => resizeBox("100%", "80px")}>Full Width</button>
      </div>

      <div className="p-3 bg-gray-100 rounded">
        <div>Content Rect: {contentRect?.width} × {contentRect?.height}px</div>
        <div>Content Box: {contentBoxSize?.inlineSize} × {contentBoxSize?.blockSize}px</div>
      </div>

      <div
        ref={boxRef}
        className="bg-purple-100 border p-4 resize overflow-auto"
        style={{ width: "250px", height: "120px" }}
      >
        Drag corner to resize
      </div>
    </div>
  );
}`,
  },
];

export default examples;
