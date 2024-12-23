"use client";

import { Card } from "@/components/ui/card";
import { useKeyCombo } from "@thibault.sh/hooks/useKeyCombo";

export function KeyComboDemo() {
  const isSaveCombo = useKeyCombo(["Control", "s"]);
  const isUndoCombo = useKeyCombo(["Control", "z"]);
  const isRedoCombo = useKeyCombo(["Control", "Shift", "z"]);
  const isSelectAllCombo = useKeyCombo(["Control", "a"]);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">Try these keyboard combinations:</p>
        <div className="flex flex-wrap gap-4">
          <div
            className={`px-4 py-2 rounded border-2 transition-colors ${
              isSaveCombo ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <span className="font-mono">Ctrl + S</span>
          </div>
          <div
            className={`px-4 py-2 rounded border-2 transition-colors ${
              isUndoCombo ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <span className="font-mono">Ctrl + Z</span>
          </div>
          <div
            className={`px-4 py-2 rounded border-2 transition-colors ${
              isRedoCombo ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <span className="font-mono">Ctrl + Shift + Z</span>
          </div>
          <div
            className={`px-4 py-2 rounded border-2 transition-colors ${
              isSelectAllCombo ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <span className="font-mono">Ctrl + A</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Note: Make sure this window has focus for the key combinations to work.
        </p>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { Card } from "@/components/ui/card";
import { useKeyCombo } from "@thibault.sh/hooks/useKeyCombo";

export function KeyComboDemo() {
  const isSaveCombo = useKeyCombo(["Control", "s"]);
  const isUndoCombo = useKeyCombo(["Control", "z"]);
  const isRedoCombo = useKeyCombo(["Control", "Shift", "z"]);
  const isSelectAllCombo = useKeyCombo(["Control", "a"]);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Try these keyboard combinations:
        </p>
        <div className="flex flex-wrap gap-4">
          <div
            className={\`px-4 py-2 rounded border-2 transition-colors \${
              isSaveCombo ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }\`}
          >
            <span className="font-mono">Ctrl + S</span>
          </div>
          <div
            className={\`px-4 py-2 rounded border-2 transition-colors \${
              isUndoCombo ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }\`}
          >
            <span className="font-mono">Ctrl + Z</span>
          </div>
          <div
            className={\`px-4 py-2 rounded border-2 transition-colors \${
              isRedoCombo ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }\`}
          >
            <span className="font-mono">Ctrl + Shift + Z</span>
          </div>
          <div
            className={\`px-4 py-2 rounded border-2 transition-colors \${
              isSelectAllCombo ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }\`}
          >
            <span className="font-mono">Ctrl + A</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Note: Make sure this window has focus for the key combinations to work.
        </p>
      </div>
    </Card>
  );
}`;
