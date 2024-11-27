/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Image as FileWarning, Maximize2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageDimensionChecker() {
  const [imageInfo, setImageInfo] = useState<{
    width: number;
    height: number;
    size: number;
    name: string;
    type: string;
    aspectRatio: number;
    url: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setImageInfo(null);
    setIsPreviewExpanded(false);

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 10MB limit");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageInfo({
          width: img.width,
          height: img.height,
          size: file.size,
          name: file.name,
          type: file.type,
          aspectRatio: img.width / img.height,
          url: e.target?.result as string,
        });
      };
      img.onerror = () => {
        setError("Failed to load image");
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      fileInputRef.current.files = event.dataTransfer.files;
      handleFileChange({ target: { files: event.dataTransfer.files } } as any);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Image Dimension Checker</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          {/* File Upload Area */}
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center mb-6 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-1">Drag and drop an image here, or click to select</p>
            <p className="text-xs text-muted-foreground">Supports PNG, JPEG, GIF, WebP, SVG (Max 10MB)</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <FileWarning className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {imageInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Preview Card */}
              <Card className="p-4 relative group">
                <Label className="text-sm text-muted-foreground">Preview</Label>
                <div className="mt-2 relative bg-muted rounded-lg overflow-hidden" style={{ height: "150px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageInfo.url} alt="Preview" className="absolute inset-0 w-full h-full object-contain" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setIsPreviewExpanded(true)}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              {/* Dimensions Card */}
              <Card className="p-4">
                <Label className="text-sm text-muted-foreground">Dimensions</Label>
                <p className="font-medium mt-2">
                  {imageInfo.width} × {imageInfo.height}px
                </p>
                <p className="text-xs text-muted-foreground mt-1">Aspect ratio: {imageInfo.aspectRatio.toFixed(2)}</p>
              </Card>

              {/* File Size Card */}
              <Card className="p-4">
                <Label className="text-sm text-muted-foreground">File Size</Label>
                <p className="font-medium mt-2">{formatFileSize(imageInfo.size)}</p>
              </Card>

              {/* File Info Card */}
              <Card className="p-4">
                <Label className="text-sm text-muted-foreground">File Info</Label>
                <p className="font-medium mt-2 truncate" title={imageInfo.name}>
                  {imageInfo.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{imageInfo.type}</p>
              </Card>
            </div>
          )}
        </Card>

        {/* Info Card */}
        <Card className="p-6">
          <h2 className="font-semibold mb-3">About Image Dimensions</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>Understanding image dimensions is crucial for web development and design. This tool helps you:</p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Check exact pixel dimensions of images</li>
              <li>Verify file sizes for web optimization</li>
              <li>Calculate aspect ratios for responsive design</li>
              <li>Ensure images meet specific size requirements</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Note: For optimal web performance, consider using images that are appropriately sized for their intended
              display size and compressed when possible.
            </p>
          </div>
        </Card>

        {/* Full-size Preview Modal */}
        {isPreviewExpanded && imageInfo && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsPreviewExpanded(false)}
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageInfo.url} alt="Full Preview" className="w-full h-full object-contain bg-muted" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
