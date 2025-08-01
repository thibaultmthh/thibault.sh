"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw, Clock, Calendar, X, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface CurrentTime {
  unix: number;
  iso: string;
  readable: string;
}

interface DateResult {
  iso?: string;
  utc?: string;
  local?: string;
  error?: string;
}

interface CopyState {
  [key: string]: boolean;
}

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState<{ milliseconds?: number; seconds?: number; error?: string } | string>("");
  const [date, setDate] = useState<DateResult>({});
  const [unit, setUnit] = useState("seconds");
  const [currentTime, setCurrentTime] = useState<CurrentTime>({ unix: 0, iso: "", readable: "" });
  const [dateInput, setDateInput] = useState("");
  const [copyStates, setCopyStates] = useState<CopyState>({});
  const [isValidTimestamp, setIsValidTimestamp] = useState(true);
  const [isValidDate, setIsValidDate] = useState(true);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime({
        unix: Math.floor(now.getTime() / 1000),
        iso: now.toISOString(),
        readable: now.toLocaleString(),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-convert timestamp as user types
  useEffect(() => {
    if (typeof timestamp === "string" && timestamp.trim()) {
      try {
        let timestampNum = parseInt(timestamp);

        if (isNaN(timestampNum)) {
          setIsValidTimestamp(false);
          setDate({ error: "Invalid timestamp format" });
          return;
        }

        // Convert to milliseconds if needed
        if (unit === "seconds") {
          timestampNum *= 1000;
        }

        const dateObj = new Date(timestampNum);

        if (isNaN(dateObj.getTime())) {
          setIsValidTimestamp(false);
          setDate({ error: "Invalid timestamp value" });
          return;
        }

        setIsValidTimestamp(true);
        setDate({
          iso: dateObj.toISOString(),
          utc: dateObj.toUTCString(),
          local: dateObj.toLocaleString(),
        });
      } catch {
        setIsValidTimestamp(false);
        setDate({ error: "Invalid timestamp" });
      }
    } else {
      setDate({});
      setIsValidTimestamp(true);
    }
  }, [timestamp, unit]);

  // Auto-convert date as user types
  useEffect(() => {
    if (dateInput.trim()) {
      try {
        const dateObj = new Date(dateInput);

        if (isNaN(dateObj.getTime())) {
          setIsValidDate(false);
          setTimestamp({ error: "Invalid date format" });
          return;
        }

        setIsValidDate(true);
        setTimestamp({
          milliseconds: dateObj.getTime(),
          seconds: Math.floor(dateObj.getTime() / 1000),
        });
      } catch {
        setIsValidDate(false);
        setTimestamp({ error: "Invalid date" });
      }
    } else {
      setTimestamp("");
      setIsValidDate(true);
    }
  }, [dateInput]);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const clearTimestamp = () => {
    setTimestamp("");
    setDate({});
    setIsValidTimestamp(true);
  };

  const clearDate = () => {
    setDateInput("");
    setTimestamp("");
    setIsValidDate(true);
  };

  const useCurrentTimestamp = () => {
    setTimestamp(currentTime.unix.toString());
  };

  const useCurrentDate = () => {
    setDateInput(new Date().toISOString().slice(0, 16));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Timestamp Converter</h1>
        <p className="text-muted-foreground">
          Convert between timestamps and human-readable dates with real-time conversion
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Time Section */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5" />
            <h2 className="font-semibold">Current Time</h2>
            <Badge variant="secondary" className="ml-auto">
              Live
            </Badge>
          </div>
          <div className="grid gap-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-sm font-medium">Unix Timestamp:</span>
              <div className="flex gap-2 items-center">
                <code className="font-mono text-sm bg-muted px-2 py-1 rounded">{currentTime.unix}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(currentTime.unix.toString(), "current-unix")}
                  className="h-8 w-8 p-0"
                >
                  {copyStates["current-unix"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={useCurrentTimestamp} className="h-8 px-2 text-xs">
                  Use
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-sm font-medium">ISO 8601:</span>
              <div className="flex gap-2 items-center">
                <code className="font-mono text-sm bg-muted px-2 py-1 rounded truncate max-w-[200px]">
                  {currentTime.iso}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(currentTime.iso, "current-iso")}
                  className="h-8 w-8 p-0"
                >
                  {copyStates["current-iso"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={useCurrentDate} className="h-8 px-2 text-xs">
                  Use
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-sm font-medium">Local Time:</span>
              <div className="flex gap-2 items-center">
                <code className="font-mono text-sm bg-muted px-2 py-1 rounded">{currentTime.readable}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(currentTime.readable, "current-readable")}
                  className="h-8 w-8 p-0"
                >
                  {copyStates["current-readable"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Timestamp to Date */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCcw className="h-5 w-5" />
            <h2 className="font-semibold">Timestamp to Date</h2>
            <Badge variant="outline" className="ml-auto">
              Auto-convert
            </Badge>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={typeof timestamp === "string" ? timestamp : ""}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="e.g., 1672531200 or 1672531200000"
                  type="number"
                  className={!isValidTimestamp ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {typeof timestamp === "string" && timestamp && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearTimestamp}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seconds">Seconds</SelectItem>
                  <SelectItem value="milliseconds">Milliseconds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {date && !date.error && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-sm font-medium">ISO 8601:</span>
                  <div className="flex gap-2 items-center">
                    <code className="font-mono text-sm bg-background px-2 py-1 rounded truncate max-w-[200px]">
                      {date.iso}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => date.iso && copyToClipboard(date.iso, "date-iso")}
                      className="h-8 w-8 p-0"
                    >
                      {copyStates["date-iso"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-sm font-medium">UTC:</span>
                  <div className="flex gap-2 items-center">
                    <code className="font-mono text-sm bg-background px-2 py-1 rounded truncate max-w-[200px]">
                      {date.utc}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => date.utc && copyToClipboard(date.utc, "date-utc")}
                      className="h-8 w-8 p-0"
                    >
                      {copyStates["date-utc"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-sm font-medium">Local:</span>
                  <div className="flex gap-2 items-center">
                    <code className="font-mono text-sm bg-background px-2 py-1 rounded">{date.local}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => date.local && copyToClipboard(date.local, "date-local")}
                      className="h-8 w-8 p-0"
                    >
                      {copyStates["date-local"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {date?.error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{date.error}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Date to Timestamp */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5" />
            <h2 className="font-semibold">Date to Timestamp</h2>
            <Badge variant="outline" className="ml-auto">
              Auto-convert
            </Badge>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  placeholder="e.g., 2024-01-01, 2024-01-01T12:00:00Z, Jan 1 2024"
                  type="datetime-local"
                  className={!isValidDate ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {dateInput && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearDate}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {timestamp && typeof timestamp !== "string" && !timestamp.error && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-sm font-medium">Seconds:</span>
                  <div className="flex gap-2 items-center">
                    <code className="font-mono text-sm bg-background px-2 py-1 rounded">
                      {timestamp.seconds?.toString()}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        timestamp.seconds && copyToClipboard(timestamp.seconds.toString(), "timestamp-seconds")
                      }
                      className="h-8 w-8 p-0"
                    >
                      {copyStates["timestamp-seconds"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-sm font-medium">Milliseconds:</span>
                  <div className="flex gap-2 items-center">
                    <code className="font-mono text-sm bg-background px-2 py-1 rounded">{timestamp.milliseconds}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        timestamp.milliseconds &&
                        copyToClipboard(timestamp.milliseconds.toString(), "timestamp-milliseconds")
                      }
                      className="h-8 w-8 p-0"
                    >
                      {copyStates["timestamp-milliseconds"] ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {typeof timestamp !== "string" && timestamp.error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{timestamp.error}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Examples */}
        <Card className="p-6">
          <h2 className="font-semibold mb-3">Quick Examples</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Common Timestamps</h3>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setTimestamp("0")}
                  className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <code>0</code> - Unix Epoch (Jan 1, 1970)
                </button>
                <button
                  onClick={() => setTimestamp("1000000000")}
                  className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <code>1000000000</code> - Sep 9, 2001
                </button>
                <button
                  onClick={() => setTimestamp("1700000000")}
                  className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <code>1700000000</code> - Nov 15, 2023
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Date Formats</h3>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setDateInput("2024-01-01")}
                  className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <code>2024-01-01</code> - ISO Date
                </button>
                <button
                  onClick={() => setDateInput("2024-01-01T12:00:00Z")}
                  className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <code>2024-01-01T12:00:00Z</code> - ISO DateTime
                </button>
                <button
                  onClick={() => setDateInput("Jan 1, 2024")}
                  className="block w-full text-left p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <code>Jan 1, 2024</code> - Natural Language
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6">
          <h2 className="font-semibold mb-3">About Timestamps</h2>
          <div className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li>• Unix timestamps count seconds since January 1, 1970 (epoch)</li>
              <li>• Millisecond timestamps are 1000× larger than second timestamps</li>
              <li>• ISO 8601 is the international standard for date/time</li>
            </ul>
            <ul className="space-y-2">
              <li>• UTC is the primary time standard worldwide</li>
              <li>• Local time is based on your browser&apos;s timezone</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
