"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntervalDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseIntervalDoc() {
  const jsDocExample = `/**
 * Hook that sets up an interval that is properly cleaned up when the component unmounts
 * @param callback - Function to call on each interval
 * @param delay - Delay in milliseconds (null to pause)
 */`;

  const usageExample = `import { useInterval } from "@thibault.sh/hooks";

function Counter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? 1000 : null
  );

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Resume"}
      </button>
    </div>
  );
}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useInterval</h1>
          <Badge variant="outline">Utility</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that provides a declarative way to set up intervals that are automatically cleaned up when the
          component unmounts, with support for dynamic delays and pausing.
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
            <IntervalDemo />
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

      {/* Parameters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Parameters</h2>
        <Card className="relative overflow-hidden">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">callback</h3>
                <p className="text-muted-foreground">
                  The function to call on each interval. This function should contain any state updates or side effects
                  you want to run periodically.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Type: <code className="text-orange-600">() =&gt; void</code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">delay</h3>
                <p className="text-muted-foreground">
                  The time in milliseconds between each callback invocation. Pass null to pause the interval. The delay
                  can be changed dynamically to adjust the interval timing.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Type: <code className="text-orange-600">number | null</code>
                </div>
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
            <h3 className="font-semibold mb-2">Automatic Cleanup</h3>
            <p className="text-sm text-muted-foreground">
              Intervals are automatically cleared when the component unmounts or when the delay changes, preventing
              memory leaks and unexpected behavior.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Dynamic Control</h3>
            <p className="text-sm text-muted-foreground">
              Easily pause and resume intervals by passing null as the delay, or dynamically adjust the interval timing
              by changing the delay value.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Declarative API</h3>
            <p className="text-sm text-muted-foreground">
              Provides a clean, declarative way to handle intervals in React components, making code more maintainable
              and easier to understand.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Type Safety</h3>
            <p className="text-sm text-muted-foreground">
              Full TypeScript support ensures type safety for callback functions and delay values, catching potential
              errors at compile time.
            </p>
          </Card>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Use Cases</h2>
        <Card className="relative">
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="font-medium">Polling</div>
                <p className="text-sm text-muted-foreground">
                  Periodically fetch data from an API to keep the UI in sync with the server. The interval can be paused
                  when the component is not visible.
                </p>
              </div>
              <div>
                <div className="font-medium">Animations</div>
                <p className="text-sm text-muted-foreground">
                  Create smooth animations or transitions by updating values at a fixed interval. Perfect for progress
                  bars, countdowns, or simple game loops.
                </p>
              </div>
              <div>
                <div className="font-medium">Auto-save</div>
                <p className="text-sm text-muted-foreground">
                  Automatically save form data or document changes at regular intervals, with the ability to pause when
                  no changes are detected.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
