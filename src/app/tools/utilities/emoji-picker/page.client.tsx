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
import { useLocalStorageState } from "@thibault.sh/hooks/useLocalStorageState";

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
const EMOJI_HEIGHT = 56;

// Category icons mapping
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "people":
    case "smileys & emotion":
      return <Smile className="h-4 w-4" />;
    case "animals & nature":
      return <Heart className="h-4 w-4" />;
    case "food & drink":
      return <Utensils className="h-4 w-4" />;
    case "travel & places":
      return <Car className="h-4 w-4" />;
    case "activities":
      return <Coffee className="h-4 w-4" />;
    case "objects":
      return <Globe className="h-4 w-4" />;
    case "symbols":
      return <Star className="h-4 w-4" />;
    case "flags":
      return <Globe className="h-4 w-4" />;
    default:
      return <Hash className="h-4 w-4" />;
  }
};

export function EmojiPicker({ initialEmojis }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [recentEmojis, setRecentEmojis] = useLocalStorageState<Emoji[]>("recentEmojis", []);
  const [copyMode, setCopyMode] = useState<"emoji" | "shortcode">("emoji");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [favoriteEmojis, setFavoriteEmojis] = useLocalStorageState<Emoji[]>("favoriteEmojis", []);

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

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(initialEmojis.map((emoji) => emoji.category))];
    return uniqueCategories.sort();
  }, [initialEmojis]);

  // Filter emojis based on search and category
  const filteredEmojis = useMemo(() => {
    let emojis = initialEmojis;

    // Apply category filter
    if (selectedCategory === "recent") {
      emojis = recentEmojis;
    } else if (selectedCategory === "favorites") {
      emojis = favoriteEmojis;
    } else if (selectedCategory !== "all") {
      emojis = initialEmojis.filter((emoji) => emoji.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm).map((result) => result.item);
      emojis = emojis.filter((emoji) => searchResults.some((searchEmoji) => searchEmoji.emoji === emoji.emoji));
    }

    return emojis;
  }, [searchTerm, selectedCategory, initialEmojis, recentEmojis, favoriteEmojis, fuse]);

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
        className="relative h-14 w-full hover:bg-muted rounded-lg flex items-center justify-center transition-colors border border-transparent hover:border-border"
        title={emoji.description}
      >
        <span className="text-3xl">{emoji.emoji}</span>
        {copiedEmoji === emoji.emoji && (
          <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
            <Check className="h-3 w-3 text-white" />
          </span>
        )}
      </button>

      {/* Favorite button */}
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

      {/* Link to individual emoji page */}
      <Link
        href={`/tools/utilities/emoji-picker/${encodeURIComponent(emoji.emoji)}`}
        className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <Search className="h-3 w-3" />
      </Link>

      {/* Tooltip */}
      <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none bottom-[calc(100%+8px)] left-1/2 transform -translate-x-1/2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg whitespace-nowrap z-50 border">
        <div className="font-medium">{emoji.description}</div>
        <div className="text-muted-foreground">:{emoji.aliases[0]}:</div>
        {emoji.tags.length > 0 && (
          <div className="text-muted-foreground text-[10px] max-w-48 truncate">{emoji.tags.join(", ")}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Emoji Picker</h1>
        <p className="text-muted-foreground mb-6">
          Browse, search, and copy emojis with detailed information. Save favorites and view recently used emojis.
        </p>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, alias, or tag..."
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

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1">
          <TabsTrigger value="all" className="flex items-center gap-2 p-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">All</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2 p-2">
            <Coffee className="h-4 w-4" />
            <span className="hidden sm:inline">Recent</span>
            {recentEmojis.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {recentEmojis.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2 p-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Favorites</span>
            {favoriteEmojis.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {favoriteEmojis.length}
              </Badge>
            )}
          </TabsTrigger>
          {categories.slice(0, 5).map((category) => (
            <TabsTrigger key={category} value={category} className="flex items-center gap-2 p-2">
              {getCategoryIcon(category)}
              <span className="hidden lg:inline">{category}</span>
              <span className="lg:hidden">{category.slice(0, 3)}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Category Content */}
        <div className="mt-6">
          <TabsContent value="all" className="mt-0">
            <EmojiGrid
              emojis={filteredEmojis}
              rowVirtualizer={rowVirtualizer}
              parentRef={parentRef}
              renderEmojiButton={renderEmojiButton}
            />
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            {recentEmojis.length > 0 ? (
              <EmojiGrid
                emojis={filteredEmojis}
                rowVirtualizer={rowVirtualizer}
                parentRef={parentRef}
                renderEmojiButton={renderEmojiButton}
              />
            ) : (
              <Card className="p-8 text-center">
                <Coffee className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No recent emojis</h3>
                <p className="text-muted-foreground">Start copying emojis to see them here!</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            {favoriteEmojis.length > 0 ? (
              <EmojiGrid
                emojis={filteredEmojis}
                rowVirtualizer={rowVirtualizer}
                parentRef={parentRef}
                renderEmojiButton={renderEmojiButton}
              />
            ) : (
              <Card className="p-8 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No favorite emojis</h3>
                <p className="text-muted-foreground">Click the heart icon on any emoji to add it to favorites!</p>
              </Card>
            )}
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(category)}
                  <h2 className="text-xl font-semibold">{category}</h2>
                  <Badge variant="outline">{initialEmojis.filter((e) => e.category === category).length} emojis</Badge>
                  <Link href={`/tools/utilities/emoji-picker/category/${encodeURIComponent(category)}`}>
                    <Button variant="outline" size="sm">
                      View Category Page
                    </Button>
                  </Link>
                </div>
                <EmojiGrid
                  emojis={filteredEmojis}
                  rowVirtualizer={rowVirtualizer}
                  parentRef={parentRef}
                  renderEmojiButton={renderEmojiButton}
                />
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {/* No Results */}
      {filteredEmojis.length === 0 && searchTerm && (
        <Card className="p-8 text-center">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No emojis found</h3>
          <p className="text-muted-foreground">Try adjusting your search or browse by category above.</p>
        </Card>
      )}

      {/* Stats and Info */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{initialEmojis.length}</div>
            <div className="text-sm text-muted-foreground">Total Emojis</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              Unicode {Math.max(...initialEmojis.map((e) => parseFloat(e.unicode_version)))}
            </div>
            <div className="text-sm text-muted-foreground">Latest Version</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Emoji Grid Component
function EmojiGrid({
  emojis,
  rowVirtualizer,
  parentRef,
  renderEmojiButton,
}: {
  emojis: Emoji[];
  rowVirtualizer: any;
  parentRef: React.RefObject<HTMLDivElement | null>;
  renderEmojiButton: (emoji: Emoji) => React.ReactNode;
}) {
  if (emojis.length === 0) return null;

  return (
    <div ref={parentRef} className="h-[500px] overflow-auto border rounded-lg p-4">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
          const startIndex = virtualRow.index * GRID_COLS;
          const rowEmojis = emojis.slice(startIndex, startIndex + GRID_COLS);

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
  );
}
