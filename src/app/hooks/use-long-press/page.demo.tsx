"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLongPress } from "@thibault.sh/hooks/useLongPress";
import { useState } from "react";

export function LongPressDemo() {
  const [message, setMessage] = useState("Press and hold the button");
  const [pressCount, setPressCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [cancelCount, setCancelCount] = useState(0);

  const { handlers, state } = useLongPress({
    delay: 1000,
    onPress: () => {
      setPressCount((c) => c + 1);
      setMessage("Normal press detected!");
    },
    onLongPress: () => {
      setLongPressCount((c) => c + 1);
      setMessage("Long press completed!");
    },
    onLongPressCanceled: () => {
      setCancelCount((c) => c + 1);
      setMessage("Long press canceled!");
    },
  });

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Try pressing the button normally, holding it for a long press, or canceling a long press by releasing early:
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button
            {...handlers}
            className="w-64 h-24 text-lg relative overflow-hidden"
            variant={state.isLongPressed ? "destructive" : "default"}
          >
            {state.isLongPressed ? (
              "Long Press!"
            ) : state.isPressed ? (
              <>
                Hold...
                <div
                  className="absolute bottom-0 left-0 h-1 bg-primary-foreground transition-all"
                  style={{ width: `${state.progress * 100}%` }}
                />
              </>
            ) : (
              "Press and Hold Me"
            )}
          </Button>

          <div className="text-center">
            <p className="text-lg font-semibold">{message}</p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <div className="font-bold text-xl">{pressCount}</div>
                <div>Normal Presses</div>
              </div>
              <div>
                <div className="font-bold text-xl">{longPressCount}</div>
                <div>Long Presses</div>
              </div>
              <div>
                <div className="font-bold text-xl">{cancelCount}</div>
                <div>Canceled</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Export the source code as a string for the documentation
export const demoSource = `import { Button } from "@/components/ui/button";
import { useLongPress } from "@thibault.sh/hooks/useLongPress";
import { useState } from "react";

export function LongPressDemo() {
  const [message, setMessage] = useState("Press and hold the button");
  const [pressCount, setPressCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [cancelCount, setCancelCount] = useState(0);

  const { handlers, state } = useLongPress({
    delay: 1000,
    onPress: () => {
      setPressCount(c => c + 1);
      setMessage("Normal press detected!");
    },
    onLongPress: () => {
      setLongPressCount(c => c + 1);
      setMessage("Long press completed!");
    },
    onLongPressCanceled: () => {
      setCancelCount(c => c + 1);
      setMessage("Long press canceled!");
    }
  });

  return (
    <div className="space-y-6">
      <Button
        {...handlers}
        className="w-64 h-24 text-lg relative overflow-hidden"
        variant={state.isLongPressed ? "destructive" : "default"}
      >
        {state.isLongPressed ? (
          "Long Press!"
        ) : state.isPressed ? (
          <>
            Hold...
            <div
              className="absolute bottom-0 left-0 h-1 bg-primary-foreground transition-all"
              style={{ width: \`\${state.progress * 100}%\` }}
            />
          </>
        ) : (
          "Press and Hold Me"
        )}
      </Button>

      <div className="text-center">
        <p className="text-lg font-semibold">{message}</p>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div>
            <div className="font-bold text-xl">{pressCount}</div>
            <div>Normal Presses</div>
          </div>
          <div>
            <div className="font-bold text-xl">{longPressCount}</div>
            <div>Long Presses</div>
          </div>
          <div>
            <div className="font-bold text-xl">{cancelCount}</div>
            <div>Canceled</div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
