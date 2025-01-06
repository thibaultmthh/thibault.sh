import { CodeBlock } from "@/components/ui/code-block";
import DemoTabsCSVParser from "./tabs";

export default function CSVParserTutorial() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">The Easy Way to Parse CSV Files in TypeScript</h1>

      <div className="prose max-w-none">
        <h2>Why This Tutorial?</h2>
        <p>
          Look, we&apos;ve all been there - you get a CSV file from somewhere and need to do something with it in your
          TypeScript project. Sure, you could write your own parser (I&apos;ve been there, done that), but trust me,
          it&apos;s not worth the headache. After spending way too much time dealing with edge cases and weird CSV
          formats, I discovered Papa Parse, and it&apos;s been a game-changer.
        </p>

        <h2>Getting Started</h2>
        <p>First things first, let&apos;s grab Papa Parse and its TypeScript types:</p>
        <CodeBlock
          language="bash"
          code={`npm install papaparse
npm install --save-dev @types/papaparse`}
        />

        <h2>See It in Action</h2>
        <p>
          Before we dive into the details, try out the demo below. Paste in some CSV data (or use the example
          that&apos;s already there) and hit the Parse button. You can also check out the full code to see how it works:
        </p>
      </div>

      <div className="my-8">
        <DemoTabsCSVParser />
      </div>

      <div className="prose max-w-none">
        <h2>Let&apos;s Break It Down</h2>
        <p>
          Alright, let me show you how to use Papa Parse in your TypeScript projects. I&apos;ll start with the basics
          and then show you some cool tricks I&apos;ve learned along the way.
        </p>

        <h3>1. Setting Up Types</h3>
        <p>
          First up, we need to tell TypeScript what our data looks like. Here&apos;s how I usually structure my types:
        </p>

        <CodeBlock
          language="typescript"
          code={`import Papa from 'papaparse';

interface ParseResult {
  data: Record<string, string>[];    // Your parsed rows
  errors: Papa.ParseError[];         // Any oopsies that happened
  meta: Papa.ParseMeta;             // Extra info about the parse
}`}
        />

        <h3>2. The Simple Stuff</h3>
        <p>Here&apos;s the most straightforward way to parse a CSV - it&apos;s what I use 90% of the time:</p>

        <CodeBlock
          language="typescript"
          code={`Papa.parse(csvText, {
  header: true,              // Use the first row as headers
  skipEmptyLines: true,     // Skip blank lines (who needs them?)
  complete: (result) => {
    // Here's where the magic happens
    console.log(result.data);    // Your parsed data
    console.log(result.errors);  // Any problems?
    console.log(result.meta);    // Extra details
  }
});`}
        />

        <h2>Cool Features You Should Know About</h2>
        <p>
          Papa Parse has some pretty neat tricks up its sleeve. Here are some features that have saved me tons of time:
        </p>
        <ul>
          <li>It figures out the delimiter automatically (comma, tab, whatever)</li>
          <li>Handles quoted text like a champ (no more splitting headaches)</li>
          <li>Can handle huge files without crashing your browser</li>
          <li>Works in a web worker if you need the extra speed</li>
          <li>Lets you transform data as it&apos;s being parsed</li>
        </ul>

        <h3>Cleaning Up Data While Parsing</h3>
        <p>
          Here&apos;s a neat trick I use when the data needs some cleanup. You can transform values as they&apos;re
          being parsed:
        </p>

        <CodeBlock
          language="typescript"
          code={`Papa.parse(csvText, {
  header: true,
  transform: (value) => value.trim(),                // Clean up whitespace
  transformHeader: (header) => header.toLowerCase(), // Normalize headers
  complete: (result) => {
    console.log(result.data);
  }
});`}
        />

        <h3>Handling File Uploads</h3>
        <p>Got a file input? Here&apos;s how to handle it:</p>

        <CodeBlock
          language="typescript"
          code={`function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    complete: (result) => {
      // Do something with your data
      console.log(result.data);
    },
    error: (error) => {
      console.error('Oops:', error.message);
    }
  });
}`}
        />

        <h3>Dealing with Big Files</h3>
        <p>
          If you&apos;re dealing with massive CSV files (I&apos;m talking millions of rows), here&apos;s how to process
          them in chunks so you don&apos;t freeze up the browser:
        </p>

        <CodeBlock
          language="typescript"
          code={`Papa.parse(file, {
  header: true,
  chunk: (results, parser) => {
    // Process a chunk of rows at a time
    console.log('Processing chunk:', results.data.length, 'rows');
    results.data.forEach(row => {
      // Handle each row
    });
  },
  complete: () => {
    console.log('All done!');
  }
});`}
        />

        <h2>When Things Go Wrong</h2>
        <p>
          CSV parsing can be messy. Here&apos;s how I handle errors (because let&apos;s face it, they&apos;re gonna
          happen):
        </p>

        <CodeBlock
          language="typescript"
          code={`Papa.parse(csvText, {
  header: true,
  error: (error: Papa.ParseError) => {
    // Handle errors as they happen
    console.error(\`Row \${error.row}: \${error.message}\`);
  },
  complete: (result) => {
    // Or check all errors at the end
    if (result.errors.length) {
      console.log('Found some problems:', result.errors);
    }
  }
});`}
        />

        <h2>Pro Tips</h2>
        <p>Here are some things I&apos;ve learned the hard way:</p>
        <ul>
          <li>Always check for errors - users will find ways to break things</li>
          <li>Use streaming for big files - your users will thank you</li>
          <li>Validate the data after parsing - just because it parsed doesn&apos;t mean it&apos;s right</li>
          <li>Test with weird CSV files - you&apos;ll be surprised what people try to upload</li>
          <li>Watch out for character encoding issues with international data</li>
        </ul>

        <h2>Wrapping Up</h2>
        <p>
          That&apos;s pretty much everything you need to know to handle CSV files like a pro! Papa Parse has made my
          life so much easier when dealing with CSV files, and I hope this guide helps you too. If you run into any
          weird edge cases or have questions, feel free to check out the{" "}
          <a href="https://www.papaparse.com/docs" className="text-orange-600 hover:text-orange-700">
            Papa Parse docs
          </a>{" "}
          or drop a comment below.
        </p>
      </div>
    </div>
  );
}
