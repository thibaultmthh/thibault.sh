"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

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
      <h1 className="text-3xl font-bold mb-4">Unit Converter</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          {/* Base Font Size Control */}
          <div className="space-y-4 mb-8">
            <div>
              <Label>Root Font Size (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[baseSize]}
                  onValueChange={([value]) => handleBaseSizeChange(value)}
                  min={12}
                  max={24}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-center font-mono">{baseSize}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Browser default is 16px</p>
            </div>

            <div>
              <Label>Parent Element Font Size (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[parentSize]}
                  onValueChange={([value]) => handleParentSizeChange(value)}
                  min={12}
                  max={24}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-center font-mono">{parentSize}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">For em calculations</p>
            </div>
          </div>

          {/* Conversion Inputs */}
          <div className="grid gap-6">
            {/* Pixels */}
            <div className="space-y-2">
              <Label htmlFor="px">Pixels (px)</Label>
              <div className="relative">
                <Input
                  id="px"
                  type="number"
                  value={px}
                  onChange={(e) => handlePxChange(e.target.value)}
                  placeholder="Enter pixels"
                  className="font-mono"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <span className="text-sm text-muted-foreground">px</span>
                </div>
              </div>
            </div>

            {/* REM */}
            <div className="space-y-2">
              <Label htmlFor="rem">Root EM (rem)</Label>
              <div className="relative">
                <Input
                  id="rem"
                  type="number"
                  value={rem}
                  onChange={(e) => handleRemChange(e.target.value)}
                  placeholder="Enter rems"
                  className="font-mono"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <span className="text-sm text-muted-foreground">rem</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Relative to root font size ({baseSize}px)</p>
            </div>

            {/* EM */}
            <div className="space-y-2">
              <Label htmlFor="em">EM (em)</Label>
              <div className="relative">
                <Input
                  id="em"
                  type="number"
                  value={em}
                  onChange={(e) => handleEmChange(e.target.value)}
                  placeholder="Enter ems"
                  className="font-mono"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <span className="text-sm text-muted-foreground">em</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Relative to parent font size ({parentSize}px)</p>
            </div>
          </div>

          {/* Common Values */}
          <div className="mt-8">
            <Label className="mb-3 block">Common Values</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[8, 12, 14, 16, 18, 20, 24, 32].map((value) => (
                <Button key={value} variant="outline" size="sm" onClick={() => handlePxChange(value.toString())}>
                  {value}px
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About CSS Units</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>px</strong> - Pixels are fixed-size units
            </li>
            <li>
              <strong>rem</strong> - Relative to root element font size
            </li>
            <li>
              <strong>em</strong> - Relative to parent element font size
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
