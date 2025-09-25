"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CodeBlock } from "./ui/code-block";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExampleWrapperProps {
  title: string;
  component: React.ComponentType;
  source: string;
}

export default function ExampleWrapper({ title, component: Component, source }: ExampleWrapperProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{title}</h3>

      <div className="relative">
        <Card className="p-4 border-2">
          <Component />
        </Card>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCode(!showCode)}
          className="absolute bottom-2 right-2 flex items-center gap-1 text-xs"
        >
          {showCode ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Masquer
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Code
            </>
          )}
        </Button>
      </div>

      {showCode && (
        <div className="mt-2">
          <CodeBlock code={source} language="typescript" />
        </div>
      )}
    </div>
  );
}
