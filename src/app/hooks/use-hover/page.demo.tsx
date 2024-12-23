"use client";

import { Card } from "@/components/ui/card";
import { useHover } from "@thibault.sh/hooks/useHover";
import { useRef } from "react";

export function HoverDemo() {
  // Method 1: Let the hook create the ref
  const [cardRef1, isHovered1] = useHover<HTMLDivElement>();

  // Method 2: Provide our own ref
  const cardRef2 = useRef<HTMLDivElement>(null);
  const [, isHovered2] = useHover(cardRef2);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-muted-foreground">Hover over these cards to see the effect:</p>
          <div
            ref={cardRef1}
            className={`p-4 rounded-lg transition-colors ${isHovered1 ? "bg-orange-100" : "bg-gray-100"}`}
          >
            <p className="font-medium">Card with Hook-Created Ref</p>
            <p className="text-sm text-muted-foreground">{isHovered1 ? "Hovering!" : "Not hovering"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div
            ref={cardRef2}
            className={`p-4 rounded-lg transition-colors ${isHovered2 ? "bg-blue-100" : "bg-gray-100"}`}
          >
            <p className="font-medium">Card with External Ref</p>
            <p className="text-sm text-muted-foreground">{isHovered2 ? "Hovering!" : "Not hovering"}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { Card } from "@/components/ui/card";
import { useHover } from "@thibault.sh/hooks/useHover";
import { useRef } from "react";

export function HoverDemo() {
  // Method 1: Let the hook create the ref
  const [cardRef1, isHovered1] = useHover<HTMLDivElement>();

  // Method 2: Provide our own ref
  const cardRef2 = useRef<HTMLDivElement>(null);
  const [_, isHovered2] = useHover(cardRef2);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Hover over these cards to see the effect:
          </p>
          <div
            ref={cardRef1}
            className={\`p-4 rounded-lg transition-colors \${
              isHovered1 ? "bg-orange-100" : "bg-gray-100"
            }\`}
          >
            <p className="font-medium">Card with Hook-Created Ref</p>
            <p className="text-sm text-muted-foreground">
              {isHovered1 ? "Hovering!" : "Not hovering"}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div
            ref={cardRef2}
            className={\`p-4 rounded-lg transition-colors \${
              isHovered2 ? "bg-blue-100" : "bg-gray-100"
            }\`}
          >
            <p className="font-medium">Card with External Ref</p>
            <p className="text-sm text-muted-foreground">
              {isHovered2 ? "Hovering!" : "Not hovering"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}`;
