"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback } from "react";
import { Copy, ArrowLeftRight, ArrowLeft, Ruler, ExternalLink } from "lucide-react";
import Link from "next/link";

interface UnitInfo {
  name: string;
  rate: number;
}

interface TypeInfo {
  name: string;
  units: Record<string, UnitInfo>;
}

interface ConversionClientProps {
  type: string;
  from: string;
  to: string;
  typeInfo: TypeInfo;
}

export default function ConversionClient({ type, from, to, typeInfo }: ConversionClientProps) {
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";

    // For very small numbers
    if (num < 0.0001) {
      return num.toExponential(3);
    }

    // For numbers less than 1
    if (num < 1) {
      return num.toFixed(6).replace(/\.?0+$/, "");
    }

    // For large numbers
    if (num >= 1e12) {
      return num.toExponential(3);
    }

    // For regular numbers
    if (num >= 1000) {
      return num.toLocaleString("en-US", { maximumFractionDigits: 6 });
    }

    return num.toFixed(6).replace(/\.?0+$/, "");
  };

  const convertValue = useCallback(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) {
      setResult("");
      return;
    }

    if (type === "temperature") {
      let celsius: number;
      // Convert to Celsius first
      switch (from) {
        case "f":
          celsius = (value - 32) * (5 / 9);
          break;
        case "k":
          celsius = value - 273.15;
          break;
        default:
          celsius = value;
      }

      // Convert from Celsius to target unit
      let resultValue: number;
      switch (to) {
        case "f":
          resultValue = celsius * (9 / 5) + 32;
          break;
        case "k":
          resultValue = celsius + 273.15;
          break;
        default:
          resultValue = celsius;
      }
      setResult(formatNumber(resultValue));
    } else {
      const fromRate = typeInfo.units[from].rate;
      const toRate = typeInfo.units[to].rate;
      const resultValue = (value * fromRate) / toRate;
      setResult(formatNumber(resultValue));
    }
  }, [from, inputValue, to, type, typeInfo.units]);

  useEffect(() => {
    convertValue();
  }, [inputValue, from, to, convertValue]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const swapUnits = () => {
    window.location.href = `/tools/utilities/unit-converter/${type}/${to}-to-${from}`;
  };

  const fromUnit = typeInfo.units[from];
  const toUnit = typeInfo.units[to];

  // Generate conversion examples
  const getConversionExamples = () => {
    const examples = [];
    const testValues = [1, 5, 10, 100];

    for (const testValue of testValues) {
      let convertedValue: number;

      if (type === "temperature") {
        let celsius: number;
        switch (from) {
          case "f":
            celsius = (testValue - 32) * (5 / 9);
            break;
          case "k":
            celsius = testValue - 273.15;
            break;
          default:
            celsius = testValue;
        }

        switch (to) {
          case "f":
            convertedValue = celsius * (9 / 5) + 32;
            break;
          case "k":
            convertedValue = celsius + 273.15;
            break;
          default:
            convertedValue = celsius;
        }
      } else {
        const fromRate = fromUnit.rate;
        const toRate = toUnit.rate;
        convertedValue = (testValue * fromRate) / toRate;
      }

      examples.push({
        input: testValue,
        output: formatNumber(convertedValue),
      });
    }

    return examples;
  };

  const examples = getConversionExamples();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Link href="/tools/utilities/unit-converter">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Unit Converter
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        Convert {fromUnit.name} to {toUnit.name}
      </h1>
      <p className="text-muted-foreground mb-6">
        Convert {fromUnit.name} to {toUnit.name} with precision. Instant {typeInfo.name.toLowerCase()} conversion tool.
      </p>

      <div className="grid gap-6">
        {/* Main Conversion Card */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Value in {fromUnit.name}</Label>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                min="0"
                step="any"
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label>Quick Actions</Label>
              <Button variant="outline" onClick={swapUnits} className="w-full">
                Swap Units
                <ArrowLeftRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Result Display */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <div className="text-sm text-muted-foreground mb-2">Result</div>
            <div className="text-3xl font-mono font-bold mb-4">
              {result || "Enter a value above"} {result && toUnit.name}
            </div>
            {result && (
              <Button onClick={handleCopy} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Result"}
              </Button>
            )}
          </div>
        </Card>

        {/* Unit Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              {fromUnit.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Source unit for this conversion. Enter values in {fromUnit.name.toLowerCase()}.
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {toUnit.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Target unit for this conversion. Results displayed in {toUnit.name.toLowerCase()}.
            </p>
          </Card>
        </div>

        {/* Conversion Examples */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">
            Common {fromUnit.name} to {toUnit.name} Conversions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {examples.map((example, index) => (
              <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="font-mono text-sm">
                  {example.input} → {example.output}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {fromUnit.name} to {toUnit.name}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversion Formula */}
        {type !== "temperature" && (
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Conversion Formula</h3>
            <div className="text-sm text-muted-foreground">
              <p className="font-mono">
                {toUnit.name} = {fromUnit.name} × {(fromUnit.rate / toUnit.rate).toFixed(6).replace(/\.?0+$/, "")}
              </p>
              <p className="mt-2">
                To convert from {fromUnit.name.toLowerCase()} to {toUnit.name.toLowerCase()}, multiply the value by{" "}
                {(fromUnit.rate / toUnit.rate).toFixed(6).replace(/\.?0+$/, "")}.
              </p>
            </div>
          </Card>
        )}

        {/* Other Popular Conversions */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Other {typeInfo.name} Conversions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
            {Object.entries(typeInfo.units)
              .filter(([unitKey]) => unitKey !== from && unitKey !== to)
              .slice(0, 8)
              .map(([unitKey, unit]) => (
                <Link
                  key={`${from}-to-${unitKey}`}
                  href={`/tools/utilities/unit-converter/${type}/${from}-to-${unitKey}`}
                >
                  <Button variant="ghost" size="sm" className="w-full justify-start text-left h-auto p-2">
                    {fromUnit.name} to {unit.name}
                  </Button>
                </Link>
              ))}
          </div>
        </Card>

        {/* About This Conversion */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            About {fromUnit.name} to {toUnit.name} Conversion
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              This tool converts {fromUnit.name.toLowerCase()} to {toUnit.name.toLowerCase()} with high precision. All
              conversions are performed instantly as you type, making it easy to quickly convert between these{" "}
              {typeInfo.name.toLowerCase()} units.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-foreground mb-2">When to Use This Conversion</h4>
                <ul className="space-y-1">
                  {type === "length" && (
                    <>
                      <li>• Engineering and construction projects</li>
                      <li>• International trade and shipping</li>
                      <li>• Travel and navigation</li>
                      <li>• Sports and fitness tracking</li>
                    </>
                  )}
                  {type === "weight" && (
                    <>
                      <li>• Cooking and recipe conversion</li>
                      <li>• Shipping and logistics</li>
                      <li>• Health and fitness tracking</li>
                      <li>• Scientific measurements</li>
                    </>
                  )}
                  {type === "temperature" && (
                    <>
                      <li>• Weather and climate data</li>
                      <li>• Cooking and baking</li>
                      <li>• Scientific research</li>
                      <li>• International communication</li>
                    </>
                  )}
                  {type === "volume" && (
                    <>
                      <li>• Cooking and recipe scaling</li>
                      <li>• Fuel and liquid measurements</li>
                      <li>• Chemical and pharmaceutical work</li>
                      <li>• International trade</li>
                    </>
                  )}
                  {type === "area" && (
                    <>
                      <li>• Real estate and property</li>
                      <li>• Agriculture and farming</li>
                      <li>• Architecture and design</li>
                      <li>• Land management</li>
                    </>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Accuracy & Precision</h4>
                <ul className="space-y-1">
                  <li>• High-precision calculations</li>
                  <li>• Automatic rounding for readability</li>
                  <li>• Scientific notation for very large/small numbers</li>
                  <li>• Based on internationally accepted conversion factors</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
