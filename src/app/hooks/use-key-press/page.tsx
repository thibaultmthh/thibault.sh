"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyPressDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseKeyPressDoc() {
  const jsDocExample = `/**
 * Hook that detects when a specific key is pressed
 * @param {string} targetKey - The key to detect (e.g., "Enter", "Escape", "a")
 * @returns {boolean} Boolean indicating if the key is currently pressed
 * @example
 * const isEnterPressed = useKeyPress("Enter");
 * const isEscapePressed = useKeyPress("Escape");
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useKeyPress</h1>
          <Badge variant="outline">UI/Interaction</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that detects keyboard interactions, perfect for shortcuts and keyboard-driven interfaces.
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
            <KeyPressDemo />
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
          code={`import { useKeyPress } from '@thibault.sh/hooks/useKeyPress';

function ShortcutHandler() {
  const isSPressed = useKeyPress('s');
  const isCtrlPressed = useKeyPress('Control');

  // Save when Ctrl+S is pressed
  React.useEffect(() => {
    if (isSPressed && isCtrlPressed) {
      handleSave();
    }
  }, [isSPressed, isCtrlPressed]);

  return (
    <div>
      <p>Press Ctrl+S to save</p>
      {isSPressed && isCtrlPressed && (
        <div>Saving...</div>
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
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Key Names:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                • Single characters: &quot;a&quot;, &quot;b&quot;, &quot;1&quot;, &quot;2&quot;, &quot; &quot; (space)
              </li>
              <li>
                • Special keys: &quot;Enter&quot;, &quot;Escape&quot;, &quot;Tab&quot;, &quot;Backspace&quot;,
                &quot;Delete&quot;
              </li>
              <li>• Modifier keys: &quot;Control&quot;, &quot;Shift&quot;, &quot;Alt&quot;, &quot;Meta&quot;</li>
              <li>
                • Arrow keys: &quot;ArrowUp&quot;, &quot;ArrowDown&quot;, &quot;ArrowLeft&quot;, &quot;ArrowRight&quot;
              </li>
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
                <strong>Real-time Detection</strong>
                <p className="text-sm text-muted-foreground">Instantly detects key press and release events</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Multiple Keys</strong>
                <p className="text-sm text-muted-foreground">
                  Track multiple keys simultaneously for complex shortcuts
                </p>
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
                <strong>Type Safety</strong>
                <p className="text-sm text-muted-foreground">Full TypeScript support for key names</p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Modal Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useKeyPress } from '@thibault.sh/hooks';
import { useState } from 'react';

function ModalWithKeyboard() {
  const [isOpen, setIsOpen] = useState(false);
  const isEscapePressed = useKeyPress('Escape');

  // Close modal when Escape is pressed
  React.useEffect(() => {
    if (isEscapePressed && isOpen) {
      setIsOpen(false);
    }
  }, [isEscapePressed, isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal (Press Escape to close)
      </button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal Content</h2>
            <p>Press Escape to close this modal</p>
            <button onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
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
        <h2 className="text-xl font-semibold">Game Controls Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useKeyPress } from '@thibault.sh/hooks';
import { useState } from 'react';

interface Position {
  x: number;
  y: number;
}

function SimpleGame() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  
  const isUpPressed = useKeyPress('ArrowUp');
  const isDownPressed = useKeyPress('ArrowDown');
  const isLeftPressed = useKeyPress('ArrowLeft');
  const isRightPressed = useKeyPress('ArrowRight');
  const isSpacePressed = useKeyPress(' ');

  // Update position based on arrow keys
  React.useEffect(() => {
    const speed = 5;
    if (isUpPressed) {
      setPosition(prev => ({ ...prev, y: prev.y - speed }));
    }
    if (isDownPressed) {
      setPosition(prev => ({ ...prev, y: prev.y + speed }));
    }
    if (isLeftPressed) {
      setPosition(prev => ({ ...prev, x: prev.x - speed }));
    }
    if (isRightPressed) {
      setPosition(prev => ({ ...prev, x: prev.x + speed }));
    }
  }, [isUpPressed, isDownPressed, isLeftPressed, isRightPressed]);

  return (
    <div className="game-container">
      <div
        className="player"
        style={{
          transform: \`translate(\${position.x}px, \${position.y}px)\`,
          backgroundColor: isSpacePressed ? 'red' : 'blue'
        }}
      />
      <div className="instructions">
        <p>Use arrow keys to move</p>
        <p>Hold space to change color</p>
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
