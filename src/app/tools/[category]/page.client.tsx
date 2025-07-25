"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/config/tools";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, ArrowLeft, ExternalLink } from "lucide-react";

interface CategoryPageClientProps {
  categoryName: string;
  categoryPath: string;
}

export function CategoryPageClient({ categoryName, categoryPath }: CategoryPageClientProps) {
  // Get category data from tools config
  const categoryData = Object.values(tools).find((category) => category.path === categoryPath);

  if (!categoryData) {
    throw new Error(`Category not found: ${categoryPath}`);
  }
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tools based on search
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return categoryData.items;

    return categoryData.items.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, categoryData.items]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        {/* Back button */}
        <Link
          href="/tools"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all tools
        </Link>

        {/* Category header */}
        <div className="flex items-center gap-3 mb-6">
          <categoryData.icon className="h-8 w-8" />
          <div>
            <h1 className="text-4xl font-bold">{categoryName}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} for developers
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${categoryName.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <Card className="p-12 text-center">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No tools found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or browse all {categoryName.toLowerCase()}.
          </p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        </Card>
      ) : (
        <>
          {/* Results header */}
          {searchQuery && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Search Results ({filteredTools.length})</h2>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
                Show all tools
              </Button>
            </div>
          )}

          {/* Tools grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="p-6 hover:shadow-md transition-shadow group">
                <Link href={tool.path} className="block">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium pr-2">{tool.name}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {categoryName}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Free</span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Category info */}
      <Card className="p-6 mt-12">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <categoryData.icon className="h-5 w-5" />
          About {categoryName}
        </h3>
        <p className="text-muted-foreground mb-4">
          These {categoryName.toLowerCase()} are designed to help developers work more efficiently. All tools run
          entirely in your browser for maximum privacy and speed.
        </p>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span>🔒 Privacy-first</span>
          <span>•</span>
          <span>⚡ Lightning fast</span>
          <span>•</span>
          <span>🌐 Works offline</span>
          <span>•</span>
          <span>📱 Mobile-friendly</span>
        </div>
      </Card>
    </div>
  );
}
