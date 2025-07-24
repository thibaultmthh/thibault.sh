"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { X, Plus, Clock, Globe } from "lucide-react";

interface Timezone {
  id: string;
  name: string;
  city: string;
  timezone: string;
  country: string;
  flag: string;
}

interface TimeDisplay {
  timezone: Timezone;
  time: string;
  date: string;
  utcOffset: string;
  isDst: boolean;
}

const POPULAR_TIMEZONES: Timezone[] = [
  { id: "utc", name: "UTC", city: "Coordinated Universal Time", timezone: "UTC", country: "UTC", flag: "🌍" },
  { id: "ny", name: "New York", city: "New York", timezone: "America/New_York", country: "United States", flag: "🇺🇸" },
  { id: "london", name: "London", city: "London", timezone: "Europe/London", country: "United Kingdom", flag: "🇬🇧" },
  { id: "paris", name: "Paris", city: "Paris", timezone: "Europe/Paris", country: "France", flag: "🇫🇷" },
  { id: "tokyo", name: "Tokyo", city: "Tokyo", timezone: "Asia/Tokyo", country: "Japan", flag: "🇯🇵" },
  { id: "sydney", name: "Sydney", city: "Sydney", timezone: "Australia/Sydney", country: "Australia", flag: "🇦🇺" },
  {
    id: "la",
    name: "Los Angeles",
    city: "Los Angeles",
    timezone: "America/Los_Angeles",
    country: "United States",
    flag: "🇺🇸",
  },
  { id: "dubai", name: "Dubai", city: "Dubai", timezone: "Asia/Dubai", country: "UAE", flag: "🇦🇪" },
  {
    id: "singapore",
    name: "Singapore",
    city: "Singapore",
    timezone: "Asia/Singapore",
    country: "Singapore",
    flag: "🇸🇬",
  },
  { id: "mumbai", name: "Mumbai", city: "Mumbai", timezone: "Asia/Kolkata", country: "India", flag: "🇮🇳" },
  {
    id: "sao_paulo",
    name: "São Paulo",
    city: "São Paulo",
    timezone: "America/Sao_Paulo",
    country: "Brazil",
    flag: "🇧🇷",
  },
  { id: "moscow", name: "Moscow", city: "Moscow", timezone: "Europe/Moscow", country: "Russia", flag: "🇷🇺" },
  {
    id: "hong_kong",
    name: "Hong Kong",
    city: "Hong Kong",
    timezone: "Asia/Hong_Kong",
    country: "Hong Kong",
    flag: "🇭🇰",
  },
  {
    id: "chicago",
    name: "Chicago",
    city: "Chicago",
    timezone: "America/Chicago",
    country: "United States",
    flag: "🇺🇸",
  },
  { id: "berlin", name: "Berlin", city: "Berlin", timezone: "Europe/Berlin", country: "Germany", flag: "🇩🇪" },
  { id: "shanghai", name: "Shanghai", city: "Shanghai", timezone: "Asia/Shanghai", country: "China", flag: "🇨🇳" },
];

export default function TimezoneConverter() {
  const [selectedTimezones, setSelectedTimezones] = useState<Timezone[]>([
    POPULAR_TIMEZONES.find((tz) => tz.id === "utc")!,
    POPULAR_TIMEZONES.find((tz) => tz.id === "ny")!,
    POPULAR_TIMEZONES.find((tz) => tz.id === "london")!,
    POPULAR_TIMEZONES.find((tz) => tz.id === "tokyo")!,
  ]);
  const [timeDisplays, setTimeDisplays] = useState<TimeDisplay[]>([]);
  const [customTime, setCustomTime] = useState("");
  const [selectedTimezoneToAdd, setSelectedTimezoneToAdd] = useState("");

  const formatTime = (timezone: Timezone, baseTime?: Date): TimeDisplay => {
    const now = baseTime || new Date();

    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone.timezone,
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      // Get UTC offset
      const utcDate1 = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
      const utcDate2 = new Date(now.toLocaleString("en-US", { timeZone: timezone.timezone }));
      const offsetMs = utcDate2.getTime() - utcDate1.getTime();
      const offsetHours = offsetMs / (1000 * 60 * 60);
      const offsetSign = offsetHours >= 0 ? "+" : "-";
      const offsetAbs = Math.abs(offsetHours);
      const offsetFormatted = `UTC${offsetSign}${Math.floor(offsetAbs).toString().padStart(2, "0")}:${((offsetAbs % 1) * 60).toString().padStart(2, "0")}`;

      // Check if DST (simplified check)
      const jan = new Date(now.getFullYear(), 0, 1);
      const jul = new Date(now.getFullYear(), 6, 1);
      const janOffset =
        new Date(jan.toLocaleString("en-US", { timeZone: timezone.timezone })).getTime() -
        new Date(jan.toLocaleString("en-US", { timeZone: "UTC" })).getTime();
      const julOffset =
        new Date(jul.toLocaleString("en-US", { timeZone: timezone.timezone })).getTime() -
        new Date(jul.toLocaleString("en-US", { timeZone: "UTC" })).getTime();
      const isDst = offsetMs !== Math.max(janOffset, julOffset);

      return {
        timezone,
        time: formatter.format(now),
        date: dateFormatter.format(now),
        utcOffset: offsetFormatted,
        isDst,
      };
    } catch (error) {
      console.error(`Error formatting time for ${timezone.timezone}:`, error);
      return {
        timezone,
        time: "00:00:00",
        date: "Invalid Date",
        utcOffset: "UTC+00:00",
        isDst: false,
      };
    }
  };

  const updateTimes = () => {
    let baseTime: Date | undefined;

    if (customTime) {
      // Parse custom time (assuming it's in the first timezone's time)
      const [hours, minutes] = customTime.split(":").map(Number);
      if (!isNaN(hours) && !isNaN(minutes) && selectedTimezones.length > 0) {
        const now = new Date();
        const baseTimezone = selectedTimezones[0];

        // Create a date in the base timezone
        const baseDate = new Date(now.toLocaleString("en-US", { timeZone: baseTimezone.timezone }));
        baseDate.setHours(hours, minutes, 0, 0);

        // Convert back to UTC
        const utcDate = new Date(baseDate.toLocaleString("en-US", { timeZone: "UTC" }));
        const timezoneDate = new Date(baseDate.toLocaleString("en-US", { timeZone: baseTimezone.timezone }));
        const offset = timezoneDate.getTime() - utcDate.getTime();

        baseTime = new Date(baseDate.getTime() - offset);
      }
    }

    const displays = selectedTimezones.map((tz) => formatTime(tz, baseTime));
    setTimeDisplays(displays);
  };

  useEffect(() => {
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [selectedTimezones, customTime]);

  const addTimezone = () => {
    if (!selectedTimezoneToAdd) return;

    const timezone = POPULAR_TIMEZONES.find((tz) => tz.id === selectedTimezoneToAdd);
    if (timezone && !selectedTimezones.find((tz) => tz.id === timezone.id)) {
      setSelectedTimezones([...selectedTimezones, timezone]);
    }
    setSelectedTimezoneToAdd("");
  };

  const removeTimezone = (timezoneId: string) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz.id !== timezoneId));
  };

  const getTimeColor = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    if (hour >= 9 && hour < 17) return "text-green-600"; // Business hours
    if ((hour >= 6 && hour < 9) || (hour >= 17 && hour < 22)) return "text-orange-600"; // Early/late
    return "text-red-600"; // Night hours
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Timezone Converter</h1>

      <div className="">
        {/* Controls */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Add Timezone */}
            <div className="space-y-2">
              <Label>Add Timezone</Label>
              <div className="flex gap-2">
                <Select value={selectedTimezoneToAdd} onValueChange={setSelectedTimezoneToAdd}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a city..." />
                  </SelectTrigger>
                  <SelectContent>
                    {POPULAR_TIMEZONES.filter((tz) => !selectedTimezones.find((selected) => selected.id === tz.id)).map(
                      (tz) => (
                        <SelectItem key={tz.id} value={tz.id}>
                          {tz.flag} {tz.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <Button onClick={addTimezone} disabled={!selectedTimezoneToAdd}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Custom Time */}
            <div className="space-y-2">
              <Label>Set Custom Time (HH:MM)</Label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={() => setCustomTime("")} disabled={!customTime}>
                  Reset
                </Button>
              </div>
              {customTime && (
                <p className="text-sm text-muted-foreground">
                  Time set in {selectedTimezones[0]?.name || "first timezone"}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Time Displays */}
        <div className="grid gap-4">
          {timeDisplays.map((display, index) => (
            <Card key={display.timezone.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-2xl">{display.timezone.flag}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{display.timezone.name}</h3>
                      <span className="text-sm text-muted-foreground">({display.timezone.country})</span>
                      {display.isDst && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">DST</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{display.date}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-mono font-bold ${getTimeColor(display.time)}`}>{display.time}</div>
                    <div className="text-sm text-muted-foreground">{display.utcOffset}</div>
                  </div>
                </div>

                {selectedTimezones.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTimezone(display.timezone.id)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {timeDisplays.length === 0 && (
          <Card className="p-8 text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No timezones selected. Add some cities to get started!</p>
          </Card>
        )}

        {/* Quick Add Buttons */}
        {selectedTimezones.length < POPULAR_TIMEZONES.length && (
          <Card className="p-6 mt-6">
            <Label className="mb-3 block">Quick Add Popular Cities</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {POPULAR_TIMEZONES.filter((tz) => !selectedTimezones.find((selected) => selected.id === tz.id))
                .slice(0, 12)
                .map((tz) => (
                  <Button
                    key={tz.id}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTimezones([...selectedTimezones, tz]);
                    }}
                    className="flex items-center gap-1 text-xs"
                  >
                    {tz.flag} {tz.name}
                  </Button>
                ))}
            </div>
          </Card>
        )}

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            About Timezone Converter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium mb-2 text-foreground">Features:</h4>
              <ul className="space-y-1">
                <li>• Real-time clock updates every second</li>
                <li>• Support for 16+ major cities worldwide</li>
                <li>• Custom time setting for meeting planning</li>
                <li>• Automatic DST (Daylight Saving Time) detection</li>
                <li>• Visual color coding for business hours</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-foreground">Time Color Guide:</h4>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span className="text-green-600">Business hours (9 AM - 5 PM)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-600 rounded"></div>
                  <span className="text-orange-600">Early/Late hours (6-9 AM, 5-10 PM)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                  <span className="text-red-600">Night hours (10 PM - 6 AM)</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
