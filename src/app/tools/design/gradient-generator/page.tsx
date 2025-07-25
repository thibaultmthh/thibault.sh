"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Copy, RotateCcw } from "lucide-react";

interface GradientColor {
  color: string;
  position: number;
}

export default function GradientGenerator() {
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);
  const [colors, setColors] = useState<GradientColor[]>([
    { color: "#ff0000", position: 0 },
    { color: "#0000ff", position: 100 },
  ]);

  const generateCSS = () => {
    const colorStops = colors
      .sort((a, b) => a.position - b.position)
      .map((c) => `${c.color} ${c.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      return `background: linear-gradient(${angle}deg, ${colorStops});`;
    } else {
      return `background: radial-gradient(circle at center, ${colorStops});`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS());
  };

  const updateColor = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], color: newColor };
    setColors(newColors);
  };

  const updatePosition = (index: number, newPosition: number) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], position: newPosition };
    setColors(newColors);
  };

  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, { color: "#ffffff", position: 50 }]);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
    }
  };

  const resetGradient = () => {
    setGradientType("linear");
    setAngle(90);
    setColors([
      { color: "#ff0000", position: 0 },
      { color: "#0000ff", position: 100 },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <style>
        {`.gradient-preview {
          ${generateCSS()}
        }`}
      </style>

      <h1 className="text-3xl font-bold mb-4">CSS Gradient Generator</h1>

      <div className="grid gap-6">
        {/* Preview Card */}
        <Card className="p-6">
          <div className="gradient-preview w-full h-48 rounded-lg mb-4" />

          <div className="flex gap-2 mb-4">
            <Button onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy CSS
            </Button>
            <Button variant="outline" onClick={resetGradient}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{generateCSS()}</code>
          </pre>
        </Card>

        {/* Controls Card */}
        <Card className="p-6">
          <div className="space-y-6">
            {/* Gradient Type */}
            <div className="space-y-2">
              <Label>Gradient Type</Label>
              <Select value={gradientType} onValueChange={(value: "linear" | "radial") => setGradientType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear Gradient</SelectItem>
                  <SelectItem value="radial">Radial Gradient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Angle (only for linear gradients) */}
            {gradientType === "linear" && (
              <div className="space-y-2">
                <Label>Angle: {angle}°</Label>
                <Slider value={[angle]} onValueChange={(value) => setAngle(value[0])} min={0} max={360} step={1} />
              </div>
            )}

            {/* Color Stops */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Color Stops</Label>
                {colors.length < 5 && (
                  <Button variant="outline" size="sm" onClick={addColor}>
                    Add Color
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {colors.map((color, index) => (
                  <div key={index} className="grid grid-cols-[1fr_2fr_auto] gap-4 items-center">
                    <Input type="color" value={color.color} onChange={(e) => updateColor(index, e.target.value)} />
                    <Slider
                      value={[color.position]}
                      onValueChange={(value) => updatePosition(index, value[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                    {colors.length > 2 && (
                      <Button variant="outline" size="sm" onClick={() => removeColor(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6">
          <h2 className="font-semibold mb-3">Tips</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Use multiple color stops to create more complex gradients</li>
            <li>Adjust the angle for linear gradients to change the direction</li>
            <li>Try radial gradients for circular or elliptical effects</li>
            <li>You can add up to 5 color stops for more detailed gradients</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
