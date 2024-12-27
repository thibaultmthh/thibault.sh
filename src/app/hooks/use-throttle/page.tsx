"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThrottleDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseThrottleDoc() {
  const jsDocExample = `/**
 * Hook that throttles a value
 * @param value - The value to throttle
 * @param interval - The minimum time interval between updates in milliseconds
 * @returns The throttled value
 */`;

  const usageExample = `import { useThrottle } from "@thibault.sh/hooks";

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const throttledPosition = useThrottle(position, 100);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <div>Current: x: {position.x}, y: {position.y}</div>
      <div>Throttled: x: {throttledPosition.x}, y: {throttledPosition.y}</div>
    </div>
  );
}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useThrottle</h1>
          <Badge variant="outline">Performance</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that limits the rate at which a value can update by ensuring a minimum time interval between
          updates, useful for handling high-frequency events like scroll or resize.
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
            <ThrottleDemo />
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
                <h3 className="text-lg font-semibold mb-2">value</h3>
                <p className="text-muted-foreground">
                  The value to throttle. This can be any type of value (string, number, object, etc.). The hook will
                  return a new value of the same type at most once per interval.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">interval</h3>
                <p className="text-muted-foreground">
                  The minimum time in milliseconds that must pass between value updates. A typical value is 100ms for
                  mouse events or 500ms for resize events.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Return Value */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Return Value</h2>
        <Card className="relative">
          <div className="p-6">
            <p className="text-muted-foreground">
              Returns the throttled value. The value will only update once within the specified interval, even if the
              input value changes more frequently.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              Type: <code className="text-orange-600">T</code> (same type as input value)
            </div>
          </div>
        </Card>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Rate Limiting</h3>
            <p className="text-sm text-muted-foreground">
              Enforces a maximum update frequency for values, ensuring consistent performance even with rapidly changing
              inputs.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Event Optimization</h3>
            <p className="text-sm text-muted-foreground">
              Perfect for optimizing high-frequency events like scroll, resize, or mousemove, reducing unnecessary
              renders and computations.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Type Safety</h3>
            <p className="text-sm text-muted-foreground">
              Full TypeScript support with generics, ensuring type safety between the input value and the throttled
              output.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Memory Efficient</h3>
            <p className="text-sm text-muted-foreground">
              Properly manages internal timers and cleanup on unmount, preventing memory leaks and ensuring smooth
              performance.
            </p>
          </Card>
        </div>
      </div>

      {/* Comparison with Debounce */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Throttle vs Debounce</h2>
        <Card className="relative">
          <div className="p-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                While both throttle and debounce are used to control the rate of updates, they serve different purposes:
              </p>
              <div className="space-y-2">
                <div>
                  <div className="font-medium">Throttle</div>
                  <p className="text-sm text-muted-foreground">
                    Ensures updates occur at a consistent rate by enforcing a minimum time interval between updates.
                    Useful for maintaining a steady stream of updates (e.g., game loop, progress updates).
                  </p>
                </div>
                <div>
                  <div className="font-medium">Debounce</div>
                  <p className="text-sm text-muted-foreground">
                    Waits for a pause in updates before applying the latest value. Useful when you only care about the
                    final value after changes stop (e.g., search input, form validation).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
