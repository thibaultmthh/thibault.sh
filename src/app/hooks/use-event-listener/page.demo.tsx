"use client";

import { Card } from "@/components/ui/card";
import { useEventListener } from "@thibault.sh/hooks/useEventListener";
import { useState, useRef } from "react";

function KeyboardExample() {
  const [lastKey, setLastKey] = useState<string>("");
  const [modifiers, setModifiers] = useState<string[]>([]);

  useEventListener("keydown", (event) => {
    setLastKey(event.key);
    const mods = [];
    if (event.ctrlKey) mods.push("Ctrl");
    if (event.shiftKey) mods.push("Shift");
    if (event.altKey) mods.push("Alt");
    if (event.metaKey) mods.push("Meta");
    setModifiers(mods);
  });

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Press any key combination to see it captured by the event listener.
      </div>

      <div className="rounded-lg border bg-muted/50 p-6">
        <div className="space-y-4 text-center">
          <div className="text-4xl font-mono">{lastKey || "?"}</div>
          {modifiers.length > 0 && (
            <div className="flex gap-2 justify-center">
              {modifiers.map((mod) => (
                <span key={mod} className="px-2 py-1 rounded bg-orange-100 text-orange-900 text-sm">
                  {mod}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MouseExample() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEventListener(
    "mousemove",
    (event) => {
      if (boxRef.current) {
        const rect = boxRef.current.getBoundingClientRect();
        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    },
    boxRef as React.RefObject<HTMLElement>
  );

  useEventListener("mouseenter", () => setIsHovering(true), boxRef as React.RefObject<HTMLElement>);

  useEventListener("mouseleave", () => setIsHovering(false), boxRef as React.RefObject<HTMLElement>);

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Move your mouse over the box to track coordinates relative to the container.
      </div>

      <div ref={boxRef} className="relative h-48 rounded-lg border bg-muted/50 overflow-hidden">
        {isHovering && (
          <>
            {/* Crosshair */}
            <div className="absolute w-full h-[1px] bg-orange-500/20" style={{ top: position.y }} />
            <div className="absolute w-[1px] h-full bg-orange-500/20" style={{ left: position.x }} />
            {/* Cursor dot */}
            <div
              className="absolute w-3 h-3 rounded-full bg-orange-500"
              style={{
                left: position.x,
                top: position.y,
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Coordinates */}
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/80 text-sm font-mono">
              x: {Math.round(position.x)}, y: {Math.round(position.y)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ScrollExample() {
  const [scrollInfo, setScrollInfo] = useState({ y: 0, direction: "" });
  const lastScrollY = useRef(0);

  useEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY.current ? "down" : "up";
    lastScrollY.current = currentScrollY;
    setScrollInfo({ y: currentScrollY, direction });
  });

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Scroll the page to see the scroll position and direction.</div>

      <div className="rounded-lg border bg-muted/50 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-sm font-medium mb-1">Scroll Position</div>
            <div className="text-2xl font-mono tabular-nums">{Math.round(scrollInfo.y)}px</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Direction</div>
            <div className="text-2xl font-mono capitalize">{scrollInfo.direction || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventListenerDemo() {
  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">1. Keyboard Events</h3>
          <KeyboardExample />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">2. Mouse Events</h3>
          <MouseExample />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">3. Scroll Events</h3>
          <ScrollExample />
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useEventListener } from "@thibault.sh/hooks/useEventListener";
import { useState, useRef } from "react";

// Example 1: Keyboard Events
function KeyboardExample() {
  const [lastKey, setLastKey] = useState("");

  useEventListener("keydown", (event) => {
    setLastKey(event.key);
  });

  return <div>Last key pressed: {lastKey}</div>;
}

// Example 2: Mouse Events with Element Target
function MouseExample() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEventListener(
    "mousemove",
    (event) => {
      if (boxRef.current) {
        const rect = boxRef.current.getBoundingClientRect();
        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    },
    boxRef
  );

  return (
    <div ref={boxRef}>
      Mouse position: {position.x}, {position.y}
    </div>
  );
}

// Example 3: Window Scroll Events
function ScrollExample() {
  const [scrollY, setScrollY] = useState(0);

  useEventListener("scroll", () => {
    setScrollY(window.scrollY);
  });

  return <div>Scroll position: {scrollY}px</div>;
}`;
