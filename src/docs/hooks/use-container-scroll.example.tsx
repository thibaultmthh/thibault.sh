"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useContainerScroll } from "@thibault.sh/hooks/useContainerScroll";

// Demo component showcasing scroll tracking
function ContainerScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scroll = useContainerScroll(containerRef, 200);

  const scrollToPosition = (top: number, left: number = 0) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top, left, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4">
      {/* Control buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={() => scrollToPosition(0)}>
          Top
        </Button>
        <Button variant="outline" size="sm" onClick={() => scrollToPosition(300)}>
          Middle
        </Button>
        <Button variant="outline" size="sm" onClick={() => scrollToPosition(600)}>
          Bottom
        </Button>
        <Button variant="outline" size="sm" onClick={() => scrollToPosition(150, 100)}>
          Scroll Both
        </Button>
      </div>

      {/* Scroll info display */}
      <div className="grid grid-cols-2 gap-2 text-xs bg-muted/30 p-3 rounded-md border">
        <div className="space-y-1">
          <div className="font-medium text-muted-foreground">Position</div>
          <div>Top: {scroll.scrollTop}px</div>
          <div>Left: {scroll.scrollLeft}px</div>
        </div>
        <div className="space-y-1">
          <div className="font-medium text-muted-foreground">Dimensions</div>
          <div>
            Visible: {scroll.clientWidth}×{scroll.clientHeight}
          </div>
          <div>
            Content: {scroll.scrollWidth}×{scroll.scrollHeight}
          </div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <div className="flex items-center gap-2 text-sm">
        <div className={`w-3 h-3 rounded-full ${scroll.isScrolling ? "bg-blue-500 animate-pulse" : "bg-muted"}`}></div>
        <span className={scroll.isScrolling ? "text-blue-600 font-medium" : "text-muted-foreground"}>
          {scroll.isScrolling ? "Scrolling..." : "Not scrolling"}
        </span>
      </div>

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="h-40 w-full border rounded-md overflow-auto bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="w-[150%] h-[200%] p-4 relative">
          {/* Grid pattern for visual reference */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 border-t border-gray-400"
                style={{ top: `${i * 50}px` }}
              />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 border-l border-gray-400"
                style={{ left: `${i * 50}px` }}
              />
            ))}
          </div>

          {/* Content markers */}
          <div className="absolute top-4 left-4 p-2 bg-white rounded shadow-sm text-xs">Top Left (0, 0)</div>
          <div className="absolute top-4 right-4 p-2 bg-white rounded shadow-sm text-xs">Top Right</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-white rounded shadow-md text-sm font-medium">
            Center Content
          </div>
          <div className="absolute bottom-4 left-4 p-2 bg-white rounded shadow-sm text-xs">Bottom Left</div>
          <div className="absolute bottom-4 right-4 p-2 bg-white rounded shadow-sm text-xs">Bottom Right</div>

          {/* Additional content for scrolling */}
          <div className="mt-20 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="p-3 bg-white/50 rounded border border-white/80">
                <div className="text-sm font-medium">Content Block {i + 1}</div>
                <div className="text-xs text-muted-foreground">
                  Scroll position: {scroll.scrollTop}px, {scroll.scrollLeft}px
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Scroll the container above to see real-time position and dimension updates
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Container Scroll Tracking",
    component: ContainerScrollDemo,
    source: `import { useRef } from "react";
import { useContainerScroll } from "@thibault.sh/hooks/useContainerScroll";

function ContainerScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scroll = useContainerScroll(containerRef, 200);

  const scrollToPosition = (top: number, left: number = 0) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top, left, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => scrollToPosition(0)}>Top</button>
        <button onClick={() => scrollToPosition(300)}>Middle</button>
        <button onClick={() => scrollToPosition(600)}>Bottom</button>
      </div>

      <div className="grid grid-cols-2 gap-4 p-3 bg-gray-100 rounded">
        <div>
          <div>Position: {scroll.scrollTop}px, {scroll.scrollLeft}px</div>
          <div>Visible: {scroll.clientWidth}×{scroll.clientHeight}</div>
        </div>
        <div>
          <div>Content: {scroll.scrollWidth}×{scroll.scrollHeight}</div>
          <div>Scrolling: {scroll.isScrolling ? "Yes" : "No"}</div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-40 w-full border overflow-auto"
      >
        <div className="w-[150%] h-[200%] p-4">
          <div>Top content</div>
          <div style={{ marginTop: '300px' }}>Middle content</div>
          <div style={{ marginTop: '300px' }}>Bottom content</div>
        </div>
      </div>
    </div>
  );
}`,
  },
];

export default examples;
