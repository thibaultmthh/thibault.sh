"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AlertCircle, Download, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ParsedCSV {
  headers: string[];
  rows: string[][];
}

export default function CSVViewer() {
  const [csvText, setCsvText] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [parsedData, setParsedData] = useState<ParsedCSV | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (text: string, delim: string): ParsedCSV | null => {
    try {
      const lines = text.split(/\r?\n/).filter((line) => line.trim());
      if (lines.length === 0) return null;

      const headers = lines[0].split(delim).map((header) => header.trim());
      const rows = lines.slice(1).map((line) => line.split(delim).map((cell) => cell.trim()));

      return { headers, rows };
    } catch {
      setError("Failed to parse CSV data. Please check the format and delimiter.");
      return null;
    }
  };

  const handleTextChange = (value: string) => {
    setCsvText(value);
    setError(null);
    if (value.trim()) {
      const result = parseCSV(value, delimiter);
      setParsedData(result);
    } else {
      setParsedData(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      handleTextChange(text);
    };
    reader.readAsText(file);
  };

  const downloadCSV = () => {
    if (!csvText) return;

    const blob = new Blob([csvText], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    if (!parsedData) return;

    const jsonData = parsedData.rows.map((row) => {
      const obj: Record<string, string> = {};
      parsedData.headers.forEach((header, index) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">CSV Viewer</h1>

      <div className="space-y-4">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="delimiter">Delimiter</Label>
                <Input
                  id="delimiter"
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="w-20"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={downloadCSV} disabled={!csvText}>
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button variant="outline" onClick={downloadJSON} disabled={!parsedData}>
                  <Download className="h-4 w-4 mr-2" />
                  JSON
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop CSV file
                  </p>
                </div>
                <input type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
              </label>
            </div>

            <Textarea
              placeholder="Paste your CSV data here..."
              className="min-h-[200px] font-mono text-sm"
              value={csvText}
              onChange={(e) => handleTextChange(e.target.value)}
            />
          </div>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {parsedData && (
          <Card className="p-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {parsedData.headers.map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedData.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h2 className="font-semibold mb-3">About this Tool</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              This CSV Viewer is a client-side tool that helps you inspect and manipulate CSV data. All processing
              happens in your browser - no data is sent to any server.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Parse and preview CSV data in a table format</li>
              <li>Support for custom delimiters (comma, tab, semicolon, etc.)</li>
              <li>Upload CSV files or paste data directly</li>
              <li>Export to CSV or JSON format</li>
              <li>No data leaves your browser - completely private</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-3">Usage Tips</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• For tab-separated files (TSV), use &quot;\t&quot; as the delimiter</li>
            <li>• The first row is automatically used as column headers</li>
            <li>• Empty rows are automatically filtered out</li>
            <li>• Export to JSON to convert CSV data into a structured format</li>
            <li>• Large files may take a moment to process</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
