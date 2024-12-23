"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useClickOutside } from "@thibault.sh/hooks/useClickOutside";
import { useRef, useState } from "react";

export function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, (event) => {
    if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  });

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">Click the button to open the dropdown, then click outside to close it:</p>
        <div className="relative">
          <Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Close Menu" : "Open Menu"}</Button>
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-2 space-y-1 z-10"
            >
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Profile</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Settings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Logout</button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useClickOutside } from "@thibault.sh/hooks/useClickOutside";
import { useRef, useState } from "react";

export function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, (event) => {
    if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  });

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Click the button to open the dropdown, then click outside to close it:
        </p>
        <div className="relative">
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Close Menu" : "Open Menu"}
          </Button>
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-2 space-y-1"
            >
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}`;
