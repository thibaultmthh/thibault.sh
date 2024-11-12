"use server";

import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { highlight } from "@/lib/shiki";
import { readHookFiles } from "@/lib/readHookFiles";
import { Demo } from "./page.demo";
import getHookById from "@/lib/get-hook-by-id";

export default async function UseGeolocationContent() {
  const hook = await getHookById("use-geolocation");
  const implementationCode = readHookFiles("useGeolocation.ts");
  const usageCode = `import { useGeolocation } from '@/components/hooks/useGeolocation';

function LocationTracker() {
  const { latitude, longitude, accuracy, error, loading } = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
  });

  if (loading) return <div>Loading location...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>Latitude: {latitude}</div>
      <div>Longitude: {longitude}</div>
      <div>Accuracy: ±{accuracy}m</div>
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
              <li>Real-time location tracking</li>
              <li>High accuracy support</li>
              <li>Error handling and loading states</li>
              <li>TypeScript support</li>
              <li>Automatic cleanup of watchers</li>
              <li>Configurable options</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm">
              <li>Maps and navigation</li>
              <li>Location-based services</li>
              <li>Weather applications</li>
              <li>Fitness tracking</li>
              <li>Geofencing applications</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">API Reference</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-mono text-primary">useGeolocation(options?: PositionOptions)</h4>
                <p className="mt-1 ml-4">Returns the current geolocation state and updates in real-time.</p>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Parameters:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>enableHighAccuracy: Boolean to request better accuracy</li>
                    <li>maximumAge: Maximum cached position age in milliseconds</li>
                    <li>timeout: Maximum time to wait for reading in milliseconds</li>
                  </ul>
                </div>
                <div className="mt-2 ml-4">
                  <p className="font-medium text-primary">Returns:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>latitude: Current latitude or null</li>
                    <li>longitude: Current longitude or null</li>
                    <li>accuracy: Position accuracy in meters or null</li>
                    <li>error: Error message or null</li>
                    <li>loading: Boolean indicating loading state</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Security Considerations</h3>
            <p className="text-sm text-muted-foreground">
              The Geolocation API is only available in secure contexts (HTTPS). Users must explicitly grant permission
              to access their location. The permission can be managed through browser settings.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Browser Compatibility</h3>
            <p className="text-sm text-muted-foreground">
              The Geolocation API is widely supported across modern browsers. However, availability may be limited in
              some regions or when using certain privacy features. Always implement appropriate fallbacks.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
