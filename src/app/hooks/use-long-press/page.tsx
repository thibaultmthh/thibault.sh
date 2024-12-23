"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LongPressDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseLongPressDoc() {
  const jsDocExample = `/**
 * A hook that handles both normal press and long press interactions
 *
 * @param options - Configuration options for the long press behavior
 * @param options.delay - Duration in milliseconds before a press is considered a long press (default: 400)
 * @param options.preventContext - When true, prevents the default context menu on long press (default: true)
 * @param options.onPress - Callback fired when a normal press (shorter than delay) is completed.
 *                         Triggers only if the press duration was less than the specified delay
 * @param options.onLongPress - Callback fired when a long press is successfully triggered.
 *                             Triggers exactly once when the press duration exceeds the delay
 * @param options.onLongPressCanceled - Callback fired when a long press is canceled before completion.
 *                                     Triggers if the press is released or canceled before reaching the delay threshold
 * @returns Object containing event handlers and current press state
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useLongPress</h1>
          <Badge variant="outline">UI/Interaction</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that handles both normal press and long press interactions, with progress tracking and
          customizable callbacks.
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
            <LongPressDemo />
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
          code={`import { useLongPress } from '@thibault.sh/hooks/useLongPress';

function LongPressButton() {
  const { handlers, state } = useLongPress({
    delay: 500,
    onPress: () => console.log('Normal press'),
    onLongPress: () => console.log('Long press completed'),
    onLongPressCanceled: () => console.log('Long press canceled')
  });

  return (
    <button {...handlers}>
      {state.isLongPressed
        ? 'Long Press!'
        : \`Hold me (\${Math.round(state.progress * 100)}%)\`}
    </button>
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
                <strong>Progress Tracking</strong>
                <p className="text-sm text-muted-foreground">
                  Real-time progress tracking of the long press duration with smooth animation frames
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Touch & Mouse Support</strong>
                <p className="text-sm text-muted-foreground">
                  Works with both touch and mouse events for broad device compatibility
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Customizable Timing</strong>
                <p className="text-sm text-muted-foreground">Adjustable delay threshold for long press detection</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Rich Event Callbacks</strong>
                <p className="text-sm text-muted-foreground">
                  Comprehensive set of callbacks for different press states and events
                </p>
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
            code={`import { useLongPress } from '@thibault.sh/hooks/useLongPress';

function ContextMenuButton() {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  const { handlers } = useLongPress({
    delay: 500,
    preventContext: true,
    onPress: () => setMenuPosition(null),
    onLongPress: (event) => {
      // Position context menu at press location
      const { clientX, clientY } = event instanceof TouchEvent 
        ? event.touches[0] 
        : event;
      setMenuPosition({ x: clientX, y: clientY });
    }
  });

  return (
    <>
      <button {...handlers}>
        Long press for context menu
      </button>
      {menuPosition && (
        <div
          style={{
            position: 'fixed',
            top: menuPosition.y,
            left: menuPosition.x,
          }}
        >
          {/* Context menu content */}
        </div>
      )}
    </>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Delete Confirmation Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useLongPress } from '@thibault.sh/hooks/useLongPress';

function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const { handlers, state } = useLongPress({
    delay: 2000,
    onLongPress: onDelete,
    onLongPressCanceled: () => console.log('Delete canceled')
  });

  return (
    <button
      {...handlers}
      className={\`\${
        state.isPressed
          ? 'bg-red-500'
          : 'bg-gray-200'
      } relative overflow-hidden\`}
    >
      {state.isLongPressed ? (
        'Deleted!'
      ) : (
        <>
          Hold to Delete
          {state.isPressed && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-red-700"
              style={{ width: \`\${state.progress * 100}%\` }}
            />
          )}
        </>
      )}
    </button>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>
    </div>
  );
}
