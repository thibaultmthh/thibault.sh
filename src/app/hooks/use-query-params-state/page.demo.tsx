"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQueryParamsState } from "@thibault.sh/hooks/useQueryParamsState";

interface FilterState {
  search: string;
  category: string;
  sortBy: "date" | "name" | "price";
}

export function QueryParamsDemo() {
  const [filters, setFilters] = useQueryParamsState<FilterState>("filters", {
    search: "",
    category: "all",
    sortBy: "date",
  });

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          These filters are stored in URL query parameters and can be shared or bookmarked:
        </p>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              placeholder="Search..."
              className="border p-2 rounded"
            />
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className="border p-2 rounded"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="clothing">Clothing</option>
            </select>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as FilterState["sortBy"] }))}
              className="border p-2 rounded"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
          <Button variant="outline" onClick={() => setFilters({ search: "", category: "all", sortBy: "date" })}>
            Reset Filters
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQueryParamsState } from "@thibault.sh/hooks/useQueryParamsState";

interface FilterState {
  search: string;
  category: string;
  sortBy: 'date' | 'name' | 'price';
}

export function QueryParamsDemo() {
  const [filters, setFilters] = useQueryParamsState<FilterState>("filters", {
    search: "",
    category: "all",
    sortBy: "date"
  });

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          These filters are stored in URL query parameters and can be shared or bookmarked:
        </p>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search..."
              className="border p-2 rounded"
            />
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="border p-2 rounded"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="clothing">Clothing</option>
            </select>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
              className="border p-2 rounded"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
          <Button
            variant="outline"
            onClick={() => setFilters({ search: "", category: "all", sortBy: "date" })}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </Card>
  );
}`;
