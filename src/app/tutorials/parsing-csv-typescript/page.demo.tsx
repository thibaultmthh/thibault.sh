"use client";

import { useState } from "react";
import Papa from "papaparse";

interface ParseResult {
  data: Record<string, string>[];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

export default function CSVParserDemo() {
  const [csvInput, setCSVInput] = useState(`name,age,city
John Doe,30,New York
Jane Smith,25,Los Angeles
Bob Johnson,35,Chicago`);

  const [parseResult, setParseResult] = useState<ParseResult | null>(null);

  const handleParse = () => {
    Papa.parse(csvInput, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setParseResult({
          data: result.data as Record<string, string>[],
          errors: result.errors,
          meta: result.meta,
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter CSV Data:</label>
        <textarea
          value={csvInput}
          onChange={(e) => setCSVInput(e.target.value)}
          className="w-full h-32 p-2 border rounded-md font-mono text-sm"
          placeholder="Enter CSV data here..."
        />
      </div>

      <button onClick={handleParse} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
        Parse CSV
      </button>

      {parseResult && (
        <div className="space-y-4">
          {parseResult.errors.length > 0 && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
              <h4 className="font-medium">Errors:</h4>
              <ul className="list-disc pl-5">
                {parseResult.errors.map((error, index) => (
                  <li key={index}>
                    Row {error.row}: {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {parseResult.data.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(parseResult.data[0]).map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parseResult.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="text-sm text-gray-500">
            <p>Parsed {parseResult.data.length} rows</p>
            <p>Delimiter detected: &quot;{parseResult.meta.delimiter}&quot;</p>
          </div>
        </div>
      )}
    </div>
  );
}
