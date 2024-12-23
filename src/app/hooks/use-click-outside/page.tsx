"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClickOutsideDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseClickOutsideDoc() {
  const jsDocExample = `/**
 * Hook that handles click outside of the referenced element
 * @param {RefObject<HTMLElement>} ref - React ref object for the element to monitor
 * @param {(event: MouseEvent | TouchEvent) => void} handler - Callback function to execute when click outside occurs
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useClickOutside</h1>
          <Badge variant="outline">UI/Interaction</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that detects clicks outside of a specified element, perfect for modals, dropdowns, and popups.
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
            <ClickOutsideDemo />
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
          code={`import { useClickOutside } from '@thibault.sh/hooks/useClickOutside';
import { useRef, useState } from 'react';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, (event) => {
    if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  });

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div className="modal-overlay">
          <div ref={modalRef} className="modal-content">
            <h2>Modal Content</h2>
            <p>Click outside to close</p>
          </div>
        </div>
      )}
    </>
  );
}`}
        />
      </section>

      {/* API */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">API</h2>
        <Card className="p-6">
          <APIFromJSDoc jsDoc={jsDocExample} />
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Type Safety Notes:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• The hook accepts refs to any HTML element type (div, button, etc.)</li>
              <li>• You should check if the ref is available before accessing it in the handler</li>
              <li>• The event target should be cast to Node when using contains()</li>
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
                <strong>Touch Support</strong>
                <p className="text-sm text-muted-foreground">Works with both mouse clicks and touch events</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Type Safety</strong>
                <p className="text-sm text-muted-foreground">Full TypeScript support for element refs</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Cleanup</strong>
                <p className="text-sm text-muted-foreground">
                  Automatically removes event listeners when component unmounts
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Performance</strong>
                <p className="text-sm text-muted-foreground">Uses event delegation for efficient handling</p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Context Menu Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useClickOutside } from '@thibault.sh/hooks';
import { useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

function ContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, (event) => {
    if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onContextMenu={handleContextMenu} className="min-h-screen">
      <p>Right click anywhere to open the context menu</p>
      {isOpen && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x
          }}
          className="bg-white border shadow-lg rounded-md p-2"
        >
          <button className="block w-full p-2 hover:bg-gray-100">
            Copy
          </button>
          <button className="block w-full p-2 hover:bg-gray-100">
            Paste
          </button>
          <button className="block w-full p-2 hover:bg-gray-100">
            Delete
          </button>
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
        <h2 className="text-xl font-semibold">Tooltip Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useClickOutside } from '@thibault.sh/hooks';
import { useRef, useState } from 'react';

function TooltipWithClickOutside() {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useClickOutside(tooltipRef, (event) => {
    if (isOpen && tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  });

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="info-button"
      >
        ?
      </button>
      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-4 bg-black text-white rounded shadow-lg"
        >
          <h3 className="font-bold mb-2">Help Information</h3>
          <p>This tooltip stays open until you click outside.</p>
          <p>Click anywhere outside to close it.</p>
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
