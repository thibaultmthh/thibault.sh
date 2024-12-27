"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@thibault.sh/hooks/useDebounce";
import { useState, useEffect } from "react";

function SearchExample() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulate API search
  useEffect(() => {
    const searchItems = async () => {
      setIsSearching(true);
      await new Promise((resolve) => setTimeout(resolve, 200));

      const items = [
        "Apple",
        "Banana",
        "Cherry",
        "Date",
        "Elderberry",
        "Fig",
        "Grape",
        "Honeydew",
        "Ice cream",
        "Jackfruit",
      ];

      const filtered = items.filter((item) => item.toLowerCase().includes(debouncedSearch.toLowerCase()));

      setResults(filtered);
      setIsSearching(false);
    };

    if (debouncedSearch) {
      searchItems();
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search fruits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="text-sm text-muted-foreground whitespace-nowrap">Debounced: {debouncedSearch}</div>
        </div>
        <div className="text-sm text-muted-foreground">
          Type to search. API call will be made 500ms after you stop typing.
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        {isSearching ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
          </div>
        ) : results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                {item}
              </li>
            ))}
          </ul>
        ) : debouncedSearch ? (
          <div className="text-sm text-muted-foreground py-8 text-center">
            No results found for &quot;{debouncedSearch}&quot;
          </div>
        ) : (
          <div className="text-sm text-muted-foreground py-8 text-center">Start typing to search</div>
        )}
      </div>
    </div>
  );
}

function SliderExample() {
  const [value, setValue] = useState(50);
  const debouncedValue = useDebounce(value, 200);
  const [color, setColor] = useState("hsl(20, 100%, 50%)");

  // Update color based on debounced value
  useEffect(() => {
    setColor(`hsl(${debouncedValue}, 100%, 50%)`);
  }, [debouncedValue]);

  return (
    <div className="space-y-4">
      <div className="space-y-6">
        <div className="flex gap-8 items-center">
          <div className="flex-1">
            <Slider value={[value]} onValueChange={([v]) => setValue(v)} min={0} max={360} step={1} />
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap w-32">
            Value: {value}°
            <br />
            Debounced: {debouncedValue}°
          </div>
        </div>

        <div className="h-24 rounded-lg transition-colors duration-200" style={{ backgroundColor: color }} />
      </div>

      <div className="text-sm text-muted-foreground">
        Move the slider to change the hue. Color updates 200ms after you stop moving.
      </div>
    </div>
  );
}

export function DebounceDemo() {
  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">1. Search Input</h3>
          <SearchExample />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">2. Real-time Updates</h3>
          <SliderExample />
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useDebounce } from "@thibault.sh/hooks/useDebounce";
import { useState, useEffect } from "react";

// Example 1: Search Input
function SearchExample() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Only search when debounced value changes
    if (debouncedSearch) {
      // Simulated API call
      const items = ["Apple", "Banana", "Cherry"];
      const filtered = items.filter(item =>
        item.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setResults(filtered);
    }
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <div>Results: {results.join(", ")}</div>
    </div>
  );
}

// Example 2: Real-time Updates
function SliderExample() {
  const [value, setValue] = useState(50);
  const debouncedValue = useDebounce(value, 200);

  useEffect(() => {
    // Update UI with debounced value
    console.log("Updating with debounced value:", debouncedValue);
  }, [debouncedValue]);

  return (
    <div>
      <input
        type="range"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div>
        Current: {value},
        Debounced: {debouncedValue}
      </div>
    </div>
  );
}`;
