"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState, useRef } from "react";
import ColorThief from "colorthief";
import { Copy, Upload, Loader2 } from "lucide-react";
import { colord } from "colord";

interface Color {
  hex: string;
  rgb: string;
}

export default function ColorPalette() {
  const [colors, setColors] = useState<Color[]>([]);
  const [paletteSize, setPaletteSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rgbToHex = (r: number, g: number, b: number): string => {
    return colord({ r, g, b }).toHex();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setColors([]);

    try {
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Extract colors
      const img = new Image();
      img.onload = async () => {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, paletteSize);

        const extractedColors = palette.map((color: [number, number, number]) => {
          const [r, g, b] = color;
          const hex = rgbToHex(r, g, b);
          return {
            hex,
            rgb: `rgb(${r}, ${g}, ${b})`,
          };
        });

        setColors(extractedColors);
        setIsLoading(false);
      };
      img.crossOrigin = "Anonymous";
      img.src = URL.createObjectURL(file);
    } catch (error) {
      console.error("Error extracting colors:", error);
      setIsLoading(false);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        handleImageUpload({ target: { files: dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4">Color Palette Generator</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="p-6 py-4">
          {/* Image Upload */}
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageUpload} />
            <Upload className="size-10 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-1">Click or drag and drop an image here</p>
            <p className="text-xs text-muted-foreground">Supports: JPG, PNG, WebP</p>
          </div>

          {/* Palette Size Slider */}
          <div className="mt-6">
            <Label className="mb-2 block">Palette Size: {paletteSize} colors</Label>
            <Slider
              value={[paletteSize]}
              onValueChange={([value]) => setPaletteSize(value)}
              min={2}
              max={12}
              step={1}
              className="mb-6"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
              <div className="relative rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Uploaded" className="w-full h-auto max-h-[150px] object-contain" />
              </div>
            </div>
          )}

          {/* Color Palette */}
          {isLoading ? (
            <div className="mt-6 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">Extracting colors...</p>
            </div>
          ) : colors.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Extracted Colors</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colors.map((color, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-sm">
                    <div className="h-16 w-full" style={{ backgroundColor: color.hex }} />
                    <div className="p-3 bg-card border-t">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-sm">{color.hex}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(color.hex)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-sm text-muted-foreground">{color.rgb}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(color.rgb)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
