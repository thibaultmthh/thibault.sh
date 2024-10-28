"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import * as diffLib from "diff";

interface DiffStats {
  additions: number;
  deletions: number;
  changes: number;
}

export default function DiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState<diffLib.Change[]>([]);
  const [stats, setStats] = useState<DiffStats>({ additions: 0, deletions: 0, changes: 0 });

  const computeDiff = () => {
    const diff = diffLib.diffWords(text1, text2);
    setDiffResult(diff);

    // Calculate statistics
    const newStats = diff.reduce(
      (acc, part) => {
        if (part.added) acc.additions++;
        if (part.removed) acc.deletions++;
        if (!part.added && !part.removed && part.value.trim()) acc.changes++;
        return acc;
      },
      { additions: 0, deletions: 0, changes: 0 }
    );
    setStats(newStats);
  };

  return (
    <div className="container max-w-6xl">
      <h1 className="text-3xl font-bold mb-4">Diff Checker</h1>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="p-4">
          <h2 className="text-sm font-medium mb-2">Original Text</h2>
          <Textarea
            placeholder="Enter original text..."
            className="min-h-[300px]"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-sm font-medium mb-2">Modified Text</h2>
          <Textarea
            placeholder="Enter modified text..."
            className="min-h-[300px]"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          />
        </Card>
      </div>

      <div className="flex justify-center mb-4">
        <Button onClick={computeDiff} size="lg">
          Compare Texts
        </Button>
      </div>

      {/* Stats Section */}
      {diffResult.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Additions</div>
            <div className="text-2xl font-bold text-green-500">{stats.additions}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Deletions</div>
            <div className="text-2xl font-bold text-red-500">{stats.deletions}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Unchanged Parts</div>
            <div className="text-2xl font-bold">{stats.changes}</div>
          </Card>
        </div>
      )}

      {/* Diff Result Section */}
      {diffResult.length > 0 && (
        <Card className="p-4">
          <h2 className="text-sm font-medium mb-2">Differences</h2>
          <div className="whitespace-pre-wrap font-mono text-sm">
            {diffResult.map((part, index) => (
              <span
                key={index}
                className={`${
                  part.added
                    ? "bg-green-500/20 text-green-700 dark:text-green-400"
                    : part.removed
                    ? "bg-red-500/20 text-red-700 dark:text-red-400"
                    : ""
                }`}
              >
                {part.value}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
