"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Copy, Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Match {
  text: string;
  index: number;
  groups?: { [key: string]: string };
}

interface HighlightSegment {
  text: string;
  isMatch: boolean;
  matchIndex?: number;
}

const COMMON_PATTERNS = [
  {
    name: "Email",
    pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    description: "Matches valid email addresses",
  },
  {
    name: "URL",
    pattern:
      "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
    description: "Matches URLs (http or https)",
  },
  {
    name: "Phone Number",
    pattern: "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$",
    description: "Matches common phone number formats",
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
    description: "Matches dates in YYYY-MM-DD format",
  },
  {
    name: "Strong Password",
    pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
    description: "Minimum 8 characters, at least one letter, number and special character",
  },
];

export default function RegExPlayground() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [highlightedText, setHighlightedText] = useState<HighlightSegment[]>([]);

  const flagOptions = [
    { value: "g", label: "Global", description: "Match all occurrences" },
    { value: "i", label: "Case Insensitive", description: "Case-insensitive matching" },
    { value: "m", label: "Multiline", description: "^ and $ match start/end of each line" },
    { value: "s", label: "Dot All", description: ". matches newlines" },
    { value: "u", label: "Unicode", description: "Enable unicode support" },
    { value: "y", label: "Sticky", description: "Match from lastIndex only" },
  ];

  const updateMatches = () => {
    setError("");
    setIsValid(true);
    setHighlightedText([]);

    if (!pattern) {
      setMatches([]);
      return;
    }

    try {
      const matches: Match[] = [];
      const segments: HighlightSegment[] = [];
      let lastIndex = 0;
      let match;

      // Create a new regex for each execution to reset lastIndex
      const matchRegex = new RegExp(pattern, flags);
      while ((match = matchRegex.exec(testText)) !== null) {
        // Add non-matching segment
        if (match.index > lastIndex) {
          segments.push({
            text: testText.slice(lastIndex, match.index),
            isMatch: false,
          });
        }

        // Add matching segment
        segments.push({
          text: match[0],
          isMatch: true,
          matchIndex: matches.length,
        });

        matches.push({
          text: match[0],
          index: match.index,
          groups: match.groups,
        });

        lastIndex = match.index + match[0].length;

        if (!flags.includes("g")) break;
      }

      // Add remaining text
      if (lastIndex < testText.length) {
        segments.push({
          text: testText.slice(lastIndex),
          isMatch: false,
        });
      }

      setMatches(matches);
      setHighlightedText(segments);
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
      setMatches([]);
    }
  };

  useEffect(updateMatches, [pattern, flags, testText]);

  const toggleFlag = (flag: string) => {
    setFlags((prev) => (prev.includes(flag) ? prev.replace(flag, "") : prev + flag));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">RegEx Playground</h1>

      <div className="space-y-6">
        {/* Pattern Input */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pattern">Regular Expression</Label>
              <div className="flex gap-2">
                <span className="text-muted-foreground">/</span>
                <Input
                  id="pattern"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter your regular expression"
                  className={error ? "border-red-500" : ""}
                />
                <span className="text-muted-foreground">/</span>
                <Input value={flags} onChange={(e) => setFlags(e.target.value)} className="w-20" placeholder="flags" />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            {/* Flags */}
            <div className="space-y-2">
              <Label>Flags</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flagOptions.map((flag) => (
                  <div key={flag.value} className="flex items-center space-x-2">
                    <Switch checked={flags.includes(flag.value)} onCheckedChange={() => toggleFlag(flag.value)} />
                    <div>
                      <Label>{flag.label}</Label>
                      <p className="text-sm text-muted-foreground">{flag.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Patterns */}
            <div className="space-y-2">
              <Label>Common Patterns</Label>
              <Select onValueChange={(value) => setPattern(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a common pattern" />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_PATTERNS.map((item) => (
                    <SelectItem key={item.name} value={item.pattern}>
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Test Text */}
        <Card className="p-6">
          <div className="space-y-2">
            <Label htmlFor="testText">Test Text</Label>
            <div className="relative">
              <Textarea
                id="testText"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Enter text to test against your regular expression"
                className="min-h-[200px] font-mono text-base leading-relaxed resize-none"
                style={{ lineHeight: "1.5", padding: "8px 12px" }}
              />
              {highlightedText.length > 0 && (
                <div
                  className="absolute inset-0 pointer-events-none font-mono text-transparent"
                  style={{
                    padding: "8px 12px",
                    lineHeight: "1.5",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {highlightedText.map((segment, index) => (
                    <span
                      key={index}
                      className={segment.isMatch ? "bg-yellow-500/30 dark:bg-yellow-500/20 rounded" : ""}
                    >
                      {segment.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Results */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Matches ({matches.length})</Label>
              {isValid && pattern && (
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(pattern)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Pattern
                </Button>
              )}
            </div>

            {matches.length > 0 ? (
              <div className="space-y-2">
                {matches.map((match, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono">{match.text}</p>
                        <p className="text-sm text-muted-foreground">Index: {match.index}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(match.text)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    {match.groups && Object.keys(match.groups).length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Groups:</p>
                        <pre className="text-sm mt-1">{JSON.stringify(match.groups, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No matches found</p>
            )}
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5" />
            <h2 className="font-semibold">Quick Reference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-2">Common Metacharacters</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <code>.</code> - Any character except newline
                </li>
                <li>
                  <code>\w</code> - Word character [A-Za-z0-9_]
                </li>
                <li>
                  <code>\d</code> - Digit [0-9]
                </li>
                <li>
                  <code>\s</code> - Whitespace character
                </li>
                <li>
                  <code>^</code> - Start of string/line
                </li>
                <li>
                  <code>$</code> - End of string/line
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Quantifiers</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <code>*</code> - 0 or more
                </li>
                <li>
                  <code>+</code> - 1 or more
                </li>
                <li>
                  <code>?</code> - 0 or 1
                </li>
                <li>
                  <code>{"{n}"}</code> - Exactly n times
                </li>
                <li>
                  <code>{"{n,}"}</code> - n or more times
                </li>
                <li>
                  <code>{"{n,m}"}</code> - Between n and m times
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
