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
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function TransactionDecoder() {
  const [inputData, setInputData] = useState("");
  const [abi, setAbi] = useState("");
  const [decodedData, setDecodedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const decodeTransaction = () => {
    try {
      setError(null);

      // Clean input data
      const cleanedData = inputData.trim();
      if (!cleanedData) {
        throw new Error("Please provide transaction input data");
      }

      // Validate hex format
      if (!cleanedData.startsWith("0x")) {
        throw new Error("Input data must start with 0x");
      }

      // If no ABI is provided, just show the basic transaction data
      if (!abi.trim()) {
        const basicData = {
          raw: cleanedData,
          methodId: cleanedData.slice(0, 10),
          parameters: cleanedData.slice(10),
        };
        setDecodedData(basicData);
        return;
      }

      try {
        // Parse ABI and decode with it
        const parsedAbi = JSON.parse(abi);
        const iface = new ethers.Interface(parsedAbi);

        // Try to decode the transaction
        const decoded = iface.parseTransaction({ data: cleanedData });

        if (!decoded) {
          throw new Error("Could not decode transaction with provided ABI");
        }

        setDecodedData({
          name: decoded.name,
          signature: decoded.signature,
          args: Object.fromEntries(
            decoded.args.map((arg: any, index: number) => {
              // Handle BigInt conversion
              const value = typeof arg === "bigint" ? arg.toString() : arg;
              return [decoded.fragment.inputs[index]?.name || `arg${index}`, value];
            })
          ),
          sighash: decoded.signature,
          functionFragment: {
            inputs: decoded.fragment.inputs,
            outputs: decoded.fragment.outputs,
          },
        });
      } catch (abiError) {
        // If ABI decoding fails, fall back to basic decoding
        console.log(abiError);

        setDecodedData({
          raw: cleanedData,
          methodId: cleanedData.slice(0, 10),
          parameters: cleanedData.slice(10),
          error: "Could not decode with provided ABI. Showing raw data instead.",
        });
      }
    } catch (err: any) {
      setError(err.message);
      setDecodedData(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Transaction Decoder</h1>

      <div className="space-y-6">
        <Card className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              decodeTransaction();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="input-data">Transaction Input Data</Label>
              <Input
                id="input-data"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="0x..."
                className="font-mono"
              />
            </div>

            <div>
              <Label htmlFor="abi">Contract ABI (optional)</Label>
              <Textarea
                id="abi"
                value={abi}
                onChange={(e) => setAbi(e.target.value)}
                placeholder="[...]"
                className="font-mono"
                rows={5}
              />
            </div>

            <Button type="submit" className="w-full">
              Decode
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {decodedData && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <Label className="mb-2 block">Decoded Data</Label>

                {decodedData.error && (
                  <Alert className="mb-4">
                    <InfoCircledIcon className="h-4 w-4" />
                    <AlertDescription>{decodedData.error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2 font-mono text-sm">
                  {decodedData.methodId && (
                    <div>
                      <span className="font-semibold">Method ID: </span>
                      <span>{decodedData.methodId}</span>
                    </div>
                  )}

                  {decodedData.name && (
                    <div>
                      <span className="font-semibold">Function Name: </span>
                      <span>{decodedData.name}</span>
                    </div>
                  )}

                  {decodedData.signature && (
                    <div>
                      <span className="font-semibold">Function Signature: </span>
                      <span>{decodedData.signature}</span>
                    </div>
                  )}

                  {decodedData.args && Object.keys(decodedData.args).length > 0 && (
                    <div>
                      <span className="font-semibold">Arguments:</span>
                      <pre className="mt-2 p-2 bg-background rounded">{JSON.stringify(decodedData.args, null, 2)}</pre>
                    </div>
                  )}

                  {decodedData.parameters && (
                    <div>
                      <span className="font-semibold">Raw Parameters: </span>
                      <span className="break-all">{decodedData.parameters}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-3">About Transaction Decoder</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Decode Ethereum transaction input data to understand contract interactions</li>
            <li>Provide the transaction input data (starting with 0x)</li>
            <li>Optionally provide the contract ABI for detailed function decoding</li>
            <li>Without ABI, basic method ID and parameters will be shown</li>
            <li>With ABI, full function signature and decoded parameters will be displayed</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
