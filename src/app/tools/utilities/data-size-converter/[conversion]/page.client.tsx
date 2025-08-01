"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback } from "react";
import { Copy, ArrowLeftRight, ArrowLeft, Settings2, ExternalLink } from "lucide-react";
import Link from "next/link";

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

interface ConversionClientProps {
  from: Unit;
  to: Unit;
}

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

export default function ConversionClient({ from, to }: ConversionClientProps) {
  const [inputValue, setInputValue] = useState("1");
  const [calculationType, setCalculationType] = useState<CalculationType>("decimal");
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const convertValue = useCallback(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) {
      setResult("");
      return;
    }

    const inputUnitInfo = UNITS[from];
    const targetUnitInfo = UNITS[to];

    const inputMultiplier =
      calculationType === "binary" ? inputUnitInfo.binaryMultiplier : inputUnitInfo.decimalMultiplier;
    const targetMultiplier =
      calculationType === "binary" ? targetUnitInfo.binaryMultiplier : targetUnitInfo.decimalMultiplier;

    // Convert input to bytes first, then to target unit
    const valueInBytes = value * inputMultiplier;
    const convertedValue = valueInBytes / targetMultiplier;

    const formatted = formatNumber(convertedValue);
    setResult(`${formatted} ${targetUnitInfo.symbol}`);
  }, [calculationType, from, inputValue, to]);

  useEffect(() => {
    convertValue();
  }, [inputValue, calculationType, from, to, convertValue]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const swapCalculationType = () => {
    setCalculationType(calculationType === "binary" ? "decimal" : "binary");
  };

  const swapUnits = () => {
    window.location.href = `/tools/utilities/data-size-converter/${to}-to-${from}`;
  };

  const fromUnit = UNITS[from];
  const toUnit = UNITS[to];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Link href="/tools/utilities/data-size-converter">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Converter
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        Convert {fromUnit.name} to {toUnit.name}
      </h1>
      <p className="text-muted-foreground mb-6">
        Convert {fromUnit.name} ({fromUnit.symbol}) to {toUnit.name} ({toUnit.symbol}) with precision
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

          {/* Advanced Settings */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Calculation:</span>
              <Button variant="ghost" size="sm" onClick={swapCalculationType} className="h-6 px-2 text-xs">
                <Settings2 className="h-3 w-3 mr-1" />
                {calculationType === "decimal" ? "1000-based" : "1024-based"}
              </Button>
            </div>
          </div>

          {/* Result Display */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <div className="text-sm text-muted-foreground mb-2">Result</div>
            <div className="text-3xl font-mono font-bold mb-4">{result || "Enter a value above"}</div>
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
              {fromUnit.name} ({fromUnit.symbol})
            </h3>
            <p className="text-sm text-muted-foreground">{fromUnit.description}</p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {toUnit.name} ({toUnit.symbol})
            </h3>
            <p className="text-sm text-muted-foreground">{toUnit.description}</p>
          </Card>
        </div>

        {/* Conversion Formula */}
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Conversion Formula</h3>
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>{calculationType === "decimal" ? "Decimal" : "Binary"} calculation:</strong>
            </p>
            <p className="font-mono mt-1">
              1 {fromUnit.symbol} ={" "}
              {calculationType === "decimal" ? fromUnit.decimalMultiplier : fromUnit.binaryMultiplier} bytes
            </p>
            <p className="font-mono">
              1 {toUnit.symbol} = {calculationType === "decimal" ? toUnit.decimalMultiplier : toUnit.binaryMultiplier}{" "}
              bytes
            </p>
          </div>
        </Card>

        {/* Popular Conversions */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Other Popular Conversions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
            {[
              { from: "gb", to: "mb", label: "GB to MB" },
              { from: "mb", to: "kb", label: "MB to KB" },
              { from: "tb", to: "gb", label: "TB to GB" },
              { from: "gb", to: "tb", label: "GB to TB" },
              { from: "mb", to: "gb", label: "MB to GB" },
              { from: "kb", to: "mb", label: "KB to MB" },
              { from: "gb", to: "byte", label: "GB to Bytes" },
              { from: "mb", to: "byte", label: "MB to Bytes" },
            ]
              .filter((conversion) => !(conversion.from === from && conversion.to === to)) // Hide current conversion
              .map((conversion) => (
                <Link
                  key={`${conversion.from}-to-${conversion.to}`}
                  href={`/tools/utilities/data-size-converter/${conversion.from}-to-${conversion.to}`}
                >
                  <Button variant="ghost" size="sm" className="w-full justify-start text-left h-auto p-2">
                    {conversion.label}
                  </Button>
                </Link>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
