"use client";

import { useRef } from "react";
import { useHover } from "@thibault.sh/hooks/useHover";

// Demo using internal ref
function InternalRefDemo() {
  const [ref, isHovered] = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`p-4 border-2 border-dashed rounded transition-colors cursor-pointer ${
        isHovered ? "bg-blue-100 border-blue-400" : "bg-gray-50 border-gray-300"
      }`}
    >
      {isHovered ? "Hovering!" : "Hover me"}
    </div>
  );
}

// Demo using external ref
function ExternalRefDemo() {
  const myRef = useRef<HTMLDivElement>(null);
  const [, isHovered] = useHover(myRef);

  return (
    <div
      ref={myRef}
      className={`p-4 border-2 rounded transition-colors cursor-pointer ${
        isHovered ? "bg-green-100 border-green-400" : "bg-gray-50 border-gray-300"
      }`}
    >
      External ref: {isHovered ? "Hovered" : "Not hovered"}
    </div>
  );
}

// Multiple elements demo
function MultipleElementsDemo() {
  const [ref1, isHovered1] = useHover<HTMLButtonElement>();
  const [ref2, isHovered2] = useHover<HTMLSpanElement>();
  const [ref3, isHovered3] = useHover<HTMLDivElement>();

  return (
    <div className="space-y-2">
      <button ref={ref1} className={`px-4 py-2 rounded transition-colors ${isHovered1 ? "bg-red-200" : "bg-red-100"}`}>
        Button: {isHovered1 ? "Hovered" : "Normal"}
      </button>

      <span
        ref={ref2}
        className={`inline-block px-3 py-1 rounded cursor-pointer transition-colors ${
          isHovered2 ? "bg-purple-200" : "bg-purple-100"
        }`}
      >
        Span: {isHovered2 ? "Hovered" : "Normal"}
      </span>

      <div
        ref={ref3}
        className={`p-3 rounded cursor-pointer transition-colors ${isHovered3 ? "bg-orange-200" : "bg-orange-100"}`}
      >
        Div: {isHovered3 ? "Hovered" : "Normal"}
      </div>
    </div>
  );
}

// Export the examples with source code
const examples = [
  {
    title: "Internal Ref",
    component: InternalRefDemo,
    source: `import { useHover } from "@thibault.sh/hooks/useHover";

function InternalRefDemo() {
  const [ref, isHovered] = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={\`p-4 border-2 border-dashed rounded \${
        isHovered ? "bg-blue-100" : "bg-gray-50"
      }\`}
    >
      {isHovered ? "Hovering!" : "Hover me"}
    </div>
  );
}`,
  },
  {
    title: "External Ref",
    component: ExternalRefDemo,
    source: `import { useRef } from "react";
import { useHover } from "@thibault.sh/hooks/useHover";

function ExternalRefDemo() {
  const myRef = useRef<HTMLDivElement>(null);
  const [, isHovered] = useHover(myRef);

  return (
    <div
      ref={myRef}
      className={\`p-4 border-2 rounded \${
        isHovered ? "bg-green-100" : "bg-gray-50"
      }\`}
    >
      External ref: {isHovered ? "Hovered" : "Not hovered"}
    </div>
  );
}`,
  },
  {
    title: "Multiple Elements",
    component: MultipleElementsDemo,
    source: `import { useHover } from "@thibault.sh/hooks/useHover";

function MultipleElementsDemo() {
  const [ref1, isHovered1] = useHover<HTMLButtonElement>();
  const [ref2, isHovered2] = useHover<HTMLSpanElement>();
  const [ref3, isHovered3] = useHover<HTMLDivElement>();

  return (
    <div className="space-y-2">
      <button ref={ref1}>
        Button: {isHovered1 ? "Hovered" : "Normal"}
      </button>
      
      <span ref={ref2}>
        Span: {isHovered2 ? "Hovered" : "Normal"}
      </span>
      
      <div ref={ref3}>
        Div: {isHovered3 ? "Hovered" : "Normal"}
      </div>
    </div>
  );
}`,
  },
];

export default examples;
