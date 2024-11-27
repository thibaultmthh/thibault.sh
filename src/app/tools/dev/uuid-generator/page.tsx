"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Copy, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

export default function UUIDGenerator() {
  const [generatedUUIDs, setGeneratedUUIDs] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [validateInput, setValidateInput] = useState("");
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  const generateUUID = () => {
    const newUUIDs = Array(quantity)
      .fill(0)
      .map(() => {
        const uuid = crypto.randomUUID();
        return uppercase ? uuid.toUpperCase() : uuid;
      });
    setGeneratedUUIDs(newUUIDs);
  };

  const validateUUID = (uuid: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const isValid = uuidRegex.test(uuid);
    setValidationResult({
      isValid,
      message: isValid ? "Valid UUID format" : "Invalid UUID format. Please check the input.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">UUID Generator</h1>

      <Tabs defaultValue="generate" className="mb-6">
        <TabsList>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="validate">Validate</TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <Label>Number of UUIDs</Label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(100, Math.max(1, +e.target.value)))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Uppercase</Label>
                  <div>
                    <Switch checked={uppercase} onCheckedChange={setUppercase} />
                  </div>
                </div>
              </div>

              <Button onClick={generateUUID} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate UUID{quantity > 1 ? "s" : ""}
              </Button>

              {generatedUUIDs.length > 0 && (
                <div className="space-y-2">
                  {generatedUUIDs.map((uuid, index) => (
                    <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                      <code className="flex-1 font-mono">{uuid}</code>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(uuid)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="validate">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>UUID to validate</Label>
                <Input
                  value={validateInput}
                  onChange={(e) => setValidateInput(e.target.value)}
                  placeholder="Enter UUID to validate..."
                  className="font-mono"
                />
              </div>

              <Button onClick={() => validateUUID(validateInput)} className="w-full">
                Validate UUID
              </Button>

              {validationResult && (
                <Alert variant={validationResult.isValid ? "default" : "destructive"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{validationResult.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Info Cards */}
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">About UUIDs</h2>
          <p className="text-muted-foreground">
            A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer
            systems. The probability of duplicate UUIDs is close enough to zero to be negligible.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">UUID Format</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>UUIDs are represented as 32 hexadecimal digits, displayed in 5 groups separated by hyphens:</p>
            <code className="block bg-muted p-2 rounded">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>
            <ul className="list-disc pl-4 space-y-1">
              <li>The digits are hexadecimal (0-9 and a-f)</li>
              <li>The fourth character of the third group is always `&apos;4`&apos;</li>
              <li>The first character of the fourth group is either 8, 9, a, or b</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Common Use Cases</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
            <li>Database primary keys</li>
            <li>Session IDs in web applications</li>
            <li>Unique file or resource identifiers</li>
            <li>Distributed systems where unique IDs are needed</li>
            <li>Transaction IDs in financial systems</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
