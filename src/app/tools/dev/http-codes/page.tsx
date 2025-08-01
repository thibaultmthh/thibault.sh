/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { httpCodes, categories } from "@/app/data/httpCodes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";
import { Search, Globe, AlertTriangle, CheckCircle, ArrowRight, Info, Copy, Star } from "lucide-react";

export default function HttpCodesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const filteredCodes = httpCodes.filter((code) => {
    const matchesSearch =
      code.code.toString().includes(searchQuery) ||
      code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || code.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "informational":
        return <Info className="h-4 w-4" />;
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "redirection":
        return <ArrowRight className="h-4 w-4" />;
      case "clientError":
        return <AlertTriangle className="h-4 w-4" />;
      case "serverError":
        return <Globe className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Popular/Common HTTP codes
  const popularCodes = [200, 404, 500, 401, 403, 301, 302, 400, 503, 429];
  const popularCodesData = httpCodes.filter((code) => popularCodes.includes(code.code));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-4">HTTP Status Codes</h1>
        <p className="text-muted-foreground mb-6">
          Complete reference for HTTP status codes with detailed explanations, examples, and best practices.
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by code, title, or description..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Popular Codes Section */}
      {searchQuery === "" && selectedCategory === "all" && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Most Common Status Codes</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {popularCodesData.map((code) => {
              const categoryInfo = categories[code.category];
              return (
                <Link key={code.code} href={`/tools/dev/http-codes/${code.code}`}>
                  <Card className="p-3 hover:border-primary/50 transition-colors group">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full bg-${categoryInfo.color}-500`} />
                      <span className="text-lg font-mono font-bold text-primary">{code.code}</span>
                    </div>
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{code.title}</h3>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Card>
      )}

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="all">All Codes</TabsTrigger>
          {Object.entries(categories).map(([category, info]) => (
            <TabsTrigger key={category} value={category} className="flex items-center gap-2">
              {getCategoryIcon(category)}
              <span className="hidden sm:inline">{info.name}</span>
              <span className="sm:hidden">{info.name.slice(0, 3)}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-8">
            {Object.entries(categories).map(([category, info]) => {
              const categoryCodes = filteredCodes.filter((code) => code.category === category);
              if (categoryCodes.length === 0) return null;

              const isExpanded = expandedCategories[category];
              const displayCodes = isExpanded ? categoryCodes : categoryCodes.slice(0, 6);
              const hasMore = categoryCodes.length > 6;

              return (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full bg-${info.color}-500`} />
                    <h2 className="text-xl font-semibold">{info.name}</h2>
                    <Badge variant="secondary">{categoryCodes.length} codes</Badge>
                  </div>
                  <div className="grid gap-3">
                    {displayCodes.map((code) => (
                      <CodeCard key={code.code} code={code} categoryInfo={info} copyToClipboard={copyToClipboard} />
                    ))}
                    {hasMore && (
                      <Button variant="outline" onClick={() => toggleCategory(category)} className="mt-2">
                        {isExpanded ? "Show Less" : `Show ${categoryCodes.length - 6} More`}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {Object.entries(categories).map(([category, info]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-4 h-4 rounded-full bg-${info.color}-500`} />
                <div>
                  <h2 className="text-2xl font-semibold">{info.name}</h2>
                  <p className="text-muted-foreground">{info.description}</p>
                </div>
              </div>
              <div className="grid gap-3">
                {filteredCodes
                  .filter((code) => code.category === category)
                  .map((code) => (
                    <CodeCard key={code.code} code={code} categoryInfo={info} copyToClipboard={copyToClipboard} />
                  ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* No Results */}
      {filteredCodes.length === 0 && (
        <Card className="p-8 text-center">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No status codes found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or browse by category above.</p>
        </Card>
      )}
    </div>
  );
}

// Code Card Component
function CodeCard({
  code,
  categoryInfo,
  copyToClipboard,
}: {
  code: any;
  categoryInfo: any;
  copyToClipboard: (text: string) => void;
}) {
  return (
    <Card className="group hover:border-primary/50 transition-all duration-200">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full bg-${categoryInfo.color}-500`} />
              <div className="text-2xl font-mono font-bold text-primary group-hover:text-primary/80 transition-colors">
                {code.code}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{code.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{code.description}</p>
              {code.spec && (
                <Badge variant="outline" className="mt-2 text-xs">
                  {code.spec}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                copyToClipboard(code.code.toString());
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Link href={`/tools/dev/http-codes/${code.code}`}>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
