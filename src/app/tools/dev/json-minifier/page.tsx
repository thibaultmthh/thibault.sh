"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Copy } from "lucide-react";

const DEMO_DATA = [
  {
    name: "Simple Object",
    data: `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "hobbies": [
    "reading",
    "swimming",
    "coding"
  ]
}`,
  },
  {
    name: "API Response",
    data: `{
  "status": "success",
  "code": 200,
  "data": {
    "users": [
      {
        "id": 1,
        "username": "johndoe",
        "email": "john@example.com",
        "profile": {
          "firstName": "John",
          "lastName": "Doe",
          "avatar": "https://example.com/avatar.jpg"
        },
        "settings": {
          "newsletter": true,
          "darkMode": false
        }
      },
      {
        "id": 2,
        "username": "janedoe",
        "email": "jane@example.com",
        "profile": {
          "firstName": "Jane",
          "lastName": "Doe",
          "avatar": "https://example.com/avatar2.jpg"
        },
        "settings": {
          "newsletter": false,
          "darkMode": true
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "itemsPerPage": 10
    }
  }
}`,
  },
  {
    name: "Configuration",
    data: `{
  "app": {
    "name": "MyApp",
    "version": "1.0.0",
    "environment": "production",
    "debug": false,
    "features": {
      "authentication": {
        "enabled": true,
        "providers": ["google", "github", "email"],
        "sessionTimeout": 3600
      },
      "caching": {
        "enabled": true,
        "duration": 300,
        "storage": "redis"
      },
      "logging": {
        "level": "info",
        "outputs": ["console", "file"],
        "filename": "app.log"
      }
    },
    "database": {
      "host": "localhost",
      "port": 5432,
      "name": "myapp_db",
      "pool": {
        "min": 5,
        "max": 20
      }
    }
  }
}`,
  },
];

export default function JSONMinifier() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const minifyJSON = () => {
    try {
      const minified = JSON.stringify(JSON.parse(inputText));
      setOutputText(minified);
      setError(null);
    } catch {
      setError("Invalid JSON input. Please check your JSON syntax.");
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText);
  };

  const loadDemoData = (data: string) => {
    setInputText(data);
    setError(null);
    setOutputText("");
  };

  return (
    <div className="container max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">JSON Minifier</h1>

      {/* Demo Data Section */}
      <div className="mb-6">
        <h2 className="text-sm font-medium mb-2">Try with demo data:</h2>
        <div className="flex flex-wrap gap-2">
          {DEMO_DATA.map((demo, index) => (
            <Button key={index} variant="outline" size="sm" onClick={() => loadDemoData(demo.data)}>
              {demo.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Button onClick={minifyJSON}>Minify JSON</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-sm font-medium mb-2">Input</h2>
          <Textarea
            placeholder="Enter JSON to minify..."
            className="font-mono min-h-[400px]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Output</h2>
            <Button variant="outline" size="sm" onClick={handleCopyOutput} disabled={!outputText}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : (
            <Textarea className="font-mono min-h-[400px]" value={outputText} readOnly />
          )}
        </Card>
      </div>

      {/* Info Card */}
      <Card className="p-6 mt-6">
        <h2 className="font-semibold mb-3">About JSON Minification</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            JSON minification removes unnecessary whitespace, newlines, and indentation from JSON data while preserving
            its structure and validity. This process:
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Reduces file size for faster transmission</li>
            <li>Maintains JSON validity and structure</li>
            <li>Removes comments and extra spaces</li>
            <li>Makes JSON more compact for storage</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
