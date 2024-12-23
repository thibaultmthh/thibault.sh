"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCookieState } from "@thibault.sh/hooks/useCookieState";

export function CookieStateDemo() {
  const [theme, setTheme, deleteTheme] = useCookieState("theme-preference", "light");

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          This theme preference persists in a cookie and survives browser restarts:
        </p>
        <div className="flex items-center gap-4">
          <Button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light", {
                path: "/",
              })
            }
          >
            Toggle Theme ({theme})
          </Button>
          <Button variant="outline" onClick={deleteTheme}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCookieState } from "@thibault.sh/hooks/useCookieState";

export function CookieStateDemo() {
  const [theme, setTheme, deleteTheme] = useCookieState("theme-preference", "light");

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          This theme preference persists in a cookie and survives browser restarts:
        </p>
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => setTheme(theme === "light" ? "dark" : "light", {
              path: "/"
            })}
          >
            Toggle Theme ({theme})
          </Button>
          <Button variant="outline" onClick={deleteTheme}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}`;
