"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAsync } from "@thibault.sh/hooks/useAsync";
import { useState } from "react";

// Simulated API calls
const fetchUserProfile = async (userId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (Math.random() > 0.7) {
    throw new Error("Failed to fetch user profile");
  }
  return {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  };
};

const saveUserSettings = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() > 0.8) {
    throw new Error("Failed to save settings");
  }
  return { success: true, timestamp: new Date().toISOString() };
};

function FetchExample() {
  const { execute: fetchUser, status } = useAsync(fetchUserProfile);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          onClick={() => fetchUser("user-123")}
          disabled={status.isLoading}
          variant={status.error ? "destructive" : "default"}
        >
          {status.isLoading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
              Loading...
            </>
          ) : status.error ? (
            "Retry Fetch"
          ) : (
            "Fetch User"
          )}
        </Button>
        <Button variant="outline" onClick={() => fetchUser("user-456")} disabled={status.isLoading}>
          Fetch Another User
        </Button>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        {status.error ? (
          <div className="text-sm text-destructive">{status.error.message}</div>
        ) : status.isLoading ? (
          <div className="text-sm text-muted-foreground">Loading user data...</div>
        ) : status.value ? (
          <div className="space-y-2">
            <div className="text-sm font-medium">User Profile</div>
            <div className="text-sm space-y-1">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Name:</span>
                <span>{status.value.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Email:</span>
                <span>{status.value.email}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Role:</span>
                <span>{status.value.role}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No user data fetched yet</div>
        )}
      </div>
    </div>
  );
}

function SaveExample() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const { execute: saveSettings, status } = useAsync(saveUserSettings);

  const handleSave = () => {
    saveSettings({ theme, notifications });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Theme</label>
          <select
            className="w-full rounded-md border bg-background px-3 py-2"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            disabled={status.isLoading}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            disabled={status.isLoading}
            className="rounded border-muted"
          />
          <label htmlFor="notifications" className="text-sm font-medium">
            Enable Notifications
          </label>
        </div>

        <Button
          onClick={handleSave}
          disabled={status.isLoading}
          variant={status.error ? "destructive" : "default"}
          className="w-full"
        >
          {status.isLoading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </div>

      {status.error && <div className="text-sm text-destructive">{status.error.message}</div>}
      {status.value && (
        <div className="text-sm text-muted-foreground">
          Settings saved successfully at {new Date(status.value.timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}

export function AsyncDemo() {
  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">1. Data Fetching</h3>
          <FetchExample />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">2. Form Submission</h3>
          <SaveExample />
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { useAsync } from "@thibault.sh/hooks/useAsync";

// Example 1: Data Fetching
function FetchExample() {
  const { execute: fetchUser, status } = useAsync(fetchUserProfile);

  return (
    <div>
      <button
        onClick={() => fetchUser("user-123")}
        disabled={status.isLoading}
      >
        {status.isLoading ? "Loading..." : "Fetch User"}
      </button>

      {status.error ? (
        <div>Error: {status.error.message}</div>
      ) : status.isLoading ? (
        <div>Loading...</div>
      ) : status.value ? (
        <div>
          <div>Name: {status.value.name}</div>
          <div>Email: {status.value.email}</div>
        </div>
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}

// Example 2: Form Submission
function SaveExample() {
  const [settings, setSettings] = useState({ theme: "light" });
  const { execute: saveSettings, status } = useAsync(saveUserSettings);

  const handleSave = () => {
    saveSettings(settings);
  };

  return (
    <div>
      <select
        value={settings.theme}
        onChange={(e) => setSettings({ theme: e.target.value })}
        disabled={status.isLoading}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <button
        onClick={handleSave}
        disabled={status.isLoading}
      >
        {status.isLoading ? "Saving..." : "Save"}
      </button>

      {status.error && <div>Error: {status.error.message}</div>}
      {status.value && <div>Saved successfully!</div>}
    </div>
  );
}`;
