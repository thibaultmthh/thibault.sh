"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Copy, Clock, AlertCircle, AlertTriangle, CheckCircle, Key, Share2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface JWTHeader {
  alg: string;
  typ: string;
  [key: string]: unknown;
}

interface JWTPayload {
  exp?: number;
  iat?: number;
  nbf?: number;
  [key: string]: unknown;
}

interface DecodedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
}

interface ValidationWarning {
  severity: "low" | "medium" | "high";
  message: string;
}

const verifySignature = async (token: string, secret: string): Promise<boolean> => {
  try {
    // Split the token
    const [headerB64, payloadB64, signatureB64] = token.split(".");

    // Get the signing input
    const signingInput = `${headerB64}.${payloadB64}`;

    // Decode header to get the algorithm
    const header = JSON.parse(atob(headerB64));
    const algorithm = header.alg;

    // Convert base64url to regular base64
    const normalizedSignature = signatureB64.replace(/-/g, "+").replace(/_/g, "/");

    // Convert secret to Uint8Array
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);

    // Import the secret key
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: { name: algorithm === "HS256" ? "SHA-256" : "SHA-512" } },
      false,
      ["verify"]
    );

    // Create signing input ArrayBuffer
    const data = encoder.encode(signingInput);

    // Decode the signature
    const signatureArray = Uint8Array.from(atob(normalizedSignature), (c) => c.charCodeAt(0));

    // Verify the signature
    const isValid = await crypto.subtle.verify("HMAC", key, signatureArray, data);

    return isValid;
  } catch (err) {
    console.error("Verification error:", err);
    return false;
  }
};

const JWT_EXAMPLES = [
  {
    name: "Simple Token",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    secret: "your-256-bit-secret",
    description: "Basic JWT with standard claims",
  },
  {
    name: "Expiring Token",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5NTE2MjM5fQ.OFAF9HAxFf2PP-J4Xat5eq9wbZ4KSpVpBKP2dhynVlA",
    secret: "your-256-bit-secret",
    description: "Token with expiration date",
  },
  {
    name: "Custom Claims",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4iLCJwZXJtaXNzaW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0.h2iOCz-iLcuQYg2mznPH5hImrVc1MMcQY6QrT0xwRwI",
    secret: "your-256-bit-secret",
    description: "Token with custom claims (role, permissions)",
  },
];

const getTokenWarnings = (decoded: DecodedJWT): ValidationWarning[] => {
  const warnings: ValidationWarning[] = [];

  // Check algorithm
  if (decoded.header.alg === "none") {
    warnings.push({
      severity: "high",
      message: 'Token uses "none" algorithm which is insecure',
    });
  }

  // Check essential claims
  if (!decoded.payload.sub) {
    warnings.push({
      severity: "medium",
      message: 'Missing "sub" claim',
    });
  }
  if (!decoded.payload.iat) {
    warnings.push({
      severity: "low",
      message: 'Missing "iat" claim',
    });
  }

  return warnings;
};

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return `${date.toLocaleString()} (${date.toISOString()})`;
};

export default function JWTViewer() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState("");
  const [secret, setSecret] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<{
    isValid: boolean | null;
    error?: string;
  }>({ isValid: null });

  // Add a state to track if we're using a custom token
  const [isCustomToken, setIsCustomToken] = useState(false);

  // Add new state variables
  const [warnings, setWarnings] = useState<ValidationWarning[]>([]);

  const decodeToken = (token: string): DecodedJWT | null => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      // Generate warnings
      const decoded = { header, payload, signature: parts[2] };
      setWarnings(getTokenWarnings(decoded));

      return decoded;
    } catch {
      setError("Invalid JWT token");
      return null;
    }
  };

  // Update handleTokenChange to track custom tokens
  const handleTokenChange = (value: string) => {
    setToken(value);
    setError("");

    // Check if this is a custom token (not from examples)
    const isFromExample = JWT_EXAMPLES.some((example) => example.token === value);
    setIsCustomToken(!isFromExample && value.trim() !== "");

    if (value.trim()) {
      const result = decodeToken(value);
      setDecoded(result);
    } else {
      setDecoded(null);
      setIsCustomToken(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getExpirationStatus = (payload: JWTPayload) => {
    if (!payload.exp) {
      return {
        status: "NO_EXPIRATION",
        label: "No expiration",
        color: "text-muted-foreground",
      };
    }

    const now = Date.now() / 1000;
    const timeLeft = payload.exp - now;

    if (timeLeft < 0) {
      return {
        status: "EXPIRED",
        label: "Expired",
        color: "text-destructive",
        timeAgo: formatTimeAgo(timeLeft),
      };
    }

    if (timeLeft < 3600) {
      // Less than 1 hour
      return {
        status: "EXPIRING_SOON",
        label: "Expiring Soon",
        color: "text-yellow-500 dark:text-yellow-400",
        timeLeft: formatTimeLeft(timeLeft),
      };
    }

    return {
      status: "VALID",
      label: "Valid",
      color: "text-green-500 dark:text-green-400",
      timeLeft: formatTimeLeft(timeLeft),
    };
  };

  const formatTimeLeft = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const formatTimeAgo = (seconds: number) => {
    const absSeconds = Math.abs(seconds);
    const days = Math.floor(absSeconds / 86400);
    const hours = Math.floor((absSeconds % 86400) / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h ago`;
    if (hours > 0) return `${hours}h ${minutes}m ago`;
    return `${minutes}m ago`;
  };

  const handleVerification = async () => {
    if (!token || !secret || !decoded) {
      setVerificationStatus({ isValid: null });
      return;
    }

    try {
      // Check if algorithm is supported
      const algorithm = decoded.header.alg;
      if (!["HS256", "HS384", "HS512"].includes(algorithm)) {
        setVerificationStatus({
          isValid: false,
          error: `Algorithm ${algorithm} is not supported. Only HMAC algorithms (HS256, HS384, HS512) are supported in the browser.`,
        });
        return;
      }

      const isValid = await verifySignature(token, secret);
      setVerificationStatus({ isValid });
    } catch {
      setVerificationStatus({
        isValid: false,
        error: "Failed to verify signature",
      });
    }
  };

  // Update verification when token or secret changes
  useEffect(() => {
    if (token && secret) {
      handleVerification();
    } else {
      setVerificationStatus({ isValid: null });
    }
  }, [token, secret]);

  // Add share functionality
  const shareToken = () => {
    if (token) {
      const url = new URL(window.location.href);
      url.searchParams.set("token", token);
      navigator.clipboard.writeText(url.toString());
      // You might want to add a toast notification here
    }
  };

  // Add URL parameter handling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      handleTokenChange(urlToken);
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">JWT Token Viewer</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          {/* JWT Token Input */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="token">JWT Token</Label>
            <Textarea
              id="token"
              value={token}
              onChange={(e) => handleTokenChange(e.target.value)}
              placeholder="Paste your JWT token here"
              className="font-mono text-sm min-h-[100px] resize-y"
            />
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>

          {/* Example Tokens - Only show if no custom token is set */}
          {!isCustomToken && (
            <div className="space-y-2 mb-6">
              <Label>Example Tokens</Label>
              <div className="grid gap-2">
                {JWT_EXAMPLES.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-2 px-3"
                    onClick={() => {
                      handleTokenChange(example.token);
                      setSecret(example.secret);
                    }}
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium">{example.name}</span>
                      <span className="text-sm text-muted-foreground">{example.description}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Secret Key Input */}
          {decoded && (
            <div className="space-y-2 mb-6">
              <Label htmlFor="secret">Secret Key</Label>
              <Input
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter your secret key to verify the signature"
                className="font-mono text-sm"
              />
              {verificationStatus.isValid !== null && (
                <div
                  className={`flex items-center gap-2 text-sm ${
                    verificationStatus.isValid ? "text-green-500" : "text-destructive"
                  }`}
                >
                  {verificationStatus.isValid ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Signature verified successfully
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4" />
                      {verificationStatus.error || "Invalid signature"}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {decoded && (
            <div className="space-y-6">
              {/* Token Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Algorithm Card */}
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Algorithm</h3>
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <p className="font-mono text-sm">{decoded.header.alg}</p>
                  </div>
                </Card>

                {/* Status Card */}
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Signature</h3>
                  <div className="flex items-center gap-2">
                    {verificationStatus.isValid === null ? (
                      <span className="text-muted-foreground text-sm">Enter secret key to verify</span>
                    ) : verificationStatus.isValid ? (
                      <div className="text-green-500 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Valid</span>
                      </div>
                    ) : (
                      <div className="text-destructive flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Invalid</span>
                      </div>
                    )}
                  </div>
                  {decoded?.header.alg && (
                    <p className="text-xs text-muted-foreground mt-1">Algorithm: {decoded.header.alg}</p>
                  )}
                </Card>

                {/* Expiration Status Card */}
                <Card className="p-4 md:col-span-2">
                  <h3 className="font-medium mb-2">Expiration</h3>
                  {decoded.payload.exp ? (
                    <div className="space-y-1">
                      {(() => {
                        const status = getExpirationStatus(decoded.payload);
                        return (
                          <>
                            <div className="flex items-center gap-2">
                              <div className={`flex items-center gap-1.5 ${status.color} font-medium`}>
                                {status.status === "EXPIRED" ? (
                                  <AlertCircle className="h-4 w-4" />
                                ) : status.status === "EXPIRING_SOON" ? (
                                  <Clock className="h-4 w-4" />
                                ) : (
                                  <div className="h-2 w-2 rounded-full bg-current" />
                                )}
                                {status.label}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{status.timeLeft || status.timeAgo}</p>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No expiration set</p>
                  )}
                </Card>
              </div>

              {/* Decoded Sections */}
              <Tabs defaultValue="payload" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="payload">Payload</TabsTrigger>
                  <TabsTrigger value="header">Header</TabsTrigger>
                  <TabsTrigger value="signature">Signature</TabsTrigger>
                </TabsList>

                <TabsContent value="payload" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Decoded Payload</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2))}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
                    <code>{JSON.stringify(decoded.payload, null, 2)}</code>
                  </pre>
                  {decoded.payload.exp && (
                    <div className="text-sm text-muted-foreground mt-2">
                      <p>Expires: {formatTimestamp(decoded.payload.exp)}</p>
                    </div>
                  )}
                  {decoded.payload.iat && (
                    <div className="text-sm text-muted-foreground">
                      <p>Issued At: {formatTimestamp(decoded.payload.iat)}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="header" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Decoded Header</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2))}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
                    <code>{JSON.stringify(decoded.header, null, 2)}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="signature" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Signature</Label>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(decoded.signature)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg overflow-auto">
                      <p className="font-mono text-sm break-all">{decoded.signature}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Base64 encoded signature</p>
                      <p>Algorithm: {decoded.header.alg}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </Card>
        {warnings.length > 0 && (
          <Card className="p-4 mb-6 mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <h3 className="font-medium">Security Analysis</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {warnings.length} {warnings.length === 1 ? "warning" : "warnings"} found
              </div>
            </div>
            <div className="space-y-2">
              {warnings.map((warning, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    warning.severity === "high"
                      ? "bg-destructive/10 border-destructive/20 text-destructive"
                      : warning.severity === "medium"
                        ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400"
                  }`}
                >
                  <div className="mt-0.5">
                    {warning.severity === "high" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : warning.severity === "medium" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-0.5">
                      {warning.severity === "high"
                        ? "Critical Security Issue"
                        : warning.severity === "medium"
                          ? "Security Warning"
                          : "Security Notice"}
                    </div>
                    <p className="text-sm">{warning.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About JWT Tokens</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>JWT tokens consist of three parts: header, payload, and signature</li>
            <li>The header typically contains the signing algorithm used</li>
            <li>The payload contains the claims (data)</li>
            <li>Common claims include: exp (expiration), iat (issued at), sub (subject)</li>
            <li>The signature is used to verify the token&apos;s authenticity</li>
          </ul>
        </Card>
        {/* About this Tool Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About this Tool</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              This JWT Token Viewer is a client-side tool that helps developers inspect and verify JWT tokens. All
              processing happens in your browser - no tokens are sent to any server.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Decode and inspect JWT tokens</li>
              <li>Verify signatures using HMAC algorithms (HS256, HS384, HS512)</li>
              <li>Check token expiration status</li>
              <li>View decoded header and payload data</li>
              <li>Copy individual components for further analysis</li>
            </ul>
          </div>
        </Card>
        {/* Add Warnings Display - Enhanced Version */}

        {/* Add Share Button */}
        {decoded && (
          <Button variant="outline" size="sm" onClick={shareToken} className="mb-4">
            <Share2 className="h-4 w-4 mr-2" />
            Share Token
          </Button>
        )}
      </div>
    </div>
  );
}
