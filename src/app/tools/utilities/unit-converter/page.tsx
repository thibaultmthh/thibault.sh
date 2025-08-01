"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useCallback } from "react";
import { Ruler, ExternalLink, Copy, ArrowLeftRight } from "lucide-react";
import Link from "next/link";

type UnitType = {
  name: string;
  units: {
    [key: string]: {
      name: string;
      rate: number;
    };
  };
};

const unitTypes: { [key: string]: UnitType } = {
  length: {
    name: "Length",
    units: {
      mm: { name: "Millimeters", rate: 1 },
      cm: { name: "Centimeters", rate: 10 },
      m: { name: "Meters", rate: 1000 },
      km: { name: "Kilometers", rate: 1000000 },
      in: { name: "Inches", rate: 25.4 },
      ft: { name: "Feet", rate: 304.8 },
      yd: { name: "Yards", rate: 914.4 },
      mi: { name: "Miles", rate: 1609344 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      mg: { name: "Milligrams", rate: 1 },
      g: { name: "Grams", rate: 1000 },
      kg: { name: "Kilograms", rate: 1000000 },
      oz: { name: "Ounces", rate: 28349.523125 },
      lb: { name: "Pounds", rate: 453592.37 },
      t: { name: "Metric Tons", rate: 1000000000 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      c: { name: "Celsius", rate: 1 },
      f: { name: "Fahrenheit", rate: 1 },
      k: { name: "Kelvin", rate: 1 },
    },
  },
  area: {
    name: "Area",
    units: {
      mm2: { name: "Square Millimeters", rate: 1 },
      cm2: { name: "Square Centimeters", rate: 100 },
      m2: { name: "Square Meters", rate: 1000000 },
      km2: { name: "Square Kilometers", rate: 1000000000000 },
      in2: { name: "Square Inches", rate: 645.16 },
      ft2: { name: "Square Feet", rate: 92903.04 },
      ac: { name: "Acres", rate: 4046856422.4 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      ml: { name: "Milliliters", rate: 1 },
      l: { name: "Liters", rate: 1000 },
      m3: { name: "Cubic Meters", rate: 1000000 },
      gal: { name: "Gallons (US)", rate: 3785.411784 },
      qt: { name: "Quarts (US)", rate: 946.352946 },
      pt: { name: "Pints (US)", rate: 473.176473 },
      fl_oz: { name: "Fluid Ounces (US)", rate: 29.5735295625 },
    },
  },
};

export default function UnitConverter() {
  const [selectedType, setSelectedType] = useState<string>("length");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("ft");
  const [fromValue, setFromValue] = useState<string>("1");
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

  const convert = useCallback(() => {
    if (!fromUnit || !toUnit || !fromValue) {
      setResult("");
      return;
    }

    const value = parseFloat(fromValue);
    if (isNaN(value)) {
      setResult("Invalid number");
      return;
    }

    if (selectedType === "temperature") {
      let celsius: number;
      // Convert to Celsius first
      switch (fromUnit) {
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
      let result: number;
      switch (toUnit) {
        case "f":
          result = celsius * (9 / 5) + 32;
          break;
        case "k":
          result = celsius + 273.15;
          break;
        default:
          result = celsius;
      }
      setResult(formatNumber(result));
    } else {
      const fromRate = unitTypes[selectedType].units[fromUnit].rate;
      const toRate = unitTypes[selectedType].units[toUnit].rate;
      const resultValue = (value * fromRate) / toRate;
      setResult(formatNumber(resultValue));
    }
  }, [fromUnit, fromValue, selectedType, toUnit]);

  // Auto-convert when any input changes
  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit, selectedType, convert]);

  const swapUnits = () => {
    const tempFromUnit = fromUnit;
    const tempFromValue = fromValue;
    setFromUnit(toUnit);
    setToUnit(tempFromUnit);
    setFromValue(result || tempFromValue);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const loadExample = (type: string, from: string, to: string, value: string) => {
    if (type !== selectedType) {
      setSelectedType(type);
    }
    setFromUnit(from);
    setToUnit(to);
    setFromValue(value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Unit Converter</h1>
      <p className="text-muted-foreground mb-6">
        Convert between different units of measurement. Supports length, weight, temperature, area, and volume
        conversions with automatic calculation.
      </p>

      <div className="space-y-6">
        {/* Input Controls */}
        <Card className="p-6">
          {/* Unit Type Selector */}
          <div className="mb-6">
            <Label className="text-base font-medium">Measurement Type</Label>
            <Select
              value={selectedType}
              onValueChange={(value) => {
                setSelectedType(value);
                const firstUnit = Object.keys(unitTypes[value].units)[0];
                const secondUnit = Object.keys(unitTypes[value].units)[1] || firstUnit;
                setFromUnit(firstUnit);
                setToUnit(secondUnit);
              }}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([key, type]) => (
                  <SelectItem key={key} value={key}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Conversion Input/Output */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-6">
            {/* From Unit */}
            <div className="space-y-3">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitTypes[selectedType].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Enter value"
                className="text-lg"
              />
            </div>

            {/* Swap Button */}
            <Button variant="outline" size="icon" onClick={swapUnits} className="shrink-0">
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            {/* To Unit */}
            <div className="space-y-3">
              <Label>To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitTypes[selectedType].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <Input
                  value={result}
                  readOnly
                  className="bg-muted/50 text-lg font-mono"
                  placeholder="Result will appear here"
                />
                {result && (
                  <Button variant="ghost" size="icon" onClick={handleCopy} className="absolute right-1 top-1 h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {copied && <p className="text-sm text-green-600 font-medium">Copied to clipboard!</p>}
            </div>
          </div>

          {/* Quick Examples */}
          <div className="space-y-3">
            <Label>Quick Examples</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadExample("length", "m", "ft", "1")}
                className="text-xs"
              >
                1 meter = ? feet
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadExample("weight", "kg", "lb", "10")}
                className="text-xs"
              >
                10 kg = ? pounds
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadExample("temperature", "c", "f", "25")}
                className="text-xs"
              >
                25°C = ? °F
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadExample("volume", "l", "gal", "5")}
                className="text-xs"
              >
                5 liters = ? gallons
              </Button>
            </div>
          </div>

          {/* Dedicated Page Link */}
          {fromUnit && toUnit && (
            <div className="mt-6 flex gap-2 items-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm text-blue-800 dark:text-blue-200 flex-1">
                Get a dedicated page for {unitTypes[selectedType].units[fromUnit].name} to{" "}
                {unitTypes[selectedType].units[toUnit].name} conversion
              </div>
              <Link href={`/tools/utilities/unit-converter/${selectedType}/${fromUnit}-to-${toUnit}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Dedicated Page
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Popular Conversions */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Popular Conversions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
            {[
              { type: "length", from: "m", to: "ft", label: "Meters to Feet" },
              { type: "length", from: "km", to: "mi", label: "Kilometers to Miles" },
              { type: "weight", from: "kg", to: "lb", label: "Kilograms to Pounds" },
              { type: "temperature", from: "c", to: "f", label: "Celsius to Fahrenheit" },
              { type: "volume", from: "l", to: "gal", label: "Liters to Gallons" },
              { type: "area", from: "m2", to: "ft2", label: "Sq Meters to Sq Feet" },
              { type: "length", from: "in", to: "cm", label: "Inches to Centimeters" },
              { type: "weight", from: "oz", to: "g", label: "Ounces to Grams" },
            ].map((conversion) => (
              <Link
                key={`${conversion.type}-${conversion.from}-to-${conversion.to}`}
                href={`/tools/utilities/unit-converter/${conversion.type}/${conversion.from}-to-${conversion.to}`}
              >
                <Button variant="ghost" size="sm" className="w-full justify-start text-left h-auto p-2">
                  {conversion.label}
                </Button>
              </Link>
            ))}
          </div>
        </Card>

        {/* About Unit Conversion */}
        <Card className="p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            About Unit Conversion
          </h2>
          <Tabs defaultValue="types" className="w-full">
            <TabsList>
              <TabsTrigger value="types">Unit Types</TabsTrigger>
              <TabsTrigger value="systems">Measurement Systems</TabsTrigger>
              <TabsTrigger value="tips">Conversion Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="types" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {Object.entries(unitTypes).map(([key, type]) => (
                  <div key={key} className="space-y-2">
                    <h4 className="font-medium">{type.name}</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      {Object.entries(type.units)
                        .slice(0, 4)
                        .map(([unitKey, unit]) => (
                          <li key={unitKey}>• {unit.name}</li>
                        ))}
                      {Object.keys(type.units).length > 4 && (
                        <li>• And {Object.keys(type.units).length - 4} more...</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="systems" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <h4 className="font-medium">Imperial System (US/UK)</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Used primarily in the United States</li>
                    <li>• Based on historical measurements</li>
                    <li>• Examples: feet, inches, pounds, gallons</li>
                    <li>• Often more intuitive for everyday use</li>
                    <li>• Complex conversion factors between units</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Metric System (SI)</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Used worldwide as the international standard</li>
                    <li>• Based on powers of 10 for easy conversion</li>
                    <li>• Examples: meters, centimeters, kilograms, liters</li>
                    <li>• Consistent and logical unit relationships</li>
                    <li>• Preferred for scientific and technical work</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="mt-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>
                    • <strong>Temperature:</strong> Remember that Celsius and Fahrenheit scales have different zero
                    points
                  </li>
                  <li>
                    • <strong>Length:</strong> 1 meter ≈ 3.28 feet is a useful approximation to remember
                  </li>
                  <li>
                    • <strong>Weight:</strong> 1 kilogram ≈ 2.2 pounds for quick mental calculations
                  </li>
                  <li>
                    • <strong>Volume:</strong> 1 liter ≈ 0.26 gallons (US) or about 4 liters per gallon
                  </li>
                  <li>
                    • <strong>Area:</strong> Converting area units involves squaring the linear conversion factor
                  </li>
                  <li>
                    • <strong>Precision:</strong> This tool provides high precision, but round appropriately for your
                    use case
                  </li>
                  <li>
                    • <strong>Scientific notation:</strong> Very large or small numbers are displayed in exponential
                    format
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
