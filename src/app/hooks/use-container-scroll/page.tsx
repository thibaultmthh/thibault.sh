"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContainerScrollDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseContainerScrollDoc() {
  const jsDocExample = `interface ContainerScroll {
  scrollTop: number;
  scrollLeft: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
  isScrolling: boolean;
}

/**
 * Hook that tracks scroll position and dimensions of a container element
 * @param containerRef - React ref object pointing to the container element
 * @param delay - Delay in milliseconds before setting isScrolling to false
 * @returns Object containing scroll position and dimension information
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useContainerScroll</h1>
          <Badge variant="outline">Layout/Viewport</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that tracks scroll position and dimensions of a container element, perfect for custom scrollbars
          and scroll-based interactions.
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
            <ContainerScrollDemo />
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
          code={`import { useContainerScroll } from '@thibault.sh/hooks/useContainerScroll';
import { useRef } from 'react';

function CustomScrollbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    isScrolling
  } = useContainerScroll(containerRef);

  const scrollbarHeight = (clientHeight / scrollHeight) * 100;
  const scrollbarTop = (scrollTop / (scrollHeight - clientHeight)) * 100;

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="h-[400px] overflow-y-auto pr-4"
      >
        {/* Content */}
      </div>
      
      <div className="absolute top-0 right-0 w-2 h-full bg-gray-100">
        <div
          className="absolute bg-gray-400 w-full rounded transition-all"
          style={{
            height: \`\${scrollbarHeight}%\`,
            top: \`\${scrollbarTop}%\`,
            opacity: isScrolling ? 0.8 : 0.4
          }}
        />
      </div>
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
                  Automatically updates when container scroll position or dimensions change
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Scroll State Detection</strong>
                <p className="text-sm text-muted-foreground">
                  Tracks when scrolling starts and ends with configurable delay
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Comprehensive Metrics</strong>
                <p className="text-sm text-muted-foreground">
                  Provides scroll position, content size, and viewport dimensions
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Performance Optimized</strong>
                <p className="text-sm text-muted-foreground">Uses efficient scroll event handling and cleanup</p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Custom Scrollbar Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useContainerScroll } from '@thibault.sh/hooks/useContainerScroll';
import { useRef } from 'react';

function CustomScrollbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    isScrolling
  } = useContainerScroll(containerRef, 500);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="h-[400px] overflow-y-auto hide-scrollbar"
      >
        {/* Content */}
      </div>
      
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2
                   h-1/2 w-1 bg-gray-200 rounded-full"
      >
        <div
          className="absolute w-full rounded-full bg-gray-600
                     transition-all duration-200"
          style={{
            height: \`\${(clientHeight / scrollHeight) * 100}%\`,
            top: \`\${(scrollTop / (scrollHeight - clientHeight)) * 100}%\`,
            opacity: isScrolling ? 0.8 : 0.4
          }}
        />
      </div>
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Scroll Progress Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useContainerScroll } from '@thibault.sh/hooks/useContainerScroll';
import { useRef } from 'react';

function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTop, scrollHeight, clientHeight } = useContainerScroll(containerRef);

  const progress = Math.min(
    (scrollTop / (scrollHeight - clientHeight)) * 100,
    100
  );

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <div
          className="h-full bg-orange-500 transition-all"
          style={{ width: \`\${progress}%\` }}
        />
      </div>

      <div ref={containerRef} className="h-[500px] overflow-auto pt-4">
        {/* Content */}
      </div>
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
            code={`import { useContainerScroll } from '@thibault.sh/hooks/useContainerScroll';
import { useRef, useEffect } from 'react';

function InfiniteScroll({ onLoadMore }: { onLoadMore: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    isScrolling
  } = useContainerScroll(containerRef);

  useEffect(() => {
    const remainingScroll = scrollHeight - clientHeight - scrollTop;
    
    // Load more when user is near bottom
    if (remainingScroll < 200) {
      onLoadMore();
    }
  }, [scrollTop, scrollHeight, clientHeight, onLoadMore]);

  return (
    <div ref={containerRef} className="h-[600px] overflow-auto">
      {/* Content */}
      {isScrolling && (
        <div className="sticky bottom-0 p-2 text-center bg-white/80">
          Scrolling...
        </div>
      )}
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>
    </div>
  );
}
