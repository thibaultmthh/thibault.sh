// src/app/tools/dev/http-codes/[code]/page.tsx
import { httpCodes, getSimilarCodes, categories } from "@/app/data/httpCodes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, BookOpen, Info, CheckCircle, AlertCircle } from "lucide-react";

export default async function HttpCodePage({ params }: { params: Promise<{ code: string }> }) {
  const code = parseInt((await params).code);
  const httpCode = httpCodes.find((c) => c.code === code);

  if (!httpCode) {
    notFound();
  }

  const similarCodes = getSimilarCodes(code);
  const category = categories[httpCode.category];

  return (
    <div>
      {/* Navigation */}
      <Link
        href="/tools/dev/http-codes"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all status codes
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-mono font-bold">{httpCode.code}</h1>
          <h2 className="text-3xl font-bold">{httpCode.title}</h2>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <Badge
            variant="secondary"
            className={`bg-${category.color}-500/10 text-${category.color}-500 hover:bg-${category.color}-500/20`}
          >
            {category.name}
          </Badge>
          <Badge variant="outline">{httpCode.spec}</Badge>
        </div>
        <p className="text-lg text-muted-foreground">{httpCode.description}</p>
      </div>

      <div className="grid gap-8">
        {/* Main Content */}
        <div className="grid gap-6">
          {/* Detailed Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Info className="h-5 w-5" />
              <h3>Detailed Information</h3>
            </div>
            <div className="text-muted-foreground space-y-4">{httpCode.details && <p>{httpCode.details}</p>}</div>
          </Card>

          {/* Examples */}
          {httpCode.examples && (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <BookOpen className="h-5 w-5" />
                <h3>Common Examples</h3>
              </div>
              <ul className="grid gap-3 text-muted-foreground">
                {httpCode.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Common Uses */}
          {httpCode.commonUses && (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <CheckCircle className="h-5 w-5" />
                <h3>Common Uses</h3>
              </div>
              <ul className="grid gap-3 text-muted-foreground">
                {httpCode.commonUses.map((use, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Best Practices */}
          {httpCode.bestPractices && (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <AlertCircle className="h-5 w-5" />
                <h3>Best Practices</h3>
              </div>
              <ul className="grid gap-3 text-muted-foreground">
                {httpCode.bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* MDN Documentation */}
          {httpCode.mdn && (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <ExternalLink className="h-5 w-5" />
                <h3>Additional Resources</h3>
              </div>
              <a
                href={httpCode.mdn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-500 hover:underline"
              >
                Read more on MDN
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Card>
          )}
        </div>

        {/* Similar Status Codes */}
        {similarCodes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Similar Status Codes</h3>
            <div className="grid gap-4">
              {similarCodes.map((code) => (
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
