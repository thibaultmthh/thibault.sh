import { useState, useEffect } from "react";

interface TimeZoneInfo {
  timeZone: string;
  offset: number;
  abbreviation: string;
  isDST: boolean;
}

export function useTimeZone(): TimeZoneInfo {
  const [timeZoneInfo, setTimeZoneInfo] = useState<TimeZoneInfo>(() => {
    const date = new Date();
    return {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      offset: -date.getTimezoneOffset() / 60,
      abbreviation: date.toLocaleTimeString("en-us", { timeZoneName: "short" }).split(" ")[2],
      isDST: isDaylightSavingTime(date),
    };
  });

  useEffect(() => {
    // Update time zone info every minute to catch DST changes
    const interval = setInterval(() => {
      const date = new Date();
      setTimeZoneInfo({
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        offset: -date.getTimezoneOffset() / 60,
        abbreviation: date.toLocaleTimeString("en-us", { timeZoneName: "short" }).split(" ")[2],
        isDST: isDaylightSavingTime(date),
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return timeZoneInfo;
}

function isDaylightSavingTime(date: Date): boolean {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  return Math.max(-jan.getTimezoneOffset(), -jul.getTimezoneOffset()) === -date.getTimezoneOffset();
}
