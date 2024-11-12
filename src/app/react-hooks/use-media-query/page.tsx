"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";

export default async function UseMediaQueryContent() {
  const hook = getHookById("use-media-query");
  const implementationCode = readHookFiles("useMediaQuery.ts");
  const usageCode = `// Basic usage
const isMobile = useMediaQuery('(max-width: 768px)');

// Multiple queries
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

// Use in conditional rendering
{isMobile ? <MobileNav /> : <DesktopNav />}`;

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
          <h3 className="text-sm">Server-Side Rendering (SSR) Considerations</h3>
          <p className="text-muted-foreground text-sm">This hook is designed to work safely in SSR environments:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
            <li>During SSR, the hook will return false as default</li>
            <li>Media query matching is only performed on the client-side</li>
            <li>The hook includes checks for window object availability</li>
            <li>Event listeners are properly cleaned up to prevent memory leaks</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
