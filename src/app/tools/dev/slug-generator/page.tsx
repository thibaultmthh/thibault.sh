"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(true);

  const stopWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "has",
    "he",
    "in",
    "is",
    "it",
    "its",
    "of",
    "on",
    "that",
    "the",
    "to",
    "was",
    "were",
    "will",
    "with",
  ]);

  const generateSlug = () => {
    let result = input;

    // Convert to lowercase if option is selected
    if (lowercase) {
      result = result.toLowerCase();
    }

    // Remove stop words if option is selected
    if (removeStopWords) {
      result = result
        .split(" ")
        .filter((word) => !stopWords.has(word.toLowerCase()))
        .join(" ");
    }

    // Replace special characters and spaces
    result = result
      // Replace special characters with spaces
      .replace(/[^\w\s-]/g, " ")
      // Replace multiple spaces with single space
      .replace(/\s+/g, " ")
      .trim()
      // Replace spaces with separator
      .replace(/\s/g, separator);

    setSlug(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Slug Generator</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          {/* Input */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="text">Text to Convert</Label>
            <Input
              id="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to generate slug"
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Separator Selection */}
            <div className="space-y-2">
              <Label>Separator</Label>
              <Select value={separator} onValueChange={setSeparator}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-">Hyphen (-)</SelectItem>
                  <SelectItem value="_">Underscore (_)</SelectItem>
                  <SelectItem value=".">Dot (.)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="lowercase">Lowercase</Label>
                <Switch id="lowercase" checked={lowercase} onCheckedChange={setLowercase} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="stopwords">Remove Stop Words</Label>
                <Switch id="stopwords" checked={removeStopWords} onCheckedChange={setRemoveStopWords} />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button onClick={generateSlug} className="w-full mb-6">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Generate Slug
          </Button>

          {/* Output */}
          {slug && (
            <div className="space-y-2">
              <Label>Generated Slug</Label>
              <div className="flex gap-2">
                <Input value={slug} readOnly className="font-mono" />
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About Slug Generation</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Slugs are URL-friendly versions of text, commonly used in web addresses</li>
            <li>They should contain only letters, numbers, and separators</li>
            <li>Stop words (a, an, the, etc.) are often removed to create cleaner URLs</li>
            <li>Common separators include hyphens (-), underscores (_), and dots (.)</li>
            <li>Lowercase slugs are recommended for consistency and SEO</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
