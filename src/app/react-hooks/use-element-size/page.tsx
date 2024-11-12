"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";

export default async function UseElementSizeContent() {
  const hook = getHookById("use-element-size");
  const implementationCode = readHookFiles("useElementSize.ts");
  const usageCode = `import { useElementSize } from '@/components/hooks/useElementSize';

function ResizableComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(ref);
  
  return (
    <div ref={ref} className="resize-x overflow-auto p-4 border">
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}`;

  const initialImplementation = await highlight(implementationCode);
  const initialUsage = await highlight(usageCode);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{hook?.name}</h1>
        <p className="text-muted-foreground">{hook?.description} </p>
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
              <li>Real-time size tracking using ResizeObserver</li>
              <li>TypeScript support with proper element typing</li>
              <li>Automatic cleanup of observers</li>
              <li>Zero dependencies</li>
              <li>SSR compatible</li>
              <li>Memory efficient with single observer pattern</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Responsive layouts based on element dimensions</li>
              <li>Dynamic content sizing</li>
              <li>Custom resize handles</li>
              <li>Virtualized lists</li>
              <li>Canvas sizing</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">
                  useElementSize&lt;T extends HTMLElement&gt;(ref: RefObject&lt;T&gt;):{" "}
                  {"{ width: number; height: number }"}
                </h4>
                <p className="mt-1 ml-4">Returns the current dimensions of the referenced element.</p>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Parameters:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>ref: React ref object pointing to the target element</li>
                  </ul>
                  <p className="font-medium text-primary mt-2">Returns:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>An object containing width and height in pixels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Browser Compatibility</h3>
            <p className="text-sm text-muted-foreground">
              The hook uses the ResizeObserver API, which is supported in all modern browsers. For older browsers,
              consider using a polyfill. Check{" "}
              <a
                href="https://caniuse.com/resizeobserver"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                browser compatibility
              </a>{" "}
              for more details.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
