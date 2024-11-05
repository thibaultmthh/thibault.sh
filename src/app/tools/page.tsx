import { Card } from "@/components/ui/card";
import { tools } from "@/config/tools";
import Link from "next/link";

export default function Tools() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Toolbox</h1>
        <p className="text-md text-muted-foreground">
          Free, fast, and secure online tools. All processing happens in your browser - your data never leaves your
          device.
        </p>
      </div>

      <div className="grid gap-6">
        {Object.entries(tools).map(([category, { icon: Icon, items, path }]) => (
          <Card key={category} className="p-6 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-md bg-orange-50">
                <Icon className="h-5 w-5 text-orange-500" />
              </div>
              <Link href={`/tools/${path}`}>
                <h2 className="text-2xl font-semibold">{category}</h2>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="block p-4 rounded-lg hover:bg-slate-50 border transition-all hover:border-orange-500/50"
                >
                  <h3 className="font-medium text-lg mb-2">{tool.name}</h3>
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
