"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DebounceDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseDebounceDoc() {
  const jsDocExample = `/**
 * Hook that debounces a value
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */`;

  const usageExample = `import { useDebounce } from "@thibault.sh/hooks";

function SearchInput() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // API call will only be made 500ms after the user stops typing
    if (debouncedSearch) {
      searchApi(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useDebounce</h1>
          <Badge variant="outline">Performance</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that delays updating a value until a specified time has passed since the last change, useful for
          reducing API calls and expensive operations.
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
            <DebounceDemo />
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
                <h3 className="text-lg font-semibold mb-2">value</h3>
                <p className="text-muted-foreground">
                  The value to debounce. This can be any type of value (string, number, object, etc.). The hook will
                  return a new value of the same type after the delay.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">delay</h3>
                <p className="text-muted-foreground">
                  The time in milliseconds to wait before updating the debounced value after the last change. A typical
                  value is 500ms for search inputs or 200ms for other UI updates.
                </p>
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
            <p className="text-muted-foreground">
              Returns the debounced value. The value will only update after the specified delay has passed since the
              last change to the input value.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              Type: <code className="text-orange-600">T</code> (same type as input value)
            </div>
          </div>
        </Card>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Performance Optimization</h3>
            <p className="text-sm text-muted-foreground">
              Reduces the frequency of expensive operations like API calls, DOM updates, or heavy computations by
              waiting for user input to stabilize.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Type Safety</h3>
            <p className="text-sm text-muted-foreground">
              Full TypeScript support with generics, ensuring type safety between the input value and the debounced
              output.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Memory Efficient</h3>
            <p className="text-sm text-muted-foreground">
              Properly cleans up timeouts on component unmount and value changes, preventing memory leaks and
              unnecessary updates.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Flexible Usage</h3>
            <p className="text-sm text-muted-foreground">
              Works with any value type and can be used for various scenarios like search inputs, form validation, or
              real-time UI updates.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
