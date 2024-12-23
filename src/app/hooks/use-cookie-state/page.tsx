import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CookieStateDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseCookieStateDoc() {
  const jsDocExample = `/**
 * Hook for managing state persisted in a browser cookie
 * @param {string} name - The name of the cookie
 * @param {string} initialValue - The initial value to use if no cookie exists
 * @returns {[string | null, (newValue: string, options?: CookieOptions) => void, () => void]} A tuple containing:
 * - The current cookie value (or null if not set)
 * - A function to update the cookie value and its options
 * - A function to delete the cookie
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useCookieState</h1>
          <Badge variant="outline">State Management</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that manages state in browser cookies, with support for cookie options and expiration.
        </p>
      </div>

      {/* Demo section with tabs */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Demo</h2>
        <Tabs defaultValue="preview" className="space-y-3">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <CookieStateDemo />
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
          code={`import { useCookieState } from '@thibault.sh/hooks/useCookieState';

function ConsentBanner() {
  const [consent, setConsent, deleteConsent] = useCookieState('cookie-consent', 'pending');
  
  const acceptAll = () => {
    setConsent('accepted', {
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      path: '/',
      secure: true,
      sameSite: 'strict'
    });
  };

  if (consent === 'accepted') {
    return null;
  }

  return (
    <div className="banner">
      <p>We use cookies to improve your experience</p>
      <button onClick={acceptAll}>Accept All</button>
      <button onClick={() => setConsent('minimal')}>Accept Necessary Only</button>
    </div>
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

      {/* Cookie Options */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cookie Options</h2>
        <Card className="p-6">
          <CodeBlock
            language="typescript"
            code={`interface CookieOptions {
  path?: string;        // Cookie path (default: current path)
  // Additional options may be available - check the implementation
}`}
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Note: Additional cookie options may be available. Please refer to the implementation or types for the
            complete list of supported options.
          </p>
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
                <strong>Cookie Management</strong>
                <p className="text-sm text-muted-foreground">Full control over cookie attributes and expiration</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Browser Persistence</strong>
                <p className="text-sm text-muted-foreground">State persists across browser sessions and restarts</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Security Options</strong>
                <p className="text-sm text-muted-foreground">Support for secure, httpOnly, and sameSite attributes</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Delete Support</strong>
                <p className="text-sm text-muted-foreground">Built-in function to remove cookies when needed</p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Language Preference Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useCookieState } from '@thibault.sh/hooks';

function LanguageSelector() {
  const [language, setLanguage, resetLanguage] = useCookieState(
    'preferred-language',
    'en'
  );

  const updateLanguage = (newLang: string) => {
    setLanguage(newLang, {
      path: '/'
    });
    window.location.reload();
  };

  return (
    <div>
      <select 
        value={language || 'en'} 
        onChange={(e) => updateLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
      <button onClick={resetLanguage}>
        Reset to Browser Default
      </button>
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Authentication Token Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useCookieState } from '@thibault.sh/hooks';

function AuthManager() {
  const [token, setToken, removeToken] = useCookieState('auth-token', '');

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      const { token } = await response.json();
      
      setToken(token, {
        path: '/'
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    removeToken();
    window.location.href = '/login';
  };

  return (
    <div>
      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login({ username: 'test', password: 'test' })}>
          Login
        </button>
      )}
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
