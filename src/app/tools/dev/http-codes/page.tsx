"use client";

import { Input } from "@/components/ui/input";
import { httpCodes, categories } from "@/app/data/httpCodes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Add this import
import Link from "next/link";
import { useState } from "react";

export default function HttpCodesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const filteredCodes = httpCodes.filter(
    (code) =>
      code.code.toString().includes(searchQuery) ||
      code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">HTTP Status Codes</h1>
      <p className="text-muted-foreground mb-6">
        Complete list of HTTP status codes with detailed information and examples.
      </p>

      <Input
        type="search"
        placeholder="Search by code, title, or description..."
        className="mb-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid gap-8">
        {Object.entries(categories).map(([category, info]) => {
          const categoryCodes = filteredCodes.filter((code) => code.category === category);
          const isExpanded = expandedCategories[category];
          const displayCodes = isExpanded ? categoryCodes : categoryCodes.slice(0, 7);
          const hasMore = categoryCodes.length > 7;

          return (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-${info.color}-500`} />
                {info.name}
              </h2>
              <div className="grid gap-4">
                {displayCodes.map((code) => (
                  <Link key={code.code} href={`/tools/dev/http-codes/${code.code}`}>
                    <Card className="p-4 hover:border-orange-500/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="text-lg font-mono font-bold">{code.code}</div>
                        <div>
                          <h3 className="font-medium">{code.title}</h3>
                          <p className="text-sm text-muted-foreground">{code.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
                {hasMore && (
                  <Button variant="outline" onClick={() => toggleCategory(category)} className="mt-2">
                    {isExpanded ? "See Less" : `See More (${categoryCodes.length - 7} more)`}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
