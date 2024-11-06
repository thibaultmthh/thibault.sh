"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Copy, Download } from "lucide-react";

type Pattern = {
  id: string;
  name: string;
  generate: (color: string, size: number, spacing: number) => string;
};

const patterns: Pattern[] = [
  {
    id: "dots",
    name: "Dots",
    generate: (color, size, spacing) => `
      <svg width="${spacing * 2}" height="${spacing * 2}" viewBox="0 0 ${spacing * 2} ${spacing * 2}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${spacing}" cy="${spacing}" r="${size / 2}" fill="${color}"/>
      </svg>
    `,
  },
  {
    id: "circles",
    name: "Circles",
    generate: (color, size, spacing) => `
      <svg width="${spacing * 2}" height="${spacing * 2}" viewBox="0 0 ${spacing * 2} ${spacing * 2}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${spacing}" cy="${spacing}" r="${size}" stroke="${color}" fill="none"/>
      </svg>
    `,
  },
  {
    id: "squares",
    name: "Squares",
    generate: (color, size, spacing) => `
      <svg width="${spacing * 2}" height="${spacing * 2}" viewBox="0 0 ${spacing * 2} ${spacing * 2}" xmlns="http://www.w3.org/2000/svg">
        <rect x="${spacing - size / 2}" y="${spacing - size / 2}" width="${size}" height="${size}" fill="${color}"/>
      </svg>
    `,
  },
  {
    id: "diagonal",
    name: "Diagonal Lines",
    generate: (color, size, spacing) => `
      <svg width="${spacing * 2}" height="${spacing * 2}" viewBox="0 0 ${spacing * 2} ${spacing * 2}" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="${spacing * 2}" y2="${spacing * 2}" stroke="${color}" stroke-width="${size}"/>
      </svg>
    `,
  },
  {
    id: "grid",
    name: "Grid",
    generate: (color, size, spacing) => `
      <svg width="${spacing * 2}" height="${spacing * 2}" viewBox="0 0 ${spacing * 2} ${spacing * 2}" xmlns="http://www.w3.org/2000/svg">
        <line x1="${spacing}" y1="0" x2="${spacing}" y2="${spacing * 2}" stroke="${color}" stroke-width="${size}"/>
        <line x1="0" y1="${spacing}" x2="${spacing * 2}" y2="${spacing}" stroke="${color}" stroke-width="${size}"/>
      </svg>
    `,
  },
  {
    id: "triangles",
    name: "Triangles",
    generate: (color, size, spacing) => `
      <svg width="${spacing * 2}" height="${spacing * 2}" viewBox="0 0 ${spacing * 2} ${spacing * 2}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${spacing},${spacing - size} ${spacing - size},${spacing + size} ${spacing + size},${spacing + size}" fill="${color}"/>
      </svg>
    `,
  },
  {
    id: "cross",
    name: "Cross",
    generate: (color, size, spacing) => `
      <svg width="${spacing * 2}" height="${spacing * 2}" viewBox="0 0 ${spacing * 2} ${spacing * 2}" xmlns="http://www.w3.org/2000/svg">
        <line x1="${spacing - size}" y1="${spacing}" x2="${spacing + size}" y2="${spacing}" stroke="${color}" stroke-width="${size / 2}"/>
        <line x1="${spacing}" y1="${spacing - size}" x2="${spacing}" y2="${spacing + size}" stroke="${color}" stroke-width="${size / 2}"/>
      </svg>
    `,
  },
  {
    id: "zigzag",
    name: "Zigzag",
    generate: (color, size, spacing) => `
      <svg width="${spacing * 2}" height="${spacing * 2}" viewBox="0 0 ${spacing * 2} ${spacing * 2}" xmlns="http://www.w3.org/2000/svg">
        <polyline points="0,${spacing} ${spacing},${spacing - size} ${spacing * 2},${spacing}" stroke="${color}" fill="none" stroke-width="${size / 2}"/>
      </svg>
    `,
  },
];

export default function PatternGenerator() {
  const [selectedPattern, setSelectedPattern] = useState(patterns[0].id);
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(10);
  const [spacing, setSpacing] = useState(20);
  const [opacity, setOpacity] = useState(100);

  const generateSVG = () => {
    const pattern = patterns.find((p) => p.id === selectedPattern);
    if (!pattern) return "";
    return pattern.generate(color, size, spacing);
  };

  const getPatternCSS = () => {
    const svg = generateSVG();
    const encodedSVG = encodeURIComponent(svg);
    return `background-color: ${backgroundColor};
background-image: url("data:image/svg+xml,${encodedSVG}");
background-size: ${spacing * 2}px ${spacing * 2}px;`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(getPatternCSS());
  };

  const downloadSVG = () => {
    const svg = generateSVG();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pattern-${selectedPattern}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Pattern Generator</h1>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-6">
          {/* Controls */}
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Pattern</Label>
              <Select value={selectedPattern} onValueChange={setSelectedPattern}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pattern" />
                </SelectTrigger>
                <SelectContent>
                  {patterns.map((pattern) => (
                    <SelectItem key={pattern.id} value={pattern.id}>
                      {pattern.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Pattern Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 p-1 cursor-pointer"
                />
                <Input value={color} onChange={(e) => setColor(e.target.value)} className="font-mono" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-12 p-1 cursor-pointer"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Size: {size}px</Label>
              <Slider value={[size]} onValueChange={([value]) => setSize(value)} min={1} max={50} step={1} />
            </div>

            <div className="space-y-2">
              <Label>Spacing: {spacing}px</Label>
              <Slider value={[spacing]} onValueChange={([value]) => setSpacing(value)} min={10} max={100} step={1} />
            </div>

            <div className="space-y-2">
              <Label>Opacity: {opacity}%</Label>
              <Slider value={[opacity]} onValueChange={([value]) => setOpacity(value)} min={0} max={100} step={1} />
            </div>

            <div className="flex gap-2">
              <Button onClick={copyCSS} className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Copy CSS
              </Button>
              <Button onClick={downloadSVG} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download SVG
              </Button>
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <div className="space-y-4">
              <Label>Preview</Label>
              <div
                className="w-full aspect-square rounded-lg shadow-inner"
                style={{
                  backgroundColor,
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(generateSVG())}")`,
                  backgroundSize: `${spacing * 2}px ${spacing * 2}px`,
                  opacity: opacity / 100,
                }}
              />
            </div>
          </Card>
        </div>

        {/* CSS Output */}
        <Card className="mt-6 p-6">
          <Label className="mb-2 block">Generated CSS</Label>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{getPatternCSS()}</code>
          </pre>
        </Card>
      </div>
    </div>
  );
}
