"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";

export default async function UseTimerContent() {
  const hook = getHookById("use-timer");
  const implementationCode = readHookFiles("useTimer.ts");
  const usageCode = `import { useTimer } from '@/components/hooks/useTimer';

function TimerExample() {
  const timer = useTimer({
    initialTime: 0,
    interval: 1000,
    autostart: false,
  });
  
  return (
    <div>
      <div>Time: {timer.time}ms</div>
      <button onClick={timer.toggle}>
        {timer.isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={timer.reset}>Reset</button>
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
              <li>Configurable interval-based timing</li>
              <li>Support for both countdown and stopwatch modes</li>
              <li>Pause, resume, and reset functionality</li>
              <li>Optional autostart capability</li>
              <li>Configurable end time</li>
              <li>TypeScript support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Countdown timers</li>
              <li>Stopwatches</li>
              <li>Game timers</li>
              <li>Session timeout tracking</li>
              <li>Time-based animations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">useTimer(options?: TimerOptions)</h4>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Options:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>initialTime?: number (default: 0) - Starting time in milliseconds</li>
                    <li>interval?: number (default: 1000) - Update interval in milliseconds</li>
                    <li>autostart?: boolean (default: false) - Whether to start automatically</li>
                    <li>endTime?: number - Optional end time for the timer</li>
                    <li>countdown?: boolean (default: false) - Whether to count down instead of up</li>
                    <li>onEnd?: () =&gt; void - Callback function executed when timer reaches endTime</li>
                  </ul>
                </div>
                <div className="mt-4 ml-4">
                  <p className="font-medium text-primary">Returns:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>time: number - Current time value</li>
                    <li>isRunning: boolean - Timer running state</li>
                    <li>start(): void - Start the timer</li>
                    <li>pause(): void - Pause the timer</li>
                    <li>reset(): void - Reset to initial time</li>
                    <li>toggle(): void - Toggle between running and paused states</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
