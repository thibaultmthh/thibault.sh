"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useMemo, useEffect } from "react";
import { AlertCircle, Download, Upload, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Papa from "papaparse";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

interface CSVRow {
  [key: string]: string;
}

interface ParsedCSV {
  headers: string[];
  data: CSVRow[];
  errors: Papa.ParseError[];
}

export default function CSVViewer() {
  const [csvText, setCsvText] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [parsedData, setParsedData] = useState<ParsedCSV | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const parseCSV = (text: string, delim: string): ParsedCSV | null => {
    try {
      const result = Papa.parse<CSVRow>(text, {
        delimiter: delim,
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim(),
        transform: (value: string) => value.trim(),
      });

      if (result.errors.length > 0 && result.data.length === 0) {
        setError("Failed to parse CSV data. Please check the format and delimiter.");
        return null;
      }

      const headers = Object.keys(result.data[0] || {});
      return {
        headers,
        data: result.data,
        errors: result.errors,
      };
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

  // Create table columns
  const columns = useMemo(() => {
    if (!parsedData?.headers) return [];

    const columnHelper = createColumnHelper<CSVRow>();

    return parsedData.headers.map((header) =>
      columnHelper.accessor(header, {
        header: () => header,
        cell: (info) => info.getValue(),
        enableSorting: true,
      })
    );
  }, [parsedData?.headers]);

  // Create table instance
  const table = useReactTable({
    data: parsedData?.data ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Virtualization for large datasets
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  // Prevent default drag behavior on the document
  useEffect(() => {
    const preventDefault = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("dragover", preventDefault);
    document.addEventListener("drop", preventDefault);

    return () => {
      document.removeEventListener("dragover", preventDefault);
      document.removeEventListener("drop", preventDefault);
    };
  }, []);

  const processFile = (file: File) => {
    // More lenient file type checking
    const isCSVFile =
      file.type.includes("csv") ||
      file.type.includes("text/plain") ||
      file.name.toLowerCase().endsWith(".csv") ||
      file.name.toLowerCase().endsWith(".txt");

    if (!isCSVFile) {
      setError("Please upload a CSV file (.csv or .txt).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      handleTextChange(text);
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
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

    const blob = new Blob([JSON.stringify(parsedData.data, null, 2)], { type: "application/json" });
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
              <div
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  isDragOver
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted-foreground/25 hover:bg-muted text-muted-foreground"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("csv-file-input")?.click()}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className={`w-8 h-8 mb-4 ${isDragOver ? "text-primary" : "text-muted-foreground"}`} />
                  <p className={`text-sm ${isDragOver ? "text-primary" : "text-muted-foreground"}`}>
                    {isDragOver ? (
                      <span className="font-semibold">Drop your file here</span>
                    ) : (
                      <>
                        <span className="font-semibold">Click to upload</span> or drag and drop CSV/TXT file
                      </>
                    )}
                  </p>
                </div>
                <input
                  id="csv-file-input"
                  type="file"
                  className="hidden"
                  accept=".csv,.txt,text/csv,text/plain"
                  onChange={handleFileUpload}
                />
              </div>
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
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{parsedData.data.length} rows</Badge>
                <Badge variant="secondary">{parsedData.headers.length} columns</Badge>
                {parsedData.errors.length > 0 && (
                  <Badge variant="destructive">{parsedData.errors.length} parsing errors</Badge>
                )}
              </div>
              {parsedData.data.length > 100 && <Badge variant="outline">Virtualized for performance</Badge>}
            </div>

            {parsedData.errors.length > 0 && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {parsedData.errors.length} parsing errors found. Data may be incomplete.
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-md border">
              {parsedData.data.length > 100 ? (
                // Virtualized rendering for large datasets
                <div ref={parentRef} className="h-[500px] overflow-auto" style={{ contain: "strict" }}>
                  <div style={{ height: totalSize, width: "100%", position: "relative" }}>
                    <table className="w-full">
                      <thead className="bg-muted/50 sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                className="px-4 py-3 text-left text-sm font-medium border-b bg-muted/50"
                              >
                                {header.isPlaceholder ? null : (
                                  <div
                                    className={`flex items-center gap-2 ${
                                      header.column.getCanSort() ? "cursor-pointer select-none" : ""
                                    }`}
                                    onClick={header.column.getToggleSortingHandler()}
                                  >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getCanSort() && (
                                      <span className="flex-shrink-0">
                                        {header.column.getIsSorted() === "asc" ? (
                                          <ArrowUp className="h-4 w-4" />
                                        ) : header.column.getIsSorted() === "desc" ? (
                                          <ArrowDown className="h-4 w-4" />
                                        ) : (
                                          <ArrowUpDown className="h-4 w-4 opacity-50" />
                                        )}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {paddingTop > 0 && (
                          <tr>
                            <td style={{ height: paddingTop }} />
                          </tr>
                        )}
                        {virtualRows.map((virtualRow) => {
                          const row = rows[virtualRow.index];
                          return (
                            <tr key={row.id} className="border-b hover:bg-muted/50">
                              {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-3 text-sm">
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                        {paddingBottom > 0 && (
                          <tr>
                            <td style={{ height: paddingBottom }} />
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // Regular rendering for smaller datasets
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th key={header.id} className="px-4 py-3 text-left text-sm font-medium border-b">
                              {header.isPlaceholder ? null : (
                                <div
                                  className={`flex items-center gap-2 ${
                                    header.column.getCanSort() ? "cursor-pointer select-none" : ""
                                  }`}
                                  onClick={header.column.getToggleSortingHandler()}
                                >
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                  {header.column.getCanSort() && (
                                    <span className="flex-shrink-0">
                                      {header.column.getIsSorted() === "asc" ? (
                                        <ArrowUp className="h-4 w-4" />
                                      ) : header.column.getIsSorted() === "desc" ? (
                                        <ArrowDown className="h-4 w-4" />
                                      ) : (
                                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                                      )}
                                    </span>
                                  )}
                                </div>
                              )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b hover:bg-muted/50">
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-3 text-sm">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h2 className="font-semibold mb-3">About this Tool</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              This advanced CSV Viewer is a client-side tool that helps you inspect, sort, and manipulate CSV data with
              high performance. All processing happens in your browser - no data is sent to any server.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Parse and preview CSV data with advanced table functionality</li>
              <li>Click column headers to sort data (ascending/descending)</li>
              <li>Automatic virtualization for large datasets (100+ rows) for optimal performance</li>
              <li>Robust CSV parsing that handles quotes, escapes, and malformed data</li>
              <li>Support for custom delimiters (comma, tab, semicolon, etc.)</li>
              <li>Upload CSV files or paste data directly</li>
              <li>Export to CSV or JSON format</li>
              <li>Real-time parsing error detection and reporting</li>
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
            <li>• Click any column header to sort the data by that column</li>
            <li>• Large datasets (100+ rows) are automatically virtualized for smooth scrolling</li>
            <li>• Parsing errors are shown but won&apos;t prevent data display</li>
            <li>• Export to JSON to convert CSV data into a structured format</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
