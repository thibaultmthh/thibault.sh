"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState<{ milliseconds?: number; seconds?: number; error?: string } | string>("");
  const [date, setDate] = useState<DateResult>({});
  const [unit, setUnit] = useState("seconds");
  const [currentTime, setCurrentTime] = useState<CurrentTime>({ unix: 0, iso: "", readable: "" });
  const [dateInput, setDateInput] = useState("");

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

  const convertTimestamp = () => {
    try {
      if (typeof timestamp !== "string") return;
      let timestampNum = parseInt(timestamp);

      // Convert to milliseconds if needed
      if (unit === "seconds") {
        timestampNum *= 1000;
      }

      const date = new Date(timestampNum);

      if (isNaN(date.getTime())) {
        throw new Error("Invalid timestamp");
      }

      setDate({
        iso: date.toISOString(),
        utc: date.toUTCString(),
        local: date.toLocaleString(),
      });
    } catch {
      setDate({ error: "Invalid timestamp" });
    }
  };

  const convertDate = () => {
    try {
      const dateObj = new Date(dateInput);

      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date");
      }

      setTimestamp({
        milliseconds: dateObj.getTime(),
        seconds: Math.floor(dateObj.getTime() / 1000),
      });
    } catch {
      setTimestamp({ error: "Invalid date" });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Timestamp Converter</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          {/* Current Time Section */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h2 className="font-semibold mb-2">Current Time</h2>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span>Unix Timestamp:</span>
                <code className="font-mono">{currentTime.unix}</code>
              </div>
              <div className="flex justify-between">
                <span>ISO 8601:</span>
                <code className="font-mono">{currentTime.iso}</code>
              </div>
              <div className="flex justify-between">
                <span>Readable:</span>
                <code className="font-mono">{currentTime.readable}</code>
              </div>
            </div>
          </div>

          {/* Timestamp to Date */}
          <div className="space-y-4 mb-6">
            <h2 className="font-semibold">Timestamp to Date</h2>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={typeof timestamp === "string" ? timestamp : ""}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="Enter timestamp"
                  type="number"
                />
              </div>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seconds">Seconds</SelectItem>
                  <SelectItem value="milliseconds">Milliseconds</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={convertTimestamp}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Convert
              </Button>
            </div>
            {date && !date.error && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">ISO 8601:</span>
                  <div className="flex gap-2">
                    <code className="font-mono text-sm">{date.iso}</code>
                    <Button variant="ghost" size="sm" onClick={() => date.iso && copyToClipboard(date.iso)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">UTC:</span>
                  <div className="flex gap-2">
                    <code className="font-mono text-sm">{date.utc}</code>
                    <Button variant="ghost" size="sm" onClick={() => date.utc && copyToClipboard(date.utc)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Local:</span>
                  <div className="flex gap-2">
                    <code className="font-mono text-sm">{date.local}</code>
                    <Button variant="ghost" size="sm" onClick={() => date.local && copyToClipboard(date.local)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {date?.error && <p className="text-sm text-destructive">{date.error}</p>}
          </div>

          {/* Date to Timestamp */}
          <div className="space-y-4">
            <h2 className="font-semibold">Date to Timestamp</h2>
            <div className="flex gap-2">
              <Input
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                placeholder="Enter date (e.g., 2024-01-01 or ISO 8601)"
              />
              <Button onClick={convertDate}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Convert
              </Button>
            </div>
            {timestamp && typeof timestamp !== "string" && !timestamp.error && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Seconds:</span>
                  <div className="flex gap-2">
                    <code className="font-mono text-sm">{timestamp.seconds?.toString()}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => timestamp.seconds && copyToClipboard(timestamp.seconds.toString())}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Milliseconds:</span>
                  <div className="flex gap-2">
                    <code className="font-mono text-sm">{timestamp.milliseconds}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => timestamp.milliseconds && copyToClipboard(timestamp.milliseconds.toString())}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {typeof timestamp !== "string" && timestamp.error && (
              <p className="text-sm text-destructive">{timestamp.error}</p>
            )}
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About Timestamps</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Unix timestamps represent seconds since January 1, 1970 (epoch)</li>
            <li>Millisecond timestamps are 1000 times larger than second timestamps</li>
            <li>ISO 8601 is an international standard for date/time representation</li>
            <li>UTC (Coordinated Universal Time) is the primary time standard</li>
            <li>Local time is converted based on your browser&apos;s timezone</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
