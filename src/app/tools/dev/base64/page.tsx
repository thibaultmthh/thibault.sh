"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Base64Tool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileResult, setFileResult] = useState<string>("");

  const encode = () => {
    try {
      const encoded = btoa(inputText);
      setOutputText(encoded);
      setError(null);
    } catch {
      setError("Invalid input for Base64 encoding. Make sure your input contains valid characters.");
    }
  };

  const decode = () => {
    try {
      const decoded = atob(inputText);
      setOutputText(decoded);
      setError(null);
    } catch {
      setError("Invalid Base64 string. Please check your input.");
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const base64String = event.target.result.toString().split(",")[1];
        setFileResult(base64String);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadFile = () => {
    if (!fileResult) return;

    try {
      const decoded = atob(fileResult);
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }

      const blob = new Blob([bytes]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedFile?.name || "decoded-file";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("Error downloading file. The Base64 string might be invalid.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Base64 Encoder/Decoder</h1>

      <Tabs defaultValue="text" className="mb-4">
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="file">File</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <div className="flex gap-4 mb-4">
            <Button onClick={encode}>Encode</Button>
            <Button onClick={decode} variant="secondary">
              Decode
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h2 className="text-sm font-medium mb-2">Input</h2>
              <Textarea
                placeholder="Enter text to encode or decode..."
                className="font-mono min-h-[400px] w-full"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium">Output</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(outputText)}
                  disabled={!outputText || !!error}
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
                <Textarea className="font-mono min-h-[400px] w-full" value={outputText} readOnly />
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="file">
          <Card className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">Any file type</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileSelect} />
                </label>
              </div>

              {selectedFile && (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{selectedFile.name}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleCopy(fileResult)}>
                        Copy Base64
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadFile}>
                        Download File
                      </Button>
                    </div>
                  </div>
                  <Textarea className="font-mono min-h-[200px] w-full" value={fileResult} readOnly />
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
