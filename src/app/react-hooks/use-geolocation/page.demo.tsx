"use client";

import { useGeolocation } from "@/components/hooks/useGeolocation";
import { Card } from "@/components/ui/card";

export function Demo() {
  const { latitude, longitude, accuracy, error, loading } = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Latitude</h3>
          <p className="text-2xl font-bold">{loading ? "Loading..." : (latitude?.toFixed(6) ?? "N/A")}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Longitude</h3>
          <p className="text-2xl font-bold">{loading ? "Loading..." : (longitude?.toFixed(6) ?? "N/A")}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Accuracy</h3>
          <p className="text-2xl font-bold">{loading ? "Loading..." : accuracy ? `±${accuracy.toFixed(1)}m` : "N/A"}</p>
        </Card>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
