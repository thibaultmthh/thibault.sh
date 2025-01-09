"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import LocalStorageDemo from "./page.demo";

const FULL_CODE = `"use client";

import { useState } from "react";

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

// Example usage
function MyComponent() {
  const [name, setName] = useLocalStorage("name", "");
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as "light" | "dark")}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}`;

export default function DemoTabsCustomHook() {
  const [activeTab, setActiveTab] = useState<"demo" | "code">("demo");

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("demo")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === "demo"
              ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          }`}
        >
          Live Demo
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`flex-1 px-4 py-2 text-sm font-medium ${
            activeTab === "code"
              ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          }`}
        >
          Full Code
        </button>
      </div>
      <div className="p-4">
        {activeTab === "demo" ? <LocalStorageDemo /> : <CodeBlock language="typescript" code={FULL_CODE} />}
      </div>
    </div>
  );
}
