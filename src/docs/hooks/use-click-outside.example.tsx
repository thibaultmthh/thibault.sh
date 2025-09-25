"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useClickOutside } from "@thibault.sh/hooks/useClickOutside";

// Demo component showcasing dropdown functionality
function DropdownDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    setClickCount((prev) => prev + 1);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="min-w-[120px]">
            {isOpen ? "Close Menu" : "Open Menu"}
          </Button>

          {isOpen && (
            <div className="absolute top-full mt-2 w-48 bg-background border rounded-md shadow-lg z-10">
              <div className="p-2 space-y-1">
                <div className="px-3 py-2 text-sm hover:bg-muted rounded cursor-pointer">Menu Item 1</div>
                <div className="px-3 py-2 text-sm hover:bg-muted rounded cursor-pointer">Menu Item 2</div>
                <div className="px-3 py-2 text-sm hover:bg-muted rounded cursor-pointer">Menu Item 3</div>
                <div className="border-t pt-2 mt-2">
                  <div className="px-3 py-2 text-sm text-muted-foreground">Click outside to close</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          Status: <span className={isOpen ? "text-green-600" : "text-gray-500"}>{isOpen ? "Open" : "Closed"}</span>
        </div>
      </div>

      <div className="p-3 bg-muted/30 rounded-md border text-sm">
        <div className="font-medium mb-1">Outside clicks detected: {clickCount}</div>
        <div className="text-muted-foreground">
          {isOpen
            ? "Click anywhere outside the dropdown to close it and increment the counter."
            : "Open the dropdown and then click outside to test the hook."}
        </div>
      </div>
    </div>
  );
}

// Modal demo component
function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-background p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Sample Modal</h3>
            <p className="text-muted-foreground mb-4">
              This modal will close when you click outside of it. Try clicking on the dark overlay.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export the examples with source code
const examples = [
  {
    title: "Dropdown Menu",
    component: DropdownDemo,
    source: `import { useState, useRef } from "react";
import { useClickOutside } from "@thibault.sh/hooks/useClickOutside";

function DropdownDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-white border rounded shadow">
          <div className="p-2">
            <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
              Menu Item 1
            </div>
            <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
              Menu Item 2
            </div>
            <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
              Menu Item 3
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`,
  },
  {
    title: "Modal Dialog",
    component: ModalDemo,
    source: `import { useState, useRef } from "react";
import { useClickOutside } from "@thibault.sh/hooks/useClickOutside";

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    setIsOpen(false);
  });

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div 
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md"
          >
            <h3 className="text-lg font-semibold mb-4">Sample Modal</h3>
            <p className="text-gray-600 mb-4">
              This modal will close when you click outside of it.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}`,
  },
];

export default examples;
