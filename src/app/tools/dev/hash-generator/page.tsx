"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createMD5, createSHA1, createSHA256, createSHA512 } from "hash-wasm";

interface HashResult {
  algorithm: string;
  hash: string;
}

const algorithms = [
  { value: "md5", label: "MD5" },
  { value: "sha1", label: "SHA-1" },
  { value: "sha256", label: "SHA-256" },
  { value: "sha512", label: "SHA-512" },
] as const;

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("sha256");
  const [results, setResults] = useState<HashResult[]>([]);

  const calculateHash = async (text: string, algorithm: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    switch (algorithm) {
      case "md5": {
        const hasher = await createMD5();
        hasher.init();
        hasher.update(data);
        return hasher.digest("hex");
      }
      case "sha1": {
        const hasher = await createSHA1();
        hasher.init();
        hasher.update(data);
        return hasher.digest("hex");
      }
      case "sha256": {
        const hasher = await createSHA256();
        hasher.init();
        hasher.update(data);
        return hasher.digest("hex");
      }
      case "sha512": {
        const hasher = await createSHA512();
        hasher.init();
        hasher.update(data);
        return hasher.digest("hex");
      }
      default:
        throw new Error("Unsupported algorithm");
    }
  };

  const generateHash = async () => {
    if (!input.trim()) return;

    try {
      const hash = await calculateHash(input, selectedAlgorithm);

      setResults((prev) => {
        // Remove existing result for this algorithm
        const filtered = prev.filter((r) => r.algorithm !== selectedAlgorithm);
        // Add new result
        return [...filtered, { algorithm: selectedAlgorithm, hash }];
      });
    } catch (error) {
      console.error("Error generating hash:", error);
    }
  };

  const generateAllHashes = async () => {
    if (!input.trim()) return;

    try {
      const allHashes = await Promise.all(
        algorithms.map(async (algo) => ({
          algorithm: algo.value,
          hash: await calculateHash(input, algo.value),
        }))
      );
      setResults(allHashes);
    } catch (error) {
      console.error("Error generating hashes:", error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4">Hash Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card className="p-4 mb-4">
            <h2 className="text-sm font-medium mb-2">Input Text</h2>
            <Textarea
              placeholder="Enter text to hash..."
              className="font-mono min-h-[400px] w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Card>

          <div className="flex gap-4 items-center">
            <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                {algorithms.map((algo) => (
                  <SelectItem key={algo.value} value={algo.value}>
                    {algo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={generateHash}>Generate Hash</Button>
            <Button variant="secondary" onClick={generateAllHashes}>
              Generate All
            </Button>
          </div>
        </div>

        <Card className="p-4">
          <h2 className="text-sm font-medium mb-4">Hash Results</h2>
          <div className="space-y-4">
            {results.map(({ algorithm, hash }) => (
              <div key={algorithm} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium uppercase">{algorithm}</span>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(hash)}>
                    Copy
                  </Button>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm break-all">{hash}</code>
                </div>
              </div>
            ))}
            {results.length === 0 && (
              <div className="text-muted-foreground text-sm">
                No hashes generated yet. Enter some text and choose an algorithm to get started.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
