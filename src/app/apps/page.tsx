import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Code } from "lucide-react";
import { apps } from "@/config/apps";

export default function Apps() {
  return (
    <div className="relative min-h-screen font-mono">
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Applications</h1>
          <p className="text-md text-muted-foreground mb-4">
            A collection of web applications built with Next.js and React. All apps are open-source and free to use.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Built with Next.js</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {apps.map((app) => (
            <Link
              key={app.id}
              href={app.path}
              className="group block p-6 rounded-xl hover:bg-slate-50 border transition-all 
                       hover:border-orange-500/50 hover:shadow-lg bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-xl group-hover:text-orange-500 transition-colors">{app.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{app.description}</p>
              <div className="mt-4 text-sm text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Try it now →
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <Card className="mt-12 p-8 border border-dashed bg-slate-50/50">
          <h2 className="text-xl font-semibold mb-6">Coming Soon</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-xl border border-dashed bg-white/50">
              <h3 className="font-medium text-lg mb-3">Pomodoro Timer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stay focused with customizable Pomodoro sessions and break timers.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-dashed bg-white/50">
              <h3 className="font-medium text-lg mb-3">Code Snippet Manager</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Save and organize your code snippets with syntax highlighting.
              </p>
            </div>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="mt-8">
          <Link href="/" className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors">
            <span>←</span>
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
