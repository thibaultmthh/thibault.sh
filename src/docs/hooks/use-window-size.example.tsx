"use client";

import { useWindowSize } from "@thibault.sh/hooks/useWindowSize";

// Demo component showcasing window size tracking
function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted/30 rounded border text-center">
        <div className="text-2xl font-mono">
          {width} × {height}
        </div>
        <div className="text-sm text-muted-foreground mt-1">Window size in pixels</div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="font-medium text-blue-800">Width</div>
          <div className="font-mono text-lg text-blue-600">{width}px</div>
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded">
          <div className="font-medium text-green-800">Height</div>
          <div className="font-mono text-lg text-green-600">{height}px</div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Resize your browser window to see the values update
      </div>
    </div>
  );
}

// Breakpoint demo
function BreakpointDemo() {
  const { width } = useWindowSize();

  const getBreakpoint = () => {
    if (width < 640) return "sm";
    if (width < 768) return "md";
    if (width < 1024) return "lg";
    if (width < 1280) return "xl";
    return "2xl";
  };

  const breakpoint = getBreakpoint();

  return (
    <div className="space-y-2">
      <div className="p-3 bg-purple-50 border border-purple-200 rounded text-center">
        <div className="text-sm text-purple-600">Current breakpoint:</div>
        <div className="text-xl font-bold text-purple-800">{breakpoint}</div>
      </div>
      <div className="text-xs text-muted-foreground">
        Breakpoints: sm (&lt;640), md (&lt;768), lg (&lt;1024), xl (&lt;1280), 2xl (≥1280)
      </div>
    </div>
  );
}

// Export the examples with source code
const examples = [
  {
    title: "Window Size Tracking",
    component: WindowSizeDemo,
    source: `import { useWindowSize } from "@thibault.sh/hooks/useWindowSize";

function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-100 rounded text-center">
        <div className="text-2xl font-mono">
          {width} × {height}
        </div>
        <div className="text-sm text-gray-600">
          Window size in pixels
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-blue-100 rounded">
          <div>Width: {width}px</div>
        </div>
        <div className="p-3 bg-green-100 rounded">
          <div>Height: {height}px</div>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    title: "Responsive Breakpoints",
    component: BreakpointDemo,
    source: `import { useWindowSize } from "@thibault.sh/hooks/useWindowSize";

function BreakpointDemo() {
  const { width } = useWindowSize();

  const getBreakpoint = () => {
    if (width < 640) return "sm";
    if (width < 768) return "md";
    if (width < 1024) return "lg";
    if (width < 1280) return "xl";
    return "2xl";
  };

  const breakpoint = getBreakpoint();

  return (
    <div className="space-y-2">
      <div className="p-3 bg-purple-100 rounded text-center">
        <div>Current breakpoint: {breakpoint}</div>
      </div>
      <div className="text-xs text-gray-600">
        Breakpoints: sm (<640), md (<768), lg (<1024), xl (<1280), 2xl (≥1280)
      </div>
    </div>
  );
}`,
  },
];

export default examples;
