import { Card } from "@/components/ui/card";
import { tools } from "@/config/tools";
import Link from "next/link";

export default function Tools() {
  const categoryDescriptions = {
    "Text Tools": "A collection of text manipulation tools to analyze, format, and transform text content efficiently.",
    "Developer Tools":
      "Essential utilities for developers including JSON formatting, Base64 encoding, and hash generation.",
    "Design Tools": "Tools for designers to generate patterns, color palettes, and handle design assets.",
    Utilities: "General purpose utilities for everyday tasks like unit conversion and password generation.",
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3">Online Developer Tools & Utilities</h1>
      <p className="text-md text-muted-foreground mb-4">
        Free, fast, and secure online tools for developers, designers, and professionals. All processing happens in your
        browser - no data is sent to servers.
      </p>
      <p className="text-md text-muted-foreground mb-8">
        Part of{" "}
        <a href="/" className="text-primary hover:underline">
          Thibault Mathian&apos;s portfolio
        </a>{" "}
        - a collection of projects built with React, Next.js, and TypeScript.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(tools).map(([category, { icon: Icon, items }]) => (
          <Card key={category} className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">{category}</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              {categoryDescriptions[category as keyof typeof categoryDescriptions]}
            </p>

            <div className="grid gap-3">
              {items.map((tool) => (
                <Link key={tool.id} href={tool.path} className="block p-3 rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-medium">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
