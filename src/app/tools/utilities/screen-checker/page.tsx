"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Monitor, Smartphone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ScreenInfo {
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  colorDepth: number;
  pixelDepth: number;
  devicePixelRatio: number;
  orientation: string;
  aspectRatio: string;
}

export default function ScreenChecker() {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo | null>(null);
  const [isClient, setIsClient] = useState(false);

  const calculateAspectRatio = (width: number, height: number) => {
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  };

  const getScreenInfo = () => {
    const info: ScreenInfo = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      devicePixelRatio: window.devicePixelRatio,
      orientation: window.screen.orientation.type,
      aspectRatio: calculateAspectRatio(window.screen.width, window.screen.height),
    };
    setScreenInfo(info);
  };

  useEffect(() => {
    setIsClient(true);
    getScreenInfo();
    window.addEventListener("resize", getScreenInfo);
    return () => window.removeEventListener("resize", getScreenInfo);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="container max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Screen Resolution Checker</h1>

      <div className="grid gap-6">
        {/* Main Resolution Display */}
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Monitor className="h-16 w-16 text-muted-foreground mb-2" />
            <div className="text-4xl font-bold flex items-center gap-3">
              {screenInfo?.screenWidth} × {screenInfo?.screenHeight}
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(`${screenInfo?.screenWidth}×${screenInfo?.screenHeight}`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground">Physical Screen Resolution</p>
          </div>
        </Card>

        {/* Detailed Information Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Screen Properties</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Device Pixel Ratio</span>
                <span className="font-medium">{screenInfo?.devicePixelRatio}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Color Depth</span>
                <span className="font-medium">{screenInfo?.colorDepth} bits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pixel Depth</span>
                <span className="font-medium">{screenInfo?.pixelDepth} bits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Aspect Ratio</span>
                <span className="font-medium">{screenInfo?.aspectRatio}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Viewport Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Viewport Width</span>
                <span className="font-medium">{screenInfo?.viewportWidth}px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Viewport Height</span>
                <span className="font-medium">{screenInfo?.viewportHeight}px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Orientation</span>
                <span className="font-medium">{screenInfo?.orientation.replace("-primary", "")}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Common Device Sizes Reference */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Common Device Sizes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Monitor className="h-4 w-4" /> Desktop Breakpoints
              </h3>
              <div className="space-y-2 text-sm">
                <div>1920×1080 (Full HD)</div>
                <div>2560×1440 (2K QHD)</div>
                <div>3840×2160 (4K UHD)</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Smartphone className="h-4 w-4" /> Mobile Breakpoints
              </h3>
              <div className="space-y-2 text-sm">
                <div>375×667 (iPhone SE)</div>
                <div>390×844 (iPhone 12/13/14)</div>
                <div>412×915 (Samsung S21/S22)</div>
              </div>
            </div>
          </div>
        </Card>

        <Alert>
          <AlertDescription>
            Resize your browser window to see the viewport dimensions update in real-time.
          </AlertDescription>
        </Alert>
      </div>

      {/* Add this explanation card at the bottom */}
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">About Screen Resolution</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Screen resolution refers to the number of pixels displayed on your screen, expressed as width × height
            (e.g., 1920×1080). Higher resolutions mean more detail but may require scaling for readability.
          </p>
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Key Terms:</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <span className="font-medium text-foreground">Device Pixel Ratio (DPR):</span> The ratio between
                physical pixels and CSS pixels. A DPR of 2 means each CSS pixel is represented by 4 physical pixels.
              </li>
              <li>
                <span className="font-medium text-foreground">Viewport:</span> The visible area of a webpage in your
                browser window, which may be smaller than the full screen resolution.
              </li>
              <li>
                <span className="font-medium text-foreground">Color Depth:</span> The number of bits used to represent
                the color of a single pixel, affecting the range of possible colors.
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
