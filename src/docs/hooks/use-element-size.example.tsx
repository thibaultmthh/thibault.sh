"use client";

import { useRef } from "react";
import { useElementSize } from "@thibault.sh/hooks/useElementSize";

// Demo component showcasing element size tracking
function ElementSizeDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(boxRef);

  return (
    <div className="space-y-4">
      <div className="flex gap-2"></div>

      <div className="p-3 bg-muted/30 rounded border text-sm">
        Size:{" "}
        <span className="font-mono">
          {width} × {height}px
        </span>
      </div>

      <div
        ref={boxRef}
        className="bg-blue-100 border border-blue-300 p-4 resize overflow-auto"
        style={{ width: "200px", height: "120px", minWidth: "100px", minHeight: "60px" }}
      >
        Drag corner to resize
      </div>
    </div>
  );
}

// Screen resize demo
function ScreenSizeDemo() {
  const screenRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(screenRef);

  return (
    <div className="space-y-2">
      <div
        ref={screenRef}
        className="w-full h-16 bg-green-100 border border-green-300 flex items-center justify-center"
      >
        Container width: {width}px
      </div>
      <div className="text-xs text-muted-foreground">Resize your browser window to see the width change</div>
    </div>
  );
}

// Export the examples with source code
const examples = [
  {
    title: "Element Size Tracking",
    component: ElementSizeDemo,
    source: `import { useRef } from "react";
import { useElementSize } from "@thibault.sh/hooks/useElementSize";

function ElementSizeDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(boxRef);

  return (
    <div className="space-y-4">
      
      <div className="p-3 bg-gray-100 rounded">
        Size: {width} × {height}px
      </div>

      <div
        ref={boxRef}
        className="bg-blue-100 border p-4 resize overflow-auto"
        style={{ width: "200px", height: "120px" }}
      >
        Drag corner to resize
      </div>
    </div>
  );
}`,
  },
  {
    title: "Screen Resize Detection",
    component: ScreenSizeDemo,
    source: `import { useRef } from "react";
import { useElementSize } from "@thibault.sh/hooks/useElementSize";

function ScreenSizeDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="w-full h-16 bg-green-100 border flex items-center justify-center"
      >
        Container width: {width}px
      </div>
      <div className="text-xs text-gray-600">
        Resize your browser window to see the width change
      </div>
    </div>
  );
}`,
  },
];

export default examples;
