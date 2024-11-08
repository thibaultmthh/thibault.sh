"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, XCircle, Info } from "lucide-react";

interface SecurityHeader {
  name: string;
  description: string;
  value: string | null;
  status: "success" | "warning" | "error";
  recommendation?: string;
}

interface AnalysisResult {
  headers: SecurityHeader[];
  url: string;
  error?: string;
}

export default function SecurityHeadersAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeHeaders = async (url: string) => {
    try {
      const response = await fetch(`/api/analyze-headers?url=${encodeURIComponent(url)}`);
      const headers = await response.json();

      const analysis: SecurityHeader[] = [
        {
          name: "Strict-Transport-Security",
          description: "Enforces HTTPS connections",
          value: headers["strict-transport-security"] || null,
          status: headers["strict-transport-security"] ? "success" : "error",
          recommendation: "Add 'Strict-Transport-Security: max-age=31536000; includeSubDomains'",
        },
        {
          name: "Content-Security-Policy",
          description: "Controls resources the browser is allowed to load",
          value: headers["content-security-policy"] || null,
          status: headers["content-security-policy"] ? "success" : "warning",
          recommendation: "Implement a Content Security Policy to prevent XSS and other injection attacks",
        },
        {
          name: "X-Frame-Options",
          description: "Prevents clickjacking attacks",
          value: headers["x-frame-options"] || null,
          status: headers["x-frame-options"] ? "success" : "error",
          recommendation: "Add 'X-Frame-Options: DENY' or 'SAMEORIGIN'",
        },
        {
          name: "X-Content-Type-Options",
          description: "Prevents MIME-type sniffing",
          value: headers["x-content-type-options"] || null,
          status: headers["x-content-type-options"] ? "success" : "warning",
          recommendation: "Add 'X-Content-Type-Options: nosniff'",
        },
        {
          name: "Referrer-Policy",
          description: "Controls how much referrer information should be included",
          value: headers["referrer-policy"] || null,
          status: headers["referrer-policy"] ? "success" : "warning",
          recommendation: "Add 'Referrer-Policy: strict-origin-when-cross-origin'",
        },
        {
          name: "Permissions-Policy",
          description: "Controls which features and APIs can be used",
          value: headers["permissions-policy"] || null,
          status: headers["permissions-policy"] ? "success" : "warning",
          recommendation: "Consider implementing Permissions-Policy to control feature usage",
        },
        {
          name: "X-XSS-Protection",
          description: "Legacy XSS protection (modern browsers use CSP)",
          value: headers["x-xss-protection"] || null,
          status: headers["x-xss-protection"] ? "warning" : "warning",
          recommendation: "Modern browsers rely on CSP instead. Consider removing this header.",
        },
      ];

      return { headers: analysis, url };
    } catch {
      throw new Error("Failed to analyze headers");
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      let processedUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        processedUrl = `https://${url}`;
      }

      const result = await analyzeHeaders(processedUrl);
      setResult(result);
    } catch {
      setResult({
        headers: [],
        url,
        error: "Failed to analyze headers. Please check the URL and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Security Headers Analyzer</h1>

      <Card className="p-6">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., example.com)"
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
        </form>

        {result?.error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {result.error}
          </div>
        )}

        {result && !result.error && (
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              {result.headers.map((header) => (
                <Card key={header.name} className="p-4">
                  <div className="flex items-start gap-4">
                    {getStatusIcon(header.status)}
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{header.name}</h3>
                      <p className="text-sm text-muted-foreground">{header.description}</p>
                      {header.value ? (
                        <pre className="mt-2 p-2 bg-muted rounded text-sm overflow-x-auto">{header.value}</pre>
                      ) : (
                        <p className="text-sm text-yellow-500 dark:text-yellow-400">Header not found</p>
                      )}
                      {header.recommendation && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Recommendation:</strong> {header.recommendation}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">About Security Headers</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Security headers are HTTP response headers that help protect your website from various attacks. They
            instruct browsers to enforce certain security controls, such as:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Preventing cross-site scripting (XSS) attacks</li>
            <li>Enforcing HTTPS connections</li>
            <li>Protecting against clickjacking</li>
            <li>Controlling resource loading</li>
            <li>Managing browser features and APIs</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
