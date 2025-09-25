"use client";

import { JSX, useEffect, useState } from "react";
import { highlight } from "@/lib/shiki";
import { Button } from "./button";
import { CopyIcon } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  initial?: JSX.Element;
}

export function CodeBlock({ code, language = "typescript", initial }: CodeBlockProps) {
  const [nodes, setNodes] = useState(initial);

  useEffect(() => {
    void highlight(code, language).then(setNodes);
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  return (
    <div className="bg-gray-700 border border-border rounded-lg overflow-auto relative h-fit">
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 p-2 hover:bg-transparent"
      >
        <CopyIcon className="text-white" />
      </Button>
      {nodes ?? (
        <pre className="rounded-lg p-3 my-0 bg-[#24292e]!">
          <code className="text-[#e1e4e8]!">{code}</code>
        </pre>
      )}
    </div>
  );
}
