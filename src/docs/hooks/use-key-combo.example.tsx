"use client";

import { useKeyCombo } from "@thibault.sh/hooks/useKeyCombo";

// Demo component showcasing key combination detection
function KeyComboDemo() {
  const ctrlS = useKeyCombo(["Control", "s"]);
  const ctrlZ = useKeyCombo(["Control", "z"]);

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">Try pressing these key combinations:</div>

      <div className="space-y-2">
        <div
          className={`flex items-center justify-between p-2 rounded border ${ctrlS ? "bg-green-100 border-green-300" : "bg-muted/30"}`}
        >
          <span className="font-mono text-sm">Ctrl + S</span>
          <div className={`w-2 h-2 rounded-full ${ctrlS ? "bg-green-500" : "bg-muted"}`}></div>
        </div>

        <div
          className={`flex items-center justify-between p-2 rounded border ${ctrlZ ? "bg-green-100 border-green-300" : "bg-muted/30"}`}
        >
          <span className="font-mono text-sm">Ctrl + Z</span>
          <div className={`w-2 h-2 rounded-full ${ctrlZ ? "bg-green-500" : "bg-muted"}`}></div>
        </div>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Key Combination Detection",
    component: KeyComboDemo,
    source: `import { useKeyCombo } from "@thibault.sh/hooks/useKeyCombo";

function KeyComboDemo() {
  const ctrlS = useKeyCombo(["Control", "s"]);
  const ctrlZ = useKeyCombo(["Control", "z"]);

  return (
    <div className="space-y-3">
      <div>Try pressing these key combinations:</div>
      
      <div className="space-y-2">
        <div className={\`flex justify-between p-2 rounded border \${ctrlS ? "bg-green-100" : "bg-gray-100"}\`}>
          <span>Ctrl + S</span>
          <div className={\`w-2 h-2 rounded-full \${ctrlS ? "bg-green-500" : "bg-gray-400"}\`}></div>
        </div>
        
        <div className={\`flex justify-between p-2 rounded border \${ctrlZ ? "bg-green-100" : "bg-gray-100"}\`}>
          <span>Ctrl + Z</span>
          <div className={\`w-2 h-2 rounded-full \${ctrlZ ? "bg-green-500" : "bg-gray-400"}\`}></div>
        </div>
      </div>
    </div>
  );
}`,
  },
];

export default examples;
