"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ElementSizeDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseElementSizeDoc() {
  const jsDocExample = `interface ElementSize {
  width: number;
  height: number;
}

/**
 * Hook that tracks an element's dimensions using ResizeObserver
 * @param elementRef - React ref object pointing to the target element
 * @returns Object containing current element width and height
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useElementSize</h1>
          <Badge variant="outline">Layout/Viewport</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that tracks element dimensions in real-time using ResizeObserver, perfect for responsive layouts
          and dynamic UI adjustments.
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
            <ElementSizeDemo />
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
          code={`import { useElementSize } from '@thibault.sh/hooks/useElementSize';
import { useRef } from 'react';

function ResponsiveElement() {
  const elementRef = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(elementRef);

  return (
    <div ref={elementRef} className="resize overflow-auto p-4 border">
      <div>Width: {Math.round(width)}px</div>
      <div>Height: {Math.round(height)}px</div>
      {/* Content */}
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
                  Automatically updates when element dimensions change using ResizeObserver
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Performance Optimized</strong>
                <p className="text-sm text-muted-foreground">Uses efficient ResizeObserver API with proper cleanup</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Zero Layout Shift</strong>
                <p className="text-sm text-muted-foreground">Measures content size without affecting layout</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>SSR Compatible</strong>
                <p className="text-sm text-muted-foreground">Safely handles server-side rendering scenarios</p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Responsive Grid Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useElementSize } from '@thibault.sh/hooks/useElementSize';
import { useRef } from 'react';

function ResponsiveGrid({ items }: { items: Array<any> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);

  // Calculate optimal number of columns based on container width
  const columns = Math.max(1, Math.floor(width / 300)); // 300px min column width

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: \`repeat(\${columns}, 1fr)\` }}
      >
        {items.map((item, index) => (
          <div key={index} className="p-4 border rounded">
            {/* Item content */}
          </div>
        ))}
      </div>
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Dynamic Text Sizing Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useElementSize } from '@thibault.sh/hooks/useElementSize';
import { useRef } from 'react';

function ResponsiveText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);

  // Scale font size based on container width
  const fontSize = Math.max(16, Math.min(width / 20, 48));

  return (
    <div ref={containerRef} className="w-full resize overflow-auto p-4 border">
      <p style={{ fontSize: \`\${fontSize}px\` }}>
        This text will scale with the container width!
      </p>
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Aspect Ratio Container Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useElementSize } from '@thibault.sh/hooks/useElementSize';
import { useRef, useEffect, useState } from 'react';

function AspectRatioContainer({ ratio = 16 / 9 }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(width / ratio);
  }, [width, ratio]);

  return (
    <div ref={containerRef} className="w-full">
      <div
        style={{ height: \`\${height}px\` }}
        className="bg-gray-100 transition-all duration-200"
      >
        {/* Content that maintains aspect ratio */}
      </div>
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
