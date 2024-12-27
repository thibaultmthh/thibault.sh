"use client";

import { Card } from "@/components/ui/card";
import { useContainerScroll } from "@thibault.sh/hooks/useContainerScroll";
import { useRef } from "react";

export function ContainerScrollDemo() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollTop, scrollLeft, scrollWidth, scrollHeight, clientWidth, clientHeight, isScrolling } =
    useContainerScroll(containerRef, 150);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Try scrolling within the container below to see the scroll metrics update in real-time:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Scroll Position</div>
            <div className="space-y-2 text-sm">
              <div>
                Top: <span className="font-mono text-orange-500">{scrollTop}px</span>
              </div>
              <div>
                Left: <span className="font-mono text-orange-500">{scrollLeft}px</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Container Size</div>
            <div className="space-y-2 text-sm">
              <div>
                Client Width: <span className="font-mono text-orange-500">{clientWidth}px</span>
              </div>
              <div>
                Client Height: <span className="font-mono text-orange-500">{clientHeight}px</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Content Size</div>
            <div className="space-y-2 text-sm">
              <div>
                Scroll Width: <span className="font-mono text-orange-500">{scrollWidth}px</span>
              </div>
              <div>
                Scroll Height: <span className="font-mono text-orange-500">{scrollHeight}px</span>
              </div>
            </div>
          </div>

          {/* Scrollable container */}
          <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className="relative h-[300px] overflow-auto border rounded p-4 transition-colors"
            style={{ backgroundColor: isScrolling ? "rgb(255, 247, 237)" : "transparent" }}
          >
            <div className="w-[1000px]">
              <div className="font-semibold mb-4">Scrollable Content</div>
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="p-4 rounded border bg-white">
                    <div className="font-medium">Section {i + 1}</div>
                    <div className="text-sm text-muted-foreground">
                      Scroll around to see the metrics update. This content is intentionally large to demonstrate both
                      vertical and horizontal scrolling.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="p-4 rounded border">
              <div className="font-semibold mb-2">Scroll State</div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isScrolling ? "bg-orange-500" : "bg-gray-300"}`} />
                <span className="text-sm">{isScrolling ? "Currently scrolling..." : "Scroll ended"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useContainerScroll } from "@thibault.sh/hooks/useContainerScroll";
import { useRef } from "react";

function ContainerScrollDemo() {
  const containerRef = useRef<HTMLElement>(null);
  const {
    scrollTop,
    scrollLeft,
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight,
    isScrolling
  } = useContainerScroll(containerRef, 150);

  return (
    <div className="space-y-4">
      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="relative h-[300px] overflow-auto border rounded p-4"
        style={{ backgroundColor: isScrolling ? "rgb(255, 247, 237)" : "transparent" }}
      >
        <div className="w-[1000px]">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="p-4 rounded border">
                <div className="font-medium">Section {i + 1}</div>
                <div className="text-sm text-muted-foreground">
                  Scroll around to see the metrics update.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicators */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={\`w-3 h-3 rounded-full \${isScrolling ? "bg-orange-500" : "bg-gray-300"}\`} />
          <span className="text-sm">
            {isScrolling ? "Currently scrolling..." : "Scroll ended"}
          </span>
        </div>
      </div>
    </div>
  );
}`;
