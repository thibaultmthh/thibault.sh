import { CodeBlock } from "@/components/ui/code-block";

export default function PublishNPMPackageTutorial() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">How to Publish Your First NPM Package</h1>

      <div className="prose max-w-none">
        <h2>Why Create an NPM Package?</h2>
        <p>
          Ever built something cool and thought &quot;Hey, I could reuse this in other projects&quot;? That&apos;s
          exactly why you should create an NPM package! I&apos;ll show you how to take your code from a local project to
          a published package that anyone can install with <code>npm install</code>.
        </p>

        <h2>Setting Up Your Project</h2>
        <p>First, create a new directory and initialize your package:</p>

        <CodeBlock
          language="bash"
          code={`mkdir my-awesome-package
cd my-awesome-package
npm init -y`}
        />

        <p>Now, let&apos;s set up TypeScript (because who doesn&apos;t want type safety?):</p>

        <CodeBlock
          language="bash"
          code={`npm install typescript @types/node --save-dev
npx tsc --init`}
        />

        <h2>Configuring Your Package</h2>
        <p>
          Update your <code>package.json</code> with the essential fields:
        </p>

        <CodeBlock
          language="json"
          code={`{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "A super cool package that does awesome things",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "keywords": ["awesome", "cool", "typescript"],
  "author": "Your Name <you@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/my-awesome-package"
  }
}`}
        />

        <p>
          And configure TypeScript in <code>tsconfig.json</code>:
        </p>

        <CodeBlock
          language="json"
          code={`{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/__tests__/*"]
}`}
        />

        <h2>Writing Your Package Code</h2>
        <p>
          Create your source files in the <code>src</code> directory. Here&apos;s a simple example:
        </p>

        <CodeBlock
          language="typescript"
          code={`// src/index.ts
export function greet(name: string): string {
  return \`Hello, \${name}! Welcome to my awesome package.\`;
}

export function add(a: number, b: number): number {
  return a + b;
}`}
        />

        <h2>Testing Your Package</h2>
        <p>Let&apos;s add Jest for testing (because we&apos;re professionals here 😎):</p>

        <CodeBlock language="bash" code={`npm install jest @types/jest ts-jest --save-dev`} />

        <p>
          Configure Jest in <code>jest.config.js</code>:
        </p>

        <CodeBlock
          language="javascript"
          code={`module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
};`}
        />

        <p>Write some tests:</p>

        <CodeBlock
          language="typescript"
          code={`// src/__tests__/index.test.ts
import { greet, add } from '../index';

describe('my-awesome-package', () => {
  test('greet returns correct greeting', () => {
    expect(greet('John')).toBe('Hello, John! Welcome to my awesome package.');
  });

  test('add returns correct sum', () => {
    expect(add(2, 3)).toBe(5);
  });
});`}
        />

        <p>
          Add test script to <code>package.json</code>:
        </p>

        <CodeBlock
          language="json"
          code={`{
  "scripts": {
    "test": "jest",
    "build": "tsc",
    "prepublishOnly": "npm run test && npm run build"
  }
}`}
        />

        <h2>Creating Documentation</h2>
        <p>Create a README.md file - this is super important! Here&apos;s a template:</p>

        <CodeBlock
          language="markdown"
          code={`# my-awesome-package

A super cool package that does awesome things!

## Installation

\`\`\`bash
npm install my-awesome-package
\`\`\`

## Usage

\`\`\`typescript
import { greet, add } from 'my-awesome-package';

console.log(greet('World')); // Hello, World! Welcome to my awesome package.
console.log(add(2, 3));      // 5
\`\`\`

## API

### greet(name: string): string
Returns a friendly greeting.

### add(a: number, b: number): number
Adds two numbers together.

## License

MIT © Your Name`}
        />

        <h2>Publishing to NPM</h2>
        <p>Time for the exciting part! Here&apos;s how to publish your package:</p>

        <ol>
          <li>
            Create an NPM account if you haven&apos;t already:
            <CodeBlock language="bash" code={`npm adduser`} />
          </li>
          <li>
            Test your package locally:
            <CodeBlock
              language="bash"
              code={`npm run build
npm run test`}
            />
          </li>
          <li>
            Check what files will be published:
            <CodeBlock language="bash" code={`npm pack --dry-run`} />
          </li>
          <li>
            Publish your package:
            <CodeBlock language="bash" code={`npm publish`} />
          </li>
        </ol>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
          <p className="text-sm text-orange-700">
            <strong>Pro Tip:</strong> Use <code>npm publish --dry-run</code> first to see exactly what would be
            published without actually publishing it.
          </p>
        </div>

        <h2>Updating Your Package</h2>
        <p>When you make changes, follow these steps:</p>

        <ol>
          <li>Update your code and tests</li>
          <li>
            Update the version in <code>package.json</code>:
            <CodeBlock
              language="bash"
              code={`npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes`}
            />
          </li>
          <li>
            Publish the update:
            <CodeBlock language="bash" code={`npm publish`} />
          </li>
        </ol>

        <h2>Best Practices</h2>
        <ul>
          <li>Always write tests for your code</li>
          <li>Keep your package focused - do one thing well</li>
          <li>Use semantic versioning (major.minor.patch)</li>
          <li>Include clear documentation and examples</li>
          <li>Add TypeScript types for better developer experience</li>
          <li>Set up CI/CD for automated testing and publishing</li>
        </ul>

        <h2>Common Gotchas</h2>
        <ul>
          <li>
            <strong>Package Name:</strong> Check if your package name is available on NPM before starting:
            <CodeBlock language="bash" code={`npm search my-awesome-package`} />
          </li>
          <li>
            <strong>Scope:</strong> If the name is taken, consider using a scope:
            <CodeBlock
              language="bash"
              code={`{
  "name": "@yourusername/my-awesome-package"
}`}
            />
          </li>
          <li>
            <strong>Files:</strong> Make sure your <code>files</code> field in <code>package.json</code> includes all
            necessary files
          </li>
          <li>
            <strong>Git Ignore:</strong> Don&apos;t forget to add <code>dist</code> and <code>node_modules</code> to
            your <code>.gitignore</code>
          </li>
        </ul>

        <h2>Wrapping Up</h2>
        <p>
          Congratulations! You&apos;ve just published your first NPM package. It&apos;s an awesome feeling when people
          start using your code. Remember to:
        </p>
        <ul>
          <li>Keep your package maintained</li>
          <li>Listen to user feedback</li>
          <li>Add features thoughtfully</li>
          <li>Document changes in a CHANGELOG.md</li>
        </ul>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
          <p className="text-sm text-orange-700">
            <strong>Quick Tip:</strong> Want to see how your package looks before publishing? Use <code>npm link</code>{" "}
            to test it locally in another project first!
          </p>
        </div>
      </div>
    </div>
  );
}
