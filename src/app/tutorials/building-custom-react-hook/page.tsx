import { CodeBlock } from "@/components/ui/code-block";
import DemoTabsCustomHook from "./tabs";

export default function CustomReactHookTutorial() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Building Your First Custom React Hook</h1>

      <div className="prose max-w-none">
        <h2>Why Create Custom Hooks?</h2>
        <p>
          Custom hooks are one of React&apos;s most powerful features - they let you extract component logic into
          reusable functions. Instead of copying and pasting the same state logic between components, you can wrap it in
          a hook and share it across your app. Let&apos;s learn how to build one!
        </p>

        <h2>A Practical Example: useLocalStorage</h2>
        <p>
          We&apos;ll build a <code>useLocalStorage</code> hook that makes it easy to persist state in localStorage.
          It&apos;ll work just like <code>useState</code>, but automatically save and load values from localStorage. Try
          the demo below:
        </p>

        <div className="my-8">
          <DemoTabsCustomHook />
        </div>

        <h2>Breaking Down the Hook</h2>
        <p>Let&apos;s build this hook step by step:</p>

        <h3>1. The Basic Structure</h3>
        <p>First, let&apos;s set up the hook&apos;s basic structure:</p>

        <CodeBlock
          language="typescript"
          code={`function useLocalStorage<T>(key: string, initialValue: T) {
  // We'll implement this next
  return [value, setValue];
}`}
        />

        <p>Notice a few things:</p>
        <ul>
          <li>
            We use TypeScript generics (<code>&lt;T&gt;</code>) to make our hook type-safe
          </li>
          <li>We take a storage key and initial value as parameters</li>
          <li>Like useState, we&apos;ll return a value and a setter function</li>
        </ul>

        <h3>2. Reading from localStorage</h3>
        <p>Next, let&apos;s implement the logic to read from localStorage:</p>

        <CodeBlock
          language="typescript"
          code={`const [storedValue, setStoredValue] = useState<T>(() => {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.log(error);
    return initialValue;
  }
});`}
        />

        <p>Here&apos;s what&apos;s happening:</p>
        <ul>
          <li>We use a function with useState to only run this logic once</li>
          <li>We check if window exists (important for Next.js/SSR)</li>
          <li>We try to get and parse the stored value, falling back to initialValue</li>
        </ul>

        <h3>3. Writing to localStorage</h3>
        <p>Now let&apos;s implement the setter function:</p>

        <CodeBlock
          language="typescript"
          code={`const setValue = (value: T | ((val: T) => T)) => {
  try {
    // Handle function updates
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  } catch (error) {
    console.log(error);
  }
};`}
        />

        <p>Key points about the setter:</p>
        <ul>
          <li>It handles both direct values and updater functions (like useState)</li>
          <li>It updates both the state and localStorage</li>
          <li>It includes error handling for localStorage failures</li>
        </ul>

        <h2>Best Practices for Custom Hooks</h2>
        <h3>1. Follow the Rules of Hooks</h3>
        <p>Remember that custom hooks must follow the same rules as regular hooks:</p>
        <ul>
          <li>Only call hooks at the top level</li>
          <li>Only call hooks from React functions</li>
          <li>Start your hook name with &quot;use&quot;</li>
        </ul>

        <h3>2. Handle Edge Cases</h3>
        <p>Good hooks should handle common issues:</p>
        <ul>
          <li>Server-side rendering (check for window)</li>
          <li>Error states (try/catch blocks)</li>
          <li>Loading states when needed</li>
          <li>Type safety with TypeScript</li>
        </ul>

        <h3>3. Keep It Focused</h3>
        <p>
          A good hook should do one thing well. If your hook is getting complex, consider splitting it into multiple
          hooks.
        </p>

        <h2>Testing Custom Hooks</h2>
        <p>Here&apos;s how to test our useLocalStorage hook:</p>

        <CodeBlock
          language="typescript"
          code={`import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should store and retrieve values', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    expect(result.current[0]).toBe('initial');

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(localStorage.getItem('test-key')).toBe('"new value"');
  });
});`}
        />

        <h2>Common Use Cases</h2>
        <p>Custom hooks are great for:</p>
        <ul>
          <li>Data fetching and caching</li>
          <li>Form handling</li>
          <li>Browser API interactions</li>
          <li>Animation logic</li>
          <li>State management patterns</li>
        </ul>

        <h2>Advanced Patterns</h2>
        <h3>1. Composition</h3>
        <p>You can compose hooks together:</p>

        <CodeBlock
          language="typescript"
          code={`function usePersistedState<T>(key: string, initial: T) {
  const [value, setValue] = useLocalStorage(key, initial);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return { value, setValue, isLoading };
}`}
        />

        <h3>2. Event Handling</h3>
        <p>Listen for storage events to sync across tabs:</p>

        <CodeBlock
          language="typescript"
          code={`useEffect(() => {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === key) {
      setStoredValue(JSON.parse(e.newValue || 'null'));
    }
  };

  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}, [key]);`}
        />

        <h2>Wrapping Up</h2>
        <p>
          Custom hooks are a powerful way to share logic between components. They let you build your own abstractions
          and make your code more reusable and maintainable. Start with simple hooks like our localStorage example, and
          gradually build more complex ones as you get comfortable with the pattern.
        </p>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
          <p className="text-sm text-orange-700">
            <strong>Pro Tip:</strong> When building custom hooks, always consider the developer experience. Good error
            messages, TypeScript support, and clear documentation make your hooks much more useful to others.
          </p>
        </div>
      </div>
    </div>
  );
}
