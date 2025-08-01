"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { Download, Loader2, Image as ImageIcon } from "lucide-react";
import JSZip from "jszip";

interface FaviconSize {
  size: number;
  name: string;
  platform?: string;
}

const FAVICON_SIZES: FaviconSize[] = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 48, name: "favicon-48x48.png" },
  { size: 180, name: "apple-touch-icon.png", platform: "iOS" },
  { size: 192, name: "android-chrome-192x192.png", platform: "Android" },
  { size: 512, name: "android-chrome-512x512.png", platform: "Android" },
];

// Add this helper function to convert PNG to ICO format
const createIcoBlob = async (pngBlobs: { [key: number]: Blob }): Promise<Blob> => {
  // ICO header structure
  const header = new Uint8Array([
    0,
    0, // Reserved (0)
    1,
    0, // Image type (1 = ICO)
    Object.keys(pngBlobs).length,
    0, // Number of images
  ]);

  // Calculate total size and prepare image entries
  let offset = 6 + Object.keys(pngBlobs).length * 16; // Header + Directory entries
  const directory: Uint8Array[] = [];
  const imageData: Uint8Array[] = [];

  for (const [size, blob] of Object.entries(pngBlobs)) {
    const arrayBuffer = await blob.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    // Directory entry
    const width = parseInt(size) > 255 ? 0 : parseInt(size);
    const height = width;
    const entry = new Uint8Array([
      width, // Width
      height, // Height
      0, // Color palette
      0, // Reserved
      1,
      0, // Color planes
      32,
      0, // Bits per pixel
      data.length & 0xff,
      (data.length >> 8) & 0xff,
      (data.length >> 16) & 0xff,
      (data.length >> 24) & 0xff, // Image size
      offset & 0xff,
      (offset >> 8) & 0xff,
      (offset >> 16) & 0xff,
      (offset >> 24) & 0xff, // Image offset
    ]);

    directory.push(entry);
    imageData.push(data);
    offset += data.length;
  }

  // Combine all parts
  const blob = new Blob([header, ...directory, ...imageData], { type: "image/x-icon" });

  return blob;
};

interface GeneratedFile {
  blob: Blob;
  name: string;
  size?: number;
  platform?: string;
  type: string;
}

export default function FaviconGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const generateFavicons = async () => {
    if (!image) {
      setError("Please upload an image first");
      return;
    }

    setIsLoading(true);
    setError("");
    setGeneratedFiles([]);

    try {
      const files: GeneratedFile[] = [];
      const img = new Image();
      img.src = image;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Store PNG blobs for ICO generation
      const icoSizes: { [key: number]: Blob } = {};

      // Generate each size
      for (const { size, name, platform } of FAVICON_SIZES) {
        canvas.width = size;
        canvas.height = size;
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob!);
          }, "image/png");
        });

        files.push({
          blob,
          name,
          size,
          platform,
          type: "PNG",
        });

        // Store small sizes for ICO
        if (size <= 48) {
          icoSizes[size] = blob;
        }
      }

      // Generate ICO file
      const icoBlob = await createIcoBlob(icoSizes);
      files.push({
        blob: icoBlob,
        name: "favicon.ico",
        type: "ICO",
        platform: "Windows",
      });

      // Generate manifest file
      const manifest = {
        name: "Your App",
        short_name: "App",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      };

      const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
      files.push({
        blob: manifestBlob,
        name: "site.webmanifest",
        type: "JSON",
        platform: "Android",
      });

      // Generate HTML code
      const htmlCode = `<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<!-- iOS -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<!-- Android -->
<link rel="manifest" href="/site.webmanifest">`;

      const htmlBlob = new Blob([htmlCode], { type: "text/html" });
      files.push({
        blob: htmlBlob,
        name: "favicon-code.html",
        type: "HTML",
      });

      setGeneratedFiles(files);
    } catch (err) {
      setError("Failed to generate favicons");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = (file: GeneratedFile) => {
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    generatedFiles.forEach((file) => {
      zip.file(file.name, file.blob);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicons.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Favicon Generator</h1>
      <p className="text-muted-foreground mb-6">
        Create multi-platform favicons from your image. Generate all the necessary favicon formats and sizes for
        websites, iOS apps, and Android apps with proper HTML code.
      </p>

      <div className="space-y-6">
        <Card className="p-6">
          {/* Image Upload */}
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors mb-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <Input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageUpload} />
            {image ? (
              <div className="space-y-4">
                <img src={image} alt="Preview" className="max-w-[200px] max-h-[200px] mx-auto rounded-lg" />
                <p className="text-sm text-muted-foreground">Click to upload a different image</p>
              </div>
            ) : (
              <>
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">Click or drag and drop an image here</p>
                <p className="text-xs text-muted-foreground">Recommended: Square image, at least 512x512 pixels</p>
              </>
            )}
          </div>

          {error && <p className="text-sm text-destructive mb-4">{error}</p>}

          {/* Generated Files */}
          {generatedFiles.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Label>Generated Files</Label>
                <Button onClick={downloadAll} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedFiles.map((file, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{file.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {file.type}
                          {file.size && ` • ${file.size}x${file.size}`}
                          {file.platform && ` • ${file.platform}`}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => downloadFile(file)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <Button className="w-full mt-6" size="lg" onClick={generateFavicons} disabled={!image || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="h-4 w-4 mr-2" />
                Generate Favicons
              </>
            )}
          </Button>
        </Card>

        {/* What Gets Generated */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">What Gets Generated</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Image Files</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • <strong>favicon.ico</strong> - Classic Windows favicon (16x16, 32x32, 48x48)
                </li>
                <li>
                  • <strong>favicon-16x16.png</strong> - Standard browser tab icon
                </li>
                <li>
                  • <strong>favicon-32x32.png</strong> - High-resolution browser tab icon
                </li>
                <li>
                  • <strong>favicon-48x48.png</strong> - Windows taskbar icon
                </li>
                <li>
                  • <strong>apple-touch-icon.png</strong> - iOS home screen icon (180x180)
                </li>
                <li>
                  • <strong>android-chrome-192x192.png</strong> - Android app icon
                </li>
                <li>
                  • <strong>android-chrome-512x512.png</strong> - Android high-res icon
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Configuration Files</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • <strong>site.webmanifest</strong> - Android web app manifest
                </li>
                <li>
                  • <strong>favicon-code.html</strong> - Ready-to-use HTML code
                </li>
              </ul>
              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <p className="text-sm">
                  <strong>Pro tip:</strong> Copy the HTML code from favicon-code.html and paste it into your website's
                  &lt;head&gt; section for complete favicon support across all platforms.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* About Favicons */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4">About Favicons</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              A favicon (short for "favorite icon") is a small icon associated with a website or web page. It appears in
              browser tabs, bookmarks, browser history, and when users save your site to their device's home screen.
            </p>

            <div className="grid gap-6 md:grid-cols-3 mt-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Why Favicons Matter</h3>
                <ul className="space-y-1">
                  <li>• Improve brand recognition and professional appearance</li>
                  <li>• Help users identify your site among multiple tabs</li>
                  <li>• Essential for mobile app-like experiences (PWAs)</li>
                  <li>• Required for proper SEO and web standards</li>
                  <li>• Enhance user experience across all devices</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Platform Support</h3>
                <ul className="space-y-1">
                  <li>
                    • <strong>Web browsers:</strong> Chrome, Firefox, Safari, Edge
                  </li>
                  <li>
                    • <strong>iOS devices:</strong> Home screen icons, Safari tabs
                  </li>
                  <li>
                    • <strong>Android devices:</strong> Chrome shortcuts, app icons
                  </li>
                  <li>
                    • <strong>Windows:</strong> Taskbar, favorites, start menu
                  </li>
                  <li>
                    • <strong>Social media:</strong> Link previews and sharing
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Best Practices</h3>
                <ul className="space-y-1">
                  <li>• Use square images (1:1 aspect ratio)</li>
                  <li>• Minimum 512x512 pixels for best quality</li>
                  <li>• Simple, recognizable design that scales well</li>
                  <li>• High contrast for visibility at small sizes</li>
                  <li>• Consistent with your brand colors and style</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Technical Note</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                This tool generates favicons in multiple formats to ensure compatibility across all modern browsers and
                devices. The ICO format contains multiple sizes in a single file for Windows compatibility, while PNG
                files provide crisp rendering on high-DPI displays. The web manifest enables progressive web app
                features on mobile devices.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
