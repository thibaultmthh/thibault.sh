"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Copy, Shuffle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FormatType = "newline" | "comma" | "semicolon" | "pipe" | "tab" | "space" | "custom";

const formatOptions: Record<
  FormatType,
  {
    label: string;
    separator: string | RegExp;
    outputSeparator: string;
  }
> = {
  newline: {
    label: "One per line",
    separator: /\n+/,
    outputSeparator: "\n",
  },
  comma: {
    label: "Comma separated",
    separator: /\s*,\s*/,
    outputSeparator: ", ",
  },
  semicolon: {
    label: "Semicolon separated",
    separator: /\s*;\s*/,
    outputSeparator: "; ",
  },
  pipe: {
    label: "Pipe separated",
    separator: /\s*\|\s*/,
    outputSeparator: " | ",
  },
  tab: {
    label: "Tab separated",
    separator: /\t+/,
    outputSeparator: "\t",
  },
  space: {
    label: "Space separated",
    separator: /\s+/,
    outputSeparator: " ",
  },
  custom: {
    label: "Custom separator",
    separator: "", // Will be set dynamically
    outputSeparator: "", // Will be set dynamically
  },
};

export default function ListRandomizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    unique: 0,
    duplicates: 0,
  });
  const [numberLines, setNumberLines] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [selectionCount, setSelectionCount] = useState<number | "">(0);
  const [inputFormat, setInputFormat] = useState<FormatType>("newline");
  const [customSeparator, setCustomSeparator] = useState("");

  const parseInput = (text: string): string[] => {
    if (!text.trim()) return [];

    let separator = formatOptions[inputFormat].separator;
    if (inputFormat === "custom") {
      // Escape special characters for regex
      const escapedSeparator = customSeparator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      separator = new RegExp(`\\s*${escapedSeparator}\\s*`);
    }

    return text
      .trim()
      .split(separator)
      .filter((item) => item.trim() !== "");
  };

  const formatOutput = (items: string[]): string => {
    let separator = formatOptions[inputFormat].outputSeparator;
    if (inputFormat === "custom") {
      separator = customSeparator;
    }

    if (inputFormat === "newline" && numberLines) {
      return items.map((item, index) => `${index + 1}\n${item}`).join("\n");
    }

    return items.join(separator);
  };

  const analyzeList = (text: string) => {
    const items = parseInput(text);
    const uniqueItems = new Set(items);

    setStats({
      total: items.length,
      unique: uniqueItems.size,
      duplicates: items.length - uniqueItems.size,
    });
  };

  useEffect(() => {
    analyzeList(inputText);
  }, [inputText, inputFormat, customSeparator]);

  const randomizeList = () => {
    let items = parseInput(inputText);

    if (removeDuplicates) {
      items = [...new Set(items)];
    }

    // Fisher-Yates shuffle algorithm
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    // If selection count is specified and valid, slice the array
    if (selectionCount && typeof selectionCount === "number" && selectionCount > 0) {
      items = items.slice(0, Math.min(selectionCount, items.length));
    }

    setOutputText(formatOutput(items));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setSelectionCount("");
    setNumberLines(true);
    setRemoveDuplicates(false);
    setInputFormat("newline");
    setCustomSeparator("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">List Randomizer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <Label>List Format</Label>
              <Select value={inputFormat} onValueChange={(value: FormatType) => setInputFormat(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(formatOptions).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {inputFormat === "custom" && (
              <div>
                <Label>Custom Separator</Label>
                <Input
                  placeholder="Enter custom separator"
                  value={customSeparator}
                  onChange={(e) => setCustomSeparator(e.target.value)}
                />
              </div>
            )}

            <div>
              <Label>Input List</Label>
              <Textarea
                placeholder={`Enter your list (${
                  inputFormat === "custom" ? "using custom separator" : formatOptions[inputFormat].label.toLowerCase()
                })`}
                className="font-mono min-h-[300px]"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Total Count</Label>
                <Input value={stats.total} readOnly />
              </div>
              <div>
                <Label>Unique Count</Label>
                <Input value={stats.unique} readOnly />
              </div>
              <div>
                <Label>Duplicate Count</Label>
                <Input value={stats.duplicates} readOnly />
              </div>
            </div>

            <div className="space-y-4">
              {inputFormat === "newline" && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="numberLines">Number Lines</Label>
                  <Switch id="numberLines" checked={numberLines} onCheckedChange={setNumberLines} />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="removeDuplicates">Remove Duplicates</Label>
                <Switch id="removeDuplicates" checked={removeDuplicates} onCheckedChange={setRemoveDuplicates} />
              </div>

              <div>
                <Label>Number of Selections (optional)</Label>
                <Input
                  type="number"
                  min="0"
                  value={selectionCount}
                  onChange={(e) => setSelectionCount(e.target.value ? Number(e.target.value) : "")}
                  placeholder="Leave empty to select all"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={randomizeList} className="flex gap-2">
                <Shuffle className="h-4 w-4" />
                Randomize
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Randomized List</Label>
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!outputText} className="flex gap-2">
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea className="font-mono min-h-[300px]" value={outputText} readOnly />
          </div>
        </Card>
      </div>

      {/* New Info Cards */}
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="font-semibold mb-3">About this Tool</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              The List Randomizer is a versatile tool that helps you shuffle and randomize lists in various formats. All
              processing happens in your browser - your data never leaves your device.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-foreground mb-2">Features</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Support for multiple input formats (lines, comma-separated, etc.)</li>
                  <li>Remove duplicate entries</li>
                  <li>Optional line numbering</li>
                  <li>Select random subset of items</li>
                  <li>Maintain input format in output</li>
                  <li>Custom separator support</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Common Uses</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Randomize name lists for contests or drawings</li>
                  <li>Shuffle quiz or test questions</li>
                  <li>Randomize task or activity orders</li>
                  <li>Create random groups from a list of items</li>
                  <li>Randomly select items from a larger list</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
