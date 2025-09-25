import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { CodeBlock } from "./ui/code-block";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { HookDocumentation } from "@/types/hook-doc";
import ExampleWrapper from "./ExampleWrapper";
import { useState, useEffect } from "react";

interface HookDocRendererProps {
  doc: HookDocumentation;
}

export default function HookDocRenderer({ doc }: HookDocRendererProps) {
  const [examples, setExamples] = useState<
    Array<{
      title: string;
      component: React.ComponentType;
      source: string;
    }>
  >([]);

  useEffect(() => {
    if (doc.examplesFile) {
      import(`@/docs/hooks/${doc.examplesFile}`)
        .then((module) => {
          setExamples(module.default || []);
        })
        .catch(() => {
          console.warn(`Could not load examples from ${doc.examplesFile}`);
        });
    }
  }, [doc.examplesFile]);

  return (
    <div className="space-y-6 mx-auto font-mono">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{doc.name}</h1>
          <Badge variant="outline">{doc.category}</Badge>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">{doc.description}</p>
      </div>

      {/* Examples */}
      {examples.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Exemples</h2>
          <div className="space-y-6">
            {examples.map((example, index) => (
              <ExampleWrapper key={index} title={example.title} component={example.component} source={example.source} />
            ))}
          </div>
        </section>
      )}

      {/* Installation */}
      {doc.installation && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Installation</h2>
          <CodeBlock code={doc.installation.command || `npm install ${doc.installation.package}`} language="bash" />
        </section>
      )}

      {/* API Reference */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">API Reference</h2>

        {/* Function Signature */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Signature</h3>

          {/* <code className="text-sm">{doc.api.signature}</code> */}
          <CodeBlock code={doc.api.signature} language="typescript" />
        </div>

        {/* Parameters */}
        {doc.api.parameters && doc.api.parameters.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Parameters</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doc.api.parameters.map((param) => (
                  <TableRow key={param.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="font-medium text-orange-600">{param.name}</code>
                        {param.optional && (
                          <Badge variant="outline" className="text-xs">
                            optional
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {param.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground leading-relaxed">{param.description}</TableCell>
                    <TableCell>
                      {param.default ? (
                        <code className="bg-muted px-1 rounded text-xs">{param.default}</code>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Returns */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Returns</h3>
          <Card className="p-4">
            <div className="border-l-4 border-orange-200 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {doc.api.returns.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{doc.api.returns.description}</p>

              {/* Return Properties */}
              {doc.api.returns.properties && doc.api.returns.properties.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Properties:</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {doc.api.returns.properties.map((prop) => (
                        <TableRow key={prop.name}>
                          <TableCell>
                            <code className="font-medium text-orange-600">{prop.name}</code>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {prop.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{prop.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
