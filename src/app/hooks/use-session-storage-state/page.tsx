import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionStorageDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseSessionStorageStateDoc() {
  const jsDocExample = `/**
 * Hook for managing state persisted in sessionStorage
 * @param {string} key - The sessionStorage key
 * @param {T} initialValue - The initial value to use if no value exists in storage
 * @returns A tuple containing the current value and a setter function
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useSessionStorageState</h1>
          <Badge variant="outline">State Management</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that persists state in sessionStorage, maintaining data for the duration of a page session.
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
            <SessionStorageDemo />
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
          code={`import { useSessionStorageState } from '@thibault.sh/hooks/useSessionStorageState';

function FormWithAutosave() {
  const [formData, setFormData] = useSessionStorageState('form-draft', {
    title: '',
    content: ''
  });
  
  return (
    <form>
      <input
        value={formData.title}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          title: e.target.value
        }))}
        placeholder="Title"
      />
      <textarea
        value={formData.content}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          content: e.target.value
        }))}
        placeholder="Content"
      />
    </form>
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
                <strong>Session Persistence</strong>
                <p className="text-sm text-muted-foreground">Data persists until the browser tab is closed</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Page Refresh Safe</strong>
                <p className="text-sm text-muted-foreground">State survives page refreshes</p>
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
        <h2 className="text-xl font-semibold">Form Draft Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useSessionStorageState } from '@thibault.sh/hooks';

interface FormDraft {
  title: string;
  content: string;
  lastSaved: string;
}

function BlogPostEditor() {
  const [draft, setDraft] = useSessionStorageState<FormDraft>(
    'blog-post-draft',
    {
      title: '',
      content: '',
      lastSaved: new Date().toISOString()
    }
  );

  const updateDraft = (updates: Partial<FormDraft>) => {
    setDraft(prev => ({
      ...prev,
      ...updates,
      lastSaved: new Date().toISOString()
    }));
  };

  return (
    <div>
      <h2>Draft Post</h2>
      <p>Last saved: {new Date(draft.lastSaved).toLocaleString()}</p>
      <input
        value={draft.title}
        onChange={(e) => updateDraft({ title: e.target.value })}
        placeholder="Post title"
      />
      <textarea
        value={draft.content}
        onChange={(e) => updateDraft({ content: e.target.value })}
        placeholder="Write your post..."
      />
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Wizard Form Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useSessionStorageState } from '@thibault.sh/hooks';

interface WizardState {
  currentStep: number;
  steps: {
    personalInfo: {
      name: string;
      email: string;
    };
    preferences: {
      newsletter: boolean;
      theme: string;
    };
  };
}

function FormWizard() {
  const [wizardState, setWizardState] = useSessionStorageState<WizardState>(
    'wizard-state',
    {
      currentStep: 1,
      steps: {
        personalInfo: { name: '', email: '' },
        preferences: { newsletter: false, theme: 'light' }
      }
    }
  );

  const nextStep = () => {
    setWizardState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }));
  };

  return (
    <div>
      <h2>Step {wizardState.currentStep} of 2</h2>
      {wizardState.currentStep === 1 ? (
        <div>
          <input
            value={wizardState.steps.personalInfo.name}
            onChange={(e) => 
              setWizardState(prev => ({
                ...prev,
                steps: {
                  ...prev.steps,
                  personalInfo: {
                    ...prev.steps.personalInfo,
                    name: e.target.value
                  }
                }
              }))
            }
            placeholder="Name"
          />
          <button onClick={nextStep}>Next</button>
        </div>
      ) : (
        <div>
          <select
            value={wizardState.steps.preferences.theme}
            onChange={(e) =>
              setWizardState(prev => ({
                ...prev,
                steps: {
                  ...prev.steps,
                  preferences: {
                    ...prev.steps.preferences,
                    theme: e.target.value
                  }
                }
              }))
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
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
