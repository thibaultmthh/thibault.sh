"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Globe, Image as ImageIcon } from "lucide-react";

interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
  type: string;
}

export default function OGPreview() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ogData, setOGData] = useState<OGData>({
    title: "Example Title",
    description: "This is an example description that would appear when your content is shared on social media.",
    image: "https://example.com/image.jpg",
    url: "https://example.com",
    siteName: "Example Site",
    type: "website",
  });

  const fetchOGData = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch OG data");
      }

      setOGData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch OG data");
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = (platform: "facebook" | "twitter" | "linkedin") => {
    const previewClass = {
      facebook: "max-w-[524px]",
      twitter: "max-w-[504px]",
      linkedin: "max-w-[552px]",
    }[platform];

    return (
      <div className={`${previewClass} mx-auto`}>
        <Card className="overflow-hidden">
          {/* Image Preview */}
          <div className="relative aspect-[1.91/1] bg-muted">
            {ogData.image ? (
              <img
                src={ogData.image}
                alt="OG Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/1200x630/e2e8f0/64748b?text=No+Image";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Content Preview */}
          <div className="p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              {ogData.siteName || new URL(ogData.url || "https://example.com").hostname}
            </div>
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{ogData.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{ogData.description}</p>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Open Graph Preview</h1>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Enter URL</Label>
            <div className="flex gap-2">
              <Input id="url" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
              <Button onClick={fetchOGData} disabled={loading}>
                <Globe className="mr-2 h-4 w-4" />
                Fetch
              </Button>
            </div>
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Label>Manual Preview Data</Label>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="og-title">Title</Label>
                <Input
                  id="og-title"
                  value={ogData.title}
                  onChange={(e) => setOGData({ ...ogData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="og-description">Description</Label>
                <Input
                  id="og-description"
                  value={ogData.description}
                  onChange={(e) => setOGData({ ...ogData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="og-image">Image URL</Label>
                <Input
                  id="og-image"
                  value={ogData.image}
                  onChange={(e) => setOGData({ ...ogData, image: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <Tabs defaultValue="facebook">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          </TabsList>

          <TabsContent value="facebook">{renderPreview("facebook")}</TabsContent>
          <TabsContent value="twitter">{renderPreview("twitter")}</TabsContent>
          <TabsContent value="linkedin">{renderPreview("linkedin")}</TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">About Open Graph Meta Tags</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Open Graph meta tags control how URLs are displayed when shared on social media</li>
          <li>Essential tags include og:title, og:description, og:image, and og:url</li>
          <li>Different platforms may display the same content differently</li>
          <li>Images should follow platform-specific dimension requirements</li>
          <li>Facebook: 1200x630px | Twitter: 1200x600px | LinkedIn: 1200x627px</li>
        </ul>
      </Card>
    </div>
  );
}
