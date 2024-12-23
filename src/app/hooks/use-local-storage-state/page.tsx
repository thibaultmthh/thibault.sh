import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocalStorageDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseLocalStorageStateDoc() {
  const jsDocExample = `/**
 * Hook for managing state persisted in localStorage
 * @param {string} key - The localStorage key
 * @param {T} initialValue - The initial value to use if no value exists in storage
 * @returns A tuple containing the current value and a setter function
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useLocalStorageState</h1>
          <Badge variant="outline">State Management</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that persists state in localStorage, automatically syncing between tabs and windows.
        </p>
      </div>

      {/* Updated Demo section with tabs */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Demo</h2>
        <Tabs defaultValue="preview" className="space-y-3">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <LocalStorageDemo />
          </TabsContent>

          <TabsContent value="code" className="text-sm">
            <CodeBlock code={demoSource} language="typescript" />
          </TabsContent>
        </Tabs>
      </section>

      {/* Installation */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Installation</h2>
        <CodeBlock code="npm install @thibault.sh/hooks" language="bash" />
      </section>

      {/* Usage */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          language="typescript"
          code={`import { useLocalStorageState } from '@thibault.sh/hooks/useLocalStorageState';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorageState('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}`}
        />
      </section>

      {/* API */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">API</h2>
        <Card className="p-6">
          <APIFromJSDoc jsDoc={jsDocExample} />
        </Card>
      </section>

      {/* Features */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Features</h2>
        <Card className="p-6">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Persistent Storage</strong>
                <p className="text-sm text-muted-foreground">Data persists between page refreshes</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Cross-Tab Synchronization</strong>
                <p className="text-sm text-muted-foreground">State syncs across browser tabs</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Type Safety</strong>
                <p className="text-sm text-muted-foreground">Full TypeScript support with generics</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Automatic Serialization</strong>
                <p className="text-sm text-muted-foreground">JSON serialization handled automatically</p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">User Preferences Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useLocalStorageState } from '@thibault.sh/hooks';

interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: number;
  notifications: boolean;
}

function UserSettings() {
  const [preferences, setPreferences] = useLocalStorageState<UserPreferences>(
    'user-preferences',
    {
      theme: 'light',
      fontSize: 16,
      notifications: true,
    }
  );

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <div>
      <h2>User Settings</h2>
      <button onClick={toggleTheme}>
        Toggle Theme ({preferences.theme})
      </button>
      <input
        type="number"
        value={preferences.fontSize}
        onChange={(e) => 
          setPreferences(prev => ({
            ...prev,
            fontSize: Number(e.target.value),
          }))
        }
      />
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Shopping Cart Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useLocalStorageState } from '@thibault.sh/hooks';

interface CartItem {
  id: string;
  quantity: number;
}

function ShoppingCart() {
  const [cart, setCart] = useLocalStorageState<CartItem[]>('shopping-cart', []);

  const addItem = (id: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  return (
    <div>
      <h2>Cart ({cart.length} items)</h2>
      {cart.map(item => (
        <div key={item.id}>
          Product {item.id}: {item.quantity}x
        </div>
      ))}
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>
    </div>
  );
}
