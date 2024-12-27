"use client";

import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@thibault.sh/hooks/useMediaQuery";

export function MediaQueryDemo() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Try resizing your window, changing your system theme, or rotating your device to see the values update:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Screen Size</div>
            <div className="text-sm text-muted-foreground">
              Large Screen (≥1024px):
              <span className={`ml-2 font-bold ${isLargeScreen ? "text-green-500" : "text-red-500"}`}>
                {isLargeScreen ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Color Scheme</div>
            <div className="text-sm text-muted-foreground">
              Dark Mode:
              <span className={`ml-2 font-bold ${isDarkMode ? "text-green-500" : "text-red-500"}`}>
                {isDarkMode ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Motion Preference</div>
            <div className="text-sm text-muted-foreground">
              Reduced Motion:
              <span className={`ml-2 font-bold ${prefersReducedMotion ? "text-green-500" : "text-red-500"}`}>
                {prefersReducedMotion ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Orientation</div>
            <div className="text-sm text-muted-foreground">
              Portrait Mode:
              <span className={`ml-2 font-bold ${isPortrait ? "text-green-500" : "text-red-500"}`}>
                {isPortrait ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground mt-4">
          <strong>Note:</strong> Some values may require system-level changes to update.
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useMediaQuery } from "@thibault.sh/hooks/useMediaQuery";

function MediaQueryDemo() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="p-4 rounded border">
        <div className="font-semibold mb-2">Screen Size</div>
        <div className="text-sm text-muted-foreground">
          Large Screen (≥1024px):
          <span className={\`ml-2 font-bold \${isLargeScreen ? "text-green-500" : "text-red-500"}\`}>
            {isLargeScreen ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="p-4 rounded border">
        <div className="font-semibold mb-2">Color Scheme</div>
        <div className="text-sm text-muted-foreground">
          Dark Mode:
          <span className={\`ml-2 font-bold \${isDarkMode ? "text-green-500" : "text-red-500"}\`}>
            {isDarkMode ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="p-4 rounded border">
        <div className="font-semibold mb-2">Motion Preference</div>
        <div className="text-sm text-muted-foreground">
          Reduced Motion:
          <span className={\`ml-2 font-bold \${prefersReducedMotion ? "text-green-500" : "text-red-500"}\`}>
            {prefersReducedMotion ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="p-4 rounded border">
        <div className="font-semibold mb-2">Orientation</div>
        <div className="text-sm text-muted-foreground">
          Portrait Mode:
          <span className={\`ml-2 font-bold \${isPortrait ? "text-green-500" : "text-red-500"}\`}>
            {isPortrait ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
}`;
