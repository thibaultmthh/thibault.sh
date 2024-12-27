"use client";

import { Card } from "@/components/ui/card";
import { useScrollPosition } from "@thibault.sh/hooks/useScrollPosition";

export function ScrollPositionDemo() {
  const { x, y } = useScrollPosition();

  const getScrollProgress = () => {
    if (typeof window === "undefined") return 0;

    const windowHeight = window?.innerHeight || 0;
    const documentHeight = document?.documentElement?.scrollHeight || 0;

    return Math.min((y / (documentHeight - windowHeight)) * 100, 100);
  };

  const scrollProgress = getScrollProgress();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <p className="text-muted-foreground">Scroll this page to see the coordinates update in real-time:</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Scroll X</div>
            <div className="text-3xl font-mono text-orange-500">{x}px</div>
          </div>

          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Scroll Y</div>
            <div className="text-3xl font-mono text-orange-500">{y}px</div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Scroll Progress</div>
            <div className="space-y-4">
              <div className="relative h-2 bg-gray-100 rounded">
                <div
                  className="absolute top-0 left-0 h-full bg-orange-500 rounded transition-all"
                  style={{
                    width: `${scrollProgress}%`,
                  }}
                />
              </div>
              <div className="text-sm text-muted-foreground">{Math.round(scrollProgress)}% of page scrolled</div>
            </div>
          </div>

          {/* Create some scrollable content */}
          <div className="relative h-[300px] overflow-x-auto border rounded">
            <div className="w-[1000px] h-full p-4">
              <div className="font-semibold mb-2">Horizontal Scroll Demo</div>
              <div className="text-sm text-muted-foreground">Scroll horizontally to see the X coordinate change</div>
              <div className="absolute bottom-4 left-0 w-full h-2 bg-gray-100">
                <div
                  className="absolute top-0 left-0 h-full bg-orange-500 transition-all"
                  style={{
                    width: `${(x / (1000 - (typeof window !== "undefined" ? window.innerWidth : 0))) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Create some more vertical content for scrolling */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 rounded border">
                <div className="font-semibold mb-2">Scroll Section {i + 1}</div>
                <div className="text-sm text-muted-foreground">
                  This section helps demonstrate vertical scrolling. Keep scrolling to see more!
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useScrollPosition } from "@thibault.sh/hooks/useScrollPosition";

function ScrollPositionDemo() {
  const { x, y } = useScrollPosition();

  const getScrollProgress = () => {
    if (typeof window === 'undefined') return 0;
    
    const windowHeight = window?.innerHeight || 0;
    const documentHeight = document?.documentElement?.scrollHeight || 0;
    
    return Math.min(
      (y / (documentHeight - windowHeight)) * 100,
      100
    );
  };

  const scrollProgress = getScrollProgress();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 rounded border">
          <div className="font-semibold mb-2">Scroll X</div>
          <div className="text-3xl font-mono text-orange-500">{x}px</div>
        </div>

        <div className="p-4 rounded border">
          <div className="font-semibold mb-2">Scroll Y</div>
          <div className="text-3xl font-mono text-orange-500">{y}px</div>
        </div>
      </div>

      <div className="p-4 rounded border">
        <div className="font-semibold mb-2">Scroll Progress</div>
        <div className="space-y-4">
          <div className="relative h-2 bg-gray-100 rounded">
            <div
              className="absolute top-0 left-0 h-full bg-orange-500 rounded transition-all"
              style={{
                width: \`\${scrollProgress}%\`,
              }}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {Math.round(scrollProgress)}% of page scrolled
          </div>
        </div>
      </div>

      {/* Horizontal scroll demo */}
      <div className="relative h-[300px] overflow-x-auto border rounded">
        <div className="w-[1000px] h-full p-4">
          <div className="font-semibold mb-2">Horizontal Scroll Demo</div>
          <div className="text-sm text-muted-foreground">
            Scroll horizontally to see the X coordinate change
          </div>
          <div className="absolute bottom-4 left-0 w-full h-2 bg-gray-100">
            <div
              className="absolute top-0 left-0 h-full bg-orange-500 transition-all"
              style={{
                width: \`\${(x / (1000 - window.innerWidth)) * 100}%\`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}`;
