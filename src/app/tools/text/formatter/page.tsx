"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type FormatterFunction = (text: string) => string;

const formatters: Record<string, { name: string; fn: FormatterFunction }> = {
  trim: {
    name: "Trim whitespace",
    fn: (text) =>
      text
        .split("\n")
        .map((line) => line.trim())
        .join("\n"),
  },
  removeDuplicates: {
    name: "Remove duplicate lines",
    fn: (text) => [...new Set(text.split("\n"))].join("\n"),
  },
  sortAsc: {
    name: "Sort lines (A → Z)",
    fn: (text) => text.split("\n").sort().join("\n"),
  },
  sortDesc: {
    name: "Sort lines (Z → A)",
    fn: (text) => text.split("\n").sort().reverse().join("\n"),
  },
  removeEmpty: {
    name: "Remove empty lines",
    fn: (text) =>
      text
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n"),
  },
  toLowerCase: {
    name: "Convert to lowercase",
    fn: (text) => text.toLowerCase(),
  },
  toUpperCase: {
    name: "Convert to uppercase",
    fn: (text) => text.toUpperCase(),
  },
  capitalize: {
    name: "Capitalize sentences",
    fn: (text) => {
      return text
        .split(". ")
        .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join(". ");
    },
  },
};

export default function TextFormatter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedFormatter, setSelectedFormatter] = useState<string>("");

  const handleFormat = () => {
    if (selectedFormatter && formatters[selectedFormatter]) {
      setOutputText(formatters[selectedFormatter].fn(inputText));
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div className="container max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Text Formatter</h1>

      <div className="flex gap-4 mb-4">
        <Select value={selectedFormatter} onValueChange={setSelectedFormatter}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select formatting operation" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(formatters).map(([key, { name }]) => (
              <SelectItem key={key} value={key}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleFormat}>Format</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-sm font-medium mb-2">Input</h2>
          <Textarea
            placeholder="Enter text to format..."
            className="min-h-[400px]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Output</h2>
            <Button variant="outline" size="sm" onClick={handleCopyOutput} disabled={!outputText}>
              Copy
            </Button>
          </div>
          <Textarea className="min-h-[400px]" value={outputText} readOnly />
        </Card>
      </div>
    </div>
  );
}
