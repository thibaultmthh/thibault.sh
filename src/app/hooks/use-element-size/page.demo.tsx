"use client";

import { Card } from "@/components/ui/card";
import { useElementSize } from "@thibault.sh/hooks/useElementSize";
import { useRef, useState } from "react";

export function ElementSizeDemo() {
  const elementRef = useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useElementSize(elementRef as React.RefObject<HTMLElement>);
  const [fontSize, setFontSize] = useState(16);

  // Calculate responsive values
  const textOpacity = Math.min((width - 300) / 300, 1);
  const imageScale = Math.min(width / 500, 1);
  const gridColumns = Math.max(1, Math.floor(width / 200));

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Try resizing the container below to see how elements adapt to the available space:
        </p>

        {/* Size display */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Container Width</div>
            <div className="text-3xl font-mono text-orange-500">{Math.round(width)}px</div>
          </div>

          <div className="p-4 rounded border">
            <div className="font-semibold mb-2">Container Height</div>
            <div className="text-3xl font-mono text-orange-500">{Math.round(height)}px</div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Text Size</label>
            <input
              type="range"
              min="12"
              max="48"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">Font size: {fontSize}px</div>
          </div>
        </div>

        {/* Resizable container */}
        <div
          ref={elementRef}
          className="resize-x overflow-hidden border rounded bg-linear-to-br from-orange-50 to-orange-100 min-h-[400px]"
          style={{ maxWidth: "100%" }}
        >
          <div className="p-6 space-y-6">
            {/* Responsive text */}
            <div
              style={{
                fontSize: `${fontSize}px`,
                opacity: textOpacity,
                transform: `scale(${Math.max(0.5, textOpacity)})`,
                transformOrigin: "left center",
                transition: "all 0.2s ease-out",
              }}
            >
              <h3 className="font-bold text-orange-500 mb-2">Responsive Text</h3>
              <p>This text block smoothly fades and scales based on container width.</p>
            </div>

            {/* Responsive image grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                gap: "1rem",
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    background: `hsl(${30 + i * 10}, 100%, ${75 + i * 2}%)`,
                    borderRadius: "0.5rem",
                    transform: `scale(${imageScale})`,
                    transformOrigin: "center",
                    transition: "all 0.2s ease-out",
                  }}
                  className="flex items-center justify-center text-orange-600 font-medium"
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Responsive metrics */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
              <div className="p-4 rounded bg-white/50 backdrop-blur-xs">
                <div className="text-sm font-medium text-orange-600">Grid Columns</div>
                <div className="text-2xl font-bold">{gridColumns}</div>
              </div>
              <div className="p-4 rounded bg-white/50 backdrop-blur-xs">
                <div className="text-sm font-medium text-orange-600">Scale</div>
                <div className="text-2xl font-bold">{imageScale.toFixed(2)}</div>
              </div>
              <div className="p-4 rounded bg-white/50 backdrop-blur-xs">
                <div className="text-sm font-medium text-orange-600">Opacity</div>
                <div className="text-2xl font-bold">{textOpacity.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Drag the right edge of the container to resize it.
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useElementSize } from "@thibault.sh/hooks/useElementSize";
import { useRef, useState } from "react";

function ElementSizeDemo() {
  const elementRef = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(elementRef as React.RefObject<HTMLElement>);
  const [fontSize, setFontSize] = useState(16);
  
  // Calculate responsive values
  const textOpacity = Math.min((width - 300) / 300, 1);
  const imageScale = Math.min(width / 500, 1);
  const gridColumns = Math.max(1, Math.floor(width / 200));

  return (
    <div
      ref={elementRef}
      className="resize-x overflow-hidden border rounded min-h-[400px]"
      style={{ maxWidth: "100%" }}
    >
      {/* Responsive text */}
      <div
        style={{
          fontSize: \`\${fontSize}px\`,
          opacity: textOpacity,
          transform: \`scale(\${Math.max(0.5, textOpacity)})\`,
          transformOrigin: "left center",
          transition: "all 0.2s ease-out",
        }}
      >
        <h3>Responsive Text</h3>
        <p>This text block smoothly fades and scales based on container width.</p>
      </div>

      {/* Responsive image grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: \`repeat(\${gridColumns}, 1fr)\`,
          gap: "1rem",
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              aspectRatio: "1",
              transform: \`scale(\${imageScale})\`,
              transformOrigin: "center",
              transition: "all 0.2s ease-out",
            }}
          />
        ))}
      </div>

      {/* Size display */}
      <div>
        Width: {Math.round(width)}px
        Height: {Math.round(height)}px
      </div>
    </div>
  );
}`;
