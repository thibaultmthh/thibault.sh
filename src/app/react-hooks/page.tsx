"use server";
import { Card } from "@/components/ui/card";
import { hooks } from "@/config/hooks";
import Link from "next/link";
import { Store, Layout, Timer, Eye, Mouse, Database, Network, Lock } from "lucide-react";

// Icon mapping
const IconMap = {
  store: Store,
  layout: Layout,
  timer: Timer,
  eye: Eye,
  mouse: Mouse,
  database: Database,
  network: Network,
  lock: Lock,
} as const;

// Type for the dynamic icon lookup
type IconName = keyof typeof IconMap;

export default async function Hooks() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">React Hooks</h1>
        <p className="text-md text-muted-foreground">
          A collection of custom React hooks for common use cases. Type-safe, well-tested, and ready for production use.
        </p>
      </div>

      <div className="grid gap-6">
        {Object.entries(hooks).map(([category, { icon, items, path }]) => {
          // Use the IconMap instead of direct Icons import
          const IconComponent = IconMap[icon as IconName] || IconMap.lock;

          return (
            <Card key={category} className="p-6 border shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-md bg-orange-50">
                  <IconComponent className="h-5 w-5 text-orange-500" />
                </div>
                <Link href={`/react-hooks/${path}`}>
                  <h2 className="text-2xl font-semibold">{category}</h2>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((hook) => (
                  <Link
                    key={hook.id}
                    href={hook.path}
                    className="block p-4 rounded-lg hover:bg-slate-50 border transition-all hover:border-orange-500/50"
                  >
                    <h3 className="font-medium text-lg mb-2">{hook.name}</h3>
                    <p className="text-sm text-muted-foreground">{hook.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
