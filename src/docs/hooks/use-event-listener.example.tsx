"use client";

import { useRef, useState } from "react";
import { useEventListener } from "@thibault.sh/hooks/useEventListener";

// Simple click demo
function ClickDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clickCount, setClickCount] = useState(0);

  useEventListener(
    "click",
    () => {
      setClickCount((prev) => prev + 1);
    },
    buttonRef
  );

  return (
    <div className="space-y-2">
      <button ref={buttonRef} className="px-4 py-2 bg-blue-500 text-white rounded">
        Click me
      </button>
      <div className="text-sm">Clicks: {clickCount}</div>
    </div>
  );
}

// Key press demo
function KeyDemo() {
  const [lastKey, setLastKey] = useState("");

  useEventListener("keydown", (e) => {
    setLastKey(e.key);
  });

  return (
    <div className="space-y-2">
      <div className="text-sm">Press any key</div>
      <div className="p-2 bg-muted/30 rounded font-mono">Last key: {lastKey || "None"}</div>
    </div>
  );
}

// Export the examples with source code
const examples = [
  {
    title: "Element Click Listener",
    component: ClickDemo,
    source: `import { useRef, useState } from "react";
import { useEventListener } from "@thibault.sh/hooks/useEventListener";

function ClickDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clickCount, setClickCount] = useState(0);

  useEventListener('click', () => {
    setClickCount(prev => prev + 1);
  }, buttonRef);

  return (
    <div>
      <button ref={buttonRef} className="px-4 py-2 bg-blue-500 text-white rounded">
        Click me
      </button>
      <div>Clicks: {clickCount}</div>
    </div>
  );
}`,
  },
  {
    title: "Keyboard Events",
    component: KeyDemo,
    source: `import { useState } from "react";
import { useEventListener } from "@thibault.sh/hooks/useEventListener";

function KeyDemo() {
  const [lastKey, setLastKey] = useState('');

  useEventListener('keydown', (e) => {
    setLastKey(e.key);
  });

  return (
    <div>
      <div>Press any key</div>
      <div className="p-2 bg-gray-100 rounded">
        Last key: {lastKey || 'None'}
      </div>
    </div>
  );
}`,
  },
];

export default examples;
