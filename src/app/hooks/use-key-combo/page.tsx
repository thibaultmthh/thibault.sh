"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyComboDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseKeyComboDoc() {
  const jsDocExample = `/**
 * Hook that detects when a specific combination of keys is pressed
 * @param {string[]} targetCombo - Array of keys that make up the combination (e.g., ["Control", "Shift", "a"])
 * @returns {boolean} Boolean indicating if the combination is currently active
 * @example
 * const isSaveCombo = useKeyCombo(["Control", "s"]);
 * const isRedoCombo = useKeyCombo(["Control", "Shift", "z"]);
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useKeyCombo</h1>
          <Badge variant="outline">UI/Interaction</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that detects keyboard combinations, perfect for implementing keyboard shortcuts and complex
          interactions.
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
            <KeyComboDemo />
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
          code={`import { useKeyCombo } from '@thibault.sh/hooks/useKeyCombo';

function Editor() {
  const isSaveCombo = useKeyCombo(['Control', 's']);
  const isUndoCombo = useKeyCombo(['Control', 'z']);
  const isRedoCombo = useKeyCombo(['Control', 'Shift', 'z']);

  React.useEffect(() => {
    if (isSaveCombo) {
      handleSave();
    } else if (isUndoCombo) {
      handleUndo();
    } else if (isRedoCombo) {
      handleRedo();
    }
  }, [isSaveCombo, isUndoCombo, isRedoCombo]);

  return (
    <div>
      <p>Available shortcuts:</p>
      <ul>
        <li>Ctrl + S: Save</li>
        <li>Ctrl + Z: Undo</li>
        <li>Ctrl + Shift + Z: Redo</li>
      </ul>
      {/* Editor content */}
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
              <li>• Modifier keys: &quot;Control&quot;, &quot;Shift&quot;, &quot;Alt&quot;, &quot;Meta&quot;</li>
              <li>• Single characters: &quot;a&quot;-&quot;z&quot;, &quot;0&quot;-&quot;9&quot;</li>
              <li>• Special keys: &quot;Enter&quot;, &quot;Escape&quot;, &quot;Delete&quot;, &quot;Tab&quot;</li>
              <li>• Function keys: &quot;F1&quot;-&quot;F12&quot;</li>
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
                <strong>Order Independent</strong>
                <p className="text-sm text-muted-foreground">Key order doesn&apos;t matter in the combination</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Multiple Modifiers</strong>
                <p className="text-sm text-muted-foreground">Support for combinations with multiple modifier keys</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Type Safety</strong>
                <p className="text-sm text-muted-foreground">Full TypeScript support for key names</p>
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
        <h2 className="text-xl font-semibold">Rich Text Editor Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useKeyCombo } from '@thibault.sh/hooks';
import { useState } from 'react';

interface TextStyle {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
}

function RichTextEditor() {
  const [style, setStyle] = useState<TextStyle>({
    isBold: false,
    isItalic: false,
    isUnderline: false
  });

  const isBoldCombo = useKeyCombo(['Control', 'b']);
  const isItalicCombo = useKeyCombo(['Control', 'i']);
  const isUnderlineCombo = useKeyCombo(['Control', 'u']);

  React.useEffect(() => {
    if (isBoldCombo) {
      setStyle(prev => ({ ...prev, isBold: !prev.isBold }));
    }
    if (isItalicCombo) {
      setStyle(prev => ({ ...prev, isItalic: !prev.isItalic }));
    }
    if (isUnderlineCombo) {
      setStyle(prev => ({ ...prev, isUnderline: !prev.isUnderline }));
    }
  }, [isBoldCombo, isItalicCombo, isUnderlineCombo]);

  return (
    <div>
      <div className="toolbar">
        <button className={style.isBold ? 'active' : ''}>
          Bold (Ctrl+B)
        </button>
        <button className={style.isItalic ? 'active' : ''}>
          Italic (Ctrl+I)
        </button>
        <button className={style.isUnderline ? 'active' : ''}>
          Underline (Ctrl+U)
        </button>
      </div>
      <textarea
        style={{
          fontWeight: style.isBold ? 'bold' : 'normal',
          fontStyle: style.isItalic ? 'italic' : 'normal',
          textDecoration: style.isUnderline ? 'underline' : 'none'
        }}
      />
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Application Shortcuts Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useKeyCombo } from '@thibault.sh/hooks';
import { useEffect } from 'react';

function AppShortcuts() {
  const isNewFileCombo = useKeyCombo(['Control', 'n']);
  const isOpenFileCombo = useKeyCombo(['Control', 'o']);
  const isSaveCombo = useKeyCombo(['Control', 's']);
  const isSaveAsCombo = useKeyCombo(['Control', 'Shift', 's']);
  const isPrintCombo = useKeyCombo(['Control', 'p']);
  const isCloseTabCombo = useKeyCombo(['Control', 'w']);
  const isQuitCombo = useKeyCombo(['Control', 'q']);

  useEffect(() => {
    const handleShortcuts = () => {
      if (isNewFileCombo) {
        handleNewFile();
      } else if (isOpenFileCombo) {
        handleOpenFile();
      } else if (isSaveAsCombo) {
        // Handle Save As before Save to prevent conflict
        handleSaveAs();
      } else if (isSaveCombo) {
        handleSave();
      } else if (isPrintCombo) {
        handlePrint();
      } else if (isCloseTabCombo) {
        handleCloseTab();
      } else if (isQuitCombo) {
        handleQuit();
      }
    };

    handleShortcuts();
  }, [
    isNewFileCombo,
    isOpenFileCombo,
    isSaveCombo,
    isSaveAsCombo,
    isPrintCombo,
    isCloseTabCombo,
    isQuitCombo
  ]);

  return (
    <div className="help-panel">
      <h2>Keyboard Shortcuts</h2>
      <table>
        <tbody>
          <tr>
            <td>New File</td>
            <td>Ctrl + N</td>
          </tr>
          <tr>
            <td>Open File</td>
            <td>Ctrl + O</td>
          </tr>
          <tr>
            <td>Save</td>
            <td>Ctrl + S</td>
          </tr>
          <tr>
            <td>Save As</td>
            <td>Ctrl + Shift + S</td>
          </tr>
          <tr>
            <td>Print</td>
            <td>Ctrl + P</td>
          </tr>
          <tr>
            <td>Close Tab</td>
            <td>Ctrl + W</td>
          </tr>
          <tr>
            <td>Quit</td>
            <td>Ctrl + Q</td>
          </tr>
        </tbody>
      </table>
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
