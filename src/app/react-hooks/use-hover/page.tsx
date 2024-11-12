"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { hooks } from "@/config/hooks";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";

export default async function UseHoverContent() {
  const hook = hooks["UI & Layout"].items.find((item) => item.id === "use-hover");
  const implementationCode = readHookFiles("useHover.ts");
  const usageCode = `import { useHover } from '@/components/hooks/useHover';

function MyComponent() {
  const [isHovered, hoverProps] = useHover<HTMLDivElement>();

  return (
    <div {...hoverProps} className={\`p-4 rounded-lg \${
      isHovered ? "bg-blue-500 text-white" : "bg-gray-100"
    }\`}>
      {isHovered ? "I'm being hovered! 🎉" : "Hover me! 👋"}
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
          <h2 className="text-lg font-semibold">Live Demo</h2>
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
        <h2 className="text-lg font-semibold mb-4">Usage</h2>
        <div className="space-y-4">
          <CodeBlock code={usageCode} initial={initialUsage} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2">Important Notes</h2>
        <div className="space-y-4">
          <h3 className="text-sm">Key Features</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
            <li>TypeScript support with generic types for element inference</li>
            <li>Optimized performance with useCallback for event handlers</li>
            <li>Simple API with convenient prop spreading</li>
            <li>Automatic cleanup of event listeners</li>
            <li>Zero dependencies</li>
          </ul>

          <h3 className="text-sm mt-4">Use Cases</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
            <li>Interactive UI elements</li>
            <li>Hover-triggered animations</li>
            <li>Tooltips and popovers</li>
            <li>Navigation menus</li>
            <li>Interactive data visualizations</li>
          </ul>

          <h3 className="text-sm mt-4">Browser Compatibility</h3>
          <p className="text-muted-foreground text-sm">
            The hook uses standard mouse events (mouseenter/mouseleave) which are widely supported across all modern
            browsers. For touch devices, consider implementing additional touch-specific interactions as hover states
            may not be appropriate.
          </p>
        </div>
      </Card>
    </div>
  );
}
