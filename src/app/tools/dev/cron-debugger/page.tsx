"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Calendar, AlertCircle, Copy, Info } from "lucide-react";
import cronstrue from "cronstrue";
import parser from "cron-parser";

interface NextDates {
  date: Date;
  relative: string;
}

const calculateNextDates = (cronExpression: string, count: number = 5): NextDates[] => {
  const dates: NextDates[] = [];
  const currentDate = new Date();

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const interval = parser.parseExpression(cronExpression);

    for (let i = 0; i < count; i++) {
      const next = interval.next().toDate();
      const relative = formatRelativeTime(next, currentDate);
      dates.push({ date: next, relative });
    }
  } catch (err) {
    console.error("Error calculating dates:", err);
  }

  return dates;
};

const formatRelativeTime = (date: Date, from: Date): string => {
  const diff = date.getTime() - from.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `in ${days}d ${hours % 24}h`;
  if (hours > 0) return `in ${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `in ${minutes}m`;
  return `in ${seconds}s`;
};

const CRON_EXAMPLES = [
  { expression: "0 0 * * *", description: "Every day at midnight" },
  { expression: "*/15 * * * *", description: "Every 15 minutes" },
  { expression: "0 9-17 * * 1-5", description: "Every hour from 9 AM to 5 PM, Monday to Friday" },
  { expression: "0 0 1 * *", description: "First day of every month at midnight" },
  { expression: "0 12 * * 1", description: "Every Monday at noon" },
];

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message.replace("Error: ", "").replace("Invalid cron expression: ", "");
  }
  if (typeof error === "string") {
    return error;
  }
  return "Invalid cron expression";
};

export default function CronDebugger() {
  const [cronExpression, setCronExpression] = useState("* * * * *");
  const [error, setError] = useState("");
  const [humanReadable, setHumanReadable] = useState("");
  const [nextDates, setNextDates] = useState<NextDates[]>([]);

  const validateAndParse = (expression: string) => {
    try {
      // Try to parse with cron-parser first to validate
      parser.parseExpression(expression);

      // If valid, get human readable version using cronstrue
      const readable = cronstrue.toString(expression);
      setHumanReadable(readable);
      setError("");
      setNextDates(calculateNextDates(expression));
    } catch (err) {
      setError(getErrorMessage(err));
      setHumanReadable("");
      setNextDates([]);
    }
  };

  useEffect(() => {
    validateAndParse(cronExpression);
  }, [cronExpression]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4">Cron Expression Debugger</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          {/* Cron Expression Input */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="cron">Cron Expression</Label>
            <div className="flex gap-2">
              <Input
                id="cron"
                value={cronExpression}
                onChange={(e) => setCronExpression(e.target.value)}
                placeholder="Enter cron expression (e.g., * * * * *)"
                className="font-mono"
              />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(cronExpression)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>

          {/* Human Readable */}
          {humanReadable && (
            <Card className="p-4 mb-6 bg-muted">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-1 flex-shrink-0" />
                <p className="text-sm">{humanReadable}</p>
              </div>
            </Card>
          )}

          {/* Next Executions */}
          {nextDates.length > 0 && (
            <div className="space-y-4">
              <Label>Next Executions</Label>
              <div className="grid gap-2">
                {nextDates.map((date, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm">{date.date.toLocaleString()}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{date.relative}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Examples */}
          <div className="mt-8">
            <Label className="mb-3 block">Common Examples</Label>
            <div className="grid gap-2">
              {CRON_EXAMPLES.map((example) => (
                <Button
                  key={example.expression}
                  variant="outline"
                  className="justify-start h-auto py-2 px-3"
                  onClick={() => setCronExpression(example.expression)}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="font-mono">{example.expression}</span>
                    <span className="text-sm text-muted-foreground">{example.description}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">Cron Expression Format</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2 font-mono text-sm">
              <div className="text-center">*</div>
              <div className="text-center">*</div>
              <div className="text-center">*</div>
              <div className="text-center">*</div>
              <div className="text-center">*</div>
            </div>
            <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground text-center">
              <div>
                Minute
                <br />
                (0-59)
              </div>
              <div>
                Hour
                <br />
                (0-23)
              </div>
              <div>
                Day
                <br />
                (1-31)
              </div>
              <div>
                Month
                <br />
                (1-12)
              </div>
              <div>
                Day of Week
                <br />
                (0-6)
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground mt-4">
              <li>
                <strong>*</strong> - any value
              </li>
              <li>
                <strong>,</strong> - value list separator
              </li>
              <li>
                <strong>-</strong> - range of values
              </li>
              <li>
                <strong>/</strong> - step values
              </li>
              <li>
                <strong>0</strong> - Sunday (in day of week)
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
