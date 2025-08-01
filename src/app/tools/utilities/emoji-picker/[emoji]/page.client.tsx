"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Copy,
  Check,
  Heart,
  Share,
  Download,
  Hash,
  Globe,
  Calendar,
  Smartphone,
  ExternalLink,
} from "lucide-react";
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

interface EmojiDetailClientProps {
  emojiData: Emoji;
  relatedEmojis: Emoji[];
}

export default function EmojiDetailClient({ emojiData, relatedEmojis }: EmojiDetailClientProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if emoji is in favorites
    try {
      const savedFavorites = localStorage.getItem("favoriteEmojis");
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        setIsFavorite(favorites.some((fav: Emoji) => fav.emoji === emojiData.emoji));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  }, [emojiData.emoji]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);

      // Add to recent emojis
      try {
        const savedRecent = localStorage.getItem("recentEmojis");
        const recentEmojis = savedRecent ? JSON.parse(savedRecent) : [];
        const newRecent = [emojiData, ...recentEmojis.filter((e: Emoji) => e.emoji !== emojiData.emoji)].slice(0, 24);
        localStorage.setItem("recentEmojis", JSON.stringify(newRecent));
      } catch (error) {
        console.error("Failed to save recent emoji:", error);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleFavorite = () => {
    try {
      const savedFavorites = localStorage.getItem("favoriteEmojis");
      const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

      let newFavorites;
      if (isFavorite) {
        newFavorites = favorites.filter((fav: Emoji) => fav.emoji !== emojiData.emoji);
      } else {
        newFavorites = [...favorites, emojiData];
      }

      localStorage.setItem("favoriteEmojis", JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const shareEmoji = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${emojiData.emoji} ${emojiData.description}`,
          text: `Check out this emoji: ${emojiData.emoji} ${emojiData.description}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Failed to share:", err);
      }
    } else {
      copyToClipboard(window.location.href, "url");
    }
  };

  const downloadEmoji = () => {
    // Create a canvas to render the emoji as an image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 128;
    canvas.height = 128;

    ctx.font = "100px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emojiData.emoji, 64, 64);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${emojiData.description.replace(/\s+/g, "-").toLowerCase()}-emoji.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
  };

  // Convert emoji to Unicode code points
  const getUnicodeCodePoints = (emoji: string) => {
    return Array.from(emoji)
      .map((char) => `U+${char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")}`)
      .join(" ");
  };

  const getHtmlEntity = (emoji: string) => {
    return Array.from(emoji)
      .map((char) => `&#${char.codePointAt(0)};`)
      .join("");
  };

  const getCssCode = (emoji: string) => {
    return Array.from(emoji)
      .map((char) => `\\${char.codePointAt(0)?.toString(16).toUpperCase()}`)
      .join("");
  };

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/tools/utilities/emoji-picker">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Emoji Picker
          </Button>
        </Link>
        <Link href={`/tools/utilities/emoji-picker/category/${encodeURIComponent(emojiData.category)}`}>
          <Button variant="outline" size="sm">
            Browse {emojiData.category}
          </Button>
        </Link>
      </div>

      {/* Main Emoji Display */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Emoji Card */}
        <div className="lg:col-span-1">
          <Card className="p-8 text-center space-y-6">
            <div className="text-9xl leading-none">{emojiData.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold mb-2">{emojiData.description}</h1>
              <Badge variant="secondary">{emojiData.category}</Badge>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => copyToClipboard(emojiData.emoji, "emoji")} variant="default" className="w-full">
                {copied === "emoji" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied === "emoji" ? "Copied!" : "Copy Emoji"}
              </Button>
              <Button
                onClick={() => copyToClipboard(`:${emojiData.aliases[0]}:`, "shortcode")}
                variant="outline"
                className="w-full"
              >
                {copied === "shortcode" ? <Check className="h-4 w-4 mr-2" /> : <Hash className="h-4 w-4 mr-2" />}
                {copied === "shortcode" ? "Copied!" : "Copy Code"}
              </Button>
              <Button onClick={toggleFavorite} variant={isFavorite ? "default" : "outline"} className="w-full">
                <Heart className="h-4 w-4 mr-2" fill={isFavorite ? "currentColor" : "none"} />
                {isFavorite ? "Favorited" : "Favorite"}
              </Button>
              <Button onClick={shareEmoji} variant="outline" className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <Button onClick={downloadEmoji} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download PNG
            </Button>
          </Card>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Primary Name</div>
                <div className="font-medium">{emojiData.description}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Category</div>
                <div className="font-medium">{emojiData.category}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Unicode Version</div>
                <div className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {emojiData.unicode_version}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">iOS Version</div>
                <div className="font-medium flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  {emojiData.ios_version}
                </div>
              </div>
            </div>
          </Card>

          {/* Aliases and Tags */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Aliases & Tags</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Shortcodes</div>
                <div className="flex flex-wrap gap-2">
                  {emojiData.aliases.map((alias) => (
                    <Button
                      key={alias}
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(`:${alias}:`, `alias-${alias}`)}
                    >
                      {copied === `alias-${alias}` ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <Hash className="h-3 w-3 mr-1" />
                      )}
                      :{alias}:
                    </Button>
                  ))}
                </div>
              </div>
              {emojiData.tags.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {emojiData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Technical Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Technical Details</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Unicode Code Points</div>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                    {getUnicodeCodePoints(emojiData.emoji)}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(getUnicodeCodePoints(emojiData.emoji), "unicode")}
                  >
                    {copied === "unicode" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">HTML Entity</div>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm flex-1">{getHtmlEntity(emojiData.emoji)}</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(getHtmlEntity(emojiData.emoji), "html")}
                  >
                    {copied === "html" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">CSS Code</div>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                    content: &quot;{getCssCode(emojiData.emoji)}&quot;;
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(`content: "${getCssCode(emojiData.emoji)}";`, "css")}
                  >
                    {copied === "css" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* External Resources */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">External Resources</h2>
            <div className="space-y-3">
              <a
                href={`https://emojipedia.org/${encodeURIComponent(emojiData.description.toLowerCase().replace(/\s+/g, "-"))}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                View on Emojipedia
              </a>
              <a
                href={`https://unicode.org/emoji/charts/emoji-list.html#${getUnicodeCodePoints(emojiData.emoji).replace(/U\+/g, "").toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Globe className="h-4 w-4" />
                Unicode.org Reference
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Related Emojis */}
      {relatedEmojis.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Related Emojis from {emojiData.category}</h2>
          <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-3">
            {relatedEmojis.slice(0, 16).map((emoji) => (
              <Link
                key={emoji.emoji}
                href={`/tools/utilities/emoji-picker/${encodeURIComponent(emoji.emoji)}`}
                className="group"
              >
                <div className="aspect-square flex items-center justify-center text-3xl hover:bg-muted rounded-lg transition-colors border border-transparent hover:border-border">
                  {emoji.emoji}
                </div>
                <div className="text-xs text-center mt-1 text-muted-foreground group-hover:text-foreground transition-colors truncate">
                  {emoji.description}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href={`/tools/utilities/emoji-picker/category/${encodeURIComponent(emojiData.category)}`}>
              <Button variant="outline">View All {emojiData.category} Emojis</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
