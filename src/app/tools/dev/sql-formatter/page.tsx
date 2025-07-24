"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect, useCallback } from "react";
import { AlertCircle, Copy, RotateCcw, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormatOptions {
  indentSize: number;
  uppercase: boolean;
  removeComments: boolean;
  addSemicolon: boolean;
  autoFormat: boolean;
}

export default function SQLFormatter() {
  const [inputSql, setInputSql] = useState("");
  const [outputSql, setOutputSql] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<FormatOptions>({
    indentSize: 2,
    uppercase: true,
    removeComments: false,
    addSemicolon: true,
    autoFormat: false,
  });
  const [copied, setCopied] = useState(false);

  const formatSQL = (sql: string, opts: FormatOptions): string => {
    if (!sql.trim()) return sql;

    let formatted = sql.trim();

    // Remove comments if requested
    if (opts.removeComments) {
      formatted = formatted.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
    }

    // Normalize whitespace
    formatted = formatted.replace(/\s+/g, " ").trim();

    const indent = " ".repeat(opts.indentSize);

    // Apply case conversion first
    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "GROUP BY",
      "HAVING",
      "ORDER BY",
      "INSERT",
      "UPDATE",
      "DELETE",
      "CREATE",
      "ALTER",
      "DROP",
      "WITH",
      "JOIN",
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL JOIN",
      "FULL OUTER JOIN",
      "CROSS JOIN",
      "AND",
      "OR",
      "UNION",
      "UNION ALL",
      "CASE",
      "WHEN",
      "THEN",
      "ELSE",
      "END",
      "ON",
      "AS",
      "DISTINCT",
      "INTO",
      "VALUES",
      "SET",
    ];

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword.replace(/\s+/g, "\\s+")}\\b`, "gi");
      formatted = formatted.replace(regex, opts.uppercase ? keyword : keyword.toLowerCase());
    });

    // Now apply formatting rules using regex patterns
    let result = formatted;

    // Major clauses on new lines
    result = result.replace(
      /\b(SELECT|FROM|WHERE|GROUP\s+BY|HAVING|ORDER\s+BY|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH)\b/gi,
      (match) => "\n" + (opts.uppercase ? match.toUpperCase() : match.toLowerCase())
    );

    // JOINs on new lines
    result = result.replace(
      /\b(INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|FULL\s+OUTER\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|JOIN)\b/gi,
      (match) => "\n" + (opts.uppercase ? match.toUpperCase() : match.toLowerCase())
    );

    // AND/OR with indentation
    result = result.replace(
      /\b(AND|OR)\b/gi,
      (match) => "\n" + indent + (opts.uppercase ? match.toUpperCase() : match.toLowerCase())
    );

    // ON clauses with indentation
    result = result.replace(
      /\bON\b/gi,
      (match) => "\n" + indent + (opts.uppercase ? match.toUpperCase() : match.toLowerCase())
    );

    // Commas in SELECT with new lines and indentation
    result = result.replace(/,(?=(?:[^']*'[^']*')*[^']*$)/g, ",\n" + indent);

    // CASE statements formatting
    result = result.replace(
      /\bWHEN\b/gi,
      (match) => "\n" + indent + (opts.uppercase ? match.toUpperCase() : match.toLowerCase())
    );

    result = result.replace(
      /\bELSE\b/gi,
      (match) => "\n" + indent + (opts.uppercase ? match.toUpperCase() : match.toLowerCase())
    );

    // Clean up formatting
    result = result
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n");

    // Fix indentation for specific cases
    const lines = result.split("\n");
    const formattedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Major clauses reset to base level
      if (
        /^(SELECT|FROM|WHERE|GROUP\s+BY|HAVING|ORDER\s+BY|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH|UNION|UNION\s+ALL)/i.test(
          line
        )
      ) {
        formattedLines.push(line);
      }
      // JOINs at base level
      else if (
        /^(INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|FULL\s+OUTER\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|JOIN)/i.test(line)
      ) {
        formattedLines.push(line);
      }
      // AND/OR and ON get indented
      else if (/^(AND|OR|ON)/i.test(line)) {
        formattedLines.push(indent + line);
      }
      // SELECT list items get indented (lines that start with a comma or after SELECT)
      else if (line.startsWith(",") || (i > 0 && /^(SELECT)/i.test(lines[i - 1]))) {
        formattedLines.push(indent + line);
      }
      // CASE statement parts
      else if (/^(WHEN|THEN|ELSE|END)/i.test(line)) {
        formattedLines.push(indent + line);
      }
      // Everything else gets appropriate indentation
      else {
        const needsIndent =
          i > 0 &&
          (/^(SELECT|FROM|WHERE|GROUP\s+BY|HAVING|ORDER\s+BY|JOIN|INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN)/i.test(
            lines[i - 1]
          ) ||
            formattedLines[formattedLines.length - 1]?.endsWith(","));
        formattedLines.push(needsIndent ? indent + line : line);
      }
    }

    result = formattedLines.join("\n");

    // Add semicolon if requested and not present
    if (opts.addSemicolon && !result.trim().endsWith(";")) {
      result = result.trim() + ";";
    }

    return result.trim();
  };

  const handleFormat = () => {
    try {
      setError(null);
      if (!inputSql.trim()) {
        setError("Please enter some SQL to format");
        return;
      }

      const formatted = formatSQL(inputSql, options);
      setOutputSql(formatted);
    } catch (err) {
      setError("Error formatting SQL: " + (err instanceof Error ? err.message : "Unknown error"));
      setOutputSql("");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputSql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleReset = () => {
    setInputSql("");
    setOutputSql("");
    setError(null);
  };

  const loadSampleSQL = () => {
    const sampleQuery = `select u.id, u.name, u.email, p.title as post_title, p.created_at, c.content as comment_content, case when p.featured = true then 'Featured' else 'Regular' end as post_type from users u left join posts p on u.id = p.user_id inner join comments c on p.id = c.post_id where u.status = 'active' and p.published = true and (u.role = 'admin' or u.role = 'editor') group by u.id, p.id, c.id having count(c.id) > 2 order by p.created_at desc, u.name asc limit 10 offset 20`;
    setInputSql(sampleQuery);
  };

  // Auto-format functionality with debouncing
  const debouncedAutoFormat = useCallback(() => {
    if (options.autoFormat && inputSql.trim()) {
      try {
        const formatted = formatSQL(inputSql, options);
        setOutputSql(formatted);
        setError(null);
      } catch {
        // Silently fail for auto-format to avoid interrupting user typing
        setError(null);
      }
    }
  }, [inputSql, options]);

  useEffect(() => {
    if (!options.autoFormat) return;

    const timeoutId = setTimeout(debouncedAutoFormat, 500); // 500ms delay
    return () => clearTimeout(timeoutId);
  }, [debouncedAutoFormat, options.autoFormat]);

  const handleInputChange = (value: string) => {
    setInputSql(value);
    if (!options.autoFormat) {
      setOutputSql(""); // Clear output if auto-format is off
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">SQL Formatter</h1>

      <div className="">
        {/* Controls */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Indent Size</Label>
              <Select
                value={options.indentSize.toString()}
                onValueChange={(value) => setOptions((prev) => ({ ...prev, indentSize: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="8">8 spaces</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="uppercase"
                  checked={options.uppercase}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, uppercase: checked }))}
                />
                <Label htmlFor="uppercase">Uppercase Keywords</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="semicolon"
                  checked={options.addSemicolon}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, addSemicolon: checked }))}
                />
                <Label htmlFor="semicolon">Add Semicolon</Label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="comments"
                  checked={options.removeComments}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, removeComments: checked }))}
                />
                <Label htmlFor="comments">Remove Comments</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoformat"
                  checked={options.autoFormat}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, autoFormat: checked }))}
                />
                <Label htmlFor="autoformat">Auto Format</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleFormat}>Format SQL</Button>
            <Button variant="outline" onClick={loadSampleSQL}>
              Load Sample
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </Card>

        {/* SQL Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <h2 className="text-sm font-medium mb-2">Input SQL</h2>
            <Textarea
              placeholder="Enter your SQL query here..."
              className="font-mono text-sm min-h-[400px]"
              value={inputSql}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium">Formatted SQL</h2>
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!outputSql || !!error}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <Textarea
                className="font-mono text-sm min-h-[400px]"
                value={outputSql}
                readOnly
                placeholder="Formatted SQL will appear here..."
              />
            )}
          </Card>
        </div>

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About SQL Formatting</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Properly formats and indents SQL queries for better readability</li>
            <li>Supports multiple SQL dialects (MySQL, PostgreSQL, SQLite, Oracle)</li>
            <li>Configurable indentation and keyword casing options</li>
            <li>Can remove comments and ensure proper semicolon placement</li>
            <li>Auto-format option provides real-time formatting while you type (500ms delay)</li>
            <li>Perfect for code reviews and maintaining SQL code standards</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
