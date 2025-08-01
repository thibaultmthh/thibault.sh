/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Upload, Image as FileWarning } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImageToBase64() {
  const [base64String, setBase64String] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setBase64String("");
    setPreviewUrl("");

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB limit");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Update file info
    setFileName(file.name);
    setFileType(file.type);
    setFileSize(file.size);

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBase64String(result);
      setPreviewUrl(result);
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
      <h1 className="text-3xl font-bold mb-4">Image to Base64 Converter</h1>

      <div>
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
            <p className="text-xs text-muted-foreground">Supports PNG, JPEG, GIF, WebP, SVG (Max 5MB)</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <FileWarning className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {base64String && (
            <>
              {/* File Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4">
                  <Label className="text-sm text-muted-foreground">File Name</Label>
                  <p className="font-medium truncate">{fileName}</p>
                </Card>
                <Card className="p-4">
                  <Label className="text-sm text-muted-foreground">File Type</Label>
                  <p className="font-medium">{fileType}</p>
                </Card>
                <Card className="p-4">
                  <Label className="text-sm text-muted-foreground">File Size</Label>
                  <p className="font-medium">{formatFileSize(fileSize)}</p>
                </Card>
              </div>

              {/* Preview and Base64 Tabs */}
              <Tabs defaultValue="preview">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="base64">Base64 String</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-0">
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-contain" />
                  </div>
                </TabsContent>

                <TabsContent value="base64" className="mt-0">
                  <div className="relative">
                    <Textarea value={base64String} readOnly className="font-mono text-sm min-h-[200px] resize-y" />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(base64String)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </Card>

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About Base64 Image Encoding</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Base64 encoding allows you to represent binary image data as ASCII text. This is useful when you need to:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Embed images directly in HTML or CSS</li>
              <li>Send images as part of JSON data</li>
              <li>Store images in databases that don&apos;t support binary data</li>
              <li>Avoid additional HTTP requests for small images</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Note: Base64 encoded images are approximately 33% larger than their binary counterparts, so use them
              judiciously.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
