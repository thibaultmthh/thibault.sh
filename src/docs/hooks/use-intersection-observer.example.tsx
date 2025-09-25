"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@thibault.sh/hooks/useIntersectionObserver";

// Basic visibility demo
function VisibilityDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(boxRef, { threshold: 0.5 });

  const isVisible = entry?.isIntersecting ?? false;

  return (
    <div className="space-y-4">
      <div className="p-3 bg-muted/30 rounded border text-sm">
        Visible: <span className="font-mono">{isVisible ? "Yes" : "No"}</span>
        {entry && (
          <span className="ml-4">
            Ratio: <span className="font-mono">{Math.round(entry.intersectionRatio * 100)}%</span>
          </span>
        )}
      </div>

      <div className="h-24 overflow-auto border rounded bg-gray-50">
        <div className="h-20"></div>
        <div
          ref={boxRef}
          className={`mx-4 p-4 rounded transition-colors ${
            isVisible ? "bg-green-200 border-green-400" : "bg-red-200 border-red-400"
          } border-2`}
        >
          {isVisible ? "✓ Visible" : "✗ Hidden"}
        </div>
        <div className="h-20"></div>
      </div>

      <div className="text-xs text-muted-foreground">Scroll the container above to see the visibility change</div>
    </div>
  );
}

// Threshold demo
function ThresholdDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(boxRef, { threshold: [0, 0.25, 0.5, 0.75, 1] });

  const ratio = entry?.intersectionRatio ?? 0;
  const percentage = Math.round(ratio * 100);

  return (
    <div className="space-y-4">
      <div className="p-3 bg-muted/30 rounded border text-sm">
        Intersection: <span className="font-mono">{percentage}%</span>
      </div>

      <div className="h-20 overflow-auto border rounded bg-gray-50">
        <div className="h-16"></div>
        <div
          ref={boxRef}
          className="mx-4 p-4 bg-blue-200 border-2 border-blue-400 rounded text-center"
          style={{ opacity: ratio }}
        >
          {percentage}% visible
        </div>
        <div className="h-16"></div>
      </div>

      <div className="text-xs text-muted-foreground">Scroll to see opacity change based on intersection ratio</div>
    </div>
  );
}

// Freeze demo
function FreezeDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(boxRef, { threshold: 0.4, freezeOnceVisible: true });

  const hasBeenVisible = entry?.isIntersecting ?? false;

  return (
    <div className="space-y-4">
      <div className="p-3 bg-muted/30 rounded border text-sm">
        Status: <span className="font-mono">{hasBeenVisible ? "Triggered" : "Waiting"}</span>
      </div>

      <div className="h-24 overflow-auto border rounded bg-gray-50">
        <div className="h-20"></div>
        <div
          ref={boxRef}
          className={`mx-4 p-4 rounded border-2 transition-all ${
            hasBeenVisible ? "bg-green-200 border-green-400 scale-110" : "bg-gray-200 border-gray-400"
          }`}
        >
          {hasBeenVisible ? "🎉 Activated!" : "Scroll to activate"}
        </div>
        <div className="h-20"></div>
      </div>

      <div className="text-xs text-muted-foreground">
        Once visible, this element stays activated (freezeOnceVisible: true)
      </div>
    </div>
  );
}

// Export the examples with source code
const examples = [
  {
    title: "Basic Visibility Detection",
    component: VisibilityDemo,
    source: `import { useRef } from "react";
import { useIntersectionObserver } from "@thibault.sh/hooks/useIntersectionObserver";

function VisibilityDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(boxRef, { threshold: 0.5 });

  const isVisible = entry?.isIntersecting ?? false;

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-100 rounded">
        Visible: {isVisible ? "Yes" : "No"}
        {entry && <span>Ratio: {Math.round(entry.intersectionRatio * 100)}%</span>}
      </div>

      <div className="h-40 overflow-auto border">
        <div className="h-32"></div>
        <div
          ref={boxRef}
          className={\`p-4 rounded \${isVisible ? "bg-green-200" : "bg-red-200"}\`}
        >
          {isVisible ? "✓ Visible" : "✗ Hidden"}
        </div>
        <div className="h-32"></div>
      </div>
    </div>
  );
}`,
  },
  {
    title: "Threshold Detection",
    component: ThresholdDemo,
    source: `import { useRef } from "react";
import { useIntersectionObserver } from "@thibault.sh/hooks/useIntersectionObserver";

function ThresholdDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(boxRef, { 
    threshold: [0, 0.25, 0.5, 0.75, 1] 
  });

  const ratio = entry?.intersectionRatio ?? 0;
  const percentage = Math.round(ratio * 100);

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-100 rounded">
        Intersection: {percentage}%
      </div>

      <div className="h-32 overflow-auto border">
        <div className="h-20"></div>
        <div
          ref={boxRef}
          className="p-4 bg-blue-200 rounded text-center"
          style={{ opacity: ratio }}
        >
          {percentage}% visible
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
}`,
  },
  {
    title: "Freeze Once Visible",
    component: FreezeDemo,
    source: `import { useRef } from "react";
import { useIntersectionObserver } from "@thibault.sh/hooks/useIntersectionObserver";

function FreezeDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(boxRef, { 
    threshold: 0.3, 
    freezeOnceVisible: true 
  });

  const hasBeenVisible = entry?.isIntersecting ?? false;

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-100 rounded">
        Status: {hasBeenVisible ? "Triggered" : "Waiting"}
      </div>

      <div className="h-40 overflow-auto border">
        <div className="h-32"></div>
        <div
          ref={boxRef}
          className={\`p-4 rounded \${hasBeenVisible ? "bg-green-200 scale-110" : "bg-gray-200"}\`}
        >
          {hasBeenVisible ? "🎉 Activated!" : "Scroll to activate"}
        </div>
        <div className="h-32"></div>
      </div>
    </div>
  );
}`,
  },
];

export default examples;
