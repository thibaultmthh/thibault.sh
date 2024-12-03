"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";

export default function TempoTap() {
  const [taps, setTaps] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);

  const calculateBPM = useCallback((timestamps: number[]) => {
    if (timestamps.length < 2) return 0;

    // Calculate time differences between taps
    const intervals = timestamps.slice(1).map((time, i) => time - timestamps[i]);

    // Calculate average interval
    const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

    // Convert to BPM (60000ms = 1 minute)
    return Math.round(60000 / averageInterval);
  }, []);

  const handleTap = useCallback(() => {
    const now = Date.now();
    setTaps((prevTaps) => {
      // Keep only taps within the last 5 seconds
      const recentTaps = [...prevTaps.filter((tap) => now - tap < 5000), now];
      return recentTaps;
    });
    setIsActive(true);
  }, []);

  const resetTaps = () => {
    setTaps([]);
    setBpm(0);
    setIsActive(false);
  };

  useEffect(() => {
    if (taps.length >= 2) {
      setBpm(calculateBPM(taps));
    }
  }, [taps, calculateBPM]);

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tempo Tap</h1>
        <p className="text-gray-600">Tap the button in rhythm to find the BPM (beats per minute) of any song.</p>
      </div>

      <Card className="p-8 text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold mb-2">{bpm || "--"}</div>
          <div className="text-gray-600">BPM</div>
        </div>

        <button
          onClick={handleTap}
          className={`w-48 h-48 rounded-full mb-6 transition-all ${
            isActive ? "bg-orange-500 scale-95" : "bg-orange-400 hover:bg-orange-500"
          }`}
        >
          <span className="text-white text-xl font-bold">TAP</span>
        </button>

        <div>
          <button onClick={resetTaps} className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
            Reset
          </button>
        </div>
      </Card>

      <Card className="mt-8 p-6">
        <h3 className="text-lg font-bold mb-4">How to Use</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Play your song or think of your rhythm</li>
          <li>• Tap the button consistently with the beat</li>
          <li>• The BPM will be calculated automatically</li>
          <li>• Tap at least 4-5 times for better accuracy</li>
          <li>• Use Reset to start a new measurement</li>
        </ul>
      </Card>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Understanding BPM</h3>
          <p className="text-gray-600">
            BPM (Beats Per Minute) is the standard measure of music tempo. Common BPM ranges:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Slow Ballads: 60-80 BPM</li>
            <li>• Pop Music: 100-130 BPM</li>
            <li>• House Music: 120-130 BPM</li>
            <li>• Techno: 120-140 BPM</li>
            <li>• Drum and Bass: 160-180 BPM</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Tips for Accuracy</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Listen for the strongest beats in the music (usually the kick drum)</li>
            <li>• Try tapping along with different parts of the song</li>
            <li>• For best results, tap for at least 10-15 seconds</li>
            <li>• If unsure, tap quarter notes (1-2-3-4)</li>
            <li>• Reset and try again if you lose the rhythm</li>
          </ul>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Common Uses</h3>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>DJs:</strong> Match tempos between tracks for smooth transitions
            </p>
            <p>
              <strong>Musicians:</strong> Find the right tempo for practice or performance
            </p>
            <p>
              <strong>Producers:</strong> Reference tempos for music production
            </p>
            <p>
              <strong>Dancers:</strong> Determine dance styles suitable for different songs
            </p>
            <p>
              <strong>Fitness:</strong> Create workout playlists with specific BPM ranges
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Exercise BPM Ranges</h3>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Walking:</strong> 115-120 BPM
            </p>
            <p>
              <strong>Jogging:</strong> 120-140 BPM
            </p>
            <p>
              <strong>Running:</strong> 140-160 BPM
            </p>
            <p>
              <strong>High-Intensity:</strong> 160-180 BPM
            </p>
            <p>
              <strong>Cool Down:</strong> 100-115 BPM
            </p>
          </div>
        </Card>
      </div>

      <Card className="mt-8 p-6">
        <h3 className="text-lg font-bold mb-4">About Tempo Measurement</h3>
        <p className="text-gray-600 leading-relaxed">
          Tempo is fundamental to music and affects how we perceive and interact with sound. While digital audio
          workstations can calculate BPM automatically, being able to determine tempo manually is an important skill for
          musicians and music enthusiasts. This tool helps you develop that skill while providing a quick way to find
          the tempo of any piece of music. Remember that some songs may have tempo changes or complex rhythms that make
          BPM measurement more challenging.
        </p>
      </Card>
    </div>
  );
}
