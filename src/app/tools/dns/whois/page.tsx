"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AlertCircle, Copy, Globe } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

interface WhoisData {
  domainName?: string;
  registrar?: string;
  registrarUrl?: string;
  createdDate?: string;
  updatedDate?: string;
  expiryDate?: string;
  nameServers?: string[];
  registrant?: {
    organization?: string;
    country?: string;
  };
  status?: string[];
  rawText?: string;
}

export default function WhoisTool() {
  const [domain, setDomain] = useState("");
  const [whoisData, setWhoisData] = useState<WhoisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    if (!domain) {
      setError("Please enter a domain name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Replace this URL with your actual WHOIS API endpoint
      const response = await fetch(`/api/whois?domain=${encodeURIComponent(domain)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch WHOIS data");
      }

      setWhoisData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch WHOIS data");
      setWhoisData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">WHOIS Lookup</h1>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="domain">Domain Name</Label>
            <div className="flex gap-2">
              <Input
                id="domain"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLookup()}
              />
              <Button onClick={handleLookup} disabled={loading}>
                {loading ? "Loading..." : "Lookup"}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {whoisData && (
            <div className="space-y-6">
              {/* Domain Overview */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">{whoisData.domainName}</h2>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(whoisData.rawText || "")}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Raw Data
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Registration Details</h3>
                    <dl className="space-y-1">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Registrar:</dt>
                        <dd>{whoisData.registrar || "N/A"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Created Date:</dt>
                        <dd>{formatDate(whoisData.createdDate)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Updated Date:</dt>
                        <dd>{formatDate(whoisData.updatedDate)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Expiry Date:</dt>
                        <dd>{formatDate(whoisData.expiryDate)}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Nameservers</h3>
                    <ul className="space-y-1">
                      {whoisData.nameServers?.map((ns, index) => (
                        <li key={index} className="text-sm">
                          {ns}
                        </li>
                      )) || "N/A"}
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Status Codes */}
              {whoisData.status && whoisData.status.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Domain Status</h3>
                  <ul className="space-y-1">
                    {whoisData.status.map((status, index) => (
                      <li key={index} className="text-sm">
                        {status}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Raw WHOIS Data */}
              <Card className="p-4">
                <h3 className="font-medium mb-2">Raw WHOIS Data</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px] text-sm">
                  <code>{whoisData.rawText}</code>
                </pre>
              </Card>
            </div>
          )}
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">About WHOIS</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            WHOIS is a query and response protocol used for querying databases that store information about registered
            domain names. This includes:
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Domain registration details</li>
            <li>Registrar information</li>
            <li>Creation and expiration dates</li>
            <li>Nameserver information</li>
            <li>Domain status codes</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Note: Due to GDPR and other privacy regulations, some registration details might be redacted or hidden.
          </p>
        </div>
      </Card>
    </div>
  );
}
