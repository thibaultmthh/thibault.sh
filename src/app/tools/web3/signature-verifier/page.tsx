/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignatureVerifier() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const verifySignature = async () => {
    try {
      setError(null);
      setVerificationResult(null);

      if (!message.trim() || !signature.trim()) {
        throw new Error("Please provide both message and signature");
      }

      // Clean signature input
      const cleanedSignature = signature.trim();
      if (!cleanedSignature.startsWith("0x")) {
        throw new Error("Signature must start with 0x");
      }

      // Try to recover the address that signed the message
      const recoveredAddress = ethers.verifyMessage(message, cleanedSignature);

      setVerificationResult({
        recoveredAddress,
        messageHash: ethers.hashMessage(message),
        originalMessage: message,
        signature: cleanedSignature,
      });
    } catch (err: any) {
      setError(err.message);
      setVerificationResult(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Signature Verifier</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifySignature();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="message">Original Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter the original message that was signed..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="signature">Signature</Label>
              <Input
                id="signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="0x..."
                className="font-mono"
              />
            </div>

            <Button type="submit" className="w-full">
              Verify Signature
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {verificationResult && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <Label className="mb-2 block">Verification Result</Label>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="font-semibold">Recovered Address: </span>
                    <span className="break-all">{verificationResult.recoveredAddress}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Message Hash: </span>
                    <span className="break-all">{verificationResult.messageHash}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-3">About Signature Verifier</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Verify Ethereum signatures and recover the signing address</li>
            <li>Input the original message that was signed</li>
            <li>Provide the signature (must start with 0x)</li>
            <li>The tool will recover the address that signed the message</li>
            <li>Also shows the message hash for verification</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
