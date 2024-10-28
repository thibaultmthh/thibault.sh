"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type CaseConverter = {
  name: string;
  convert: (text: string) => string;
};

const caseConverters: Record<string, CaseConverter> = {
  camelCase: {
    name: "camelCase",
    convert: (text) =>
      text
        .trim()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, (chr) => chr.toLowerCase()),
  },
  PascalCase: {
    name: "PascalCase",
    convert: (text) =>
      text
        .trim()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[a-z]/, (chr) => chr.toUpperCase()),
  },
  snake_case: {
    name: "snake_case",
    convert: (text) =>
      text
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/([A-Z])/g, "_$1")
        .toLowerCase()
        .replace(/^_/, "")
        .replace(/_+/g, "_"),
  },
  kebab_case: {
    name: "kebab-case",
    convert: (text) =>
      text
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()
        .replace(/^-/, "")
        .replace(/-+/g, "-"),
  },
  CONSTANT_CASE: {
    name: "CONSTANT_CASE",
    convert: (text) =>
      text
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/([A-Z])/g, "_$1")
        .toUpperCase()
        .replace(/^_/, "")
        .replace(/_+/g, "_"),
  },
  lowercase: {
    name: "lowercase",
    convert: (text) => text.toLowerCase(),
  },
  UPPERCASE: {
    name: "UPPERCASE",
    convert: (text) => text.toUpperCase(),
  },
  "Title Case": {
    name: "Title Case",
    convert: (text) =>
      text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
  },
};

export default function CaseConverter() {
  const [inputText, setText] = useState("");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Case Converter</h1>

      <Card className="p-4 mb-4">
        <h2 className="text-sm font-medium mb-2">Input Text</h2>
        <Textarea
          placeholder="Enter text to convert..."
          className="min-h-[200px] mb-2"
          value={inputText}
          onChange={(e) => setText(e.target.value)}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(caseConverters).map(([key, converter]) => (
          <Card key={key} className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">{converter.name}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(converter.convert(inputText))}
                disabled={!inputText}
              >
                Copy
              </Button>
            </div>
            <div className="bg-muted rounded-md p-3 font-mono text-sm break-all">
              {inputText ? converter.convert(inputText) : "Result will appear here"}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
