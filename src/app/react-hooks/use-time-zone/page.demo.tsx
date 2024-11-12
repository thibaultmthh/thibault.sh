"use client";

import { useTimeZone } from "@/components/hooks/useTimeZone";
import { Card } from "@/components/ui/card";

export function Demo() {
  const { timeZone, offset, abbreviation, isDST } = useTimeZone();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">Time Zone</h3>
        <p className="text-2xl font-mono">{timeZone}</p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">UTC Offset</h3>
        <p className="text-2xl font-mono">
          {offset >= 0 ? "+" : ""}
          {offset}:00
        </p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">Abbreviation</h3>
        <p className="text-2xl font-mono">{abbreviation}</p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">Daylight Saving Time</h3>
        <p className="text-2xl font-mono">{isDST ? "Yes" : "No"}</p>
      </Card>
    </div>
  );
}
