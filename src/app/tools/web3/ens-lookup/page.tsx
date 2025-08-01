"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Copy, ArrowRightLeft, Loader2 } from "lucide-react";
import { ethers } from "ethers";

export default function ENSLookup() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"addressToName" | "nameToAddress">("nameToAddress");

  const provider = new ethers.JsonRpcProvider("https://eth.public-rpc.com");

  const lookupENS = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let resolvedValue: string | null = null;

      if (mode === "nameToAddress") {
        // Resolve ENS name to address
        if (!input.endsWith(".eth")) {
          throw new Error("Invalid ENS name. Must end with .eth");
        }
        resolvedValue = await provider.resolveName(input);
      } else {
        // Resolve address to ENS name
        if (!ethers.isAddress(input)) {
          throw new Error("Invalid Ethereum address");
        }
        resolvedValue = await provider.lookupAddress(input);
      }

      if (!resolvedValue) {
        throw new Error("No result found");
      }

      setResult(resolvedValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Add form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupENS();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleMode = () => {
    setMode(mode === "nameToAddress" ? "addressToName" : "nameToAddress");
    setInput("");
    setResult(null);
    setError(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">ENS Lookup</h1>

      <div>
        <Card className="p-6">
          {/* Mode Toggle */}
          <div className="mb-6">
            <Button variant="outline" className="w-full" onClick={toggleMode}>
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              {mode === "nameToAddress" ? "Looking up address from ENS" : "Looking up ENS from address"}
            </Button>
          </div>

          {/* Wrap input and button in a form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-2 mb-4">
              <Label htmlFor="ens-input">{mode === "nameToAddress" ? "ENS Name" : "Ethereum Address"}</Label>
              <Input
                id={`${mode}-input-ens`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "nameToAddress" ? "vitalik.eth" : "0x123..."}
                className="font-mono"
              />
            </div>

            {/* Change Button to type="submit" */}
            <Button type="submit" disabled={isLoading || !input.trim()} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Looking up...
                </>
              ) : (
                "Lookup"
              )}
            </Button>
          </form>

          {/* Result */}
          {result && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <Label className="mb-2 block">Result</Label>
              <div className="flex items-center justify-between gap-2 font-mono break-all">
                <span>{result}</span>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Error */}
          {error && <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
        </Card>

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About ENS</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>ENS (Ethereum Name Service) is like DNS for Ethereum addresses</li>
            <li>It allows you to use human-readable names instead of long hexadecimal addresses</li>
            <li>ENS names end with .eth (e.g., vitalik.eth)</li>
            <li>You can resolve ENS names to addresses and vice versa</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
