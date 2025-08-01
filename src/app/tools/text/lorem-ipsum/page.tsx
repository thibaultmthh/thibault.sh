"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Copy, RefreshCcw } from "lucide-react";

const WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "dolor",
  "in",
  "reprehenderit",
  "in",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "dolore",
  "eu",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "in",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

type GenerationType = "words" | "sentences" | "paragraphs";

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState<number>(5);
  const [type, setType] = useState<GenerationType>("paragraphs");
  const [output, setOutput] = useState<string>("");
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);

  const generateWord = () => {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  };

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 8) + 8; // 8-15 words per sentence
    const words = Array(wordCount).fill(0).map(generateWord);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 3) + 3; // 3-5 sentences per paragraph
    return Array(sentenceCount).fill(0).map(generateSentence).join(" ");
  };

  const generate = () => {
    let result = "";

    switch (type) {
      case "words":
        result = Array(count).fill(0).map(generateWord).join(" ");
        break;
      case "sentences":
        result = Array(count).fill(0).map(generateSentence).join(" ");
        break;
      case "paragraphs":
        result = Array(count).fill(0).map(generateParagraph).join("\n\n");
        break;
    }

    if (startWithLorem && result.length > 5) {
      result = "Lorem ipsum " + result.slice(result.indexOf(" ") + 1);
    }

    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="container max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Lorem Ipsum Generator</h1>

      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="count">Count</Label>
            <Input
              id="count"
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            />
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as GenerationType)}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="words">Words</SelectItem>
                <SelectItem value="sentences">Sentences</SelectItem>
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button onClick={generate} className="flex-1">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="startWithLorem"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="rounded border-gray-300"
          />
          <Label htmlFor="startWithLorem">Start with &quot;Lorem ipsum&quot;</Label>
        </div>

        <div className="relative">
          <Textarea
            value={output}
            readOnly
            className="min-h-[300px] font-serif"
            placeholder="Generated text will appear here..."
          />
          {output && (
            <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-2">About Lorem Ipsum</h2>
        <p className="text-muted-foreground">
          Lorem Ipsum is dummy text used in laying out print, graphic or web designs. It has been the industry&apos;s
          standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>
      </Card>
    </div>
  );
}
