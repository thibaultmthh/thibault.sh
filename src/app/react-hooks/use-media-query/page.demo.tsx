"use client";

import { useMediaQuery } from "@/components/hooks/useMediaQuery";

export function Demo() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Current Breakpoint:</h3>
        <div className="space-y-2">
          <p className={`text-sm ${isMobile ? "font-bold text-green-600" : "text-gray-600"}`}>
            📱 Mobile: {isMobile ? "Yes" : "No"}
          </p>
          <p className={`text-sm ${isTablet ? "font-bold text-green-600" : "text-gray-600"}`}>
            📟 Tablet: {isTablet ? "Yes" : "No"}
          </p>
          <p className={`text-sm ${isDesktop ? "font-bold text-green-600" : "text-gray-600"}`}>
            🖥️ Desktop: {isDesktop ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}
