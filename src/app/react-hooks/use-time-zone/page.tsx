"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";

export default async function UseTimeZoneContent() {
  const implementationCode = readHookFiles("useTimeZone.ts");
  const usageCode = `import { useTimeZone } from '@/components/hooks/useTimeZone';

function TimeZoneDisplay() {
  const { timeZone, offset, abbreviation, isDST } = useTimeZone();
  
  return (
    <div>
      <p>Current Time Zone: {timeZone}</p>
      <p>UTC Offset: {offset}:00</p>
      <p>Abbreviation: {abbreviation}</p>
      <p>Daylight Saving Time: {isDST ? 'Yes' : 'No'}</p>
    </div>
  );
}`;

  const initialImplementation = await highlight(implementationCode);
  const initialUsage = await highlight(usageCode);
  const hook = getHookById("use-time-zone");

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
              <li>Real-time time zone information updates</li>
              <li>Automatic DST detection</li>
              <li>Time zone abbreviation support</li>
              <li>UTC offset calculation</li>
              <li>TypeScript support with proper typing</li>
              <li>SSR compatible</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Displaying local time information</li>
              <li>Time zone aware applications</li>
              <li>Scheduling and calendar applications</li>
              <li>International date/time handling</li>
              <li>Time conversion utilities</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">useTimeZone(): TimeZoneInfo</h4>
                <p className="mt-1 ml-4">Returns an object containing time zone information.</p>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Return Value:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>timeZone: String representing the IANA time zone name</li>
                    <li>offset: Number representing UTC offset in hours</li>
                    <li>abbreviation: String representing time zone abbreviation</li>
                    <li>isDST: Boolean indicating if DST is currently active</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Browser Compatibility</h3>
            <p className="text-sm text-muted-foreground">
              The hook uses the Intl API and standard Date methods, which are supported in all modern browsers. For
              older browsers, consider using a polyfill for the Intl API.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
