"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { AlertCircle, Copy, ArrowLeftRight, Check, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import yaml from "js-yaml";

type ConversionDirection = "yaml-to-json" | "json-to-yaml";
type JsonIndentation = 2 | 4;

interface ConversionOptions {
  jsonIndentation: JsonIndentation;
  yamlFlowLevel: number;
  sortKeys: boolean;
}

export default function YamlJsonConverter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<ConversionDirection>("yaml-to-json");
  const [options, setOptions] = useState<ConversionOptions>({
    jsonIndentation: 2,
    yamlFlowLevel: -1, // -1 means block style (no flow)
    sortKeys: false,
  });
  const [copied, setCopied] = useState(false);

  const convertYamlToJson = (yamlText: string): string => {
    try {
      const parsed = yaml.load(yamlText);
      return JSON.stringify(parsed, null, options.jsonIndentation);
    } catch (err) {
      throw new Error(`YAML parsing error: ${err instanceof Error ? err.message : "Invalid YAML"}`);
    }
  };

  const convertJsonToYaml = (jsonText: string): string => {
    try {
      const parsed = JSON.parse(jsonText);
      return yaml.dump(parsed, {
        indent: 2,
        flowLevel: options.yamlFlowLevel,
        sortKeys: options.sortKeys,
        noRefs: true,
        lineWidth: 120,
      });
    } catch (err) {
      throw new Error(`JSON parsing error: ${err instanceof Error ? err.message : "Invalid JSON"}`);
    }
  };

  const handleConvert = () => {
    try {
      setError(null);
      if (!inputText.trim()) {
        setError("Please enter some text to convert");
        return;
      }

      let result: string;
      if (direction === "yaml-to-json") {
        result = convertYamlToJson(inputText);
      } else {
        result = convertJsonToYaml(inputText);
      }

      setOutputText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
      setOutputText("");
    }
  };

  const handleSwapDirection = () => {
    const newDirection: ConversionDirection = direction === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json";
    setDirection(newDirection);

    // Swap input and output if both have content
    if (inputText && outputText) {
      setInputText(outputText);
      setOutputText(inputText);
    }
    setError(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setError(null);
  };

  const loadExample = (type: "docker-compose" | "github-actions" | "kubernetes" | "package-json") => {
    const examples = {
      "docker-compose": {
        yaml: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - API_URL=https://api.example.com
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:6-alpine
    command: redis-server --appendonly yes

volumes:
  postgres_data:`,
        json: `{
  "version": "3.8",
  "services": {
    "web": {
      "build": ".",
      "ports": ["3000:3000"],
      "environment": [
        "NODE_ENV=production",
        "API_URL=https://api.example.com"
      ],
      "depends_on": ["db", "redis"]
    },
    "db": {
      "image": "postgres:13",
      "environment": {
        "POSTGRES_DB": "myapp",
        "POSTGRES_USER": "user",
        "POSTGRES_PASSWORD": "password"
      },
      "volumes": ["postgres_data:/var/lib/postgresql/data"]
    },
    "redis": {
      "image": "redis:6-alpine",
      "command": "redis-server --appendonly yes"
    }
  },
  "volumes": {
    "postgres_data": null
  }
}`,
      },
      "github-actions": {
        yaml: `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build`,
        json: `{
  "name": "CI/CD Pipeline",
  "on": {
    "push": {
      "branches": ["main", "develop"]
    },
    "pull_request": {
      "branches": ["main"]
    }
  },
  "jobs": {
    "test": {
      "runs-on": "ubuntu-latest",
      "strategy": {
        "matrix": {
          "node-version": [16, 18, 20]
        }
      },
      "steps": [
        {
          "uses": "actions/checkout@v3"
        },
        {
          "name": "Setup Node.js",
          "uses": "actions/setup-node@v3",
          "with": {
            "node-version": "\${{ matrix.node-version }}",
            "cache": "npm"
          }
        },
        {
          "name": "Install dependencies",
          "run": "npm ci"
        },
        {
          "name": "Run tests",
          "run": "npm test"
        },
        {
          "name": "Build",
          "run": "npm run build"
        }
      ]
    }
  }
}`,
      },
      kubernetes: {
        yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"`,
        json: `{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "nginx-deployment",
    "labels": {
      "app": "nginx"
    }
  },
  "spec": {
    "replicas": 3,
    "selector": {
      "matchLabels": {
        "app": "nginx"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "nginx"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "nginx",
            "image": "nginx:1.21",
            "ports": [
              {
                "containerPort": 80
              }
            ],
            "resources": {
              "requests": {
                "memory": "64Mi",
                "cpu": "250m"
              },
              "limits": {
                "memory": "128Mi",
                "cpu": "500m"
              }
            }
          }
        ]
      }
    }
  }
}`,
      },
      "package-json": {
        json: `{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "An awesome Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^28.0.0",
    "webpack": "^5.70.0"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}`,
        yaml: `name: my-awesome-app
version: 1.0.0
description: An awesome Node.js application
main: index.js
scripts:
  start: node index.js
  dev: nodemon index.js
  test: jest
  build: webpack --mode production
dependencies:
  express: ^4.18.0
  cors: ^2.8.5
  dotenv: ^16.0.0
devDependencies:
  nodemon: ^2.0.0
  jest: ^28.0.0
  webpack: ^5.70.0
engines:
  node: '>=16.0.0'`,
      },
    };

    const example = examples[type];
    if (direction === "yaml-to-json") {
      setInputText(example.yaml);
    } else {
      setInputText(example.json);
    }
    setError(null);
    setOutputText("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">YAML ⇄ JSON Converter</h1>

      <div className="">
        {/* Controls */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Direction Control */}
            <div className="space-y-2">
              <Label>Conversion Direction</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleSwapDirection} className="flex-1">
                  {direction === "yaml-to-json" ? "YAML → JSON" : "JSON → YAML"}
                  <ArrowLeftRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* JSON Indentation */}
            <div className="space-y-2">
              <Label>JSON Indentation</Label>
              <Select
                value={options.jsonIndentation.toString()}
                onValueChange={(value) =>
                  setOptions((prev) => ({ ...prev, jsonIndentation: parseInt(value) as JsonIndentation }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* YAML Flow Level */}
            <div className="space-y-2">
              <Label>YAML Style</Label>
              <Select
                value={options.yamlFlowLevel.toString()}
                onValueChange={(value) => setOptions((prev) => ({ ...prev, yamlFlowLevel: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">Block Style</SelectItem>
                  <SelectItem value="0">Flow Style</SelectItem>
                  <SelectItem value="1">Mixed Style</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Keys */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="sortkeys"
                  checked={options.sortKeys}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, sortKeys: checked }))}
                />
                <Label htmlFor="sortkeys">Sort Keys</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleConvert}>Convert {direction === "yaml-to-json" ? "to JSON" : "to YAML"}</Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Card>

        {/* Examples */}
        <Card className="p-6 mb-6">
          <Label className="mb-3 block">Load Example</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample("docker-compose")}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Docker Compose
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample("github-actions")}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              GitHub Actions
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample("kubernetes")}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Kubernetes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample("package-json")}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Package.json
            </Button>
          </div>
        </Card>

        {/* Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <h2 className="text-sm font-medium mb-2">Input ({direction === "yaml-to-json" ? "YAML" : "JSON"})</h2>
            <Textarea
              placeholder={`Enter ${direction === "yaml-to-json" ? "YAML" : "JSON"} here...`}
              className="font-mono text-sm min-h-[400px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium">Output ({direction === "yaml-to-json" ? "JSON" : "YAML"})</h2>
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!outputText || !!error}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <Textarea
                className="font-mono text-sm min-h-[400px]"
                value={outputText}
                readOnly
                placeholder={`Converted ${direction === "yaml-to-json" ? "JSON" : "YAML"} will appear here...`}
              />
            )}
          </Card>
        </div>

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About YAML ⇄ JSON Conversion</h2>
          <Tabs defaultValue="usage" className="w-full">
            <TabsList>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="formats">Formats</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="usage" className="mt-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Perfect for converting configuration files between formats</li>
                <li>• Supports Docker Compose, GitHub Actions, Kubernetes manifests, and more</li>
                <li>• Bidirectional conversion with format validation</li>
                <li>• Configurable JSON indentation and YAML styling options</li>
                <li>• Real-time error detection and detailed error messages</li>
              </ul>
            </TabsContent>

            <TabsContent value="formats" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">YAML Features:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Human-readable data serialization</li>
                    <li>• Comments support</li>
                    <li>• Multi-line strings</li>
                    <li>• Block and flow styles</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">JSON Features:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Lightweight data interchange</li>
                    <li>• Wide language support</li>
                    <li>• Strict syntax validation</li>
                    <li>• API communication standard</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="mt-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use "Sort Keys" option to maintain consistent key ordering</li>
                <li>• Block style YAML is more readable for configuration files</li>
                <li>• Flow style YAML is more compact but less readable</li>
                <li>• JSON doesn't support comments, they'll be lost in conversion</li>
                <li>• YAML strings don't need quotes unless they contain special characters</li>
              </ul>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
