"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { hooks } from "@/config/hooks";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";

export default async function UseKeyPressContent() {
  const hook = hooks["UI & Layout"].items.find((item) => item.id === "use-key-press");
  const implementationCode = readHookFiles("useKeyPress.ts");
  const usageCode = `import { useKeyPress } from '@/components/hooks/useKeyPress';

function ShortcutExample() {
  const isCtrlPressed = useKeyPress('Control');
  const isSPressed = useKeyPress('s');
  
  // Save shortcut (Ctrl + S)
  useEffect(() => {
    if (isCtrlPressed && isSPressed) {
      // Prevent default browser save
      event.preventDefault();
      console.log('Save shortcut triggered!');
    }
  }, [isCtrlPressed, isSPressed]);

  return (
    <div>
      <div>Control pressed: {isCtrlPressed ? '✅' : '❌'}</div>
      <div>S pressed: {isSPressed ? '✅' : '❌'}</div>
    </div>
  );
}`;

  const initialImplementation = await highlight(implementationCode);
  const initialUsage = await highlight(usageCode);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{hook?.name}</h1>
        <p className="text-muted-foreground">{hook?.description}</p>
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
              <li>Real-time keyboard event tracking</li>
              <li>Support for all keyboard keys including modifiers (Shift, Ctrl, Alt, etc.)</li>
              <li>TypeScript support with proper event typing</li>
              <li>Automatic cleanup of event listeners</li>
              <li>Memory efficient with single event listener pattern</li>
              <li>SSR compatible</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Keyboard shortcuts and hotkeys</li>
              <li>Gaming controls</li>
              <li>Accessibility features</li>
              <li>Modal or dialog escape key handling</li>
              <li>Form submission shortcuts</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">useKeyPress(targetKey: string): boolean</h4>
                <p className="mt-1 ml-4">Returns whether the specified key is currently pressed.</p>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Parameters:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>targetKey: The key to monitor (e.g., "a", "Enter", "Escape", "Control")</li>
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
