"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { hooks } from "@/config/hooks";
import { highlight } from "@/lib/shiki";

import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";

export default async function UseSessionStorageContent() {
  const hook = hooks["State Management"].items.find((item) => item.id === "use-session-storage");
  const implementationCode = readHookFiles("useSessionStorage.ts");
  const usageCode = `const [value, setValue] = useSessionStorage("storage-key", initialValue);

// Use it like useState
setValue("new value");

// Or with a function
setValue(prev => prev + 1);`;

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
          <h3 className="text-sm">Server-Side Rendering (SSR) Limitations</h3>
          <p className="text-muted-foreground text-sm">
            This hook is designed to handle SSR environments safely. Since sessionStorage is only available in the
            browser:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
            <li>During SSR, the hook will return the initialValue</li>
            <li>sessionStorage operations are only performed on the client-side</li>
            <li>The hook includes checks for window object availability to prevent SSR errors</li>
            <li>Unlike localStorage, data persists only for the current session/tab</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
