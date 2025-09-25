"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLongPress } from "@thibault.sh/hooks/useLongPress";

// Demo component showcasing long press functionality
function LongPressDemo() {
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(800);

  const { handlers, state } = useLongPress({
    delay,
    onPress: () => setMessage("Short press!"),
    onLongPress: () => setMessage("Long press triggered!"),
    onLongPressCanceled: () => setMessage("Long press canceled"),
  });

  return (
    <div className="space-y-4">
      {/* Delay controls */}
      <div className="flex gap-2">
        <Button variant={delay === 500 ? "default" : "outline"} size="sm" onClick={() => setDelay(500)}>
          500ms
        </Button>
        <Button variant={delay === 800 ? "default" : "outline"} size="sm" onClick={() => setDelay(800)}>
          800ms
        </Button>
        <Button variant={delay === 1200 ? "default" : "outline"} size="sm" onClick={() => setDelay(1200)}>
          1200ms
        </Button>
      </div>

      {/* State display */}
      <div className="p-3 bg-muted/30 rounded border text-sm">
        <div>Pressed: {state.isPressed ? "Yes" : "No"}</div>
        <div>Long pressed: {state.isLongPressed ? "Yes" : "No"}</div>
        <div>Progress: {Math.round(state.progress * 100)}%</div>
      </div>

      {/* Interactive button */}
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Press and hold the button below (delay: {delay}ms)</div>
        <button
          {...handlers}
          className={`
            relative w-full h-16 rounded border-2 transition-all overflow-hidden
            ${state.isPressed ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-50"}
          `}
        >
          {/* Progress bar background */}
          <div
            className="absolute left-0 top-0 h-full bg-blue-200 transition-all duration-75"
            style={{ width: `${state.progress * 100}%` }}
          />

          {/* Button text */}
          <div className="relative z-10 text-sm font-medium">
            {state.isLongPressed ? "Long Press Complete!" : "Press & Hold"}
          </div>
        </button>
      </div>

      {/* Message display */}
      {message && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">{message}</div>
      )}
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Long Press Detection",
    component: LongPressDemo,
    source: `import { useState } from "react";
import { useLongPress } from "@thibault.sh/hooks/useLongPress";

function LongPressDemo() {
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(800);

  const { handlers, state } = useLongPress({
    delay,
    onPress: () => setMessage("Short press!"),
    onLongPress: () => setMessage("Long press triggered!"),
    onLongPressCanceled: () => setMessage("Long press canceled"),
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setDelay(500)}>500ms</button>
        <button onClick={() => setDelay(800)}>800ms</button>
        <button onClick={() => setDelay(1200)}>1200ms</button>
      </div>

      <div className="p-3 bg-gray-100 rounded">
        <div>Pressed: {state.isPressed ? "Yes" : "No"}</div>
        <div>Long pressed: {state.isLongPressed ? "Yes" : "No"}</div>
        <div>Progress: {Math.round(state.progress * 100)}%</div>
      </div>

      <button
        {...handlers}
        className={\`
          relative w-full h-16 rounded border-2 overflow-hidden
          \${state.isPressed ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
        \`}
      >
        <div
          className="absolute left-0 top-0 h-full bg-blue-200"
          style={{ width: \`\${state.progress * 100}%\` }}
        />
        <div className="relative z-10">
          {state.isLongPressed ? "Long Press Complete!" : "Press & Hold"}
        </div>
      </button>

      {message && (
        <div className="p-3 bg-green-100 rounded">
          {message}
        </div>
      )}
    </div>
  );
}`,
  },
];

export default examples;
