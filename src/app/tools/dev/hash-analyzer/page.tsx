"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Copy, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface HashPattern {
  name: string;
  length: number;
  pattern: RegExp;
  description: string;
}

const HASH_PATTERNS: HashPattern[] = [
  {
    name: "MD5",
    length: 32,
    pattern: /^[a-f0-9]{32}$/i,
    description: "Message-Digest Algorithm 5, 128-bit hash",
  },
  {
    name: "SHA-1",
    length: 40,
    pattern: /^[a-f0-9]{40}$/i,
    description: "Secure Hash Algorithm 1, 160-bit hash",
  },
  {
    name: "SHA-256",
    length: 64,
    pattern: /^[a-f0-9]{64}$/i,
    description: "Secure Hash Algorithm 2, 256-bit hash",
  },
  {
    name: "SHA-512",
    length: 128,
    pattern: /^[a-f0-9]{128}$/i,
    description: "Secure Hash Algorithm 2, 512-bit hash",
  },
  {
    name: "RIPEMD-160",
    length: 40,
    pattern: /^[a-f0-9]{40}$/i,
    description: "RACE Integrity Primitives Evaluation Message Digest, 160-bit hash",
  },
  {
    name: "bcrypt",
    length: 60,
    pattern: /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/,
    description: "Bcrypt password hashing function",
  },
  {
    name: "SHA-384",
    length: 96,
    pattern: /^[a-f0-9]{96}$/i,
    description: "Secure Hash Algorithm 2, 384-bit hash",
  },
  {
    name: "SHA3-256",
    length: 64,
    pattern: /^[a-f0-9]{64}$/i,
    description: "Secure Hash Algorithm 3, 256-bit hash",
  },
  {
    name: "SHA3-512",
    length: 128,
    pattern: /^[a-f0-9]{128}$/i,
    description: "Secure Hash Algorithm 3, 512-bit hash",
  },
];

const EXAMPLE_HASHES = [
  {
    name: "MD5",
    value: "d41d8cd98f00b204e9800998ecf8427e",
    description: "MD5 hash of an empty string",
  },
  {
    name: "SHA-1",
    value: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    description: "SHA-1 hash of an empty string",
  },
  {
    name: "SHA-256",
    value: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    description: "SHA-256 hash of an empty string",
  },
  {
    name: "bcrypt",
    value: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
    description: "bcrypt hash of 'password'",
  },
];

export default function HashAnalyzer() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<{
    isHash: boolean;
    possibleTypes: HashPattern[];
    error?: string;
  } | null>(null);

  const analyzeHash = (hash: string) => {
    if (!hash.trim()) {
      setAnalysis({ isHash: false, possibleTypes: [], error: "Please enter a hash value" });
      return;
    }

    // Check if the input contains only valid hash characters
    if (!/^[A-Za-z0-9./\$]+$/.test(hash)) {
      setAnalysis({ isHash: false, possibleTypes: [], error: "Contains invalid characters for a hash" });
      return;
    }

    const matchingPatterns = HASH_PATTERNS.filter((pattern) => pattern.pattern.test(hash));

    setAnalysis({
      isHash: matchingPatterns.length > 0,
      possibleTypes: matchingPatterns,
      error: matchingPatterns.length === 0 ? "No matching hash patterns found" : undefined,
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Hash Analyzer</h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Enter Hash</h2>
          <Textarea
            placeholder="Enter a hash value to analyze..."
            className="font-mono mb-4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => analyzeHash(input)}>Analyze Hash</Button>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Analysis Results</h2>
            {analysis.error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{analysis.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className={`h-5 w-5 ${analysis.isHash ? "text-green-500" : "text-red-500"}`} />
                  <span className="font-medium">
                    {analysis.isHash ? "Valid hash pattern detected" : "No valid hash pattern detected"}
                  </span>
                </div>

                {analysis.possibleTypes.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Possible Hash Types:</h3>
                    <div className="grid gap-3">
                      {analysis.possibleTypes.map((type) => (
                        <Card key={type.name} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{type.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                              <p className="text-sm text-muted-foreground mt-1">Length: {type.length} characters</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        )}

        {/* Example Hashes */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Example Hashes</h2>
          <div className="grid gap-3">
            {EXAMPLE_HASHES.map((example) => (
              <Card key={example.name} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-medium">{example.name}</h4>
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                    <code className="text-sm font-mono block mt-2">{example.value}</code>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(example.value)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
