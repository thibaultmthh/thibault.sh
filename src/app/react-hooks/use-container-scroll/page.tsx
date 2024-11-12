"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";

export default async function UseContainerScrollContent() {
  const hook = await getHookById("use-container-scroll");
  const implementationCode = readHookFiles("useContainerScroll.ts");
  const usageCode = `import { useRef } from 'react';
import { useContainerScroll } from '@/components/hooks/useContainerScroll';

function ScrollableContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useContainerScroll(containerRef);

  return (
    <div>
      <div>Scroll X: {x}px, Y: {y}px</div>
      <div 
        ref={containerRef} 
        className="w-full h-[400px] overflow-auto"
      >
        {/* Scrollable content */}
      </div>
    </div>
  );
}`;

  const initialImplementation = await highlight(implementationCode);
  const initialUsage = await highlight(usageCode);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{hook?.name}</h1>
        <p className="text-muted-foreground">{hook?.description}</p>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Interactive Demo</h2>
        </div>
        <Demo />
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Implementation</h2>
        </div>
        <CodeBlock code={implementationCode} initial={initialImplementation} />
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Usage Examples</h2>
        <div className="space-y-4">
          <CodeBlock code={usageCode} initial={initialUsage} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2">Documentation</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Real-time scroll position tracking for any container element</li>
              <li>Tracks both horizontal (x) and vertical (y) scroll positions</li>
              <li>TypeScript support with proper typing</li>
              <li>Automatic cleanup of scroll listeners</li>
              <li>Memory efficient with passive event listeners</li>
              <li>SSR compatible</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Custom scrollbars</li>
              <li>Scroll-based animations within containers</li>
              <li>Infinite scrolling in specific elements</li>
              <li>Scroll progress indicators</li>
              <li>Scroll-based content loading</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">
                  useContainerScroll(ref: RefObject&lt;HTMLElement&gt;): ScrollPosition
                </h4>
                <p className="mt-1 ml-4">Returns the current scroll position of the container element.</p>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Parameters:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>ref: React ref object pointing to the container element</li>
                  </ul>
                  <p className="font-medium text-primary mt-2">Returns:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>ScrollPosition: Object containing x and y coordinates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Browser Compatibility</h3>
            <p className="text-sm text-muted-foreground">
              The hook uses standard scroll event listeners and element properties (scrollLeft, scrollTop) which are
              supported in all modern browsers. For optimal performance, the hook uses passive event listeners where
              available.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
