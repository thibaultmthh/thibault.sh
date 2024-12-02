"use client";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import jsonpath from "jsonpath";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const INITIAL_JSON = `{
  "store": {
    "book": [ 
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}`;

export default function JSONQueryToolComponent() {
  const [jsonInput, setJsonInput] = useState(INITIAL_JSON);
  const [query, setQuery] = useState("$.store.book[*].title");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const executeQuery = () => {
      if (!jsonInput.trim() || !query.trim()) {
        setResult(null);
        setError(null);
        return;
      }

      try {
        const jsonData = JSON.parse(jsonInput);
        const queryResult = jsonpath.query(jsonData, query);
        setResult(JSON.stringify(queryResult, null, 2));
        setError(null);
      } catch (err) {
        setError(err instanceof SyntaxError ? "Invalid JSON format" : "Invalid JsonPath query");
        setResult(null);
      }
    };

    // Add a small delay to prevent excessive updates while typing
    const timeoutId = setTimeout(executeQuery, 300);
    return () => clearTimeout(timeoutId);
  }, [jsonInput, query]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">JSON Query Tool</h1>

      {/* Example Queries Section */}
      <Card className="p-4 mb-4">
        <h2 className="text-sm font-medium mb-2">Example Queries</h2>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <code>$.store.book[*].title</code> - titles of all books
          </p>
          <p>
            <code>$.store.book[?(@.price`&gt;10)]</code> - books with price greater than 10
          </p>
          <p>
            <code>$.store.book[?(@.isbn)]</code> - books with an ISBN
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-sm font-medium mb-2">JSON Input</h2>
          <Textarea
            className="font-mono min-h-[300px]"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </Card>
        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-sm font-medium mb-2">JsonPath Query</h2>
            <Textarea className="font-mono min-h-[80px]" value={query} onChange={(e) => setQuery(e.target.value)} />
          </Card>

          <Card className="p-4">
            <h2 className="text-sm font-medium mb-2">Query Result</h2>
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <Textarea
                className="font-mono min-h-[200px]"
                value={result || ""}
                readOnly
                placeholder="Results will appear here..."
              />
            )}
          </Card>
        </div>
      </div>

      {/* Documentation Link */}
      <div className="mt-4 text-sm text-muted-foreground">
        <a
          href="https://goessner.net/articles/JsonPath/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Learn more about JsonPath syntax →
        </a>
      </div>

      {/* New JsonPath Explanation Card */}

      {/* Quick Reference Card (previous implementation) */}
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">JsonPath Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-2">Basic Syntax</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <code>$</code> - Root object/element
              </li>
              <li>
                <code>.</code> - Child operator
              </li>
              <li>
                <code>[]</code> - Array operator
              </li>
              <li>
                <code>*</code> - Wildcard (all elements)
              </li>
              <li>
                <code>[n]</code> - Array index
              </li>
              <li>
                <code>[start:end]</code> - Array slice
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Filter Expressions</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <code>[?(@.property)]</code> - Has property
              </li>
              <li>
                <code>[?(@.price &gt; 10)]</code> - Comparison
              </li>
              <li>
                <code>[?(@.category == &apos;fiction&apos;]</code> - Equality
              </li>
              <li>
                <code>..property</code> - Deep scan
              </li>
              <li>
                <code>[(@.length-1)]</code> - Last element
              </li>
              <li>
                <code>[0,1]</code> - Multiple indices
              </li>
            </ul>
          </div>
        </div>
      </Card>
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">Understanding JsonPath</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            JsonPath is a query language for JSON, similar to how XPath is used for XML. It allows you to extract and
            manipulate data from JSON documents using a simple path expression syntax.
          </p>

          <div>
            <h3 className="font-medium text-foreground mb-2">How It Works</h3>
            <p>
              Every JsonPath expression starts with <code>$</code> (representing the root object), followed by a path to
              the desired data. You can navigate through the JSON structure using dots (<code>.</code>) for direct
              children and brackets (<code>[]</code>) for array elements or more complex selections.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">Common Use Cases</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Extracting specific fields from a complex JSON structure</li>
              <li>Filtering arrays based on element properties</li>
              <li>Finding all instances of a particular field, regardless of its location</li>
              <li>Selecting ranges or specific indices from arrays</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">Advanced Features</h3>
            <p>JsonPath supports advanced operations like:</p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                Filter expressions using <code>[?()]</code> syntax for conditional selection
              </li>
              <li>
                Deep scanning with <code>..</code> to search at any depth
              </li>
              <li>Array slice operations similar to Python&apos;s list slicing</li>
              <li>Script expressions for dynamic value comparison</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">Best Practices</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Start simple and build up complex queries incrementally</li>
              <li>Use filter expressions carefully as they can impact performance on large datasets</li>
              <li>
                Consider using wildcards (<code>*</code>) when dealing with dynamic key names
              </li>
              <li>Test queries with sample data before using them in production</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
