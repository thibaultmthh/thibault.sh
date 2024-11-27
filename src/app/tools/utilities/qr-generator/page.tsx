"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Copy } from "lucide-react";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState("L");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const copyQRCode = async () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                "image/png": blob,
              }),
            ]);
          } catch (err) {
            console.error("Failed to copy QR code:", err);
          }
        }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text or URL</Label>
              <Input
                id="text"
                placeholder="Enter text or URL to encode..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>QR Code Size ({size}px)</Label>
              <Slider value={[size]} onValueChange={(value) => setSize(value[0])} min={128} max={512} step={8} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fgColor">Foreground Color</Label>
              <Input id="fgColor" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bgColor">Background Color</Label>
              <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Error Correction Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div ref={qrRef} className="flex items-center justify-center bg-white rounded-lg p-4 min-h-[300px]">
              {text && (
                <QRCodeCanvas
                  value={text}
                  size={size}
                  level={level}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  includeMargin
                />
              )}
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={downloadQRCode} disabled={!text}>
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button className="flex-1" variant="outline" onClick={copyQRCode} disabled={!text}>
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">About QR Codes</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            QR codes (Quick Response codes) are two-dimensional barcodes that can store various types of data, including
            URLs, text, and contact information.
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Error Correction Levels determine how much damage a QR code can sustain while remaining scannable</li>
            <li>Higher error correction levels make the QR code larger but more reliable</li>
            <li>The size of the QR code should be adjusted based on how it will be displayed and scanned</li>
            <li>Ensure sufficient contrast between foreground and background colors for optimal scanning</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
