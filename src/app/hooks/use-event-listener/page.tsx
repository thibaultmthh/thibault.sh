"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventListenerDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseEventListenerDoc() {
  const jsDocExample = `type EventMap = WindowEventMap & HTMLElementEventMap & DocumentEventMap;

/**
 * Hook that adds an event listener to a target element or window
 * @param eventName - Name of the event to listen for
 * @param handler - Event handler function
 * @param element - Target element (defaults to window)
 * @param options - AddEventListener options
 */`;

  const usageExample = `import { useEventListener } from "@thibault.sh/hooks";

function KeyPressTracker() {
  const [keys, setKeys] = useState<string[]>([]);
  
  useEventListener("keydown", (event) => {
    setKeys(prev => [...prev, event.key].slice(-5));
  });

  return (
    <div>
      <h3>Last 5 keys pressed:</h3>
      <div>{keys.join(", ")}</div>
    </div>
  );
}

function ClickTracker() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clicks, setClicks] = useState(0);
  
  useEventListener(
    "click",
    () => setClicks(c => c + 1),
    buttonRef
  );

  return (
    <button ref={buttonRef}>
      Clicked {clicks} times
    </button>
  );
}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useEventListener</h1>
          <Badge variant="outline">DOM/Events</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that provides a declarative way to add event listeners to DOM elements or window, with proper
          cleanup and TypeScript support for all DOM events.
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
            <EventListenerDemo />
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
                <h3 className="text-lg font-semibold mb-2">eventName</h3>
                <p className="text-muted-foreground">
                  The name of the DOM event to listen for (e.g., &quot;click&quot;, &quot;keydown&quot;,
                  &quot;scroll&quot;). TypeScript will ensure you can only pass valid event names.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Type: <code className="text-orange-600">keyof EventMap</code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">handler</h3>
                <p className="text-muted-foreground">
                  The event handler function that will be called when the event occurs. The function receives the event
                  object with the correct type based on the event name.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Type: <code className="text-orange-600">(event: EventMap[K]) =&gt; void</code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">element</h3>
                <p className="text-muted-foreground">
                  Optional ref to the target DOM element. If not provided, the event listener will be added to the
                  window object. Must be a React ref created with useRef.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Type: <code className="text-orange-600">RefObject&lt;HTMLElement&gt; | null</code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">options</h3>
                <p className="text-muted-foreground">
                  Optional addEventListener options or boolean for useCapture. These are passed directly to the native
                  addEventListener method.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Type: <code className="text-orange-600">boolean | AddEventListenerOptions</code>
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
            <h3 className="font-semibold mb-2">Type Safety</h3>
            <p className="text-sm text-muted-foreground">
              Full TypeScript support for event names and handler types, ensuring you can only add listeners for valid
              DOM events with correct handler signatures.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Automatic Cleanup</h3>
            <p className="text-sm text-muted-foreground">
              Event listeners are automatically removed when the component unmounts or when dependencies change,
              preventing memory leaks and stale handlers.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Flexible Target</h3>
            <p className="text-sm text-muted-foreground">
              Works with both window events and element-specific events using React refs, providing a consistent API for
              all event types.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Native Options Support</h3>
            <p className="text-sm text-muted-foreground">
              Supports all native addEventListener options like capture, passive, and once, giving you full control over
              event behavior.
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
                <div className="font-medium">Keyboard Shortcuts</div>
                <p className="text-sm text-muted-foreground">
                  Listen for keyboard events to implement hotkeys and keyboard shortcuts that work globally or within
                  specific components.
                </p>
              </div>
              <div>
                <div className="font-medium">Click Outside Detection</div>
                <p className="text-sm text-muted-foreground">
                  Combine with refs to detect clicks outside a specific element, useful for implementing dropdown menus
                  and modal dialogs.
                </p>
              </div>
              <div>
                <div className="font-medium">Scroll-based Features</div>
                <p className="text-sm text-muted-foreground">
                  Track scroll position to implement infinite scrolling, scroll-to-top buttons, or scroll-based
                  animations and transitions.
                </p>
              </div>
              <div>
                <div className="font-medium">Window Resize Handling</div>
                <p className="text-sm text-muted-foreground">
                  Listen for window resize events to create responsive layouts and update UI elements based on viewport
                  dimensions.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
