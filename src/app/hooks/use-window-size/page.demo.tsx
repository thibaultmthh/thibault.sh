"use client";

import { Card } from "@/components/ui/card";
import { useWindowSize } from "@thibault.sh/hooks/useWindowSize";

export function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Try resizing your browser window to see the dimensions update in real-time:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Window Width</div>
            <div className="text-3xl font-mono text-orange-500">{width}px</div>
          </div>

          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Window Height</div>
            <div className="text-3xl font-mono text-orange-500">{height}px</div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Responsive Breakpoints</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${width < 640 ? "bg-green-500" : "bg-gray-300"}`} />
                <span>
                  Mobile ({"<"}640px): {width < 640 ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${width >= 640 && width < 768 ? "bg-green-500" : "bg-gray-300"}`}
                />
                <span>Small (≥640px): {width >= 640 && width < 768 ? "Active" : "Inactive"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${width >= 768 && width < 1024 ? "bg-green-500" : "bg-gray-300"}`}
                />
                <span>Medium (≥768px): {width >= 768 && width < 1024 ? "Active" : "Inactive"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${width >= 1024 && width < 1280 ? "bg-green-500" : "bg-gray-300"}`}
                />
                <span>Large (≥1024px): {width >= 1024 && width < 1280 ? "Active" : "Inactive"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${width >= 1280 ? "bg-green-500" : "bg-gray-300"}`} />
                <span>Extra Large (≥1280px): {width >= 1280 ? "Active" : "Inactive"}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Aspect Ratio</div>
            <div className="text-lg font-mono">
              {(width / height).toFixed(2)}
              <span className="text-sm text-muted-foreground ml-2">(width / height)</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useWindowSize } from "@thibault.sh/hooks/useWindowSize";

function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 rounded border">
          <div className="font-semibold mb-2">Window Width</div>
          <div className="text-3xl font-mono text-orange-500">{width}px</div>
        </div>

        <div className="p-4 rounded border">
          <div className="font-semibold mb-2">Window Height</div>
          <div className="text-3xl font-mono text-orange-500">{height}px</div>
        </div>
      </div>

      <div className="p-4 rounded border">
        <div className="font-semibold mb-2">Responsive Breakpoints</div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className={\`w-3 h-3 rounded-full \${width < 640 ? "bg-green-500" : "bg-gray-300"}\`} />
            <span>Mobile ({"<"}640px): {width < 640 ? "Active" : "Inactive"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={\`w-3 h-3 rounded-full \${width >= 640 && width < 768 ? "bg-green-500" : "bg-gray-300"}\`} />
            <span>Small (≥640px): {width >= 640 && width < 768 ? "Active" : "Inactive"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={\`w-3 h-3 rounded-full \${width >= 768 && width < 1024 ? "bg-green-500" : "bg-gray-300"}\`} />
            <span>Medium (≥768px): {width >= 768 && width < 1024 ? "Active" : "Inactive"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={\`w-3 h-3 rounded-full \${width >= 1024 && width < 1280 ? "bg-green-500" : "bg-gray-300"}\`} />
            <span>Large (≥1024px): {width >= 1024 && width < 1280 ? "Active" : "Inactive"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={\`w-3 h-3 rounded-full \${width >= 1280 ? "bg-green-500" : "bg-gray-300"}\`} />
            <span>Extra Large (≥1280px): {width >= 1280 ? "Active" : "Inactive"}</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded border">
        <div className="font-semibold mb-2">Aspect Ratio</div>
        <div className="text-lg font-mono">
          {(width / height).toFixed(2)}
          <span className="text-sm text-muted-foreground ml-2">(width / height)</span>
        </div>
      </div>
    </div>
  );
}`;
