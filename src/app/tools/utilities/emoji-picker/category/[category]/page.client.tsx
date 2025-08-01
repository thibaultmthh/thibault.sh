"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Search, Heart, ArrowLeft, Copy, Hash } from "lucide-react";
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

interface EmojiCategoryClientProps {
  category: string;
  emojis: Emoji[];
  allEmojis: Emoji[];
}

const GRID_COLS = 10;
const EMOJI_HEIGHT = 64;

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "people":
    case "smileys & emotion":
      return "😀";
    case "animals & nature":
      return "🌿";
    case "food & drink":
      return "🍔";
    case "travel & places":
      return "🚗";
    case "activities":
      return "⚽";
    case "objects":
      return "📱";
    case "symbols":
      return "⭐";
    case "flags":
      return "🏳️";
    default:
      return "📦";
  }
};

export default function EmojiCategoryClient({ category, emojis, allEmojis }: EmojiCategoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [copyMode, setCopyMode] = useState<"emoji" | "shortcode">("emoji");
  const [favoriteEmojis, setFavoriteEmojis] = useState<Emoji[]>([]);
  const [recentEmojis, setRecentEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favoriteEmojis");
      if (savedFavorites) {
        setFavoriteEmojis(JSON.parse(savedFavorites));
      }

      const savedRecent = localStorage.getItem("recentEmojis");
      if (savedRecent) {
        setRecentEmojis(JSON.parse(savedRecent));
      }
    } catch (error) {
      console.error("Failed to load emoji data:", error);
    }
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(emojis, {
        keys: [
          { name: "description", weight: 0.4 },
          { name: "aliases", weight: 0.3 },
          { name: "tags", weight: 0.2 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        useExtendedSearch: true,
      }),
    [emojis]
  );

  const filteredEmojis = useMemo(() => {
    if (!searchTerm) return emojis;
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, emojis, fuse]);

  const rowCount = Math.ceil(filteredEmojis.length / GRID_COLS);
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

    const newRecent = [emoji, ...recentEmojis.filter((e) => e.emoji !== emoji.emoji)].slice(0, 24);
    setRecentEmojis(newRecent);
    localStorage.setItem("recentEmojis", JSON.stringify(newRecent));
  };

  const toggleFavorite = (emoji: Emoji) => {
    const isFavorite = favoriteEmojis.some((fav) => fav.emoji === emoji.emoji);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favoriteEmojis.filter((fav) => fav.emoji !== emoji.emoji);
    } else {
      newFavorites = [...favoriteEmojis, emoji];
    }

    setFavoriteEmojis(newFavorites);
    localStorage.setItem("favoriteEmojis", JSON.stringify(newFavorites));
  };

  const isFavorite = (emoji: Emoji) => {
    return favoriteEmojis.some((fav) => fav.emoji === emoji.emoji);
  };

  const renderEmojiButton = (emoji: Emoji) => (
    <div key={emoji.emoji} className="group relative">
      <button
        onClick={() => copyEmoji(emoji)}
        className="relative h-16 w-full hover:bg-muted rounded-lg flex items-center justify-center transition-colors border border-transparent hover:border-border"
        title={emoji.description}
      >
        <span className="text-4xl">{emoji.emoji}</span>
        {copiedEmoji === emoji.emoji && (
          <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
            <Check className="h-3 w-3 text-white" />
          </span>
        )}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(emoji);
        }}
        className={`absolute -top-1 -left-1 rounded-full p-1 transition-colors ${
          isFavorite(emoji)
            ? "bg-red-500 text-white"
            : "bg-muted hover:bg-red-100 text-muted-foreground hover:text-red-500"
        } opacity-0 group-hover:opacity-100`}
      >
        <Heart className="h-3 w-3" fill={isFavorite(emoji) ? "currentColor" : "none"} />
      </button>

      <Link
        href={`/tools/utilities/emoji-picker/${encodeURIComponent(emoji.emoji)}`}
        className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <Search className="h-3 w-3" />
      </Link>
    </div>
  );

  const relatedCategories = useMemo(() => {
    const categories = [...new Set(allEmojis.map((e) => e.category))];
    return categories.filter((cat) => cat !== category).slice(0, 6);
  }, [allEmojis, category]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tools/utilities/emoji-picker">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Emoji Picker
          </Button>
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{getCategoryIcon(category)}</span>
          <div>
            <h1 className="text-4xl font-bold">{category}</h1>
            <p className="text-muted-foreground text-lg">
              Browse {emojis.length} emojis in the {category} category
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search emojis in this category..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={copyMode === "emoji" ? "default" : "outline"}
              onClick={() => setCopyMode("emoji")}
              size="sm"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Emoji
            </Button>
            <Button
              variant={copyMode === "shortcode" ? "default" : "outline"}
              onClick={() => setCopyMode("shortcode")}
              size="sm"
            >
              <Hash className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{emojis.length}</div>
          <div className="text-sm text-muted-foreground">Total Emojis</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{filteredEmojis.length}</div>
          <div className="text-sm text-muted-foreground">{searchTerm ? "Search Results" : "Showing"}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {favoriteEmojis.filter((fav) => emojis.some((e) => e.emoji === fav.emoji)).length}
          </div>
          <div className="text-sm text-muted-foreground">Favorited</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{new Set(emojis.map((e) => e.unicode_version)).size}</div>
          <div className="text-sm text-muted-foreground">Unicode Versions</div>
        </Card>
      </div>

      {filteredEmojis.length > 0 ? (
        <div ref={parentRef} className="h-[600px] overflow-auto border rounded-lg p-4">
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
                  className="grid grid-cols-10 gap-2"
                >
                  {rowEmojis.map(renderEmojiButton)}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Card className="p-8 text-center">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No emojis found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms.</p>
        </Card>
      )}

      {relatedCategories.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {relatedCategories.map((cat) => (
              <Link key={cat} href={`/tools/utilities/emoji-picker/category/${encodeURIComponent(cat)}`}>
                <Card className="p-4 text-center hover:border-primary/50 transition-colors group">
                  <div className="text-3xl mb-2">{getCategoryIcon(cat)}</div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">{cat}</div>
                  <div className="text-xs text-muted-foreground">
                    {allEmojis.filter((e) => e.category === cat).length} emojis
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
