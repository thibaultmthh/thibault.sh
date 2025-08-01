/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Copy, PackageCheck, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import semver from "semver";
import { Badge } from "@/components/ui/badge";

interface VersionDiff {
  type: "major" | "minor" | "patch" | "latest" | "error";
  current: string;
  latest: string;
}

interface PackageVersion {
  current: string;
  latest: string;
  diff: VersionDiff["type"];
  loading: boolean;
  error?: string;
}

interface DependencyInfo {
  name: string;
  version: string;
  isValid: boolean;
  versionInfo: PackageVersion;
}

interface PackageAnalysis {
  dependencies: {
    count: number;
    items: DependencyInfo[];
  };
  devDependencies: {
    count: number;
    items: DependencyInfo[];
  };
  scripts: {
    count: number;
    items: { name: string; command: string }[];
  };
  metadata: {
    name?: string;
    version?: string;
    description?: string;
    author?: string;
    license?: string;
    private?: boolean;
    type?: string;
  };
  issues: string[];
}

// Add new interface for cached version info
interface CachedVersionInfo {
  version: string;
  timestamp: number;
}

// Add cache handling functions
const CACHE_KEY = "package-version-cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const getVersionCache = (): Record<string, CachedVersionInfo> => {
  const cache = localStorage.getItem(CACHE_KEY);
  return cache ? JSON.parse(cache) : {};
};

const setVersionCache = (packageName: string, version: string) => {
  const cache = getVersionCache();
  cache[packageName] = {
    version,
    timestamp: Date.now(),
  };
  console.log("Setting cache : ", cache);

  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

const clearVersionCache = () => {
  localStorage.removeItem(CACHE_KEY);
};

export default function PackageAnalyzer() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<PackageAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [filter, setFilter] = useState<VersionDiff["type"] | null>(null);

  // Update the fetchLatestVersion function to use cache
  const fetchLatestVersion = async (packageName: string): Promise<string> => {
    const cache = getVersionCache();
    console.log("Cache : ", cache);

    const cachedInfo = cache[packageName];

    if (cachedInfo && Date.now() - cachedInfo.timestamp < CACHE_DURATION) {
      return cachedInfo.version;
    }
    console.log("Not cached : ", cachedInfo);

    const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`);
    if (!response.ok) throw new Error("Package not found");
    const data = await response.json();

    // Only cache successful responses
    setVersionCache(packageName, data.version);
    return data.version;
  };

  const analyzeDependencies = (deps: Record<string, string> = {}) => {
    return Object.entries(deps).map(([name, version]) => ({
      name,
      version,
      isValid: semver.validRange(version.replace(/[~^]/, "")) !== null,
      versionInfo: {
        current: version.replace(/[~^]/, ""),
        latest: "",
        diff: "latest" as const,
        loading: false,
      },
    }));
  };

  const getVersionDiff = (current: string, latest: string): VersionDiff["type"] => {
    try {
      const cleanCurrent = semver.clean(current.replace(/[~^]/, "")) || current;
      const cleanLatest = semver.clean(latest) || latest;

      if (semver.eq(cleanCurrent, cleanLatest)) return "latest";

      if (semver.major(cleanLatest) > semver.major(cleanCurrent)) {
        return "major";
      }
      if (semver.minor(cleanLatest) > semver.minor(cleanCurrent)) {
        return "minor";
      }
      if (semver.patch(cleanLatest) > semver.patch(cleanCurrent)) {
        return "patch";
      }

      return "latest";
    } catch {
      return "error";
    }
  };

  // Update the checkOutdatedPackages function
  const checkOutdatedPackages = useCallback(
    async (analysis: PackageAnalysis) => {
      setIsChecking(true);

      const checkDependencies = async (deps: DependencyInfo[]) => {
        return Promise.all(
          deps.map(async (dep) => {
            // Skip workspace packages
            if (dep.version.startsWith("workspace:")) {
              dep.versionInfo = {
                current: dep.version,
                latest: "workspace package",
                diff: "latest",
                loading: false,
              };
              setAnalysis({ ...analysis });
              return dep;
            }

            try {
              dep.versionInfo.loading = true;
              setAnalysis({ ...analysis });

              const latestVersion = await fetchLatestVersion(dep.name);
              const diffType = getVersionDiff(dep.version, latestVersion);

              dep.versionInfo = {
                current: dep.version.replace(/[~^]/, ""),
                latest: latestVersion,
                diff: diffType,
                loading: false,
              };
            } catch {
              dep.versionInfo = {
                ...dep.versionInfo,
                error: "Failed to fetch",
                diff: "error",
                loading: false,
              };
            }
            setAnalysis({ ...analysis });
            return dep;
          })
        );
      };

      try {
        await Promise.all([
          checkDependencies(analysis.dependencies.items),
          checkDependencies(analysis.devDependencies.items),
        ]);
      } finally {
        setIsChecking(false);
      }
    },
    [setIsChecking]
  );

  const analyzePackageJson = useCallback(
    (providedPkg?: any) => {
      try {
        let pkg;
        if (providedPkg) {
          pkg = providedPkg;
        } else {
          const trimmedInput = input.trim();
          if (!trimmedInput) {
            setError("Please enter package.json content");
            return;
          }
          pkg = JSON.parse(trimmedInput);
        }

        // Save the input string instead of the parsed object
        if (!providedPkg) {
          localStorage.setItem("package-analyzer-json", input);
        }

        console.log(pkg);

        const issues: string[] = [];

        // Basic validation
        if (!pkg.name) issues.push("Missing package name");
        if (!pkg.version) issues.push("Missing package version");
        if (pkg.version && !semver.valid(pkg.version)) {
          issues.push("Invalid package version format");
        }

        // Analyze dependencies
        const dependencies = analyzeDependencies(pkg.dependencies);
        const devDependencies = analyzeDependencies(pkg.devDependencies);

        // Check for invalid versions
        dependencies.forEach((dep) => {
          if (!dep.isValid) issues.push(`Invalid version format for dependency: ${dep.name}`);
        });
        devDependencies.forEach((dep) => {
          if (!dep.isValid) issues.push(`Invalid version format for devDependency: ${dep.name}`);
        });

        // Scripts analysis
        const scripts = Object.entries(pkg.scripts || {}).map(([name, command]) => ({
          name,
          command: command as string,
        }));

        const analysis: PackageAnalysis = {
          dependencies: {
            count: dependencies.length,
            items: dependencies,
          },
          devDependencies: {
            count: devDependencies.length,
            items: devDependencies,
          },
          scripts: {
            count: scripts.length,
            items: scripts,
          },
          metadata: {
            name: pkg.name,
            version: pkg.version,
            description: pkg.description,
            author: pkg.author,
            license: pkg.license,
            private: pkg.private,
            type: pkg.type,
          },
          issues,
        };

        setAnalysis(analysis);
        setError(null);

        // Automatically check for outdated packages after analysis
        checkOutdatedPackages(analysis);
      } catch (err) {
        console.log(err);

        setError("Invalid JSON format");
        setAnalysis(null);
      }
    },
    [checkOutdatedPackages, input]
  );

  const clearSavedData = () => {
    localStorage.removeItem("package-analyzer-json");
    setInput("");
    setAnalysis(null);
    setError(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const savedJson = localStorage.getItem("package-analyzer-json");
    if (savedJson) {
      setInput(savedJson);
      // Optionally auto-analyze the saved JSON
      try {
        const pkg = JSON.parse(savedJson);
        analyzePackageJson(pkg);
      } catch {
        // Silently fail if the saved JSON is invalid
      }
    }
  }, [analyzePackageJson]);

  const EXAMPLE_PACKAGE = {
    name: "my-project",
    version: "1.0.0",
    description: "A sample Node.js project",
    main: "index.js",
    scripts: {
      test: "jest",
      build: "tsc",
      start: "node dist/index.js",
      dev: "nodemon src/index.ts",
    },
    dependencies: {
      express: "^4.18.2",
      react: "^18.2.0",
      typescript: "~5.0.4",
    },
    devDependencies: {
      "@types/node": "^18.0.0",
      jest: "^29.5.0",
      nodemon: "^2.0.22",
    },
    author: "John Doe",
    license: "MIT",
  };

  const renderVersionBadge = (versionInfo: PackageVersion) => {
    const badgeProps = {
      latest: {
        variant: "secondary" as const,
        children: "Latest",
      },
      major: {
        variant: "destructive" as const,
        children: `Major update: ${versionInfo.latest}`,
      },
      minor: {
        variant: "warning" as const,
        children: `Minor update: ${versionInfo.latest}`,
      },
      patch: {
        variant: "outline" as const,
        children: `Patch: ${versionInfo.latest}`,
      },
      error: {
        variant: "destructive" as const,
        children: "Error checking",
      },
    };

    const props = badgeProps[versionInfo.diff];
    return <Badge {...props} className="text-xs" />;
  };

  const renderDependencyVersion = (dep: DependencyInfo) => {
    if (dep.versionInfo.loading) {
      return (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{dep.version}</span>
          <Loader2 className="h-3 w-3 animate-spin" />
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{dep.version}</span>
        {renderVersionBadge(dep.versionInfo)}
      </div>
    );
  };

  // Update the dependencies and devDependencies tabs content
  const renderDependenciesList = (deps: DependencyInfo[]) => (
    <div className="space-y-2">
      {deps
        .filter((dep) => !filter || dep.versionInfo.diff === filter)
        .map((dep) => (
          <div key={dep.name} className="flex justify-between items-center p-2 bg-muted rounded-md">
            <span className="font-mono text-sm">{dep.name}</span>
            {renderDependencyVersion(dep)}
          </div>
        ))}
    </div>
  );

  const renderDependencySummary = (deps: DependencyInfo[]) => {
    const summary = deps.reduce(
      (acc, dep) => {
        if (dep.versionInfo.loading) acc.loading++;
        else if (dep.versionInfo.error) acc.error++;
        else if (dep.versionInfo.diff === "major") acc.major++;
        else if (dep.versionInfo.diff === "minor") acc.minor++;
        else if (dep.versionInfo.diff === "patch") acc.patch++;
        else if (dep.versionInfo.diff === "latest") acc.latest++;
        return acc;
      },
      { major: 0, minor: 0, patch: 0, latest: 0, loading: 0, error: 0 }
    );

    const BadgeButton = ({
      type,
      count,
      variant,
    }: {
      type: VersionDiff["type"];
      count: number;
      variant: "destructive" | "warning" | "outline" | "secondary";
    }) => (
      <Badge
        variant={variant}
        className={`cursor-pointer ${filter === type ? "ring-2 ring-primary" : ""}`}
        onClick={() => setFilter(filter === type ? null : type)}
      >
        {count} {type === "latest" ? "Up to date" : `${type} updates`}
      </Badge>
    );

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {summary.major > 0 && <BadgeButton type="major" count={summary.major} variant="destructive" />}
        {summary.minor > 0 && <BadgeButton type="minor" count={summary.minor} variant="warning" />}
        {summary.patch > 0 && <BadgeButton type="patch" count={summary.patch} variant="outline" />}
        {summary.latest > 0 && <BadgeButton type="latest" count={summary.latest} variant="secondary" />}
        {summary.error > 0 && (
          <Badge
            variant="destructive"
            className={`cursor-pointer ${filter === "error" ? "ring-2 ring-primary" : ""}`}
            onClick={() => setFilter(filter === "error" ? null : "error")}
          >
            {summary.error} Errors
          </Badge>
        )}
        {summary.loading > 0 && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            {summary.loading} Loading
          </Badge>
        )}
      </div>
    );
  };

  // Add last check timestamp display
  const LastUpdateCheck = () => {
    const cache = getVersionCache();
    const timestamps = Object.values(cache).map((info) => info.timestamp);

    if (timestamps.length === 0) {
      return null;
    }

    const oldestCheck = Math.min(...timestamps);
    const timeAgo = new Date(oldestCheck).toLocaleString();

    return <div className="text-xs text-muted-foreground mb-2">Last checked: {timeAgo}</div>;
  };

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4">Package.json Analyzer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Input package.json</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setInput(JSON.stringify(EXAMPLE_PACKAGE, null, 2))}>
                Load Example
              </Button>
              {input && (
                <Button variant="outline" size="sm" onClick={clearSavedData}>
                  Clear
                </Button>
              )}
            </div>
          </div>
          <Textarea
            placeholder="Paste your package.json content here..."
            className="font-mono min-h-[400px] w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => analyzePackageJson()} className="mt-4">
            <PackageCheck className="h-4 w-4 mr-2" />
            Analyze
          </Button>
        </Card>

        <div className="space-y-6">
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            analysis && (
              <>
                {/* Metadata Card */}
                {analysis &&
                  Object.values(analysis.metadata).some((value) => value !== undefined && value !== null) && (
                    <Card className="p-4">
                      <h2 className="text-sm font-medium mb-4">Package Metadata</h2>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {analysis.metadata.name && (
                          <>
                            <div className="text-muted-foreground">Name:</div>
                            <div className="font-mono">{analysis.metadata.name}</div>
                          </>
                        )}
                        {analysis.metadata.version && (
                          <>
                            <div className="text-muted-foreground">Version:</div>
                            <div className="font-mono">{analysis.metadata.version}</div>
                          </>
                        )}
                        {analysis.metadata.description && (
                          <>
                            <div className="text-muted-foreground">Description:</div>
                            <div className="font-mono">{analysis.metadata.description}</div>
                          </>
                        )}
                        {analysis.metadata.author && (
                          <>
                            <div className="text-muted-foreground">Author:</div>
                            <div className="font-mono">{analysis.metadata.author}</div>
                          </>
                        )}
                        {analysis.metadata.license && (
                          <>
                            <div className="text-muted-foreground">License:</div>
                            <div className="font-mono">{analysis.metadata.license}</div>
                          </>
                        )}
                        {analysis.metadata.type && (
                          <>
                            <div className="text-muted-foreground">Type:</div>
                            <div className="font-mono">{analysis.metadata.type}</div>
                          </>
                        )}
                        {typeof analysis.metadata.private === "boolean" && (
                          <>
                            <div className="text-muted-foreground">Private:</div>
                            <div className="font-mono">{analysis.metadata.private ? "Yes" : "No"}</div>
                          </>
                        )}
                      </div>
                    </Card>
                  )}

                {/* Dependencies Analysis */}
                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-sm font-medium">Dependencies Analysis</h2>
                      <LastUpdateCheck />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        clearVersionCache();
                        if (analysis) {
                          checkOutdatedPackages(analysis);
                        }
                      }}
                      disabled={!analysis || isChecking}
                    >
                      {isChecking ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Checking Updates...
                        </>
                      ) : (
                        <>
                          <PackageCheck className="h-4 w-4 mr-2" />
                          Check Updates
                        </>
                      )}
                    </Button>
                  </div>

                  <Tabs defaultValue="dependencies">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="dependencies">Dependencies ({analysis?.dependencies.count})</TabsTrigger>
                      <TabsTrigger value="devDependencies">
                        Dev Dependencies ({analysis?.devDependencies.count})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dependencies" className="mt-4">
                      {analysis && (
                        <>
                          {renderDependencySummary(analysis.dependencies.items)}
                          {renderDependenciesList(analysis.dependencies.items)}
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="devDependencies" className="mt-4">
                      {analysis && (
                        <>
                          {renderDependencySummary(analysis.devDependencies.items)}
                          {renderDependenciesList(analysis.devDependencies.items)}
                        </>
                      )}
                    </TabsContent>
                  </Tabs>
                </Card>

                {/* Scripts */}
                <Card className="p-4">
                  <h2 className="text-sm font-medium mb-4">Scripts ({analysis.scripts.count})</h2>
                  <div className="space-y-2">
                    {analysis.scripts.items.map((script) => (
                      <div key={script.name} className="flex justify-between items-center p-2 bg-muted rounded-md">
                        <span className="font-mono text-sm">{script.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{script.command}</span>
                          <Button variant="ghost" size="sm" onClick={() => handleCopy(`npm run ${script.name}`)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Issues */}
                {analysis.issues.length > 0 && (
                  <Card className="p-4">
                    <h2 className="text-sm font-medium mb-4">Issues Found</h2>
                    <div className="space-y-2">
                      {analysis.issues.map((issue, index) => (
                        <Alert key={index} variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{issue}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
