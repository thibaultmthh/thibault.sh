"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaQueryDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseMediaQueryDoc() {
  const jsDocExample = `/**
 * Hook that tracks state of a CSS media query
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useMediaQuery</h1>
          <Badge variant="outline">Layout/Viewport</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that tracks the state of CSS media queries, enabling responsive behavior and feature detection.
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
            <MediaQueryDemo />
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
          code={`import { useMediaQuery } from '@thibault.sh/hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div>
      <p>Current device: {isMobile ? 'Mobile' : 'Desktop'}</p>
      <p>Theme preference: {prefersDark ? 'Dark' : 'Light'}</p>
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
                <p className="text-sm text-muted-foreground">Automatically updates when media query state changes</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>SSR Compatible</strong>
                <p className="text-sm text-muted-foreground">Safely handles server-side rendering scenarios</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Standard Compliant</strong>
                <p className="text-sm text-muted-foreground">Uses standard CSS media query syntax for compatibility</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Memory Efficient</strong>
                <p className="text-sm text-muted-foreground">
                  Reuses media query listeners for identical queries across components
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Responsive Layout Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useMediaQuery } from '@thibault.sh/hooks/useMediaQuery';

function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const isWideScreen = useMediaQuery('(min-width: 1200px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1199px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className={
      isWideScreen
        ? 'grid grid-cols-3 gap-4'
        : isTablet
        ? 'grid grid-cols-2 gap-3'
        : 'flex flex-col gap-2'
    }>
      {children}
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Feature Detection Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useMediaQuery } from '@thibault.sh/hooks/useMediaQuery';

function AccessibleAnimation() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const supportsHover = useMediaQuery('(hover: hover)');

  return (
    <button
      className={\`
        transition-transform
        \${!prefersReducedMotion && 'hover:scale-105'}
        \${supportsHover ? 'hover:bg-blue-600' : 'active:bg-blue-600'}
      \`}
    >
      Interactive Button
    </button>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Theme Switcher Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useMediaQuery } from '@thibault.sh/hooks/useMediaQuery';
import { useEffect } from 'react';

function ThemeSwitcher() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)');
  
  useEffect(() => {
    // Update theme based on system preference
    document.documentElement.classList.toggle('dark', prefersDark);
    document.documentElement.classList.toggle('light', prefersLight);
  }, [prefersDark, prefersLight]);

  return (
    <div className="text-sm text-muted-foreground">
      Current theme: {prefersDark ? 'Dark' : prefersLight ? 'Light' : 'No Preference'}
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
