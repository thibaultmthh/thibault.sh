"use client";

import { useTimer } from "@/components/hooks/useTimer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

function formatTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${hours.toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export function Demo() {
  const [timerType, setTimerType] = useState<"stopwatch" | "countdown">("stopwatch");

  const stopwatch = useTimer({
    initialTime: 0,
    countdown: false,
    endTime: 30 * 1000, // 30 seconds limit
    onEnd: () => alert("Stopwatch reached 30 seconds!"),
  });

  const countdown = useTimer({
    initialTime: 10 * 1000, // 10 seconds for demo purposes
    countdown: true,
    endTime: 0,
    onEnd: () => alert("Countdown completed!"),
  });

  // Get the active timer based on type
  const activeTimer = timerType === "stopwatch" ? stopwatch : countdown;

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button
          variant={timerType === "stopwatch" ? "default" : "outline"}
          onClick={() => {
            setTimerType("stopwatch");
            stopwatch.reset();
          }}
        >
          Stopwatch (30s limit)
        </Button>
        <Button
          variant={timerType === "countdown" ? "default" : "outline"}
          onClick={() => {
            setTimerType("countdown");
            countdown.reset();
          }}
        >
          Countdown (10s)
        </Button>
      </div>

      <Card className="p-8">
        <div className="text-center">
          <div className="text-4xl font-mono mb-6">{formatTime(activeTimer.time)}</div>
          <div className="flex gap-4 justify-center">
            <Button onClick={activeTimer.toggle}>{activeTimer.isRunning ? "Pause" : "Start"}</Button>
            <Button variant="outline" onClick={() => activeTimer.reset()}>
              Reset
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
