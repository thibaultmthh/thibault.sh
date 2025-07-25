"use client";

import { useLocalStorage } from "@/components/hooks/useLocalStrorage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function Demo() {
  const [value, setValue, reset] = useLocalStorage("demo-key", "default value");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="input" className="block text-sm font-medium text-gray-700">
          Enter a value (automatically saved to localStorage):
        </Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="input"
            type="text"
            value={value}
            onChange={handleInputChange}
            className="block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Stored Value:</h3>
        <p className="mt-1 text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
}
