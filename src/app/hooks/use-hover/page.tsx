"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseHoverDoc() {
  const jsDocExample = `/**
 * Hook that detects hover state on an element
 * @param {RefObject<T>} [ref] - Optional React ref object for the element to monitor
 * @returns {[RefObject<T>, boolean]} Tuple containing:
 * - A ref to attach to the target element
 * - A boolean indicating if the element is currently being hovered
 * @template T - Type of the HTML element being referenced (defaults to HTMLElement)
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useHover</h1>
          <Badge variant="outline">UI/Interaction</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that tracks hover state on elements, with support for both internal and external refs.
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
            <HoverDemo />
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
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-2">Method 1: Hook-created ref</h3>
            <CodeBlock
              language="typescript"
              code={`import { useHover } from '@thibault.sh/hooks/useHover';

function HoverCard() {
  const [cardRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className={\`card \${isHovered ? 'elevated' : ''}\`}
    >
      {isHovered ? 'Hovering!' : 'Hover me'}
    </div>
  );
}`}
            />
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-2">Method 2: External ref</h3>
            <CodeBlock
              language="typescript"
              code={`import { useHover } from '@thibault.sh/hooks/useHover';
import { useRef } from 'react';

function HoverCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [_, isHovered] = useHover(cardRef);

  return (
    <div
      ref={cardRef}
      className={\`card \${isHovered ? 'elevated' : ''}\`}
    >
      {isHovered ? 'Hovering!' : 'Hover me'}
    </div>
  );
}`}
            />
          </Card>
        </div>
      </section>

      {/* API */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">API</h2>
        <Card className="p-6">
          <APIFromJSDoc jsDoc={jsDocExample} />
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Usage Notes:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• You can either let the hook create a ref or provide your own</li>
              <li>• When providing your own ref, you can ignore the returned ref using _</li>
              <li>• The hook works with any HTML element type via generics</li>
            </ul>
          </div>
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
                <strong>Flexible Usage</strong>
                <p className="text-sm text-muted-foreground">Works with both internal and external refs</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Type Safety</strong>
                <p className="text-sm text-muted-foreground">Full TypeScript support with element type inference</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Performance</strong>
                <p className="text-sm text-muted-foreground">Uses native mouseenter/mouseleave events for efficiency</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Cleanup</strong>
                <p className="text-sm text-muted-foreground">Automatically removes event listeners on unmount</p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Tooltip Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useHover } from '@thibault.sh/hooks';
import { useRef } from 'react';

function HoverTooltip() {
  const [tooltipTrigger, isHovered] = useHover<HTMLButtonElement>();

  return (
    <div className="relative inline-block">
      <button
        ref={tooltipTrigger}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Hover me
      </button>
      
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded">
          Tooltip content
        </div>
      )}
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Image Gallery Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useHover } from '@thibault.sh/hooks';

interface ImageCardProps {
  src: string;
  alt: string;
  description: string;
}

function ImageCard({ src, alt, description }: ImageCardProps) {
  const [imageRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div
      ref={imageRef}
      className="relative overflow-hidden rounded-lg"
    >
      <img
        src={src}
        alt={alt}
        className={\`w-full transition-transform duration-300 \${
          isHovered ? 'scale-110' : 'scale-100'
        }\`}
      />
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageGallery() {
  const images = [
    {
      src: '/image1.jpg',
      alt: 'Nature',
      description: 'Beautiful landscape'
    },
    // ... more images
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <ImageCard key={index} {...image} />
      ))}
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
