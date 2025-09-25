"use client";

import { useMediaQuery } from "@thibault.sh/hooks/useMediaQuery";

// Demo component showcasing media query tracking
function MediaQueryDemo() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded border">
          <span className="text-sm">Mobile (≤768px)</span>
          <div className={`w-3 h-3 rounded-full ${isMobile ? "bg-green-500" : "bg-red-500"}`}></div>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded border">
          <span className="text-sm">Tablet (769-1024px)</span>
          <div className={`w-3 h-3 rounded-full ${isTablet ? "bg-green-500" : "bg-red-500"}`}></div>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded border">
          <span className="text-sm">Desktop (≥1025px)</span>
          <div className={`w-3 h-3 rounded-full ${isDesktop ? "bg-green-500" : "bg-red-500"}`}></div>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded border">
          <span className="text-sm">Dark Mode</span>
          <div className={`w-3 h-3 rounded-full ${isDarkMode ? "bg-green-500" : "bg-red-500"}`}></div>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded border">
          <span className="text-sm">Landscape</span>
          <div className={`w-3 h-3 rounded-full ${isLandscape ? "bg-green-500" : "bg-red-500"}`}></div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Resize your browser window or rotate your device to see changes
      </div>
    </div>
  );
}

// Custom query demo
function CustomQueryDemo() {
  const isWide = useMediaQuery("(min-width: 1200px)");
  const isHighRes = useMediaQuery("(min-resolution: 2dppx)");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 bg-blue-50 rounded border">
        <span className="text-sm">Wide screen (≥1200px)</span>
        <span className="text-sm font-mono">{isWide ? "true" : "false"}</span>
      </div>

      <div className="flex items-center justify-between p-3 bg-blue-50 rounded border">
        <span className="text-sm">High resolution (≥2x)</span>
        <span className="text-sm font-mono">{isHighRes ? "true" : "false"}</span>
      </div>
    </div>
  );
}

// Export the examples with source code
const examples = [
  {
    title: "Common Breakpoints",
    component: MediaQueryDemo,
    source: `import { useMediaQuery } from "@thibault.sh/hooks/useMediaQuery";

function MediaQueryDemo() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <div className="space-y-3">
      <div>Mobile: {isMobile ? "✓" : "✗"}</div>
      <div>Tablet: {isTablet ? "✓" : "✗"}</div>
      <div>Desktop: {isDesktop ? "✓" : "✗"}</div>
      <div>Dark Mode: {isDarkMode ? "✓" : "✗"}</div>
      <div>Landscape: {isLandscape ? "✓" : "✗"}</div>
    </div>
  );
}`,
  },
  {
    title: "Custom Queries",
    component: CustomQueryDemo,
    source: `import { useMediaQuery } from "@thibault.sh/hooks/useMediaQuery";

function CustomQueryDemo() {
  const isWide = useMediaQuery("(min-width: 1200px)");
  const isHighRes = useMediaQuery("(min-resolution: 2dppx)");

  return (
    <div className="space-y-3">
      <div>Wide screen (≥1200px): {isWide ? "true" : "false"}</div>
      <div>High resolution (≥2x): {isHighRes ? "true" : "false"}</div>
    </div>
  );
}`,
  },
];

export default examples;
