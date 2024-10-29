import { Card } from "@/components/ui/card";
import { tools } from "@/config/tools";
import Link from "next/link";

export default function Tools() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tools</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(tools).map(([category, { icon: Icon, items }]) => (
          <Card key={category} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">{category}</h2>
            </div>

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
