"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";

export default async function UseLongPressContent() {
  const hook = getHookById("use-long-press");

  const implementationCode = readHookFiles("useLongPress.ts");
  const usageCode = `import { useLongPress } from '@/components/hooks/useLongPress';

function LongPressExample() {
  const { isPressed, handlers } = useLongPress({
    delay: 1000,
    onStart: () => console.log('Started pressing'),
    onFinish: () => console.log('Long press completed'),
    onCancel: () => console.log('Press cancelled'),
  });

  return (
    <button
      {...handlers}
      className={isPressed ? 'active' : ''}
    >
      Press and Hold
    </button>
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
              <li>Customizable press duration</li>
              <li>Support for both mouse and touch events</li>
              <li>Callback functions for press start, finish, and cancel</li>
              <li>Real-time press state tracking</li>
              <li>TypeScript support</li>
              <li>Automatic cleanup of timeouts</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Context menu alternatives</li>
              <li>Delete confirmations</li>
              <li>Gaming controls</li>
              <li>Mobile-friendly interactions</li>
              <li>Custom gesture controls</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">useLongPress(options: UseLongPressOptions)</h4>
                <p className="mt-1 ml-4">Returns an object containing the press state and event handlers.</p>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Options:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>delay?: number (default: 400ms)</li>
                    <li>onStart?: () =&gt; void</li>
                    <li>onFinish?: () =&gt; void</li>
                    <li>onCancel?: () =&gt; void</li>
                  </ul>
                </div>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Returns:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>isPressed: boolean</li>
                    <li>handlers: Event handlers object</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Browser Compatibility</h3>
            <p className="text-sm text-muted-foreground">
              The hook uses standard mouse and touch events, which are supported in all modern browsers. For touch
              events, ensure your target platform supports touch interactions.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
