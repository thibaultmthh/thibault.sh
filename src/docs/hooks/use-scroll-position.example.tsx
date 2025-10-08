"use client";

import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@thibault.sh/hooks/useScrollPosition";

// Demo component showcasing scroll position tracking
function ScrollPositionDemo() {
  const { x, y } = useScrollPosition();

  const scrollTo = (targetX: number, targetY: number) => {
    window.scrollTo({ left: targetX, top: targetY, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => scrollTo(0, 0)}>
          Top
        </Button>
        <Button variant="outline" size="sm" onClick={() => scrollTo(0, 500)}>
          Scroll Down
        </Button>
        <Button variant="outline" size="sm" onClick={() => scrollTo(200, y)}>
          Scroll Right
        </Button>
      </div>

      <div className="p-3 bg-muted/30 rounded border text-sm">
        Position:{" "}
        <span className="font-mono">
          {x}, {y}
        </span>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Scroll Position Tracking",
    component: ScrollPositionDemo,
    source: `import { useScrollPosition } from "@thibault.sh/hooks/useScrollPosition";

function ScrollPositionDemo() {
  const { x, y } = useScrollPosition();

  const scrollTo = (targetX, targetY) => {
    window.scrollTo({ left: targetX, top: targetY, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => scrollTo(0, 0)}>Top</button>
        <button onClick={() => scrollTo(0, 500)}>Scroll Down</button>
        <button onClick={() => scrollTo(200, y)}>Scroll Right</button>
      </div>

      <div className="p-3 bg-gray-100 rounded">
        Position: {x}, {y}
      </div>
    </div>
  );
}`,
  },
];

export default examples;

