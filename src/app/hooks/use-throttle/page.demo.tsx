"use client";

import { Card } from "@/components/ui/card";
import { useThrottle } from "@thibault.sh/hooks/useThrottle";
import { useState, useEffect, useRef } from "react";

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const throttledPosition = useThrottle(position, 100);
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);

  // Add ref for the container
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update trail with throttled positions
  useEffect(() => {
    setTrail((prev) => [...prev.slice(-10), throttledPosition]);
  }, [throttledPosition]);

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Move your mouse over this area. Position updates are throttled to 100ms intervals.
      </div>

      <div ref={containerRef} className="relative h-64 rounded-lg border bg-muted/50">
        <div className="absolute inset-0 p-4">
          <div className="space-y-2 text-sm">
            <div>
              Current: x: {position.x}, y: {position.y}
            </div>
            <div className="text-muted-foreground">
              Throttled: x: {throttledPosition.x}, y: {throttledPosition.y}
            </div>
          </div>
        </div>

        {/* Trail visualization */}
        {trail.map((pos, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-orange-500"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
              opacity: (i + 1) / trail.length,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WindowResizer() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const throttledSize = useThrottle(size, 500);
  const [updates, setUpdates] = useState<Array<{ width: number; height: number; time: string }>>([]);

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Log throttled updates
  useEffect(() => {
    setUpdates((prev) => [...prev.slice(-4), { ...throttledSize, time: new Date().toLocaleTimeString() }]);
  }, [throttledSize]);

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Resize your browser window. Size updates are throttled to 500ms intervals.
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-sm font-medium mb-1">Current Size</div>
              <div className="text-sm text-muted-foreground">
                {size.width}px × {size.height}px
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Throttled Size</div>
              <div className="text-sm text-muted-foreground">
                {throttledSize.width}px × {throttledSize.height}px
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Update Log</div>
            <div className="space-y-1">
              {updates.map((update, i) => (
                <div key={i} className="text-sm text-muted-foreground">
                  {update.time}: {update.width}px × {update.height}px
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThrottleDemo() {
  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">1. Mouse Movement</h3>
          <MouseTracker />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">2. Window Resize</h3>
          <WindowResizer />
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useThrottle } from "@thibault.sh/hooks/useThrottle";
import { useState, useEffect } from "react";

// Example 1: Mouse Movement Tracking
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const throttledPosition = useThrottle(position, 100);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <div>Current: x: {position.x}, y: {position.y}</div>
      <div>Throttled: x: {throttledPosition.x}, y: {throttledPosition.y}</div>
    </div>
  );
}

// Example 2: Window Resize Handling
function WindowResizer() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const throttledSize = useThrottle(size, 500);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div>Current: {size.width}px × {size.height}px</div>
      <div>Throttled: {throttledSize.width}px × {throttledSize.height}px</div>
    </div>
  );
}`;
