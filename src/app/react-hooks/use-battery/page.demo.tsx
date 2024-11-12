"use client";

import { useBattery } from "@/components/hooks/useBattery";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Battery, BatteryCharging, AlertTriangle } from "lucide-react";

export function Demo() {
  const { charging, level, supported, error } = useBattery();

  if (!supported) {
    return (
      <Alert variant="destructive" className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span>{error || "Battery API is not supported in this browser"}</span>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {charging ? <BatteryCharging className="h-5 w-5 text-green-500" /> : <Battery className="h-5 w-5" />}
          <span className="font-medium">{level}%</span>
        </div>
        <span className="text-sm text-muted-foreground">{charging ? "Charging" : "Not charging"}</span>
      </div>

      <Card className="p-4 bg-muted">
        <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              charging ? "bg-green-500" : level < 20 ? "bg-red-500" : "bg-primary"
            }`}
            style={{ width: `${level}%` }}
          />
        </div>
      </Card>

      <p className="text-sm text-muted-foreground">
        Note: The Battery Status API requires a secure context (HTTPS) and is not supported in all browsers.
      </p>
    </div>
  );
}
