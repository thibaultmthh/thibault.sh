"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WindowSizeDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseWindowSizeDoc() {
  const jsDocExample = `interface WindowSize {
  width: number;
  height: number;
}

/**
 * Hook that tracks window dimensions
 * @returns Object containing current window width and height
 * @example
 * const { width, height } = useWindowSize();
 * console.log(width, height);
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useWindowSize</h1>
          <Badge variant="outline">Layout/Viewport</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that tracks the browser window dimensions in real-time, perfect for responsive layouts and
          dynamic UI adjustments.
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
            <WindowSizeDemo />
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
          code={`import { useWindowSize } from '@thibault.sh/hooks/useWindowSize';

function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window dimensions: {width}x{height}</p>
      {width < 768 ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
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
                <p className="text-sm text-muted-foreground">Automatically updates when window dimensions change</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>SSR Compatible</strong>
                <p className="text-sm text-muted-foreground">
                  Safely handles server-side rendering with default dimensions
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Performance Optimized</strong>
                <p className="text-sm text-muted-foreground">
                  Uses debounced resize event listener to prevent excessive re-renders
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Type Safe</strong>
                <p className="text-sm text-muted-foreground">Full TypeScript support with proper type definitions</p>
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
            code={`import { useWindowSize } from '@thibault.sh/hooks/useWindowSize';

function ResponsiveGrid({ items }: { items: Array<any> }) {
  const { width } = useWindowSize();

  // Calculate optimal number of columns based on window width
  const columns = Math.max(1, Math.floor(width / 300)); // 300px min column width
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
    gap: '1rem'
  };

  return (
    <div style={gridStyle}>
      {items.map((item, index) => (
        <div key={index} className="card">
          {/* Card content */}
        </div>
      ))}
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Dynamic Canvas Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useWindowSize } from '@thibault.sh/hooks/useWindowSize';
import { useEffect, useRef } from 'react';

function ResponsiveCanvas() {
  const { width, height } = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Update canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Get context and draw
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Example: Draw a responsive circle in the center
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#f97316';
    ctx.fill();
  }, [width, height]);

  return <canvas ref={canvasRef} />;
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Conditional Rendering Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useWindowSize } from '@thibault.sh/hooks/useWindowSize';

function AdaptiveUI() {
  const { width } = useWindowSize();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <div>
      {isMobile && (
        <nav className="mobile-nav">
          <HamburgerMenu />
        </nav>
      )}
      
      {isTablet && (
        <nav className="tablet-nav">
          <IconMenu />
        </nav>
      )}
      
      {isDesktop && (
        <nav className="desktop-nav">
          <FullMenu />
        </nav>
      )}

      <main className={
        isDesktop ? 'p-8' : 
        isTablet ? 'p-6' : 
        'p-4'
      }>
        {/* Content */}
      </main>
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
