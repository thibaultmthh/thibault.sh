"use client";

import { useSessionStorage } from "@/components/hooks/useSessionStorage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Demo() {
  const [value, setValue] = useSessionStorage("demo-key", "default value");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="input" className="block text-sm font-medium text-gray-700">
          Enter a value (automatically saved to sessionStorage):
        </Label>
        <Input
          id="input"
          type="text"
          value={value}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Stored Value:</h3>
        <p className="mt-1 text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
}
