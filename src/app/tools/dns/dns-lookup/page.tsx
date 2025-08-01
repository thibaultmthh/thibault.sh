"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Copy, Server } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DNSRecord {
  type: string;
  value: string;
  ttl?: number;
  priority?: number;
}

interface DNSResults {
  [key: string]: DNSRecord[];
}

const RECORD_TYPES = ["A", "AAAA", "MX", "TXT", "NS", "CNAME", "SOA"];

const cleanDomain = (input: string): string => {
  let cleaned = input.replace(/^(?:https?:\/\/)?(?:ftp:\/\/)?/i, "");
  cleaned = cleaned.split("/")[0];
  cleaned = cleaned.replace(/[^a-zA-Z0-9.-]/g, "");
  return cleaned;
};

export default function DNSLookup() {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<DNSResults>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!domain) {
      setError("Please enter a domain name");
      return;
    }

    const cleanedDomain = cleanDomain(domain);
    setDomain(cleanedDomain);

    if (!cleanedDomain) {
      setError("Please enter a valid domain name");
      return;
    }

    setLoading(true);
    setError(null);
    setResults({});

    try {
      const promises = RECORD_TYPES.map((recordType) =>
        fetch("/api/dns/lookup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domain: cleanedDomain,
            recordType,
          }),
        }).then(async (response) => {
          const data = await response.json();
          return {
            type: recordType,
            records: response.ok ? data.records : [],
          };
        })
      );

      const responses = await Promise.all(promises);

      const newResults: DNSResults = {};
      responses.forEach(({ type, records }) => {
        if (records.length > 0) {
          newResults[type] = records;
        }
      });

      setResults(newResults);

      if (Object.keys(newResults).length === 0) {
        setError("No DNS records found for this domain");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to perform DNS lookup");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getRecordIcon = () => {
    return <Server className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">DNS Lookup Tool</h1>

      <Card className="p-6 mb-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="domain">Domain Name</Label>
            <div className="flex gap-2">
              <Input
                id="domain"
                name="domain"
                placeholder="https://example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                aria-label="Enter domain name"
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Looking up..." : "Lookup"}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>

        {Object.keys(results).length > 0 && (
          <div className="mt-6 space-y-6">
            {RECORD_TYPES.map((recordType) => {
              const records = results[recordType];
              if (!records || records.length === 0) return null;

              return (
                <div key={recordType}>
                  <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    {getRecordIcon()}
                    {recordType} Records
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {records.map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-sm truncate flex-1">{record.value}</span>
                          {record.priority && (
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              Priority: {record.priority}
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                          onClick={() => handleCopy(record.value)}
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy value</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">About DNS Records</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            DNS (Domain Name System) records are instructions that live in authoritative DNS servers and provide
            information about a domain including what IP address is associated with that domain and how to handle
            requests for that domain.
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>A Record:</strong> Maps a domain to IPv4 address
            </li>
            <li>
              <strong>AAAA Record:</strong> Maps a domain to IPv6 address
            </li>
            <li>
              <strong>MX Record:</strong> Specifies mail servers for the domain
            </li>
            <li>
              <strong>TXT Record:</strong> Holds text information, often used for verification
            </li>
            <li>
              <strong>NS Record:</strong> Specifies authoritative nameservers
            </li>
            <li>
              <strong>CNAME Record:</strong> Creates an alias from one domain to another
            </li>
            <li>
              <strong>SOA Record:</strong> Contains administrative information about the zone
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
