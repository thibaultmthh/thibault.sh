/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

// typescript don't include navigator.getBattery in the type
interface Navigator {
  getBattery(): Promise<any>;
}

declare global {
  interface Navigator {
    getBattery(): Promise<any>;
  }
}

interface BatteryState {
  charging: boolean;
  level: number;
  chargingTime: number | null;
  dischargingTime: number | null;
  supported: boolean;
  error: string | null;
}

const initialState: BatteryState = {
  charging: false,
  level: 0,
  chargingTime: null,
  dischargingTime: null,
  supported: false,
  error: null,
};

export function useBattery() {
  const [batteryState, setBatteryState] = useState<BatteryState>(initialState);

  useEffect(() => {
    // Check if running in a secure context (HTTPS)
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setBatteryState((prev) => ({
        ...prev,
        supported: false,
        error: "Battery API requires a secure context (HTTPS)",
      }));
      return;
    }

    const getBatteryInfo = async () => {
      if (!navigator?.getBattery) {
        setBatteryState((prev) => ({
          ...prev,
          supported: false,
          error: "Battery API is not supported in this browser",
        }));
        return;
      }

      try {
        const battery = await navigator.getBattery();

        const updateBatteryInfo = () => {
          setBatteryState({
            charging: battery.charging,
            level: Math.floor(battery.level * 100),
            chargingTime: battery.chargingTime !== Infinity ? battery.chargingTime : null,
            dischargingTime: battery.dischargingTime !== Infinity ? battery.dischargingTime : null,
            supported: true,
            error: null,
          });
        };

        // Initial update
        updateBatteryInfo();

        // Add event listeners
        battery.addEventListener("chargingchange", updateBatteryInfo);
        battery.addEventListener("levelchange", updateBatteryInfo);
        battery.addEventListener("chargingtimechange", updateBatteryInfo);
        battery.addEventListener("dischargingtimechange", updateBatteryInfo);

        // Cleanup
        return () => {
          battery.removeEventListener("chargingchange", updateBatteryInfo);
          battery.removeEventListener("levelchange", updateBatteryInfo);
          battery.removeEventListener("chargingtimechange", updateBatteryInfo);
          battery.removeEventListener("dischargingtimechange", updateBatteryInfo);
        };
      } catch {
        setBatteryState((prev) => ({
          ...prev,
          supported: false,
          error: "Failed to access battery information",
        }));
      }
    };

    getBatteryInfo();
  }, []);

  return batteryState;
}
