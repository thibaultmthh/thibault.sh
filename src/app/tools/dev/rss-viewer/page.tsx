"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, ExternalLink, Globe, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import triggerGAEvent from "@/lib/triggerGAEvent";

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
  categories?: string[];
}

interface FeedMetadata {
  title: string;
  description: string;
  link: string;
  language?: string;
  lastBuildDate?: string;
  generator?: string;
}

interface FeedData {
  metadata: FeedMetadata;
  items: FeedItem[];
}

export default function RSSViewer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feed, setFeed] = useState<FeedData | null>(null);

  const fetchFeed = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    triggerGAEvent("rss_viewer", { url });

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/rss?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch RSS feed");
      }

      setFeed(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch RSS feed");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">RSS Feed Viewer</h1>
        <p className="text-muted-foreground">
          A modern RSS feed reader that helps you parse and view RSS feeds in a clean, organized format. Perfect for
          developers, content creators, and RSS enthusiasts.
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Feed URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                placeholder="https://example.com/feed.xml"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button onClick={fetchFeed} disabled={loading}>
                {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />}
                Fetch
              </Button>
            </div>
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>

          {feed && (
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="items">Feed Items</TabsTrigger>
                <TabsTrigger value="metadata">Feed Metadata</TabsTrigger>
              </TabsList>

              <TabsContent value="items" className="space-y-4">
                <div className="grid gap-4">
                  {feed.items.map((item, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold">{item.title}</h3>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">{formatDate(item.pubDate)}</p>
                        {item.author && <p className="text-sm text-muted-foreground">By {item.author}</p>}
                        <div
                          className="text-sm prose prose-sm dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        {item.categories && item.categories.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {item.categories.map((category, idx) => (
                              <span key={idx} className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="metadata">
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">Feed Title</h3>
                      <p className="text-sm">{feed.metadata.title}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Description</h3>
                      <p className="text-sm">{feed.metadata.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Website</h3>
                      <a
                        href={feed.metadata.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {feed.metadata.link}
                      </a>
                    </div>
                    {feed.metadata.language && (
                      <div>
                        <h3 className="font-semibold mb-1">Language</h3>
                        <p className="text-sm">{feed.metadata.language}</p>
                      </div>
                    )}
                    {feed.metadata.lastBuildDate && (
                      <div>
                        <h3 className="font-semibold mb-1">Last Updated</h3>
                        <p className="text-sm">{formatDate(feed.metadata.lastBuildDate)}</p>
                      </div>
                    )}
                    {feed.metadata.generator && (
                      <div>
                        <h3 className="font-semibold mb-1">Generator</h3>
                        <p className="text-sm">{feed.metadata.generator}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-semibold mb-3">About RSS Feeds</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>RSS (Really Simple Syndication) is a web feed format for publishing frequently updated content</li>
            <li>Common uses include blog posts, news articles, and podcast episodes</li>
            <li>RSS feeds are XML documents that follow a standardized format</li>
            <li>Feed readers can automatically check for updates and notify users of new content</li>
            <li>Most RSS feeds use either RSS 2.0 or Atom format</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-3">Popular RSS Feed Types</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>News websites and blogs</li>
            <li>Podcast directories</li>
            <li>YouTube channels</li>
            <li>Social media feeds</li>
            <li>Academic journals and publications</li>
          </ul>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              RSS feeds provide a distraction-free way to follow your favorite content sources without algorithms or
              advertisements. They&apos;re essential tools for content curation and monitoring.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
