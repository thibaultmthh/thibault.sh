"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Copy, ArrowLeftRight, HardDrive } from "lucide-react";

type Unit = "bit" | "byte" | "kb" | "mb" | "gb" | "tb" | "pb" | "eb" | "zb" | "yb";
type CalculationType = "binary" | "decimal";

interface UnitInfo {
  name: string;
  symbol: string;
  binaryMultiplier: number;
  decimalMultiplier: number;
  description: string;
}

const UNITS: Record<Unit, UnitInfo> = {
  bit: {
    name: "Bit",
    symbol: "bit",
    binaryMultiplier: 1 / 8,
    decimalMultiplier: 1 / 8,
    description: "Smallest unit of data",
  },
  byte: {
    name: "Byte",
    symbol: "B",
    binaryMultiplier: 1,
    decimalMultiplier: 1,
    description: "8 bits",
  },
  kb: {
    name: "Kilobyte",
    symbol: "KB",
    binaryMultiplier: 1024,
    decimalMultiplier: 1000,
    description: "1024 bytes (binary) / 1000 bytes (decimal)",
  },
  mb: {
    name: "Megabyte",
    symbol: "MB",
    binaryMultiplier: 1024 ** 2,
    decimalMultiplier: 1000 ** 2,
    description: "1024² bytes (binary) / 1000² bytes (decimal)",
  },
  gb: {
    name: "Gigabyte",
    symbol: "GB",
    binaryMultiplier: 1024 ** 3,
    decimalMultiplier: 1000 ** 3,
    description: "1024³ bytes (binary) / 1000³ bytes (decimal)",
  },
  tb: {
    name: "Terabyte",
    symbol: "TB",
    binaryMultiplier: 1024 ** 4,
    decimalMultiplier: 1000 ** 4,
    description: "1024⁴ bytes (binary) / 1000⁴ bytes (decimal)",
  },
  pb: {
    name: "Petabyte",
    symbol: "PB",
    binaryMultiplier: 1024 ** 5,
    decimalMultiplier: 1000 ** 5,
    description: "1024⁵ bytes (binary) / 1000⁵ bytes (decimal)",
  },
  eb: {
    name: "Exabyte",
    symbol: "EB",
    binaryMultiplier: 1024 ** 6,
    decimalMultiplier: 1000 ** 6,
    description: "1024⁶ bytes (binary) / 1000⁶ bytes (decimal)",
  },
  zb: {
    name: "Zettabyte",
    symbol: "ZB",
    binaryMultiplier: 1024 ** 7,
    decimalMultiplier: 1000 ** 7,
    description: "1024⁷ bytes (binary) / 1000⁷ bytes (decimal)",
  },
  yb: {
    name: "Yottabyte",
    symbol: "YB",
    binaryMultiplier: 1024 ** 8,
    decimalMultiplier: 1000 ** 8,
    description: "1024⁸ bytes (binary) / 1000⁸ bytes (decimal)",
  },
};

interface ConversionResult {
  unit: Unit;
  value: string;
  formattedValue: string;
}

export default function DataSizeConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [inputUnit, setInputUnit] = useState<Unit>("gb");
  const [calculationType, setCalculationType] = useState<CalculationType>("binary");
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";

    // For very small numbers
    if (num < 0.001) {
      return num.toExponential(3);
    }

    // For numbers less than 1
    if (num < 1) {
      return num.toFixed(6).replace(/\.?0+$/, "");
    }

    // For large numbers
    if (num >= 1e15) {
      return num.toExponential(3);
    }

    // For regular numbers
    if (num >= 1000) {
      return num.toLocaleString("en-US", { maximumFractionDigits: 3 });
    }

    return num.toFixed(3).replace(/\.?0+$/, "");
  };

  const getFormattedValue = (num: number, unit: Unit): string => {
    const unitInfo = UNITS[unit];
    const formatted = formatNumber(num);
    return `${formatted} ${unitInfo.symbol}`;
  };

  const convertValue = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) {
      setResults([]);
      return;
    }

    const inputUnitInfo = UNITS[inputUnit];
    const multiplier = calculationType === "binary" ? inputUnitInfo.binaryMultiplier : inputUnitInfo.decimalMultiplier;

    // Convert input to bytes first
    const valueInBytes = value * multiplier;

    const conversions: ConversionResult[] = (Object.keys(UNITS) as Unit[]).map((unit) => {
      const targetUnitInfo = UNITS[unit];
      const targetMultiplier =
        calculationType === "binary" ? targetUnitInfo.binaryMultiplier : targetUnitInfo.decimalMultiplier;

      const convertedValue = valueInBytes / targetMultiplier;

      return {
        unit,
        value: convertedValue.toString(),
        formattedValue: getFormattedValue(convertedValue, unit),
      };
    });

    setResults(conversions);
  };

  useEffect(() => {
    convertValue();
  }, [inputValue, inputUnit, calculationType]);

  const handleCopy = async (text: string, unit: Unit) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(unit);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const swapCalculationType = () => {
    setCalculationType(calculationType === "binary" ? "decimal" : "binary");
  };

  const loadExample = (example: "file" | "storage" | "memory" | "internet") => {
    const examples = {
      file: { value: "2.5", unit: "gb" as Unit },
      storage: { value: "500", unit: "gb" as Unit },
      memory: { value: "16", unit: "gb" as Unit },
      internet: { value: "100", unit: "mb" as Unit },
    };

    const ex = examples[example];
    setInputValue(ex.value);
    setInputUnit(ex.unit);
  };

  const getUnitColor = (unit: Unit) => {
    const colors = {
      bit: "text-gray-600",
      byte: "text-blue-600",
      kb: "text-green-600",
      mb: "text-yellow-600",
      gb: "text-orange-600",
      tb: "text-red-600",
      pb: "text-purple-600",
      eb: "text-pink-600",
      zb: "text-indigo-600",
      yb: "text-cyan-600",
    };
    return colors[unit] || "text-gray-600";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Data Size Converter</h1>

      <div className="">
        {/* Input Controls */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Input Value */}
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                min="0"
                step="any"
              />
            </div>

            {/* Input Unit */}
            <div className="space-y-2">
              <Label>From Unit</Label>
              <Select value={inputUnit} onValueChange={(value: Unit) => setInputUnit(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(UNITS) as Unit[]).map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {UNITS[unit].name} ({UNITS[unit].symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Calculation Type */}
            <div className="space-y-2">
              <Label>Calculation Type</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={swapCalculationType} className="flex-1">
                  {calculationType === "binary" ? "Binary (1024)" : "Decimal (1000)"}
                  <ArrowLeftRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="flex gap-2 flex-wrap">
            <Label className="self-center">Quick Examples:</Label>
            <Button variant="outline" size="sm" onClick={() => loadExample("file")}>
              Movie File (2.5 GB)
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadExample("storage")}>
              SSD Storage (500 GB)
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadExample("memory")}>
              RAM (16 GB)
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadExample("internet")}>
              Internet Speed (100 MB)
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="grid gap-4">
          {results.map((result) => {
            const unitInfo = UNITS[result.unit];
            const isCurrentInput = result.unit === inputUnit;

            return (
              <Card
                key={result.unit}
                className={`p-4 transition-all ${isCurrentInput ? "ring-2 ring-orange-500 bg-orange-50" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`text-2xl font-bold ${getUnitColor(result.unit)}`}>{unitInfo.symbol}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{unitInfo.name}</h3>
                      <p className="text-sm text-muted-foreground">{unitInfo.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-mono font-bold">{result.formattedValue}</div>
                      {result.unit !== "bit" && result.unit !== "byte" && (
                        <div className="text-sm text-muted-foreground">
                          {calculationType === "binary" ? "1024-based" : "1000-based"}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(result.formattedValue, result.unit)}
                    className="ml-2"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                {copied === result.unit && <div className="mt-2 text-sm text-green-600 font-medium">Copied!</div>}
              </Card>
            );
          })}
        </div>

        {results.length === 0 && (
          <Card className="p-8 text-center">
            <HardDrive className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Enter a value to see conversions</p>
          </Card>
        )}

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            About Data Size Conversion
          </h2>
          <Tabs defaultValue="binary-decimal" className="w-full">
            <TabsList>
              <TabsTrigger value="binary-decimal">Binary vs Decimal</TabsTrigger>
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="binary-decimal" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Binary (Base 1024)</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Used by operating systems and file managers</li>
                    <li>• 1 KB = 1024 bytes</li>
                    <li>• 1 MB = 1024 KB = 1,048,576 bytes</li>
                    <li>• More accurate for computer memory calculations</li>
                    <li>• Sometimes called "binary prefixes" (KiB, MiB, GiB)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Decimal (Base 1000)</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Used by storage manufacturers and network speeds</li>
                    <li>• 1 KB = 1000 bytes</li>
                    <li>• 1 MB = 1000 KB = 1,000,000 bytes</li>
                    <li>• SI standard (International System of Units)</li>
                    <li>• Why a "1TB" drive shows as ~931GB in your OS</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="use-cases" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">When to use Binary:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• RAM and memory calculations</li>
                    <li>• File system storage</li>
                    <li>• Programming and system administration</li>
                    <li>• Computer architecture</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">When to use Decimal:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Storage device capacity (HDD, SSD)</li>
                    <li>• Network bandwidth and speed</li>
                    <li>• Marketing and sales specifications</li>
                    <li>• International standards compliance</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="mt-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Storage manufacturers use decimal, so your 1TB drive appears as ~931GB</li>
                <li>• RAM is always calculated in binary (1GB RAM = 1024³ bytes)</li>
                <li>• Internet speeds are typically measured in decimal bits per second</li>
                <li>• When in doubt, check if you're dealing with storage (decimal) or memory (binary)</li>
                <li>• Use binary for precise file size calculations in programming</li>
              </ul>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
