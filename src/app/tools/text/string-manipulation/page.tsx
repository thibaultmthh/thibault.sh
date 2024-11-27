"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Copy } from "lucide-react";

type TransformFunction = (text: string) => string;

const transforms: Record<string, { name: string; fn: TransformFunction; description: string }> = {
  reverse: {
    name: "Reverse",
    description: "Reverse the input string",
    fn: (text) => text.split("").reverse().join(""),
  },
  camelCase: {
    name: "camelCase",
    description: "Convert to camelCase",
    fn: (text) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, (c) => c.toLowerCase()),
  },
  pascalCase: {
    name: "PascalCase",
    description: "Convert to PascalCase",
    fn: (text) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[a-z]/, (c) => c.toUpperCase()),
  },
  snakeCase: {
    name: "snake_case",
    description: "Convert to snake_case",
    fn: (text) =>
      text
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, ""),
  },
  kebabCase: {
    name: "kebab-case",
    description: "Convert to kebab-case",
    fn: (text) =>
      text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, ""),
  },
  alternatingCase: {
    name: "aLtErNaTiNg CaSe",
    description: "Convert to alternating case",
    fn: (text) =>
      text
        .split("")
        .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
        .join(""),
  },
  titleCase: {
    name: "Title Case",
    description: "Convert to Title Case",
    fn: (text) =>
      text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
  },
  removeSpaces: {
    name: "Remove Spaces",
    description: "Remove all spaces",
    fn: (text) => text.replace(/\s+/g, ""),
  },
  removeSpecialChars: {
    name: "Remove Special Characters",
    description: "Remove all special characters",
    fn: (text) => text.replace(/[^a-zA-Z0-9\s]/g, ""),
  },
  slugify: {
    name: "Slugify",
    description: "Convert to URL-friendly slug",
    fn: (text) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, ""),
  },
};

export default function StringManipulation() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedTransform, setSelectedTransform] = useState<string>("");

  const handleTransform = () => {
    if (selectedTransform && transforms[selectedTransform]) {
      setOutputText(transforms[selectedTransform].fn(inputText));
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div className="container max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">String Manipulation</h1>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4">
          <Select value={selectedTransform} onValueChange={setSelectedTransform}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select transformation" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(transforms).map(([key, { name, description }]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex flex-col">
                    <span>{name}</span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleTransform}>Transform</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-sm font-medium mb-2">Input</h2>
          <Textarea
            placeholder="Enter text to transform..."
            className="min-h-[400px]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Output</h2>
            <Button variant="outline" size="sm" onClick={handleCopyOutput} disabled={!outputText}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <Textarea className="min-h-[400px]" value={outputText} readOnly />
        </Card>
      </div>

      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">About String Manipulation</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            This tool provides various string transformation operations commonly used in programming and text
            processing. You can convert text between different case styles, remove special characters, create
            URL-friendly slugs, and more.
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Convert between different case styles (camelCase, snake_case, etc.)</li>
            <li>Remove special characters and spaces</li>
            <li>Create URL-friendly slugs</li>
            <li>Reverse strings</li>
            <li>Apply special text transformations</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
