"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { hooks } from "@/config/hooks";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";

export default async function UseKeyComboContent() {
  const implementationCode = readHookFiles("useKeyCombo.ts");
  const usageCode = `import { useKeyCombo } from '@/components/hooks/useKeyCombo';

function ShortcutsExample() {
  // Save shortcut (Ctrl + S)
  useKeyCombo(["Control", "s"], () => {
    console.log("Save action triggered!");
  });

  // Open command palette (Ctrl + K)
  useKeyCombo(["Control", "k"], () => {
    console.log("Command palette opened!");
  });

  return <div>Press Ctrl + S to save or Ctrl + K to open command palette</div>;
}`;

  const initialImplementation = await highlight(implementationCode);
  const initialUsage = await highlight(usageCode);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">useKeyCombo</h1>
        <p className="text-muted-foreground">
          A React hook for handling keyboard shortcuts and key combinations with a simple callback-based API.
          Perfect for implementing application-wide shortcuts, command palettes, and keyboard navigation.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Interactive Demo</h2>
        </div>
        <Demo />
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Implementation</h2>
        </div>
        <CodeBlock code={implementationCode} initial={initialImplementation} />
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Usage Examples</h2>
        <div className="space-y-4">
          <CodeBlock code={usageCode} initial={initialUsage} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2">Documentation</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Support for multiple key combinations</li>
              <li>Callback-based API for easy integration</li>
              <li>Prevents default browser shortcuts when needed</li>
              <li>TypeScript support with proper typing</li>
              <li>Automatic cleanup of event listeners</li>
              <li>Memory efficient implementation</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Application shortcuts (Save, Undo, Redo)</li>
              <li>Command palette triggers</li>
              <li>Modal or dialog keyboard controls</li>
              <li>Custom keyboard navigation</li>
              <li>Gaming controls with multiple keys</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">useKeyCombo(combo: string[], callback: () => void): void</h4>
                <p className="mt-1 ml-4">Sets up a keyboard combination listener that triggers the callback when all specified keys are pressed.</p>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Parameters:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>combo: Array of keys that make up the combination</li>
                    <li>callback: Function to execute when the combination is pressed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Browser Compatibility</h3>
            <p className="text-sm text-muted-foreground">
              The hook uses the standard KeyboardEvent API, which is supported in all modern browsers. Key values follow
              the KeyboardEvent.key standard. For special keys, refer to the
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values"
                className="text-primary hover:underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                MDN Key Values
              </a>{" "}
              documentation.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 