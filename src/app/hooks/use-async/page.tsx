"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AsyncDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseAsyncDoc() {
  const jsDocExample = `interface AsyncState<T> {
  isLoading: boolean;
  error: Error | null;
  value: T | null;
}

/**
 * Hook that handles async operations with loading and error states
 * @param asyncFunction - Async function to execute
 * @returns Object containing execute function, loading state, error, and value
 */`;

  const usageExample = `import { useAsync } from "@thibault.sh/hooks";

function UserProfile() {
  const { execute: fetchUser, status } = useAsync(async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error("Failed to fetch user");
    return response.json();
  });

  return (
    <div>
      <button
        onClick={() => fetchUser("123")}
        disabled={status.isLoading}
      >
        {status.isLoading ? "Loading..." : "Load Profile"}
      </button>

      {status.error && <div>Error: {status.error.message}</div>}
      {status.value && <div>Welcome, {status.value.name}!</div>}
    </div>
  );
}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useAsync</h1>
          <Badge variant="outline">Data/State</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that manages asynchronous operations with built-in loading, error, and success states, making it
          easy to handle data fetching, form submissions, and other async tasks.
        </p>
      </div>

      {/* Demo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Demo</h2>
        <Tabs defaultValue="preview" className="relative mr-auto">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="relative">
            <AsyncDemo />
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={demoSource} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <Card className="relative">
          <CodeBlock code="npm install @thibault.sh/hooks" />
        </Card>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <Card className="relative">
          <CodeBlock code={usageExample} />
        </Card>
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <Card className="relative">
          <APIFromJSDoc jsDoc={jsDocExample} />
        </Card>
      </div>

      {/* Parameters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Parameters</h2>
        <Card className="relative overflow-hidden">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">asyncFunction</h3>
                <p className="text-muted-foreground">
                  An asynchronous function that returns a Promise. This function will be wrapped with loading and error
                  handling logic.
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Type: <code className="text-orange-600">(...args: any[]) =&gt; Promise&lt;T&gt;</code>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Return Value */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Return Value</h2>
        <Card className="relative">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">execute</h3>
                <p className="text-muted-foreground">
                  A function that triggers the async operation. It accepts the same arguments as the input async
                  function and handles the loading state and error catching automatically.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">status</h3>
                <p className="text-muted-foreground mb-4">
                  An object containing the current state of the async operation:
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">isLoading</div>
                    <p className="text-sm text-muted-foreground">
                      Boolean indicating whether the async operation is currently in progress.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">error</div>
                    <p className="text-sm text-muted-foreground">
                      Error object if the async operation failed, null otherwise.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">value</div>
                    <p className="text-sm text-muted-foreground">
                      The result of the async operation if successful, null otherwise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Loading State Management</h3>
            <p className="text-sm text-muted-foreground">
              Automatically tracks loading state during async operations, making it easy to show loading indicators and
              disable interactions.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Error Handling</h3>
            <p className="text-sm text-muted-foreground">
              Catches and stores errors from failed async operations, enabling proper error messaging and recovery
              flows.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Type Safety</h3>
            <p className="text-sm text-muted-foreground">
              Full TypeScript support with generics for proper typing of async function results and error handling.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Reusable Logic</h3>
            <p className="text-sm text-muted-foreground">
              Encapsulates common async operation patterns, reducing boilerplate and ensuring consistent error handling.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
