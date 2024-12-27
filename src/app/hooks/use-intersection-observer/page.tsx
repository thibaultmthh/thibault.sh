"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntersectionObserverDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseIntersectionObserverDoc() {
  const jsDocExample = `interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Hook that tracks element's intersection with viewport using IntersectionObserver
 * @param elementRef - React ref object pointing to the target element
 * @param options - IntersectionObserver options with additional freezeOnceVisible flag
 * @returns IntersectionObserverEntry if available, null otherwise
 */`;

  const usageExample = `import { useIntersectionObserver } from "@thibault.sh/hooks";

function LazyComponent() {
  const elementRef = useRef(null);
  const entry = useIntersectionObserver(elementRef, {
    threshold: 0.5,
    rootMargin: "100px",
    freezeOnceVisible: true,
  });

  return (
    <div ref={elementRef}>
      {entry?.isIntersecting && <div>Content is visible!</div>}
    </div>
  );
}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useIntersectionObserver</h1>
          <Badge variant="outline">UI/Interaction</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that tracks when an element enters or leaves the viewport, enabling features like lazy loading,
          infinite scroll, and scroll-based animations.
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
            <IntersectionObserverDemo />
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
                <h3 className="text-lg font-semibold mb-2">elementRef</h3>
                <p className="text-muted-foreground">
                  A React ref object created with useRef() that points to the DOM element you want to observe.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">options</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">threshold</div>
                    <p className="text-sm text-muted-foreground">
                      A number or array of numbers between 0 and 1, indicating at what percentage of the target&apos;s
                      visibility the observer&apos;s callback should be executed.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">root</div>
                    <p className="text-sm text-muted-foreground">
                      The element that is used as the viewport for checking visibility of the target. Defaults to the
                      browser viewport if not specified.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">rootMargin</div>
                    <p className="text-sm text-muted-foreground">
                      Margin around the root element. Can have values similar to the CSS margin property. Defaults to
                      &quot;0px&quot;.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">freezeOnceVisible</div>
                    <p className="text-sm text-muted-foreground">
                      If true, stops observing the element after it becomes visible once. Useful for optimization in
                      cases like lazy loading.
                    </p>
                  </div>
                </div>
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
              Returns an IntersectionObserverEntry object or null. The entry object contains information about the
              intersection between the target element and its root container at a specific moment of transition.
            </p>
            <div className="mt-4 space-y-2">
              <div className="font-medium">Key properties of IntersectionObserverEntry:</div>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>isIntersecting: Boolean indicating if the element is intersecting with the root</li>
                <li>intersectionRatio: Number between 0 and 1 indicating how much of the element is visible</li>
                <li>boundingClientRect: The target element&apos;s bounding rectangle</li>
                <li>intersectionRect: The intersection between the target and root</li>
                <li>time: Timestamp when the intersection was recorded</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Lazy Loading</h3>
            <p className="text-sm text-muted-foreground">
              Efficiently load images, videos, or components only when they&apos;re about to enter the viewport,
              improving initial page load performance.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Infinite Scroll</h3>
            <p className="text-sm text-muted-foreground">
              Implement infinite scrolling by detecting when the user reaches the bottom of the content and loading more
              items automatically.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Scroll Animations</h3>
            <p className="text-sm text-muted-foreground">
              Create engaging scroll-based animations by triggering effects when elements come into view, enhancing user
              experience.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Performance Optimized</h3>
            <p className="text-sm text-muted-foreground">
              Uses the native IntersectionObserver API for efficient viewport tracking without affecting scroll
              performance.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
