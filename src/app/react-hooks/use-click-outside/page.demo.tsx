"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/components/hooks/useClickOutside";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Demo() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    if (isOpen) {
      setIsOpen(false);
      setClickCount((prev) => prev + 1);
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Button onClick={() => setIsOpen(true)} disabled={isOpen}>
          Open Modal
        </Button>
        <p className="text-sm text-muted-foreground">
          Times clicked outside: <span className="font-medium">{clickCount}</span>
        </p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card ref={ref} className="p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Click Outside Demo</h3>
            <p className="text-sm text-muted-foreground">
              Click anywhere outside this modal to close it. The counter above will increment each time you do.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
