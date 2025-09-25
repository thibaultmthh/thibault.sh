"use client";

import { Button } from "@/components/ui/button";
import { useAsync } from "@thibault.sh/hooks/useAsync";

// Demo component showcasing all features
function AsyncDemo() {
  const { execute, status } = useAsync(async (scenario: string) => {
    switch (scenario) {
      case "success":
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { message: "Success! Data loaded.", type: "success" };

      case "error":
        await new Promise((resolve) => setTimeout(resolve, 800));
        throw new Error("Something went wrong!");

      case "long":
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return { message: "Finally done after 3 seconds!", type: "success" };

      default:
        return { message: "Unknown scenario", type: "info" };
    }
  });

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={() => execute("success")} disabled={status.isLoading}>
          Quick Success
        </Button>

        <Button variant="outline" size="sm" onClick={() => execute("error")} disabled={status.isLoading}>
          Trigger Error
        </Button>

        <Button variant="outline" size="sm" onClick={() => execute("long")} disabled={status.isLoading}>
          Long Loading
        </Button>
      </div>

      {/* Status display */}
      <div className="min-h-[60px] p-3 bg-muted/30 rounded-md border">
        {status.isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>
        )}

        {status.error && (
          <div className="text-sm text-destructive">
            <strong>Error:</strong> {status.error.message}
          </div>
        )}

        {status.value && (
          <div className="text-sm text-green-600">
            <strong>Result:</strong> {status.value.message}
          </div>
        )}

        {!status.isLoading && !status.error && !status.value && (
          <div className="text-sm text-muted-foreground">Click a button to test different async scenarios</div>
        )}
      </div>

      {/* Status indicators */}
      <div className="flex gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${status.isLoading ? "bg-blue-500" : "bg-muted"}`}></div>
          Loading: {status.isLoading ? "true" : "false"}
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${status.error ? "bg-red-500" : "bg-muted"}`}></div>
          Error: {status.error ? "true" : "false"}
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${status.value ? "bg-green-500" : "bg-muted"}`}></div>
          Value: {status.value ? "true" : "false"}
        </div>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Basic Usage",
    component: AsyncDemo,
    source: `import { useAsync } from "@thibault.sh/hooks/useAsync";

function AsyncDemo() {
  const { execute, status } = useAsync(async (scenario) => {
    switch (scenario) {
      case "success":
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { message: "Success! Data loaded." };
      
      case "error":
        await new Promise((resolve) => setTimeout(resolve, 800));
        throw new Error("Something went wrong!");
      
      case "long":
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return { message: "Finally done after 3 seconds!" };
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => execute("success")} disabled={status.isLoading}>
          Quick Success
        </button>
        <button onClick={() => execute("error")} disabled={status.isLoading}>
          Trigger Error
        </button>
        <button onClick={() => execute("long")} disabled={status.isLoading}>
          Long Loading
        </button>
      </div>

      <div className="p-3 bg-gray-100 rounded">
        {status.isLoading && <div>Loading...</div>}
        {status.error && <div>Error: {status.error.message}</div>}
        {status.value && <div>Result: {status.value.message}</div>}
      </div>

      <div className="text-sm text-gray-600">
        Loading: {status.isLoading ? 'true' : 'false'} | 
        Error: {status.error ? 'true' : 'false'} | 
        Value: {status.value ? 'true' : 'false'}
      </div>
    </div>
  );
}`,
  },
];

export default examples;
