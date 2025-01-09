"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

// Custom hook implementation
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Demo component using the custom hook
export default function LocalStorageDemo() {
  const [name, setName] = useLocalStorage("name", "");
  const [age, setAge] = useLocalStorage("age", "");
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Try the useLocalStorage Hook</h3>
        <p className="text-sm text-gray-600 mb-4">
          Values persist even after page refresh. Open your browser&apos;s dev tools and check localStorage!
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-2">localStorage Contents:</h4>
          <pre className="text-xs bg-white p-2 rounded border">
            {JSON.stringify(
              {
                name,
                age,
                theme,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </Card>
  );
}
