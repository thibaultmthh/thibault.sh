"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollPositionDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseScrollPositionDoc() {
  const jsDocExample = `interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Hook that tracks window scroll position
 * @returns Object containing current scroll x and y coordinates
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useScrollPosition</h1>
          <Badge variant="outline">Layout/Viewport</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that tracks window scroll position in real-time, perfect for scroll-based animations and progress
          indicators.
        </p>
      </div>

      {/* Demo section with tabs */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Demo</h2>
        <Tabs defaultValue="preview" className="space-y-3">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <ScrollPositionDemo />
          </TabsContent>

          <TabsContent value="code" className="text-sm">
            <CodeBlock code={demoSource} language="typescript" />
          </TabsContent>
        </Tabs>
      </section>

      {/* Installation */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Installation</h2>
        <CodeBlock code="npm install @thibault.sh/hooks" language="bash" />
      </section>

      {/* Usage */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          language="typescript"
          code={`import { useScrollPosition } from '@thibault.sh/hooks/useScrollPosition';

function ScrollProgress() {
  const { y } = useScrollPosition();
  const progress = Math.min(
    (y / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
    100
  );

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: \`\${progress}%\` }}
      />
    </div>
  );
}`}
        />
      </section>

      {/* API */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">API</h2>
        <Card className="p-6">
          <APIFromJSDoc jsDoc={jsDocExample} />
        </Card>
      </section>

      {/* Features */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Features</h2>
        <Card className="p-6">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Real-time Updates</strong>
                <p className="text-sm text-muted-foreground">
                  Automatically updates when window scroll position changes
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Performance Optimized</strong>
                <p className="text-sm text-muted-foreground">
                  Uses throttled scroll event listener to prevent excessive re-renders
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Bi-directional Tracking</strong>
                <p className="text-sm text-muted-foreground">
                  Tracks both horizontal (x) and vertical (y) scroll positions
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>SSR Compatible</strong>
                <p className="text-sm text-muted-foreground">
                  Safely handles server-side rendering with default coordinates
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Scroll-based Animation Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useScrollPosition } from '@thibault.sh/hooks/useScrollPosition';

function ScrollAnimation() {
  const { y } = useScrollPosition();
  const elementRef = useRef<HTMLDivElement>(null);

  // Calculate element's visibility based on scroll position
  const calculateVisibility = () => {
    if (!elementRef.current) return 0;
    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top >= windowHeight || rect.bottom <= 0) return 0;
    if (rect.top <= 0 && rect.bottom >= windowHeight) return 1;
    
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    return visibleHeight / rect.height;
  };

  const visibility = calculateVisibility();

  return (
    <div
      ref={elementRef}
      style={{
        opacity: visibility,
        transform: \`translateY(\${(1 - visibility) * 50}px)\`,
        transition: 'transform 0.2s ease-out'
      }}
    >
      {/* Content */}
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Infinite Scroll Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useScrollPosition } from '@thibault.sh/hooks/useScrollPosition';
import { useEffect } from 'react';

function InfiniteScroll({ onLoadMore }: { onLoadMore: () => void }) {
  const { y } = useScrollPosition();
  
  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const remainingScroll = scrollHeight - clientHeight - y;
    
    // Load more when user is near bottom
    if (remainingScroll < 200) {
      onLoadMore();
    }
  }, [y, onLoadMore]);

  return (
    <div className="space-y-4">
      {/* Content */}
      <div className="h-8 flex items-center justify-center">
        {y > 0 && remainingScroll < 200 && (
          <span className="text-sm text-muted-foreground">Loading more...</span>
        )}
      </div>
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Scroll-to-Top Button Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useScrollPosition } from '@thibault.sh/hooks/useScrollPosition';

function ScrollToTopButton() {
  const { y } = useScrollPosition();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (y < 200) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 p-2 bg-orange-500 text-white rounded-full
                opacity-0 transition-opacity duration-200 hover:bg-orange-600
                data-[visible=true]:opacity-100"
      data-visible={y >= 200}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>
    </div>
  );
}
