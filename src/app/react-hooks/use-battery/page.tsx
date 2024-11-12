"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";
import { Alert } from "@/components/ui/alert";

export default async function UseBatteryContent() {
  const hook = getHookById("use-battery");
  const implementationCode = readHookFiles("useBattery.ts");
  const usageCode = `import { useBattery } from '@/components/hooks/useBattery';

function BatteryStatus() {
  const { charging, level, supported } = useBattery();
  
  if (!supported) {
    return <div>Battery API not supported</div>;
  }

  return (
    <div>
      <div>Battery Level: {level}%</div>
      <div>Status: {charging ? 'Charging' : 'Not charging'}</div>
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
              <li>Real-time battery status monitoring</li>
              <li>Charging state detection</li>
              <li>Battery level percentage</li>
              <li>Charging and discharging time estimates</li>
              <li>Browser compatibility detection</li>
              <li>TypeScript support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Battery status indicators</li>
              <li>Power-saving mode triggers</li>
              <li>Battery-aware feature adjustments</li>
              <li>Device energy monitoring</li>
              <li>Low battery notifications</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">useBattery(): BatteryState</h4>
                <p className="mt-1 ml-4">Returns the current battery state.</p>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Return value:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>charging: boolean - Whether the device is currently charging</li>
                    <li>level: number - Battery level as a percentage (0-100)</li>
                    <li>chargingTime: number - Seconds until battery is fully charged</li>
                    <li>dischargingTime: number - Seconds until battery is empty</li>
                    <li>supported: boolean - Whether the Battery API is supported</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Browser Compatibility</h3>
            <div className="space-y-4">
              <Alert variant="default" className="mb-4">
                <p>
                  The Battery Status API has limited browser support and requires a secure context (HTTPS). It is
                  primarily supported in Chrome-based browsers.
                </p>
              </Alert>

              <h3 className="text-sm font-medium">Requirements:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
                <li>Secure context (HTTPS)</li>
                <li>Chrome/Chromium-based browsers</li>
                <li>Appropriate permissions policy</li>
              </ul>

              <p className="text-sm text-muted-foreground">
                For more details, see the{" "}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MDN documentation
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
