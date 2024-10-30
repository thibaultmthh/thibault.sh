"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QueryParam {
  key: string;
  value: string;
}

export default function UrlEncoder() {
  const [fullUrl, setFullUrl] = useState("");
  const [encodedUrl, setEncodedUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  // For query parameters tab
  const [baseUrl, setBaseUrl] = useState("");
  const [queryParams, setQueryParams] = useState<QueryParam[]>([{ key: "", value: "" }]);

  const encodeFullUrl = () => {
    try {
      const encoded = encodeURI(fullUrl);
      setEncodedUrl(encoded);
      setError(null);
    } catch {
      setError("Invalid URL format");
    }
  };

  const decodeFullUrl = () => {
    try {
      const decoded = decodeURI(fullUrl);
      setEncodedUrl(decoded);
      setError(null);
    } catch {
      setError("Invalid encoded URL");
    }
  };

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: "", value: "" }]);
  };

  const removeQueryParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const updateQueryParam = (index: number, field: keyof QueryParam, value: string) => {
    const newParams = [...queryParams];
    newParams[index] = { ...newParams[index], [field]: value };
    setQueryParams(newParams);
  };

  const buildUrl = () => {
    try {
      const url = new URL(baseUrl);

      queryParams.forEach(({ key, value }) => {
        if (key.trim() && value.trim()) {
          url.searchParams.append(key, value);
        }
      });

      setEncodedUrl(url.toString());
      setError(null);
    } catch {
      setError("Invalid base URL format");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4">URL Encoder/Decoder</h1>

      <Tabs defaultValue="full" className="mb-4">
        <TabsList>
          <TabsTrigger value="full">Full URL</TabsTrigger>
          <TabsTrigger value="params">Query Parameters</TabsTrigger>
        </TabsList>

        <TabsContent value="full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h2 className="text-sm font-medium mb-2">Input URL</h2>
              <Textarea
                placeholder="Enter URL to encode or decode..."
                className="font-mono min-h-[400px] w-full"
                value={fullUrl}
                onChange={(e) => setFullUrl(e.target.value)}
              />
              <div className="flex gap-4 mt-4">
                <Button onClick={encodeFullUrl}>Encode</Button>
                <Button variant="secondary" onClick={decodeFullUrl}>
                  Decode
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium">Result</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(encodedUrl)}
                  disabled={!encodedUrl || !!error}
                >
                  Copy
                </Button>
              </div>
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <Textarea className="font-mono min-h-[400px] w-full" value={encodedUrl} readOnly />
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="params">
          <Card className="p-4 mb-6">
            <h2 className="text-sm font-medium mb-2">Base URL</h2>
            <Input
              placeholder="https://example.com"
              className="font-mono"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </Card>

          <Card className="p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-medium">Query Parameters</h2>
              <Button variant="outline" size="sm" onClick={addQueryParam}>
                <Plus className="h-4 w-4 mr-2" />
                Add Parameter
              </Button>
            </div>

            <div className="space-y-4">
              {queryParams.map((param, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <Input
                    placeholder="Key"
                    value={param.key}
                    onChange={(e) => updateQueryParam(index, "key", e.target.value)}
                    className="font-mono"
                  />
                  <Input
                    placeholder="Value"
                    value={param.value}
                    onChange={(e) => updateQueryParam(index, "value", e.target.value)}
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeQueryParam(index)}
                    disabled={queryParams.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button onClick={buildUrl} className="mt-4">
              Build URL
            </Button>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium">Generated URL</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(encodedUrl)}
                disabled={!encodedUrl || !!error}
              >
                Copy
              </Button>
            </div>
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <div className="bg-muted p-3 rounded-md">
                <code className="text-sm break-all font-mono">{encodedUrl}</code>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
