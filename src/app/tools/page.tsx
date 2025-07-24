"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/config/tools";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, Star, ArrowRight, ExternalLink } from "lucide-react";

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate statistics
  const totalTools = useMemo(() => {
    return Object.values(tools).reduce((total, category) => total + category.items.length, 0);
  }, []);

  // Featured tools (you can customize this list)
  const featuredTools = useMemo(() => {
    const featured = [
      { id: "json-formatter", category: "Developer Tools" },
      { id: "yaml-json-converter", category: "Developer Tools" },
      { id: "base64", category: "Developer Tools" },
      { id: "text-analysis", category: "Text Tools" },
      { id: "color-palette", category: "Design Tools" },
      { id: "password-generator", category: "Utilities" },
    ];

    return featured
      .map(({ id, category }) => {
        const categoryData = Object.entries(tools).find(([name]) => name === category)?.[1];
        const tool = categoryData?.items.find((item) => item.id === id);
        if (!tool || !categoryData) return null;
        return { ...tool, category, icon: categoryData.icon };
      })
      .filter((tool): tool is NonNullable<typeof tool> => tool !== null);
  }, []);

  // Filter tools based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return tools;

    const filtered: Record<string, (typeof tools)[keyof typeof tools]> = {};

    Object.entries(tools).forEach(([categoryName, categoryData]) => {
      const matchingTools = categoryData.items.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchingTools.length > 0) {
        filtered[categoryName as keyof typeof tools] = {
          ...categoryData,
          items: matchingTools,
        };
      }
    });

    return filtered;
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          {totalTools} free tools for developers. All processing happens in your browser - your data never leaves your
          device.
        </p>

        {/* Search */}
        <div className="max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Featured Tools */}
      {!searchQuery && featuredTools.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5" />
            <h2 className="text-2xl font-semibold">Popular Tools</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="p-6 hover:shadow-md transition-shadow">
                <Link href={tool.path} className="block">
                  <div className="flex items-start gap-3">
                    <tool.icon className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-2">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">{searchQuery ? `Search Results` : "All Categories"}</h2>

        {Object.keys(filteredCategories).length === 0 ? (
          <Card className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or browse all categories.</p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(filteredCategories).map(([category, { icon: Icon, items, path }]) => (
              <Card key={category} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6" />
                    <div>
                      <Link href={`/tools/${path}`} className="hover:underline">
                        <h3 className="text-xl font-semibold">{category}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {items.length} tool{items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <Link href={`/tools/${path}`}>
                    <Button variant="outline" size="sm">
                      View all
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {items.slice(0, searchQuery ? items.length : 6).map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.path}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{tool.name}</h4>
                        <p className="text-sm text-muted-foreground truncate">{tool.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                    </Link>
                  ))}
                  {!searchQuery && items.length > 6 && (
                    <Link
                      href={`/tools/${path}`}
                      className="flex items-center justify-center p-3 rounded-lg border border-dashed hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm text-muted-foreground">+{items.length - 6} more tools</span>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
