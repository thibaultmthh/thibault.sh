"use client";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  paragraphs: number;
  sentences: number;
}

export default function TextAnalysis() {
  const [text, setText] = useState("");

  const calculateStats = (text: string): TextStats => {
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
      lines: text.trim() === "" ? 0 : text.split(/\r\n|\r|\n/).length,
      paragraphs: text.trim() === "" ? 0 : text.split(/\r\n\r\n|\r\r|\n\n/).filter(Boolean).length,
      sentences: text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length,
    };
  };

  const stats = calculateStats(text);

  return (
    <div className="container max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Text Analysis</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {Object.entries(stats).map(([key, value]) => (
          <Card key={key} className="p-4">
            <div className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
            <div className="text-2xl font-bold">{value}</div>
          </Card>
        ))}
      </div>

      <Textarea
        placeholder="Enter or paste your text here..."
        className="min-h-[300px]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
