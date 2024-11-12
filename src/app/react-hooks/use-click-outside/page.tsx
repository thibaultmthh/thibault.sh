"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { hooks } from "@/config/hooks";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";

export default async function UseClickOutsideContent() {
  const hook = hooks["UI & Layout"].items.find((item) => item.id === "use-click-outside");
  const implementationCode = readHookFiles("useClickOutside.ts");
  const usageCode = `import { useRef } from 'react';
import { useClickOutside } from '@/components/hooks/useClickOutside';

function MyComponent() {
  const ref = useRef(null);
  
  useClickOutside(ref, () => {
    console.log('Clicked outside!');
    // Handle click outside (e.g., close modal, hide dropdown)
  });

  return (
    <div ref={ref}>
      Click outside this element!
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
          <h3 className="text-sm">Event Types</h3>
          <p className="text-muted-foreground text-sm">
            The hook supports both mouse and touch events, making it work across different devices and input methods:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
            <li>Mouse events (configurable between mousedown and mouseup)</li>
            <li>Touch events (touchstart)</li>
            <li>Proper cleanup of event listeners on unmount</li>
          </ul>

          <h3 className="text-sm mt-4">Use Cases</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
            <li>Modal dialogs</li>
            <li>Dropdown menus</li>
            <li>Popover components</li>
            <li>Context menus</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
