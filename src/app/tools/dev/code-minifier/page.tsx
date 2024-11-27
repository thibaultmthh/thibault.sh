"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { AlertCircle, Copy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Language = "javascript" | "css" | "html";

const minifyJavaScript = (code: string): string => {
  try {
    // Basic JavaScript minification
    return code
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "") // Remove comments
      .replace(/\s+/g, " ") // Collapse whitespace
      .replace(/;\s*/g, ";") // Remove spaces after semicolons
      .replace(/{\s*/g, "{") // Remove spaces after {
      .replace(/}\s*/g, "}") // Remove spaces after }
      .replace(/,\s*/g, ",") // Remove spaces after commas
      .replace(/:\s*/g, ":") // Remove spaces after colons
      .trim();
  } catch {
    throw new Error("Failed to minify JavaScript");
  }
};

const minifyCSS = (code: string): string => {
  try {
    // Basic CSS minification
    return code
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "") // Remove comments
      .replace(/\s+/g, " ") // Collapse whitespace
      .replace(/;\s*/g, ";") // Remove spaces after semicolons
      .replace(/{\s*/g, "{") // Remove spaces after {
      .replace(/}\s*/g, "}") // Remove spaces after }
      .replace(/,\s*/g, ",") // Remove spaces after commas
      .replace(/:\s*/g, ":") // Remove spaces after colons
      .replace(/;\}/g, "}") // Remove last semicolon
      .trim();
  } catch {
    throw new Error("Failed to minify CSS");
  }
};

const minifyHTML = (code: string): string => {
  try {
    // Basic HTML minification
    return code
      .replace(/<!--[\s\S]*?-->/g, "") // Remove comments
      .replace(/\s+/g, " ") // Collapse whitespace
      .replace(/>\s+</g, "><") // Remove spaces between tags
      .replace(/\s+>/g, ">") // Remove spaces before >
      .replace(/\s+</g, "<") // Remove spaces after <
      .trim();
  } catch {
    throw new Error("Failed to minify HTML");
  }
};

export default function CodeMinifier() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<Language>("javascript");

  const handleMinify = () => {
    try {
      setError(null);
      let result = "";

      switch (selectedTab) {
        case "javascript":
          result = minifyJavaScript(inputCode);
          break;
        case "css":
          result = minifyCSS(inputCode);
          break;
        case "html":
          result = minifyHTML(inputCode);
          break;
      }

      setOutputCode(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to minify code");
      setOutputCode("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
  };

  const getStats = () => {
    const inputSize = new Blob([inputCode]).size;
    const outputSize = new Blob([outputCode]).size;
    const savings = inputSize - outputSize;
    const percentage = Math.round((savings / inputSize) * 100) || 0;

    return {
      inputSize: `${inputSize} bytes`,
      outputSize: `${outputSize} bytes`,
      savings: `${savings} bytes (${percentage}%)`,
    };
  };

  const stats = getStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Code Minifier</h1>

      <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as Language)}>
        <TabsList>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <Button onClick={handleMinify} className="mb-4">
            Minify {selectedTab.toUpperCase()}
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h2 className="text-sm font-medium mb-2">Input</h2>
              <Textarea
                placeholder={`Enter ${selectedTab.toUpperCase()} code to minify...`}
                className="font-mono text-sm min-h-[400px]"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-2">Size: {stats.inputSize}</p>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium">Output</h2>
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!outputCode || !!error}>
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
                <>
                  <Textarea className="font-mono text-sm min-h-[400px]" value={outputCode} readOnly />
                  <div className="text-sm text-muted-foreground mt-2">
                    <p>Minified size: {stats.outputSize}</p>
                    <p>Saved: {stats.savings}</p>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </Tabs>

      {/* Info Card */}
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">About Code Minification</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Minification reduces code size by removing unnecessary characters</li>
          <li>Removes comments, whitespace, and formatting</li>
          <li>Helps improve website loading speed</li>
          <li>Best used for production deployment</li>
          <li>Original code should be kept for development</li>
        </ul>
      </Card>
    </div>
  );
}
