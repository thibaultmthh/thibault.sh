"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface JsonError {
  message: string;
  line?: number;
  column?: number;
}

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState<JsonError | null>(null);
  const [indentation, setIndentation] = useState("2");

  const formatJson = (minify: boolean = false) => {
    try {
      // First parse to validate
      const parsed = JSON.parse(inputJson);

      // Then stringify with formatting
      const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, Number(indentation));

      setOutputJson(formatted);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        const match = e.message.match(/at position (\d+)/);
        const position = match ? parseInt(match[1]) : 0;

        // Calculate line and column from position
        const lines = inputJson.slice(0, position).split("\n");
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;

        setError({
          message: e.message,
          line,
          column,
        });
      }
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputJson);
  };

  const handlePrettify = () => formatJson(false);
  const handleMinify = () => formatJson(true);

  const loadSampleJson = () => {
    const sample = {
      name: "John Doe",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Boston",
        country: "USA",
      },
      hobbies: ["reading", "hiking", "photography"],
      active: true,
    };
    setInputJson(JSON.stringify(sample, null, 2));
  };

  return (
    <div className="container max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">JSON Formatter</h1>

      <div className="flex gap-4 mb-4 flex-wrap">
        <Select value={indentation} onValueChange={setIndentation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select indentation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 spaces</SelectItem>
            <SelectItem value="4">4 spaces</SelectItem>
            <SelectItem value="8">8 spaces</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handlePrettify}>Prettify</Button>
        <Button onClick={handleMinify} variant="secondary">
          Minify
        </Button>
        <Button onClick={loadSampleJson} variant="outline">
          Load Sample
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-sm font-medium mb-2">Input JSON</h2>
          <Textarea
            placeholder="Enter JSON here..."
            className="font-mono min-h-[400px]"
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
          />
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Output</h2>
            <Button variant="outline" size="sm" onClick={handleCopyOutput} disabled={!outputJson || !!error}>
              Copy
            </Button>
          </div>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Error at line {error.line}, column {error.column}: {error.message}
              </AlertDescription>
            </Alert>
          ) : (
            <Textarea className="font-mono min-h-[400px]" value={outputJson} readOnly />
          )}
        </Card>
      </div>
    </div>
  );
}
