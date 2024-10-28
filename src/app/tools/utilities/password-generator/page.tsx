"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";

interface PasswordOptions {
  format: string;
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const PASSWORD_FORMATS = {
  standard: { label: "Standard", example: "abcdef123456" },
  apple: { label: "Apple Style", example: "xxxxxx-xxxxxx-xxxxxx" },
} as const;

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<PasswordOptions>({
    format: "apple", // Set apple format as default
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false, // Disabled by default for apple format
  });

  const generatePassword = () => {
    let chars = "";
    if (options.uppercase) chars += CHAR_SETS.uppercase;
    if (options.lowercase) chars += CHAR_SETS.lowercase;
    if (options.numbers) chars += CHAR_SETS.numbers;
    if (options.symbols) chars += CHAR_SETS.symbols;

    if (!chars) {
      setPassword("Please select at least one character type");
      return;
    }

    let password = "";
    const array = new Uint32Array(32); // Get more random values than needed
    crypto.getRandomValues(array);
    let arrayIndex = 0;

    const generateSegment = (length: number) => {
      let segment = "";
      for (let i = 0; i < length; i++) {
        segment += chars[array[arrayIndex++] % chars.length];
      }
      return segment;
    };

    // Generate password based on format
    switch (options.format) {
      case "apple":
        password = [generateSegment(6), generateSegment(6), generateSegment(6)].join("-");
        break;
      default:
        password = generateSegment(options.length);
    }

    // Ensure at least one character from each selected type
    if (options.format === "standard") {
      const requiredChars = [];
      if (options.uppercase) requiredChars.push(CHAR_SETS.uppercase[array[28] % CHAR_SETS.uppercase.length]);
      if (options.lowercase) requiredChars.push(CHAR_SETS.lowercase[array[29] % CHAR_SETS.lowercase.length]);
      if (options.numbers) requiredChars.push(CHAR_SETS.numbers[array[30] % CHAR_SETS.numbers.length]);
      if (options.symbols) requiredChars.push(CHAR_SETS.symbols[array[31] % CHAR_SETS.symbols.length]);

      for (let i = 0; i < requiredChars.length; i++) {
        const pos = array[i + 24] % password.length;
        password = password.substring(0, pos) + requiredChars[i] + password.substring(pos + 1);
      }
    }

    setPassword(password);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const calculateStrength = (): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (options.length >= 12) strength += 1;
    if (options.length >= 16) strength += 1;
    if (options.uppercase) strength += 1;
    if (options.lowercase) strength += 1;
    if (options.numbers) strength += 1;
    if (options.symbols) strength += 1;

    const strengthMap = {
      0: { label: "Very Weak", color: "bg-red-500" },
      1: { label: "Weak", color: "bg-orange-500" },
      2: { label: "Fair", color: "bg-yellow-500" },
      3: { label: "Good", color: "bg-lime-500" },
      4: { label: "Strong", color: "bg-green-500" },
      5: { label: "Very Strong", color: "bg-emerald-500" },
      6: { label: "Excellent", color: "bg-teal-500" },
    };

    return {
      strength,
      ...strengthMap[strength as keyof typeof strengthMap],
    };
  };

  const strengthInfo = calculateStrength();

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4">Password Generator</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          {/* Password Display */}
          <div className="relative mb-6">
            <Input
              value={password}
              readOnly
              className="pr-24 font-mono text-lg h-12"
              placeholder="Generated password"
            />
            <div className="absolute right-1 top-1 flex gap-1">
              <Button size="sm" variant="ghost" onClick={generatePassword} className="h-10">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={copyToClipboard} disabled={!password} className="h-10">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Password Format Selector */}
          <div className="mb-6">
            <Label className="mb-2 block">Password Format</Label>
            <Select value={options.format} onValueChange={(format) => setOptions({ ...options, format })}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PASSWORD_FORMATS).map(([key, { label, example }]) => (
                  <SelectItem key={key} value={key}>
                    <div>
                      <div>{label}</div>
                      <div className="text-xs text-muted-foreground">{example}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Strength:</span>
                <span className="text-sm font-medium">{strengthInfo.label}</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full">
                <div
                  className={`h-full rounded-full transition-all ${strengthInfo.color}`}
                  style={{
                    width: `${(strengthInfo.strength / 6) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Length Slider - Only show for standard format */}
          {options.format === "standard" && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <Label>Password Length</Label>
                <span className="text-sm">{options.length} characters</span>
              </div>
              <Slider
                value={[options.length]}
                onValueChange={([value]) => setOptions({ ...options, length: value })}
                max={32}
                min={8}
                step={1}
                className="mb-6"
              />
            </div>
          )}

          {/* Character Type Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
              <Switch
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
              <Switch
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="numbers">Numbers (0-9)</Label>
              <Switch
                id="numbers"
                checked={options.numbers}
                onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="symbols">Special Characters (!@#$%^&*)</Label>
              <Switch
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
              />
            </div>
          </div>

          <Button className="w-full mt-6" size="lg" onClick={generatePassword}>
            Generate Password
          </Button>
        </Card>
      </div>
    </div>
  );
}
