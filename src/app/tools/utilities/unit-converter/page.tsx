"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";

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
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");
  const [fromValue, setFromValue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const convert = () => {
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
      setResult(result.toFixed(2));
    } else {
      const fromRate = unitTypes[selectedType].units[fromUnit].rate;
      const toRate = unitTypes[selectedType].units[toUnit].rate;
      const result = (value * fromRate) / toRate;
      setResult(result.toFixed(6));
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    convert();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Unit Converter</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          {/* Unit Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Type</label>
            <Select
              value={selectedType}
              onValueChange={(value) => {
                setSelectedType(value);
                setFromUnit("");
                setToUnit("");
                setResult("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit type" />
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

          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start mb-6">
            {/* From Unit */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <Select
                  value={fromUnit}
                  onValueChange={(value) => {
                    setFromUnit(value);
                    convert();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitTypes[selectedType].units).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="number"
                value={fromValue}
                onChange={(e) => {
                  setFromValue(e.target.value);
                  convert();
                }}
                placeholder="Enter value"
              />
            </div>

            {/* Swap Button */}
            <Button variant="outline" size="icon" className="mt-8" onClick={swapUnits}>
              <ArrowRightLeft className="h-4 w-4" />
            </Button>

            {/* To Unit */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <Select
                  value={toUnit}
                  onValueChange={(value) => {
                    setToUnit(value);
                    convert();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(unitTypes[selectedType].units).map(([key, unit]) => (
                      <SelectItem key={key} value={key}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Input value={result} readOnly className="bg-muted" placeholder="Result" />
              </div>
            </div>
          </div>

          <Button className="w-full" onClick={convert}>
            Convert
          </Button>
        </Card>
      </div>
    </div>
  );
}
