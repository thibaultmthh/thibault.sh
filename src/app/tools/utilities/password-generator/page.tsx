"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { Copy, RefreshCw, Shield, Clock, Trash2 } from "lucide-react";

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
  const [passwordHistory, setPasswordHistory] = useState<Array<{ password: string; timestamp: Date }>>([]);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    format: "apple", // Set apple format as default
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false, // Disabled by default for apple format
  });

  // Auto-generate password on component mount
  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // Add to history (keep only last 5 passwords)
    setPasswordHistory((prev) => [{ password, timestamp: new Date() }, ...prev.slice(0, 4)]);
  };

  const copyToClipboard = async (passwordToCopy: string = password) => {
    try {
      await navigator.clipboard.writeText(passwordToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  const clearHistory = () => {
    setPasswordHistory([]);
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
    <div>
      <h1 className="text-3xl font-bold mb-4">Password Generator</h1>
      <p className="text-muted-foreground mb-6">
        Generate cryptographically strong passwords instantly. All generation happens locally in your browser - nothing
        is sent to any server.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Password Display */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium">Generated Password</h2>
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                Secure
              </Badge>
            </div>

            {/* Password display */}
            <div className="bg-muted p-4 rounded-md min-h-[60px] flex items-center mb-4">
              <code className="text-lg font-mono font-bold break-all leading-relaxed flex-1">
                {password || "Click 'Generate Password' to start"}
              </code>
            </div>

            <div className="flex gap-2">
              <Button onClick={generatePassword} className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Password
              </Button>
              <Button variant="outline" onClick={() => copyToClipboard()} disabled={!password}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </Card>

          {/* Configuration Card */}
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-4">Options</h3>

            <div className="space-y-4">
              {/* Password Format Selector */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Format</Label>
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

              {/* Length Slider - Only show for standard format */}
              {options.format === "standard" && (
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm font-medium">Length</Label>
                    <span className="text-sm">{options.length} characters</span>
                  </div>
                  <Slider
                    value={[options.length]}
                    onValueChange={([value]) => setOptions({ ...options, length: value })}
                    max={32}
                    min={8}
                    step={1}
                  />
                </div>
              )}

              {/* Character Type Options */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Character Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="uppercase" className="text-sm">
                      Uppercase (A-Z)
                    </Label>
                    <Switch
                      id="uppercase"
                      checked={options.uppercase}
                      onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="lowercase" className="text-sm">
                      Lowercase (a-z)
                    </Label>
                    <Switch
                      id="lowercase"
                      checked={options.lowercase}
                      onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="numbers" className="text-sm">
                      Numbers (0-9)
                    </Label>
                    <Switch
                      id="numbers"
                      checked={options.numbers}
                      onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="symbols" className="text-sm">
                      Symbols (!@#$%^&*)
                    </Label>
                    <Switch
                      id="symbols"
                      checked={options.symbols}
                      onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
                    />
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Strength</span>
                    <span className="text-sm">{strengthInfo.label}</span>
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
            </div>
          </Card>

          {/* Password Security Information */}
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-3">Password Security Tips</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Strong passwords should:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>Be at least 12 characters long</li>
                  <li>Use a mix of character types</li>
                  <li>Avoid common words or patterns</li>
                  <li>Be unique for each account</li>
                </ul>
              </div>
              <div>
                <strong className="text-foreground">How this tool works:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>Uses Web Crypto API for secure randomness</li>
                  <li>No network requests during generation</li>
                  <li>All data stays in your browser memory</li>
                  <li>History cleared when you close the tab</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Password History Sidebar */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium">Recent Passwords</h2>
            {passwordHistory.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {passwordHistory.length === 0 ? (
            <div className="text-center text-muted-foreground py-6">
              <Clock className="h-6 w-6 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Generated passwords will appear here</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {passwordHistory.map((entry, index) => (
                <div key={index} className="group">
                  <div className="p-3 bg-muted rounded-md">
                    <code className="text-sm font-mono break-all block mb-2">{entry.password}</code>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{entry.timestamp.toLocaleTimeString()}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(entry.password)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Alert className="mt-4">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Privacy Guaranteed:</strong> All password generation uses cryptographically secure random number
              generation and happens entirely in your browser. No passwords are transmitted to any server or stored
              anywhere except temporarily in your browser&apos;s memory.
            </AlertDescription>
          </Alert>
        </Card>
      </div>
    </div>
  );
}
