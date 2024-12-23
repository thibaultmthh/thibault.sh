import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

// New component to transform JSDoc to API definition
export default function APIFromJSDoc({ jsDoc }: { jsDoc: string }) {
  // Parse JSDoc comment to extract parameters and return value
  const parseJSDoc = (doc: string) => {
    const params =
      doc.match(/@param\s+(\{[^}]+\})\s+([^\s-]+)\s*-\s*([^\n]+)/g)?.map((param) => {
        const [, type, name, description] = param.match(/@param\s+(\{[^}]+\})\s+([^\s-]+)\s*-\s*([^\n]+)/) || [];
        return { type: type?.replace(/[{}]/g, ""), name, description };
      }) || [];

    const returnValue = doc.match(/@returns\s+([^\n]+)/)?.[1];

    return { params, returnValue };
  };

  const { params, returnValue } = parseJSDoc(jsDoc);

  return (
    <div className="space-y-4">
      {params.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Parameters</h3>
          <ul className="space-y-4">
            {params.map((param) => (
              <li key={param.name}>
                <div className="flex items-center gap-2 mb-1">
                  <code className="font-semibold">{param.name}</code>
                  <Badge variant="outline">{param.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{param.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {returnValue && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Returns</h3>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">{returnValue}</p>
          </Card>
        </div>
      )}
    </div>
  );
}
