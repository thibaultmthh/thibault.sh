"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Copy, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import triggerGAEvent from "@/lib/triggerGAEvent";

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
    // Call the GA event when analyzing a hash
    triggerGAEvent("analyze_hash");
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
    <div className="container max-w-6xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hash Analyzer</h1>
        <p className="text-muted-foreground">
          Analyze cryptographic hashes and understand their properties. Learn about different hashing methods and their
          applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Enter Hash</h2>
                <Textarea
                  placeholder="Enter a hash value to analyze..."
                  className="font-mono min-h-[150px]"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                />
              </div>

              <Button onClick={() => analyzeHash(input)}>Analyze Hash</Button>
            </div>
          </Card>

          <Card className="p-6 mt-6 hidden md:block">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Info className="h-5 w-5" />
                Understanding Hash Functions
              </h2>

              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Hash functions are mathematical algorithms that transform data of arbitrary size into a fixed-size
                  output. They are essential for:
                </p>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Data integrity verification</li>
                  <li>Password storage (with additional salting)</li>
                  <li>Digital signatures</li>
                  <li>File checksums</li>
                </ul>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Note: MD5 and SHA-1 are considered cryptographically broken. Use SHA-256 or SHA-512 for
                    security-critical applications.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Analysis Results</h2>
            {analysis && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className={`h-5 w-5 ${analysis.isHash ? "text-green-500" : "text-red-500"}`} />
                  <span className="font-medium">
                    {analysis.isHash ? "Valid hash pattern detected" : "No valid hash pattern detected"}
                  </span>
                </div>

                {analysis.error ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{analysis.error}</AlertDescription>
                  </Alert>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            )}
          </Card>

          <Card className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Example Hashes</h2>
            <div className="space-y-4">
              {EXAMPLE_HASHES.map((example) => (
                <div key={example.name} className="p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{example.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(example.value)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <code className="text-sm break-all">{example.value}</code>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
