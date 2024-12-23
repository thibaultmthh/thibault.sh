"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryParamsDemo, demoSource } from "./page.demo";
import APIFromJSDoc from "@/components/APIFromJSDoc";

export default function UseQueryParamsStateDoc() {
  const jsDocExample = `/**
 * Hook for managing state persisted in URL query parameters
 * @param {string} key - The query parameter key
 * @param {T} initialValue - The initial value to use if the parameter doesn't exist
 * @param {Object} options - Configuration options
 * @param {(value: T) => string} options.serialize - Function to convert value to string (default: JSON.stringify)
 * @param {(value: string) => T} options.deserialize - Function to parse string back to value (default: JSON.parse)
 * @returns A tuple containing the current value and a setter function
 */`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">useQueryParamsState</h1>
          <Badge variant="outline">State Management</Badge>
        </div>
        <p className="text-base text-muted-foreground">
          A React hook that manages state in URL query parameters, perfect for shareable and bookmarkable UI states.
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
            <QueryParamsDemo />
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
          code={`import { useQueryParamsState } from '@thibault.sh/hooks/useQueryParamsState';

function SearchPage() {
  const [searchParams, setSearchParams] = useQueryParamsState('q', {
    query: '',
    page: 1,
    limit: 10
  });
  
  return (
    <div>
      <input
        value={searchParams.query}
        onChange={(e) => setSearchParams(prev => ({
          ...prev,
          query: e.target.value,
          page: 1 // Reset page when query changes
        }))}
        placeholder="Search..."
      />
      <div>
        Page {searchParams.page} of results
        <button onClick={() => setSearchParams(prev => ({
          ...prev,
          page: prev.page + 1
        }))}>
          Next Page
        </button>
      </div>
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

      {/* Custom Serialization */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Custom Serialization</h2>
        <Card className="p-6">
          <CodeBlock
            language="typescript"
            code={`// Example with custom serialization for dates
const [dateRange, setDateRange] = useQueryParamsState(
  'range',
  {
    start: new Date(),
    end: new Date()
  },
  {
    serialize: (value) => ({
      start: value.start.toISOString(),
      end: value.end.toISOString()
    }),
    deserialize: (value) => ({
      start: new Date(value.start),
      end: new Date(value.end)
    })
  }
);`}
          />
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
                <strong>URL Persistence</strong>
                <p className="text-sm text-muted-foreground">
                  State is stored in the URL, making it shareable and bookmarkable
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <div>
                <strong>Custom Serialization</strong>
                <p className="text-sm text-muted-foreground">
                  Support for custom serialization and deserialization of complex data types
                </p>
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
                <strong>Browser History Integration</strong>
                <p className="text-sm text-muted-foreground">Works seamlessly with browser history and navigation</p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Table View Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useQueryParamsState } from '@thibault.sh/hooks';

interface TableState {
  page: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  filters: Record<string, string>;
}

function DataTable() {
  const [tableState, setTableState] = useQueryParamsState<TableState>(
    'table',
    {
      page: 1,
      pageSize: 10,
      sortColumn: 'id',
      sortDirection: 'asc',
      filters: {}
    }
  );

  const handleSort = (column: string) => {
    setTableState(prev => ({
      ...prev,
      sortColumn: column,
      sortDirection: prev.sortColumn === column && prev.sortDirection === 'asc'
        ? 'desc'
        : 'asc'
    }));
  };

  const handleFilter = (column: string, value: string) => {
    setTableState(prev => ({
      ...prev,
      page: 1, // Reset to first page when filtering
      filters: {
        ...prev.filters,
        [column]: value
      }
    }));
  };

  return (
    <div>
      {/* Table implementation */}
    </div>
  );
}`}
            language="typescript"
          />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Map View Example</h2>
        <Card className="p-4 text-sm">
          <CodeBlock
            code={`import { useQueryParamsState } from '@thibault.sh/hooks';

interface MapViewState {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  layers: string[];
}

function MapView() {
  const [mapState, setMapState] = useQueryParamsState<MapViewState>(
    'map',
    {
      center: { lat: 0, lng: 0 },
      zoom: 2,
      layers: ['terrain']
    },
    {
      // Custom serialization to make URLs cleaner
      serialize: (value) => ({
        c: \`\${value.center.lat},\${value.center.lng}\`,
        z: value.zoom,
        l: value.layers.join(',')
      }),
      deserialize: (value) => ({
        center: {
          lat: parseFloat(value.c.split(',')[0]),
          lng: parseFloat(value.c.split(',')[1])
        },
        zoom: parseInt(value.z),
        layers: value.l.split(',')
      })
    }
  );

  const handleMapMove = (newCenter: { lat: number; lng: number }) => {
    setMapState(prev => ({
      ...prev,
      center: newCenter
    }));
  };

  const toggleLayer = (layer: string) => {
    setMapState(prev => ({
      ...prev,
      layers: prev.layers.includes(layer)
        ? prev.layers.filter(l => l !== layer)
        : [...prev.layers, layer]
    }));
  };

  return (
    <div>
      {/* Map implementation */}
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
