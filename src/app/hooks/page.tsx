import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";

export default function HooksDocumentation() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight">@thibault.sh/hooks</h1>
          <Badge variant="secondary">v0.0.2</Badge>
        </div>
        <p className="text-md text-muted-foreground leading-relaxed">
          A collection of performant React hooks for common use cases. Built with TypeScript for reliability and
          developer experience. These hooks are designed to solve real-world problems while maintaining excellent
          performance and bundle size.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Whether you&apos;re building a small application or a large-scale project, these hooks provide reliable
          solutions for state management, browser APIs, UI interactions, and more. Each hook is thoroughly tested and
          optimized for production use.
        </p>
      </div>

      {/* Installation section */}
      <section className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Start</h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Getting started is simple. Install the package using your preferred package manager, and you&apos;ll have
            immediate access to all hooks. Each hook is individually documented with examples and TypeScript
            definitions.
          </p>
        </div>
        <Card className="p-8 space-y-6 bg-card/50 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
          <div>
            <h3 className="font-semibold text-base mb-3">1. Install the package</h3>
            <CodeBlock code="npm install @thibault.sh/hooks" language="bash" />
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3">2. Import and use</h3>

            <CodeBlock
              code={`import { useLocalStorageState } from '@thibault.sh/hooks';

function App() {
  const [theme, setTheme] = useLocalStorageState('theme', 'light');
  return (
    <button onClick={() => setTheme(current => current === 'light' ? 'dark' : 'light')}>
      Toggle theme
    </button>
  );
}`}
              language="typescript"
            />
          </div>
        </Card>
      </section>

      {/* Features section */}
      <section className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            These hooks are built with modern development practices in mind, focusing on reliability, type safety, and
            seamless integration with your existing React applications.
          </p>
        </div>
        <Card className="p-8 bg-card/50 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
          <ul className="grid md:grid-cols-2 gap-6">
            <li className="flex items-start gap-3">
              <span className="text-primary text-base">✓</span>
              <div>
                <strong className="text-base block mb-1">TypeScript Support</strong>
                <p className="text-sm text-muted-foreground">
                  Enjoy full type safety and autocompletion in your IDE. Every hook is written in TypeScript with
                  detailed type definitions and generic support where applicable.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-base">✓</span>
              <div>
                <strong className="text-base block mb-1">Zero Dependencies</strong>
                <p className="text-sm text-muted-foreground">
                  Keep your project lightweight with hooks that have zero external dependencies. This ensures minimal
                  bundle size impact and reduces potential security vulnerabilities.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-base">✓</span>
              <div>
                <strong className="text-base block mb-1">Tree Shakeable</strong>
                <p className="text-sm text-muted-foreground">
                  Import only what you need. Each hook is individually exported, allowing modern bundlers to eliminate
                  unused code and optimize your final bundle size.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-base">✓</span>
              <div>
                <strong className="text-base block mb-1">SSR Compatible</strong>
                <p className="text-sm text-muted-foreground">
                  Built with server-side rendering in mind, these hooks work seamlessly with Next.js, Remix, and other
                  SSR frameworks. Includes proper hydration handling and browser API detection.
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
