"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Copy, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function HTMLEncoder() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const encode = () => {
    try {
      const div = document.createElement("div");
      div.textContent = inputText;
      setOutputText(div.innerHTML);
      setError(null);
    } catch {
      setError("Error encoding HTML entities");
    }
  };

  const decode = () => {
    try {
      const div = document.createElement("div");
      div.innerHTML = inputText;
      setOutputText(div.textContent || "");
      setError(null);
    } catch {
      setError("Invalid HTML entity string");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">HTML Entity Encoder/Decoder</h1>

      <div className="flex gap-4 mb-4">
        <Button onClick={encode}>Encode HTML Entities</Button>
        <Button onClick={decode} variant="secondary">
          Decode HTML Entities
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-sm font-medium mb-2">Input</h2>
          <Textarea
            placeholder="Enter text to encode or decode..."
            className="font-mono min-h-[400px] w-full"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Output</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(outputText)}
              disabled={!outputText || !!error}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <Textarea className="font-mono min-h-[400px] w-full" value={outputText} readOnly />
          )}
        </Card>
      </div>

      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">About HTML Entities</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            HTML entities are special characters that are represented using character references. They are used when:
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>The character is reserved in HTML (like &lt; and &gt;)</li>
            <li>The character is difficult to type on a keyboard</li>
            <li>The character is not part of the character encoding of the document</li>
          </ul>
          <p>Common examples:</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>&lt; becomes &amp;lt;</li>
            <li>&gt; becomes &amp;gt;</li>
            <li>&amp; becomes &amp;amp;</li>
            <li>&quot; becomes &amp;quot;</li>
            <li>&apos; becomes &amp;apos;</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
