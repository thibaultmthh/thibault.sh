"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, PackageCheck, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

interface RequirementsAnalysis {
  dependencies: {
    count: number;
    items: DependencyInfo[];
  };
  issues: string[];
}

interface CachedVersionInfo {
  version: string;
  timestamp: number;
}

const CACHE_KEY = "pypi-version-cache";
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
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

const clearVersionCache = () => {
  localStorage.removeItem(CACHE_KEY);
};

function parseRequirementLine(line: string): { name: string; version?: string } {
  // Remove comments and whitespace
  line = line.split("#")[0].trim();
  if (!line) return { name: "" };

  // Match package name and version specifier more accurately
  const match = line.match(/^([a-zA-Z0-9\-._]+)\s*(?:([<>=~!]=|>=|>|<|<=)\s*([\d.*]+))?/);

  if (!match) return { name: "" };

  const name = match[1];
  const version = match[3]; // This will be undefined if no version specified

  return { name, version };
}

// UI Components
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
      variant: "outline-solid" as const,
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

const EXAMPLE_REQUIREMENTS = `
django>=4.2.0
requests==2.31.0
pandas~=2.0.0
numpy>=1.24.0
pytest>=7.3.1
black==23.3.0
  `.trim();

export default function RequirementsAnalyzer() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<RequirementsAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [filter, setFilter] = useState<VersionDiff["type"] | null>(null);

  // Add useEffect to load saved content
  useEffect(() => {
    const savedContent = localStorage.getItem("requirements-analyzer-content");
    if (savedContent) {
      setInput(savedContent);
      // Optionally auto-analyze the saved content
      analyzeRequirements(savedContent);
    }
  }, []);

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
      variant: "destructive" | "warning" | "outline-solid" | "secondary";
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

  const checkOutdatedPackages = async (analysis: RequirementsAnalysis) => {
    setIsChecking(true);

    try {
      await Promise.all(
        analysis.dependencies.items.map(async (dep) => {
          try {
            dep.versionInfo.loading = true;
            setAnalysis({ ...analysis });

            const latestVersion = await fetchLatestVersion(dep.name);
            const diffType = getVersionDiff(dep.version, latestVersion);

            dep.versionInfo = {
              current: dep.version,
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
        })
      );
    } finally {
      setIsChecking(false);
    }
  };

  const clearSavedData = () => {
    localStorage.removeItem("requirements-analyzer-content");
    setInput("");
    setAnalysis(null);
    setError(null);
  };

  // Parse version constraints like >=1.0.0, ==1.0.0, ~=1.0.0
  const parseVersion = (version: string) => {
    const versionRegex = /([<>=~!]+)?([\d.*]+)/;
    const match = version.trim().match(versionRegex);
    return match ? match[2] : version;
  };

  const getVersionDiff = (current: string, latest: string): VersionDiff["type"] => {
    if (current === latest) return "latest";

    const currentParts = current.split(".").map(Number);
    const latestParts = latest.split(".").map(Number);

    if (latestParts[0] > currentParts[0]) return "major";
    if (latestParts[1] > currentParts[1]) return "minor";
    if (latestParts[2] > currentParts[2]) return "patch";

    return "latest";
  };

  const fetchLatestVersion = async (packageName: string): Promise<string> => {
    const cache = getVersionCache();
    const cachedInfo = cache[packageName];

    if (cachedInfo && Date.now() - cachedInfo.timestamp < CACHE_DURATION) {
      return cachedInfo.version;
    }

    const response = await fetch(`https://pypi.org/pypi/${packageName}/json`);
    if (!response.ok) throw new Error("Package not found");
    const data = await response.json();

    setVersionCache(packageName, data.info.version);
    return data.info.version;
  };

  const analyzeDependencies = (requirements: string) => {
    const lines = requirements.split("\n");
    return lines
      .map((line) => {
        const { name, version } = parseRequirementLine(line);
        if (!name) return null;

        const cleanVersion = version ? parseVersion(version) : "*";
        return {
          name,
          version: cleanVersion,
          isValid: true,
          versionInfo: {
            current: cleanVersion,
            latest: "",
            diff: "latest" as VersionDiff["type"],
            loading: false,
          },
        };
      })
      .filter((dep): dep is DependencyInfo => dep !== null);
  };

  const analyzeRequirements = (providedReqs?: string) => {
    try {
      const reqs = providedReqs || input.trim();
      if (!reqs) {
        setError("Please enter requirements.txt content");
        return;
      }

      // Save the input
      localStorage.setItem("requirements-analyzer-content", reqs);

      const issues: string[] = [];
      const dependencies = analyzeDependencies(reqs);

      const analysis: RequirementsAnalysis = {
        dependencies: {
          count: dependencies.length,
          items: dependencies,
        },
        issues,
      };

      setAnalysis(analysis);
      setError(null);

      // Automatically check for outdated packages
      checkOutdatedPackages(analysis);
    } catch (err) {
      console.error(err);
      setError("Invalid requirements.txt format");
      setAnalysis(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Requirements.txt Analyzer</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Input requirements.txt</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setInput(EXAMPLE_REQUIREMENTS)}>
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
            placeholder="Paste your requirements.txt content here..."
            className="font-mono min-h-[400px] w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => analyzeRequirements()} className="mt-4">
            <PackageCheck className="h-4 w-4 mr-2" />
            Analyze
          </Button>
        </Card>

        <div className="space-y-6 col-span-2">
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            analysis && (
              <>
                {/* Dependencies Analysis */}
                <Card className="p-4 ">
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

                  {analysis && (
                    <>
                      {renderDependencySummary(analysis.dependencies.items)}
                      {renderDependenciesList(analysis.dependencies.items)}
                    </>
                  )}
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
