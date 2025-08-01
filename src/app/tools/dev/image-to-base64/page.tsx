/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Upload, Image as FileWarning, X, Check, Code, Palette } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface CopyState {
  [key: string]: boolean;
}

export default function ImageToBase64() {
  const [base64String, setBase64String] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [copyStates, setCopyStates] = useState<CopyState>({});
  const [outputFormat, setOutputFormat] = useState("dataUrl");
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

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      fileInputRef.current.files = event.dataTransfer.files;
      handleFileChange({ target: { files: event.dataTransfer.files } } as any);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Only set drag over to false if we're leaving the drop zone entirely
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  }, []);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const clearFile = () => {
    setBase64String("");
    setError(null);
    setFileName("");
    setFileType("");
    setFileSize(0);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFormattedOutput = useCallback(() => {
    if (!base64String) return "";

    switch (outputFormat) {
      case "base64Only":
        return base64String.split(",")[1] || "";
      case "htmlImg":
        return `<img src="${base64String}" alt="${fileName}" />`;
      case "cssBackground":
        return `background-image: url('${base64String}');`;
      case "dataUrl":
      default:
        return base64String;
    }
  }, [base64String, outputFormat, fileName]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Image to Base64 Converter</h1>
        <p className="text-muted-foreground">
          Convert images to Base64 encoding with multiple output formats and instant preview
        </p>
      </div>

      <div className="space-y-4">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg ${base64String ? "p-4" : "p-6"} text-center cursor-pointer transition-colors ${
            isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
          onClick={() => !base64String && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

          {!base64String ? (
            <>
              <Upload className={`h-8 w-8 mx-auto mb-2 ${isDragOver ? "text-primary" : "text-muted-foreground"}`} />
              <p className={`text-sm mb-1 ${isDragOver ? "text-primary" : "text-muted-foreground"}`}>
                {isDragOver ? "Drop your image here" : "Drag and drop an image here, or click to select"}
              </p>
              <p className="text-xs text-muted-foreground">Supports PNG, JPEG, GIF, WebP, SVG (Max 5MB)</p>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium truncate text-sm">{fileName}</p>
                <p className="text-muted-foreground text-xs">{formatFileSize(fileSize)}</p>
                <p className="text-xs text-muted-foreground mt-1">Drop new image to replace</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="h-8 px-2"
                >
                  <Upload className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="h-8 px-2"
                >
                  <X className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(previewUrl, "preview");
                  }}
                  className="h-8 px-2"
                >
                  {copyStates["preview"] ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          )}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-6">
              <Card className="p-4">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">File Name</Label>
                <p className="font-medium truncate mt-1">{fileName}</p>
              </Card>
              <Card className="p-4">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">File Type</Label>
                <p className="font-medium mt-1">{fileType}</p>
              </Card>
              <Card className="p-4">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">File Size</Label>
                <div className="mt-1">
                  <p className="font-medium">{formatFileSize(fileSize)}</p>
                  {fileSize > 1024 * 1024 && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Large File
                    </Badge>
                  )}
                </div>
              </Card>
              <Card className="p-4">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">Base64 Size</Label>
                <p className="font-medium mt-1">{formatFileSize(base64String.length)}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  +{Math.round(((base64String.length - fileSize) / fileSize) * 100)}%
                </Badge>
              </Card>
            </div>

            {/* Output Format Selection */}
            <Card className="p-6">
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Output Format</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger className="w-full sm:w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dataUrl">Data URL (data:image/...)</SelectItem>
                    <SelectItem value="base64Only">Base64 Only</SelectItem>
                    <SelectItem value="htmlImg">HTML Image Tag</SelectItem>
                    <SelectItem value="cssBackground">CSS Background</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="h-5 w-5" />
                  <h3 className="font-semibold">Output</h3>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">
                    {outputFormat === "dataUrl" && "Data URL"}
                    {outputFormat === "base64Only" && "Base64 String"}
                    {outputFormat === "htmlImg" && "HTML Image Tag"}
                    {outputFormat === "cssBackground" && "CSS Background Property"}
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(getFormattedOutput(), `output-${outputFormat}`)}
                    >
                      {copyStates[`output-${outputFormat}`] ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      Copy
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={getFormattedOutput()}
                  readOnly
                  className="font-mono text-sm min-h-[200px] resize-y"
                  placeholder="Your formatted output will appear here..."
                />
              </div>
            </Card>
          </>
        )}

        {/* Quick Examples */}
        <Card className="p-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Quick Examples
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Data URL Usage</h3>
              <code className="text-xs bg-muted p-2 rounded block">&lt;img src="data:image/png;base64,..." /&gt;</code>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">CSS Background</h3>
              <code className="text-xs bg-muted p-2 rounded block">background-image: url(&apos;data:...&apos;);</code>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Email HTML</h3>
              <code className="text-xs bg-muted p-2 rounded block">&lt;img src="data:..." alt="Logo" /&gt;</code>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6">
          <h2 className="font-semibold mb-3">About Base64 Image Encoding</h2>
          <div className="grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
            <div className="space-y-3">
              <p className="font-medium text-foreground">Benefits:</p>
              <ul className="space-y-1">
                <li>• Embed images directly in HTML/CSS</li>
                <li>• Send images in JSON/XML data</li>
                <li>• Reduce HTTP requests for small images</li>
                <li>• Store in text-based databases</li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-medium text-foreground">Considerations:</p>
              <ul className="space-y-1">
                <li>• ~33% larger than binary files</li>
                <li>• No browser caching</li>
                <li>• Best for small images (&lt;50KB)</li>
                <li>• Can increase page load time</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
