"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Search, Heart, Smile, Car, Utensils, Globe, Coffee, Star, Hash, Copy } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Fuse from "fuse.js";
import Link from "next/link";

interface Emoji {
  emoji: string;
  description: string;
  category: string;
  aliases: string[];
  tags: string[];
  unicode_version: string;
  ios_version: string;
}

interface EmojiPickerProps {
  initialEmojis: Emoji[];
}

const GRID_COLS = 8;
const EMOJI_HEIGHT = 48;

export function EmojiPicker({ initialEmojis }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [recentEmojis, setRecentEmojis] = useState<Emoji[]>([]);
  const [copyMode, setCopyMode] = useState<"emoji" | "shortcode">("emoji");

  // Initialize Fuse.js for better search
  const fuse = useMemo(
    () =>
      new Fuse(initialEmojis, {
        keys: [
          { name: "description", weight: 0.4 },
          { name: "aliases", weight: 0.3 },
          { name: "tags", weight: 0.2 },
          { name: "category", weight: 0.1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        useExtendedSearch: true,
      }),
    [initialEmojis]
  );

  // Load recent emojis
  useEffect(() => {
    try {
      const saved = localStorage.getItem("recentEmojis");
      if (saved) {
        setRecentEmojis(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load recent emojis:", error);
    }
  }, []);

  // Filter emojis based on search
  const filteredEmojis = useMemo(() => {
    if (!searchTerm) return initialEmojis;
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, initialEmojis, fuse]);

  // Calculate grid dimensions
  const rowCount = Math.ceil(filteredEmojis.length / GRID_COLS);

  // Setup virtualization
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => EMOJI_HEIGHT,
    overscan: 5,
  });

  const copyEmoji = (emoji: Emoji) => {
    const textToCopy = copyMode === "shortcode" ? `:${emoji.aliases[0]}:` : emoji.emoji;
    navigator.clipboard.writeText(textToCopy);
    setCopiedEmoji(emoji.emoji);
    setTimeout(() => setCopiedEmoji(null), 1500);

    const newRecent = [emoji, ...recentEmojis.filter((e) => e.emoji !== emoji.emoji)].slice(0, 20);
    setRecentEmojis(newRecent);
    localStorage.setItem("recentEmojis", JSON.stringify(newRecent));
  };

  const renderEmojiButton = (emoji: Emoji) => (
    <button
      key={emoji.emoji}
      onClick={() => copyEmoji(emoji)}
      className="group relative h-12 hover:bg-muted rounded-md flex items-center justify-center"
      title={emoji.description}
    >
      <span className="text-2xl">{emoji.emoji}</span>
      {copiedEmoji === emoji.emoji && (
        <span className="absolute -top-2 -right-2">
          <Check className="h-4 w-4 text-green-500" />
        </span>
      )}
      <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none bottom-[calc(100%+4px)] left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg whitespace-nowrap z-50">
        <div>{emoji.description}</div>
        <div className="text-muted-foreground">:{emoji.aliases[0]}:</div>
        {emoji.tags.length > 0 && <div className="text-muted-foreground text-[10px]">{emoji.tags.join(", ")}</div>}
      </div>
    </button>
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Emoji Picker</CardTitle>
          <CardDescription>Search and copy emojis easily</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Copy Mode Controls */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">Search Emojis</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, alias, or tag..."
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCopyMode("emoji")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    copyMode === "emoji" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  Copy Emoji
                </button>
                <button
                  onClick={() => setCopyMode("shortcode")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    copyMode === "shortcode"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  Copy Shortcode
                </button>
              </div>
            </div>

            {/* Emoji Grid */}
            <div ref={parentRef} className="h-[400px] overflow-auto">
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const startIndex = virtualRow.index * GRID_COLS;
                  const rowEmojis = filteredEmojis.slice(startIndex, startIndex + GRID_COLS);

                  return (
                    <div
                      key={virtualRow.index}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${EMOJI_HEIGHT}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      className="grid grid-cols-8 gap-2"
                    >
                      {rowEmojis.map(renderEmojiButton)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-sm text-muted-foreground">
          <div className="border-t pt-4 w-full">
            <h3 className="font-medium text-foreground mb-2">How to use:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Search emojis by name, category, or tags</li>
              <li>Hover over an emoji to see its description and shortcode</li>
              <li>Click an emoji to copy it to your clipboard</li>
              <li>Switch between copying the emoji itself or its shortcode format</li>
              <li>Recently used emojis will appear at the top</li>
            </ul>
          </div>

          <div className="text-xs space-y-1">
            <p>
              This emoji picker includes a comprehensive collection of emojis from the Unicode Standard. Perfect for
              social media, messaging, and content creation.
            </p>
            <p>
              Supports Unicode {Math.max(...initialEmojis.map((e) => parseFloat(e.unicode_version)))}
              and works across all modern platforms and browsers.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
