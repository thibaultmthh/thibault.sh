"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizeObserverDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseResizeObserverDoc() {
  const jsDocExample = `interface ResizeObserverEntry {
  contentRect: DOMRectReadOnly;
  contentBoxSize: ReadonlyArray<ResizeObserverSize>;
  borderBoxSize: ReadonlyArray<ResizeObserverSize>;
  devicePixelContentBoxSize: ReadonlyArray<ResizeObserverSize>;
  target: Element;
}

/**
 * Hook that tracks element's size changes using ResizeObserver with full entry details
 * @param elementRef - React ref object pointing to the target element
 * @returns Latest ResizeObserverEntry if available, null otherwise
 */`;

  const usageExample = `import { useResizeObserver } from "@thibault.sh/hooks";

function ResponsiveComponent() {
  const elementRef = useRef(null);
  const entry = useResizeObserver(elementRef);

  // Access different size measurements
  const { width, height } = entry?.contentRect ?? { width: 0, height: 0 };
  const contentSize = entry?.contentBoxSize[0];
  const borderSize = entry?.borderBoxSize[0];

  return (
    <div ref={elementRef}>
      Content Size: {width}x{height}
      Border Size: {borderSize?.inlineSize}x{borderSize?.blockSize}
    </div>
  );
}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useResizeObserver</h1>
          <Badge variant="outline">Layout/Viewport</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that tracks element size changes using ResizeObserver, providing detailed information about
          content, border, and device pixel sizes.
        </p>
      </div>

      {/* Demo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Demo</h2>
        <Tabs defaultValue="preview" className="relative mr-auto">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="relative">
            <ResizeObserverDemo />
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={demoSource} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <Card className="relative">
          <CodeBlock code="npm install @thibault.sh/hooks" />
        </Card>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <Card className="relative">
          <CodeBlock code={usageExample} />
        </Card>
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <Card className="relative">
          <APIFromJSDoc jsDoc={jsDocExample} />
        </Card>
      </div>

      {/* Return Value */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Return Value</h2>
        <Card className="relative">
          <div className="p-6">
            <p className="text-muted-foreground">
              Returns a ResizeObserverEntry object or null. The entry object provides detailed information about the
              observed element&apos;s dimensions in different contexts.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">contentRect</h3>
                <p className="text-sm text-muted-foreground">
                  A DOMRectReadOnly object containing the element&apos;s content box dimensions:
                </p>
                <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>width: The width of the content box</li>
                  <li>height: The height of the content box</li>
                  <li>x/y: The coordinates relative to the viewport</li>
                  <li>top/right/bottom/left: The edges relative to the viewport</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">contentBoxSize</h3>
                <p className="text-sm text-muted-foreground">
                  An array of ResizeObserverSize objects describing the element&apos;s content box:
                </p>
                <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>inlineSize: The size in the element&apos;s inline direction (usually width)</li>
                  <li>blockSize: The size in the element&apos;s block direction (usually height)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">borderBoxSize</h3>
                <p className="text-sm text-muted-foreground">
                  An array of ResizeObserverSize objects describing the element&apos;s border box:
                </p>
                <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>inlineSize: The size including padding and border in the inline direction</li>
                  <li>blockSize: The size including padding and border in the block direction</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">devicePixelContentBoxSize</h3>
                <p className="text-sm text-muted-foreground">
                  An array of ResizeObserverSize objects describing the element&apos;s content box in device pixels:
                </p>
                <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>inlineSize: The size in device pixels in the inline direction</li>
                  <li>blockSize: The size in device pixels in the block direction</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Detailed Size Information</h3>
            <p className="text-sm text-muted-foreground">
              Access comprehensive size measurements including content box, border box, and device pixel sizes for
              precise layout control.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Responsive Layouts</h3>
            <p className="text-sm text-muted-foreground">
              Create dynamic layouts that adapt to container size changes, perfect for building responsive components
              and grids.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Real-time Updates</h3>
            <p className="text-sm text-muted-foreground">
              Get immediate feedback on size changes, enabling smooth transitions and dynamic adjustments to your UI.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Performance Optimized</h3>
            <p className="text-sm text-muted-foreground">
              Uses the native ResizeObserver API for efficient size tracking without polling or layout thrashing.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
