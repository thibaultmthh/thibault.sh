"use client";

import { useHover } from "@/components/hooks/useHover";

export function Demo() {
  const [isHovered1, hoverProps1] = useHover<HTMLDivElement>();
  const [isHovered2, hoverProps2] = useHover<HTMLDivElement>();

  return (
    <div className="space-y-6">
      {/* Basic hover example */}
      <div
        {...hoverProps1}
        className={`p-4 rounded-lg transition-colors cursor-pointer ${
          isHovered1 ? "bg-blue-500 text-white" : "bg-gray-100"
        }`}
      >
        {isHovered1 ? "I'm being hovered! 🎉" : "Hover me! 👋"}
      </div>

      {/* Advanced hover example with nested content */}
      <div
        {...hoverProps2}
        className={`p-4 rounded-lg border transition-all ${
          isHovered2 ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"
        }`}
      >
        <div className="space-y-2">
          <h3 className="font-medium">Interactive Card</h3>
          <p className="text-sm text-gray-600">This example shows scale and shadow effects on hover</p>
          {isHovered2 && <p className="text-sm text-blue-500 animate-fade-in">Hover state activated! ✨</p>}
        </div>
      </div>
    </div>
  );
}
