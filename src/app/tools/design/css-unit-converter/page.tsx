"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ConversionResult {
  px: string;
  rem: string;
  em: string;
}

export default function UnitConverter() {
  const [baseSize, setBaseSize] = useState(16); // Default browser font size
  const [px, setPx] = useState("");
  const [rem, setRem] = useState("");
  const [em, setEm] = useState("");
  const [parentSize, setParentSize] = useState(16);
  const [showSettings, setShowSettings] = useState(false);

  const convertFromPx = (pxValue: number): ConversionResult => {
    return {
      px: pxValue.toString(),
      rem: (pxValue / baseSize).toFixed(4),
      em: (pxValue / parentSize).toFixed(4),
    };
  };

  const convertFromRem = (remValue: number): ConversionResult => {
    const pxValue = remValue * baseSize;
    return {
      px: pxValue.toFixed(2),
      rem: remValue.toString(),
      em: (pxValue / parentSize).toFixed(4),
    };
  };

  const convertFromEm = (emValue: number): ConversionResult => {
    const pxValue = emValue * parentSize;
    return {
      px: pxValue.toFixed(2),
      rem: (pxValue / baseSize).toFixed(4),
      em: emValue.toString(),
    };
  };

  const handlePxChange = (value: string) => {
    setPx(value);
    if (value && !isNaN(parseFloat(value))) {
      const result = convertFromPx(parseFloat(value));
      setRem(result.rem);
      setEm(result.em);
    } else {
      setRem("");
      setEm("");
    }
  };

  const handleRemChange = (value: string) => {
    setRem(value);
    if (value && !isNaN(parseFloat(value))) {
      const result = convertFromRem(parseFloat(value));
      setPx(result.px);
      setEm(result.em);
    } else {
      setPx("");
      setEm("");
    }
  };

  const handleEmChange = (value: string) => {
    setEm(value);
    if (value && !isNaN(parseFloat(value))) {
      const result = convertFromEm(parseFloat(value));
      setPx(result.px);
      setRem(result.rem);
    } else {
      setPx("");
      setRem("");
    }
  };

  // Update values when base size changes
  const handleBaseSizeChange = (value: number) => {
    setBaseSize(value);
    if (px && !isNaN(parseFloat(px))) {
      const result = convertFromPx(parseFloat(px));
      setRem(result.rem);
      setEm(result.em);
    } else if (rem && !isNaN(parseFloat(rem))) {
      const result = convertFromRem(parseFloat(rem));
      setPx(result.px);
      setEm(result.em);
    } else if (em && !isNaN(parseFloat(em))) {
      const result = convertFromEm(parseFloat(em));
      setPx(result.px);
      setRem(result.rem);
    }
  };

  // Update values when parent size changes
  const handleParentSizeChange = (value: number) => {
    setParentSize(value);
    if (px && !isNaN(parseFloat(px))) {
      const result = convertFromPx(parseFloat(px));
      setRem(result.rem);
      setEm(result.em);
    } else if (rem && !isNaN(parseFloat(rem))) {
      const result = convertFromRem(parseFloat(rem));
      setPx(result.px);
      setEm(result.em);
    } else if (em && !isNaN(parseFloat(em))) {
      const result = convertFromEm(parseFloat(em));
      setPx(result.px);
      setRem(result.rem);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">CSS Unit Converter</h1>
      <p className="text-muted-foreground mb-6">
        Convert between pixels (px), rem, and em units. Enter a value in any field to see the conversions.
      </p>

      <div className="space-y-6">
        <Card className="p-6">
          {/* Main Conversion Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Pixels */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="px" className="text-lg font-semibold">
                  px
                </Label>
                <Badge variant="secondary">Pixels</Badge>
              </div>
              <Input
                id="px"
                type="number"
                value={px}
                onChange={(e) => handlePxChange(e.target.value)}
                placeholder="16"
                className="font-mono text-lg h-12"
              />
              <p className="text-sm text-muted-foreground">Fixed size unit. 1px = 1 pixel on screen.</p>
            </div>

            {/* REM */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="rem" className="text-lg font-semibold">
                  rem
                </Label>
                <Badge variant="secondary">Root EM</Badge>
              </div>
              <Input
                id="rem"
                type="number"
                value={rem}
                onChange={(e) => handleRemChange(e.target.value)}
                placeholder="1"
                className="font-mono text-lg h-12"
              />
              <p className="text-sm text-muted-foreground">
                Relative to root font size ({baseSize}px). Great for consistent scaling.
              </p>
            </div>

            {/* EM */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="em" className="text-lg font-semibold">
                  em
                </Label>
                <Badge variant="secondary">Element EM</Badge>
              </div>
              <Input
                id="em"
                type="number"
                value={em}
                onChange={(e) => handleEmChange(e.target.value)}
                placeholder="1"
                className="font-mono text-lg h-12"
              />
              <p className="text-sm text-muted-foreground">
                Relative to parent font size ({parentSize}px). Cascades with parent.
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-8">
            <Label className="mb-3 block text-sm font-medium">Common Font Sizes</Label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {[
                { px: 12, label: "Small" },
                { px: 14, label: "Body" },
                { px: 16, label: "Base" },
                { px: 18, label: "Large" },
                { px: 20, label: "H5" },
                { px: 24, label: "H4" },
                { px: 32, label: "H3" },
                { px: 48, label: "H1" },
              ].map(({ px: value, label }) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePxChange(value.toString())}
                  className="flex flex-col h-auto py-2"
                >
                  <span className="font-mono text-xs">{value}px</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <Collapsible open={showSettings} onOpenChange={setShowSettings}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="mt-6 w-full">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-2">
                <Label className="text-sm">Root Font Size (px)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={baseSize}
                    onChange={(e) => handleBaseSizeChange(parseInt(e.target.value) || 16)}
                    min="12"
                    max="24"
                    className="w-20 font-mono"
                  />
                  <span className="text-sm text-muted-foreground">
                    Browser default: 16px. This affects rem calculations.
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Parent Font Size (px)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={parentSize}
                    onChange={(e) => handleParentSizeChange(parseInt(e.target.value) || 16)}
                    min="12"
                    max="48"
                    className="w-20 font-mono"
                  />
                  <span className="text-sm text-muted-foreground">
                    Parent element font size. This affects em calculations.
                  </span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Info Card */}
        <Card className="p-6">
          <h2 className="font-semibold mb-3">About CSS Units</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>px</Badge>
                <span className="font-semibold">Pixels</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Absolute unit. Always the same size regardless of parent elements. Good for precise control and borders.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>rem</Badge>
                <span className="font-semibold">Root EM</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Relative to root element. Consistent scaling across the entire page. Best for typography and spacing.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>em</Badge>
                <span className="font-semibold">Element EM</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Relative to parent element. Cascades with nested elements. Good for component-based scaling.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
