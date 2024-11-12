"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";

export default async function UseScrollPositionContent() {
  const hook = getHookById("use-scroll-position");
  const implementationCode = readHookFiles("useScrollPosition.ts");
  const usageCode = `import { useScrollPosition } from '@/components/hooks/useScrollPosition';

function ScrollTracker() {
  const { x, y } = useScrollPosition();
  
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white shadow rounded">
      <div>Scroll X: {Math.round(x)}px</div>
      <div>Scroll Y: {Math.round(y)}px</div>
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
              <li>Real-time scroll position tracking</li>
              <li>Support for both horizontal and vertical scroll</li>
              <li>TypeScript support with proper typing</li>
              <li>Optimized performance with passive event listeners</li>
              <li>Automatic cleanup of event listeners</li>
              <li>SSR compatible</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Scroll-based animations</li>
              <li>Infinite scrolling implementations</li>
              <li>Scroll progress indicators</li>
              <li>Scroll-to-top buttons</li>
              <li>Scroll-based navigation highlights</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">useScrollPosition(): {"{ x: number, y: number }"}</h4>
                <p className="mt-1 ml-4">Returns an object containing the current scroll position coordinates.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
