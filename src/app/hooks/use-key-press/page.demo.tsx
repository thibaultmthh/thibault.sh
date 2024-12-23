"use client";

import { Card } from "@/components/ui/card";
import { useKeyPress } from "@thibault.sh/hooks/useKeyPress";

export function KeyPressDemo() {
  const isSpacePressed = useKeyPress(" ");
  const isEnterPressed = useKeyPress("Enter");
  const isEscapePressed = useKeyPress("Escape");
  const isAPressed = useKeyPress("a");

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">Press any of these keys to see them highlight:</p>
        <div className="flex flex-wrap gap-4">
          <div
            className={`px-4 py-2 rounded border-2 transition-colors ${
              isSpacePressed ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <span className="font-mono">Space</span>
          </div>
          <div
            className={`px-4 py-2 rounded border-2 transition-colors ${
              isEnterPressed ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <span className="font-mono">Enter</span>
          </div>
          <div
            className={`px-4 py-2 rounded border-2 transition-colors ${
              isEscapePressed ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <span className="font-mono">Escape</span>
          </div>
          <div
            className={`px-4 py-2 rounded border-2 transition-colors ${
              isAPressed ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <span className="font-mono">A</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Note: Make sure this window has focus for the key detection to work.
        </p>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { Card } from "@/components/ui/card";
import { useKeyPress } from "@thibault.sh/hooks/useKeyPress";

export function KeyPressDemo() {
  const isSpacePressed = useKeyPress(" ");
  const isEnterPressed = useKeyPress("Enter");
  const isEscapePressed = useKeyPress("Escape");
  const isAPressed = useKeyPress("a");

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Press any of these keys to see them highlight:
        </p>
        <div className="flex flex-wrap gap-4">
          <div
            className={\`px-4 py-2 rounded border-2 transition-colors \${
              isSpacePressed ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }\`}
          >
            <span className="font-mono">Space</span>
          </div>
          <div
            className={\`px-4 py-2 rounded border-2 transition-colors \${
              isEnterPressed ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }\`}
          >
            <span className="font-mono">Enter</span>
          </div>
          <div
            className={\`px-4 py-2 rounded border-2 transition-colors \${
              isEscapePressed ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }\`}
          >
            <span className="font-mono">Escape</span>
          </div>
          <div
            className={\`px-4 py-2 rounded border-2 transition-colors \${
              isAPressed ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }\`}
          >
            <span className="font-mono">A</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Note: Make sure this window has focus for the key detection to work.
        </p>
      </div>
    </Card>
  );
}`;
