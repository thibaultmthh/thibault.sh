"use client";

// src/app/tools/dev/http-codes/[code]/page.tsx
import { httpCodes, getSimilarCodes, categories } from "@/app/data/httpCodes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Info,
  CheckCircle,
  AlertCircle,
  Copy,
  Globe,
  ArrowRight,
  Star,
} from "lucide-react";
import { use } from "react";

export default function HttpCodePage({ params }: { params: Promise<{ code: string }> }) {
  const { code: codeString } = use(params);
  const code = parseInt(codeString);
  const httpCode = httpCodes.find((c) => c.code === code);

  if (!httpCode) {
    notFound();
  }

  const similarCodes = getSimilarCodes(code);
  const category = categories[httpCode.category];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "informational":
        return <Info className="h-4 w-4" />;
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "redirection":
        return <ArrowRight className="h-4 w-4" />;
      case "clientError":
        return <AlertCircle className="h-4 w-4" />;
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

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <Link
        href="/tools/dev/http-codes"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all status codes
      </Link>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full bg-${category.color}-500`} />
              <h1 className="text-5xl font-mono font-bold text-primary">{httpCode.code}</h1>
              <h2 className="text-4xl font-bold">{httpCode.title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className={`bg-${category.color}-500/10 text-${category.color}-500 border-${category.color}-200 flex items-center gap-2`}
              >
                {getCategoryIcon(httpCode.category)}
                {category.name}
              </Badge>
              <Badge variant="outline">{httpCode.spec}</Badge>
              {[200, 404, 500, 401, 403, 301, 302, 400, 503, 429].includes(httpCode.code) && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(httpCode.code.toString())}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Code
            </Button>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6 border">
          <p className="text-lg leading-relaxed">{httpCode.description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Information */}
          {httpCode.details && (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Info className="h-5 w-5 text-blue-500" />
                <h3>Detailed Information</h3>
              </div>
              <div className="text-muted-foreground leading-relaxed">
                <p>{httpCode.details}</p>
              </div>
            </Card>
          )}

          {/* Examples */}
          {httpCode.examples && httpCode.examples.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <BookOpen className="h-5 w-5 text-green-500" />
                <h3>Common Examples</h3>
              </div>
              <ul className="space-y-3">
                {httpCode.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{example}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Common Uses */}
          {httpCode.commonUses && httpCode.commonUses.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <h3>Common Uses</h3>
              </div>
              <ul className="space-y-3">
                {httpCode.commonUses.map((use, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{use}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Best Practices */}
          {httpCode.bestPractices && httpCode.bestPractices.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <h3>Best Practices</h3>
              </div>
              <ul className="space-y-3">
                {httpCode.bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{practice}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => copyToClipboard(httpCode.code.toString())}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
              {httpCode.mdn && (
                <a href={httpCode.mdn} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    MDN Documentation
                  </Button>
                </a>
              )}
              <Link href="/tools/dev/http-codes">
                <Button variant="outline" className="w-full justify-start">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Status Codes
                </Button>
              </Link>
            </div>
          </Card>

          {/* Category Info */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Category Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-${category.color}-500`} />
                <span className="font-medium">{category.name}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
              <Link href="/tools/dev/http-codes">
                <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                  View all {category.name.toLowerCase()} codes →
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Similar Status Codes */}
      {similarCodes.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Related Status Codes</h3>
            <Badge variant="outline">{similarCodes.length} similar</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarCodes.map((code) => {
              const codeCategory = categories[code.category];
              return (
                <Link key={code.code} href={`/tools/dev/http-codes/${code.code}`}>
                  <Card className="p-4 hover:border-primary/50 transition-all duration-200 group">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-${codeCategory.color}-500`} />
                        <span className="text-xl font-mono font-bold text-primary group-hover:text-primary/80 transition-colors">
                          {code.code}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{code.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{code.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
