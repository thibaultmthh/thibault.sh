"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCountdown } from "@thibault.sh/hooks/useCountdown";

// Demo component showcasing countdown functionality
function CountdownDemo() {
  const [targetDate, setTargetDate] = useState(
    () => new Date(Date.now() + 5 * 60 * 1000).getTime() // 5 minutes from now
  );

  const [refreshRate, setRefreshRate] = useState(1000);
  const [days, hours, minutes, seconds] = useCountdown(targetDate, refreshRate);

  const setCountdownTime = (milliseconds: number) => {
    setTargetDate(Date.now() + milliseconds);
  };

  const isExpired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <div className="space-y-6">
      {/* Preset countdown buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={() => setCountdownTime(30 * 1000)}>
          30 Seconds
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCountdownTime(2 * 60 * 1000)}>
          2 Minutes
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCountdownTime(10 * 60 * 1000)}>
          10 Minutes
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCountdownTime(24 * 60 * 60 * 1000)}>
          1 Day
        </Button>
      </div>

      {/* Refresh rate controls */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Update rate:</span>
        <Button variant={refreshRate === 5000 ? "default" : "outline"} size="sm" onClick={() => setRefreshRate(5000)}>
          5s
        </Button>
        <Button variant={refreshRate === 1000 ? "default" : "outline"} size="sm" onClick={() => setRefreshRate(1000)}>
          1s
        </Button>
      </div>

      {/* Main countdown display */}
      <div
        className={`text-center p-8 rounded-lg border-2 ${
          isExpired
            ? "bg-red-50 border-red-200 text-red-700"
            : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200"
        }`}
      >
        {isExpired ? (
          <div className="space-y-2">
            <div className="text-2xl font-bold">⏰ Time&apos;s Up!</div>
            <div className="text-sm text-red-600">The countdown has ended</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-3xl font-mono font-bold tracking-wider">
              {String(days).padStart(2, "0")}:{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="font-medium text-lg text-foreground">{days}</div>
                <div>Days</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-lg text-foreground">{hours}</div>
                <div>Hours</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-lg text-foreground">{minutes}</div>
                <div>Minutes</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-lg text-foreground">{seconds}</div>
                <div>Seconds</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status info */}
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded border">
        <div>Target: {new Date(targetDate).toLocaleString()}</div>
        <div>Refresh rate: {refreshRate}ms</div>
        <div>Status: {isExpired ? "Expired" : "Active"}</div>
      </div>
    </div>
  );
}

// Export the example with source code
const examples = [
  {
    title: "Countdown Timer",
    component: CountdownDemo,
    source: `import { useState } from "react";
import { useCountdown } from "@thibault.sh/hooks/useCountdown";

function CountdownDemo() {
  const [targetDate, setTargetDate] = useState(() => 
    new Date(Date.now() + 5 * 60 * 1000).getTime() // 5 minutes from now
  );
  
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const setCountdownTime = (milliseconds: number) => {
    setTargetDate(Date.now() + milliseconds);
  };

  const isExpired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setCountdownTime(30 * 1000)}>30 Seconds</button>
        <button onClick={() => setCountdownTime(2 * 60 * 1000)}>2 Minutes</button>
        <button onClick={() => setCountdownTime(10 * 60 * 1000)}>10 Minutes</button>
      </div>

      <div className="text-center p-6 border rounded">
        {isExpired ? (
          <div className="text-2xl font-bold text-red-600">Time's Up!</div>
        ) : (
          <div className="space-y-2">
            <div className="text-3xl font-mono font-bold">
              {String(days).padStart(2, '0')}:
              {String(hours).padStart(2, '0')}:
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <span>{days} Days</span>
              <span>{hours} Hours</span>
              <span>{minutes} Minutes</span>
              <span>{seconds} Seconds</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
  },
];

export default examples;
