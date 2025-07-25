"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Eraser, Square } from "lucide-react";

export default function PixelArtCreator() {
  const [gridSize, setGridSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('pixelArt_gridSize')) || 32;
    }
    return 32;
  });
  const [color, setColor] = useState("#000000");
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const saveToLocalStorage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    localStorage.setItem('pixelArt_gridSize', gridSize.toString());
    localStorage.setItem('pixelArt_canvas', canvas.toDataURL());
  };

  const loadFromLocalStorage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const savedCanvas = localStorage.getItem('pixelArt_canvas');
    if (savedCanvas) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = savedCanvas;
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const handlePixelClick = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelSize = Math.floor(canvas.width / gridSize);
    const pixelX = Math.floor(x / pixelSize) * pixelSize;
    const pixelY = Math.floor(y / pixelSize) * pixelSize;
    
    ctx.clearRect(pixelX, pixelY, pixelSize, pixelSize);
    
    ctx.fillStyle = isErasing ? "#ffffff" : color;
    ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);

    saveToLocalStorage();
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "pixel-art.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    saveToLocalStorage();
  };

  useEffect(() => {
    localStorage.setItem('pixelArt_gridSize', gridSize.toString());
  }, [gridSize]);

  return (
    <div className="min-h-screen p-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pixel Art Creator</h1>
        <p className="text-gray-600">Create pixel art with a simple grid-based drawing tool.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card className="p-6 space-y-4">
          <div>
            <Label htmlFor="gridSize">Grid Size</Label>
            <Input
              id="gridSize"
              type="number"
              min="8"
              max="64"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={isErasing ? "destructive" : "outline-solid"}
              onClick={() => setIsErasing(!isErasing)}
            >
              <Eraser className="w-4 h-4 mr-2" />
              {isErasing ? "Erasing" : "Draw"}
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <Square className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <canvas
            ref={canvasRef}
            width={512}
            height={512}
            className="border border-gray-200 cursor-crosshair"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              handlePixelClick(
                e.clientX - rect.left,
                e.clientY - rect.top
              );
            }}
          />
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Getting Started</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Choose your grid size (8-64 pixels)</li>
            <li>• Select a color from the color picker</li>
            <li>• Click on the canvas to draw</li>
            <li>• Use the eraser tool to remove pixels</li>
            <li>• Clear the canvas to start over</li>
            <li>• Export your creation as PNG</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Tips & Techniques</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Start with a larger grid for simpler designs</li>
            <li>• Use contrasting colors for better visibility</li>
            <li>• Create outlines before filling in details</li>
            <li>• Save frequently by exporting your work</li>
            <li>• Try working with a limited color palette</li>
            <li>• Practice with simple icons first</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Common Uses</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Game sprites and assets</li>
            <li>• Social media icons</li>
            <li>• Retro-style illustrations</li>
            <li>• Simple logos and badges</li>
            <li>• Emoji and sticker design</li>
            <li>• Pattern creation</li>
          </ul>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">What is Pixel Art?</h3>
          <p className="text-gray-600">
            Pixel art is a digital art form where images are created and edited at the pixel level. 
            This style emerged in the early days of computer graphics and gaming, becoming iconic through 
            classic video games. Today, pixel art remains popular in indie games, digital art, and retro-style 
            designs, valued for its minimalist aesthetic and nostalgic appeal.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Why Create Pixel Art?</h3>
          <p className="text-gray-600">
            Creating pixel art helps develop attention to detail and precision in digital design. 
            It&apos;s perfect for beginners learning digital art basics, as it requires minimal tools 
            and focuses on fundamental concepts like composition and color theory. The constraints of 
            working pixel-by-pixel often lead to creative and unique solutions.
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Keyboard Shortcuts & Features</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Current Features</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Adjustable grid size</li>
                <li>• Color picker</li>
                <li>• Eraser tool</li>
                <li>• PNG export</li>
                <li>• Auto-save functionality</li>
                <li>• Clear canvas option</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Coming Soon</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Undo/Redo</li>
                <li>• Custom color palettes</li>
                <li>• Layer support</li>
                <li>• Mirror drawing</li>
                <li>• Brush size options</li>
                <li>• Import existing images</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 