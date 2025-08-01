"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Copy, AlertCircle, CheckCircle, AlertTriangle, Info, X, Shield, ShieldAlert, ShieldX } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import triggerGAEvent from "@/lib/triggerGAEvent";

interface HashPattern {
  name: string;
  length: number;
  pattern: RegExp;
  description: string;
  security: "weak" | "moderate" | "strong";
  category: "cryptographic" | "password" | "legacy";
}

const HASH_PATTERNS: HashPattern[] = [
  {
    name: "MD5",
    length: 32,
    pattern: /^[a-f0-9]{32}$/i,
    description: "Message-Digest Algorithm 5, 128-bit hash",
    security: "weak",
    category: "legacy",
  },
  {
    name: "SHA-1",
    length: 40,
    pattern: /^[a-f0-9]{40}$/i,
    description: "Secure Hash Algorithm 1, 160-bit hash",
    security: "weak",
    category: "legacy",
  },
  {
    name: "SHA-256",
    length: 64,
    pattern: /^[a-f0-9]{64}$/i,
    description: "Secure Hash Algorithm 2, 256-bit hash",
    security: "strong",
    category: "cryptographic",
  },
  {
    name: "SHA-512",
    length: 128,
    pattern: /^[a-f0-9]{128}$/i,
    description: "Secure Hash Algorithm 2, 512-bit hash",
    security: "strong",
    category: "cryptographic",
  },
  {
    name: "RIPEMD-160",
    length: 40,
    pattern: /^[a-f0-9]{40}$/i,
    description: "RACE Integrity Primitives Evaluation Message Digest, 160-bit hash",
    security: "moderate",
    category: "cryptographic",
  },
  {
    name: "bcrypt",
    length: 60,
    pattern: /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/,
    description: "Bcrypt password hashing function",
    security: "strong",
    category: "password",
  },
  {
    name: "SHA-384",
    length: 96,
    pattern: /^[a-f0-9]{96}$/i,
    description: "Secure Hash Algorithm 2, 384-bit hash",
    security: "strong",
    category: "cryptographic",
  },
  {
    name: "SHA3-256",
    length: 64,
    pattern: /^[a-f0-9]{64}$/i,
    description: "Secure Hash Algorithm 3, 256-bit hash",
    security: "strong",
    category: "cryptographic",
  },
  {
    name: "SHA3-512",
    length: 128,
    pattern: /^[a-f0-9]{128}$/i,
    description: "Secure Hash Algorithm 3, 512-bit hash",
    security: "strong",
    category: "cryptographic",
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
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Helper function to get security icon
  const getSecurityIcon = (security: string) => {
    switch (security) {
      case "weak":
        return <ShieldX className="h-4 w-4 text-red-500" />;
      case "moderate":
        return <ShieldAlert className="h-4 w-4 text-yellow-500" />;
      case "strong":
        return <Shield className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  // Helper function to get security color classes
  const getSecurityColor = (security: string) => {
    switch (security) {
      case "weak":
        return "border-red-200 bg-red-50";
      case "moderate":
        return "border-yellow-200 bg-yellow-50";
      case "strong":
        return "border-green-200 bg-green-50";
      default:
        return "";
    }
  };

  const analyzeHash = (hash: string, isManual = false) => {
    // Call the GA event only when manually analyzing a hash
    if (isManual) {
      triggerGAEvent("analyze_hash");
    }

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

  // Real-time analysis as user types
  useEffect(() => {
    if (input.trim()) {
      analyzeHash(input);
    } else {
      setAnalysis(null);
    }
  }, [input]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    }
  };

  const handleExampleClick = (exampleHash: string) => {
    setInput(exampleHash);
  };

  const clearInput = () => {
    setInput("");
    setAnalysis(null);
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
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Enter Hash</h2>
                  <div className="text-sm text-muted-foreground">{input.length} characters</div>
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Enter a hash value to analyze automatically..."
                    className="font-mono min-h-[150px] pr-10"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                  />
                  {input && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={clearInput}
                      title="Clear input"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {analysis && analysis.isHash && (
                  <div className="text-sm text-green-600 font-medium">
                    ✓ Analysis complete - {analysis.possibleTypes.length} pattern
                    {analysis.possibleTypes.length !== 1 ? "s" : ""} matched
                  </div>
                )}
              </div>
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
            {analysis ? (
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
                        <h3 className="font-medium mb-3">Possible Hash Types:</h3>
                        <div className="grid gap-3">
                          {analysis.possibleTypes.map((type) => (
                            <Card key={type.name} className={`p-4 border-l-4 ${getSecurityColor(type.security)}`}>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">{type.name}</h4>
                                    {getSecurityIcon(type.security)}
                                  </div>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      type.category === "legacy"
                                        ? "bg-red-100 text-red-700"
                                        : type.category === "password"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-green-100 text-green-700"
                                    }`}
                                  >
                                    {type.category}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Length: {type.length} characters</span>
                                  <span
                                    className={`font-medium ${
                                      type.security === "weak"
                                        ? "text-red-600"
                                        : type.security === "moderate"
                                          ? "text-yellow-600"
                                          : "text-green-600"
                                    }`}
                                  >
                                    Security: {type.security}
                                  </span>
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
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter a hash value above to see analysis results</p>
              </div>
            )}
          </Card>

          <Card className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Example Hashes</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Click on any example to analyze it, or use the copy button to copy the hash.
            </p>
            <div className="space-y-4">
              {EXAMPLE_HASHES.map((example) => (
                <div
                  key={example.name}
                  className="p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => handleExampleClick(example.value)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{example.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(example.value);
                      }}
                      className={copiedText === example.value ? "text-green-600" : ""}
                    >
                      {copiedText === example.value ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <code className="text-sm break-all block">{example.value}</code>
                  <p className="text-xs text-muted-foreground mt-2">{example.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
