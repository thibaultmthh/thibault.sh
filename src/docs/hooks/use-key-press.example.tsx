"use client";

import { useKeyPress } from "@thibault.sh/hooks/useKeyPress";

// Demo component showcasing key press detection
function KeyPressDemo() {
  const spacePressed = useKeyPress(" ");
  const enterPressed = useKeyPress("Enter");
  const arrowUpPressed = useKeyPress("ArrowUp");

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">Try pressing and holding these keys:</div>

      <div className="space-y-2">
        <div
          className={`flex items-center justify-between p-2 rounded border ${spacePressed ? "bg-blue-100 border-blue-300" : "bg-muted/30"}`}
        >
          <span className="font-mono text-sm">Space</span>
          <div className={`w-2 h-2 rounded-full ${spacePressed ? "bg-blue-500" : "bg-muted"}`}></div>
        </div>

        <div
          className={`flex items-center justify-between p-2 rounded border ${enterPressed ? "bg-green-100 border-green-300" : "bg-muted/30"}`}
        >
          <span className="font-mono text-sm">Enter</span>
          <div className={`w-2 h-2 rounded-full ${enterPressed ? "bg-green-500" : "bg-muted"}`}></div>
        </div>

        <div
          className={`flex items-center justify-between p-2 rounded border ${arrowUpPressed ? "bg-purple-100 border-purple-300" : "bg-muted/30"}`}
        >
          <span className="font-mono text-sm">Arrow Up</span>
          <div className={`w-2 h-2 rounded-full ${arrowUpPressed ? "bg-purple-500" : "bg-muted"}`}></div>
        </div>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Key Press Detection",
    component: KeyPressDemo,
    source: `import { useKeyPress } from "@thibault.sh/hooks/useKeyPress";

function KeyPressDemo() {
  const spacePressed = useKeyPress(" ");
  const enterPressed = useKeyPress("Enter");
  const arrowUpPressed = useKeyPress("ArrowUp");

  return (
    <div className="space-y-3">
      <div>Try pressing and holding these keys:</div>

      <div className="space-y-2">
        <div className={\`flex justify-between p-2 rounded border \${spacePressed ? "bg-blue-100" : "bg-gray-100"}\`}>
          <span>Space</span>
          <div className={\`w-2 h-2 rounded-full \${spacePressed ? "bg-blue-500" : "bg-gray-400"}\`}></div>
        </div>
        
        <div className={\`flex justify-between p-2 rounded border \${enterPressed ? "bg-green-100" : "bg-gray-100"}\`}>
          <span>Enter</span>
          <div className={\`w-2 h-2 rounded-full \${enterPressed ? "bg-green-500" : "bg-gray-400"}\`}></div>
        </div>
        
        <div className={\`flex justify-between p-2 rounded border \${arrowUpPressed ? "bg-purple-100" : "bg-gray-100"}\`}>
          <span>Arrow Up</span>
          <div className={\`w-2 h-2 rounded-full \${arrowUpPressed ? "bg-purple-500" : "bg-gray-400"}\`}></div>
        </div>
      </div>
    </div>
  );
}`,
  },
];

export default examples;
