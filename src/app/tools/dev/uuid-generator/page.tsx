"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Copy, RefreshCw, Check, Info, Hash, Clock, Globe } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5,
  v6 as uuidv6,
  v7 as uuidv7,
  validate,
  version,
} from "uuid";

interface CopyState {
  [key: string]: boolean;
}

interface GeneratedUUID {
  id: string;
  value: string;
  version: number;
  type: string;
}

interface ValidationResult {
  isValid: boolean;
  version?: number;
  message: string;
  details?: {
    format: string;
    versionName: string;
    description: string;
  };
}

export default function UUIDGenerator() {
  const [generatedUUIDs, setGeneratedUUIDs] = useState<GeneratedUUID[]>([]);
  const [selectedVersion, setSelectedVersion] = useState("v4");
  const [validateInput, setValidateInput] = useState("");
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [copyStates, setCopyStates] = useState<CopyState>({});
  const [namespaceUuid, setNamespaceUuid] = useState("6ba7b810-9dad-11d1-80b4-00c04fd430c8"); // DNS namespace
  const [nameInput, setNameInput] = useState("");

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const getUUIDVersionInfo = useCallback((ver: string) => {
    const info = {
      v1: { name: "Timestamp", description: "Based on MAC address and timestamp", icon: Clock },
      v3: { name: "Namespace (MD5)", description: "Name-based using MD5 hash", icon: Hash },
      v4: { name: "Random", description: "Randomly or pseudo-randomly generated", icon: RefreshCw },
      v5: { name: "Namespace (SHA-1)", description: "Name-based using SHA-1 hash", icon: Hash },
      v6: { name: "Timestamp (Reordered)", description: "Version 1 with reordered fields", icon: Clock },
      v7: { name: "Unix Timestamp", description: "Unix epoch time-based", icon: Globe },
    };
    return info[ver as keyof typeof info] || info.v4;
  }, []);

  const generateSingleUUID = useCallback(() => {
    let uuid: string;
    const timestamp = Date.now();

    try {
      switch (selectedVersion) {
        case "v1":
          uuid = uuidv1();
          break;
        case "v3":
          if (!nameInput.trim()) {
            throw new Error("Name is required for v3 UUIDs");
          }
          uuid = uuidv3(nameInput, namespaceUuid);
          break;
        case "v4":
          uuid = uuidv4();
          break;
        case "v5":
          if (!nameInput.trim()) {
            throw new Error("Name is required for v5 UUIDs");
          }
          uuid = uuidv5(nameInput, namespaceUuid);
          break;
        case "v6":
          uuid = uuidv6();
          break;
        case "v7":
          uuid = uuidv7();
          break;
        default:
          uuid = uuidv4();
      }

      return {
        id: `${timestamp}-${Math.random()}`,
        value: uuid,
        version: parseInt(selectedVersion.substring(1)),
        type: getUUIDVersionInfo(selectedVersion).name,
      };
    } catch (error) {
      throw error;
    }
  }, [selectedVersion, nameInput, namespaceUuid, getUUIDVersionInfo]);

  const generateUUID = () => {
    try {
      const newUUID = generateSingleUUID();
      setGeneratedUUIDs([newUUID]);
    } catch (error) {
      console.error("Error generating UUID:", error);
    }
  };

  const validateUUID = (uuid: string) => {
    try {
      const trimmedUuid = uuid.trim();
      if (!trimmedUuid) {
        setValidationResult({
          isValid: false,
          message: "Please enter a UUID to validate.",
        });
        return;
      }

      const isValid = validate(trimmedUuid);
      if (isValid) {
        const uuidVersion = version(trimmedUuid);
        const versionInfo = getUUIDVersionInfo(`v${uuidVersion}`);
        setValidationResult({
          isValid: true,
          version: uuidVersion,
          message: `✅ Valid UUID detected`,
          details: {
            format: `Version ${uuidVersion} UUID`,
            versionName: versionInfo.name,
            description: versionInfo.description,
          },
        });
      } else {
        setValidationResult({
          isValid: false,
          message: "❌ Invalid UUID format - must be 8-4-4-4-12 hexadecimal pattern",
        });
      }
    } catch {
      setValidationResult({
        isValid: false,
        message: "❌ Invalid UUID format - please check the input",
      });
    }
  };

  const clearGenerated = () => {
    setGeneratedUUIDs([]);
    setCopyStates({});
  };

  const needsNameInput = selectedVersion === "v3" || selectedVersion === "v5";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">UUID Generator</h1>
        <p className="text-muted-foreground">
          Generate multiple versions of UUIDs (RFC 9562) with advanced validation and detailed information
        </p>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="generate" className="mb-6">
          <TabsList>
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="validate">Validate</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <Card className="p-6">
              <div className="space-y-6">
                {/* Version Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">UUID Version</Label>
                  <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Version 1 - Timestamp (MAC + Time)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="v3">
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          <span>Version 3 - Namespace (MD5)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="v4">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4" />
                          <span>Version 4 - Random</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="v5">
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          <span>Version 5 - Namespace (SHA-1)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="v6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Version 6 - Timestamp (Reordered)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="v7">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>Version 7 - Unix Timestamp</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Version Description */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{getUUIDVersionInfo(selectedVersion).name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{getUUIDVersionInfo(selectedVersion).description}</p>
                  </div>
                </div>

                {/* Name Input for v3/v5 */}
                {needsNameInput && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Name Input</Label>
                      <Input
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Enter name for namespace-based UUID..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Namespace UUID</Label>
                      <Select value={namespaceUuid} onValueChange={setNamespaceUuid}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6ba7b810-9dad-11d1-80b4-00c04fd430c8">DNS Namespace</SelectItem>
                          <SelectItem value="6ba7b811-9dad-11d1-80b4-00c04fd430c8">URL Namespace</SelectItem>
                          <SelectItem value="6ba7b812-9dad-11d1-80b4-00c04fd430c8">OID Namespace</SelectItem>
                          <SelectItem value="6ba7b814-9dad-11d1-80b4-00c04fd430c8">X.500 Namespace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <div className="flex gap-2">
                  <Button onClick={generateUUID} className="flex-1" disabled={needsNameInput && !nameInput.trim()}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate UUID
                  </Button>
                  {generatedUUIDs.length > 0 && (
                    <Button variant="outline" onClick={clearGenerated}>
                      Clear
                    </Button>
                  )}
                </div>

                {/* Generated UUID */}
                {generatedUUIDs.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Generated UUID</Label>
                    {generatedUUIDs.map((uuid) => (
                      <div key={uuid.id} className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <code className="font-mono text-base block break-all mb-2">{uuid.value}</code>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              v{uuid.version}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{uuid.type}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(uuid.value, uuid.id)}
                          className="flex-shrink-0"
                        >
                          {copyStates[uuid.id] ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                          Copy
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
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">UUID to validate</Label>
                    <Input
                      value={validateInput}
                      onChange={(e) => {
                        setValidateInput(e.target.value);
                        if (e.target.value.trim()) {
                          validateUUID(e.target.value);
                        } else {
                          setValidationResult(null);
                        }
                      }}
                      placeholder="Enter UUID to validate (e.g., 123e4567-e89b-12d3-a456-426614174000)"
                      className="font-mono"
                    />
                  </div>

                  <Button
                    onClick={() => validateUUID(validateInput)}
                    className="w-full"
                    disabled={!validateInput.trim()}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Validate UUID
                  </Button>

                  {validationResult && (
                    <div className="space-y-4">
                      <Alert variant={validationResult.isValid ? "default" : "destructive"}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="flex items-center justify-between">
                            <span>{validationResult.message}</span>
                            {validationResult.isValid && validationResult.version && (
                              <Badge variant="secondary">v{validationResult.version}</Badge>
                            )}
                          </div>
                        </AlertDescription>
                      </Alert>

                      {validationResult.isValid && validationResult.details && (
                        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                          <h4 className="font-medium text-sm">Validation Details</h4>
                          <div className="grid gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Format:</span>
                              <span className="font-mono">{validationResult.details.format}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Type:</span>
                              <span>{validationResult.details.versionName}</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="text-muted-foreground">Description:</span>
                              <span className="text-right max-w-[200px]">{validationResult.details.description}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Validation Insights */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    What UUID Validation Can Tell You
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 border rounded-lg space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Badge variant="outline">Format Check</Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Validates the UUID follows the standard 8-4-4-4-12 hexadecimal format with proper hyphen
                        placement.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Badge variant="outline">Version Detection</Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically detects UUID version (1-7) from the version field and explains its generation
                        method.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Badge variant="outline">RFC Compliance</Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Ensures compliance with RFC 9562 (formerly RFC 4122) standards for UUID structure and format.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Badge variant="outline">Real-time Feedback</Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Provides instant validation as you type, with detailed explanations of what makes each UUID
                        unique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* UUID Version Comparison */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Info className="h-5 w-5" />
            UUID Versions Comparison
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { version: "v1", security: "Low", uniqueness: "High", sortable: "Yes", use: "Legacy systems" },
              { version: "v3", security: "Medium", uniqueness: "High", sortable: "No", use: "Deterministic IDs" },
              { version: "v4", security: "High", uniqueness: "Very High", sortable: "No", use: "General purpose" },
              { version: "v5", security: "Medium", uniqueness: "High", sortable: "No", use: "Deterministic IDs" },
              { version: "v6", security: "Low", uniqueness: "High", sortable: "Yes", use: "Sortable timestamps" },
              { version: "v7", security: "High", uniqueness: "Very High", sortable: "Yes", use: "Modern systems" },
            ].map((item) => (
              <div key={item.version} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{item.version.toUpperCase()}</Badge>
                  <span className="font-medium">{getUUIDVersionInfo(item.version).name}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security:</span>
                    <span>{item.security}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uniqueness:</span>
                    <span>{item.uniqueness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sortable:</span>
                    <span>{item.sortable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best for:</span>
                    <span>{item.use}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Information Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-3">About UUIDs</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                UUIDs (Universally Unique Identifiers) are 128-bit values used to uniquely identify information. They
                follow RFC 9562 (formerly RFC 4122) standards.
              </p>
              <ul className="space-y-1 list-disc pl-4">
                <li>
                  <strong>Format:</strong> 32 hexadecimal digits in 5 groups (8-4-4-4-12)
                </li>
                <li>
                  <strong>Probability of collision:</strong> Virtually zero
                </li>
                <li>
                  <strong>Cross-platform:</strong> Works everywhere
                </li>
                <li>
                  <strong>No central authority:</strong> Generate anywhere
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-3">Common Use Cases</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  DB
                </Badge>
                <span className="text-muted-foreground">Database primary keys and foreign keys</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  API
                </Badge>
                <span className="text-muted-foreground">REST API resource identifiers</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  Session
                </Badge>
                <span className="text-muted-foreground">User session and authentication tokens</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  File
                </Badge>
                <span className="text-muted-foreground">Unique file and resource names</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  Event
                </Badge>
                <span className="text-muted-foreground">Event tracking and correlation IDs</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  Msg
                </Badge>
                <span className="text-muted-foreground">Message queuing and distributed systems</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
