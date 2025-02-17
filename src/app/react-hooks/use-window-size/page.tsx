"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";

export default async function UseWindowSizeContent() {
  const hook = getHookById("use-window-size");
  const implementationCode = readHookFiles("useWindowSize.ts");
  const usageCode = `import { useWindowSize } from '@/components/hooks/useWindowSize';

function ResponsiveComponent() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      <p>Current window dimensions:</p>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      {width < 768 && (
        <p>Mobile view detected!</p>
      )}
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
              <li>Real-time window dimension tracking</li>
              <li>TypeScript support with proper typing</li>
              <li>SSR compatible</li>
              <li>Efficient resize event handling</li>
              <li>Automatic cleanup of event listeners</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Responsive layouts</li>
              <li>Conditional rendering based on window size</li>
              <li>Dynamic styling calculations</li>
              <li>Mobile/desktop detection</li>
              <li>Canvas and visualization sizing</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">useWindowSize(): WindowSize</h4>
                <p className="mt-1 ml-4">Returns an object containing the current window dimensions.</p>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Return Value:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>width: number - Current window width in pixels</li>
                    <li>height: number - Current window height in pixels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Browser Compatibility</h3>
            <p className="text-sm text-muted-foreground">
              The hook uses standard window resize events and innerWidth/innerHeight properties, which are supported in
              all modern browsers. For older browsers, consider using a polyfill for window.innerWidth and
              window.innerHeight.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
