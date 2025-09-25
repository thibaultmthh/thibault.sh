"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, RotateCw } from "lucide-react";
import { motion, animate, useMotionValue } from "framer-motion";

export default function DecisionWheel() {
  const [options, setOptions] = useState<string[]>(["Pizza", "Burgers", "Sushi"]);
  const [newOption, setNewOption] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const wheelRotation = useMotionValue(0);

  const addOption = () => {
    if (newOption.trim() && options.length < 8) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
      setWinner(null);
    }
  };

  const spinWheel = () => {
    if (isSpinning || options.length < 2) return;
    setIsSpinning(true);
    setWinner(null);

    const spins = 3 + Math.random() * 2;
    const finalAngle = Math.random() * 360;
    const totalRotation = 360 * spins + finalAngle;

    animate(wheelRotation, wheelRotation.get() + totalRotation, {
      duration: 3,
      ease: "easeOut",
      onComplete: () => {
        setIsSpinning(false);
        const segmentAngle = 360 / options.length;
        // Get the final rotation position
        const finalRotation = totalRotation % 360;
        // Since segments start at -90 degrees (top) and the pointer is at top (0 degrees),
        // we need to find which segment is under the pointer
        const normalizedAngle = (finalRotation + 90) % 360;
        const winnerIndex = Math.floor(normalizedAngle / segmentAngle) % options.length;
        setWinner(options[winnerIndex]);
      },
    });
  };

  const getSegmentColor = (index: number) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3", "#54A0FF", "#5F27CD"];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Decision Wheel</h1>
        <p className="text-gray-600">Add options and spin the wheel to make a random decision</p>
      </div>

      {/* Winner Display */}
      {winner && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-semibold">
            🎉 Winner: {winner}
          </div>
        </div>
      )}

      {/* Wheel Section */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <motion.div
            className="w-80 h-80 rounded-full border-4 border-gray-300 shadow-lg"
            style={{ rotate: wheelRotation }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {options.map((option, index) => {
                const angle = 360 / options.length;
                // Start from top (90 degrees offset) and go clockwise
                const startAngle = -90 + index * angle;
                const endAngle = -90 + (index + 1) * angle;

                const x1 = 100 + 95 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + 95 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + 95 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 100 + 95 * Math.sin((endAngle * Math.PI) / 180);

                const largeArcFlag = angle > 180 ? 1 : 0;

                const textAngle = startAngle + angle / 2;
                const textX = 100 + 60 * Math.cos((textAngle * Math.PI) / 180);
                const textY = 100 + 60 * Math.sin((textAngle * Math.PI) / 180);

                return (
                  <g key={index}>
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 95 95 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={getSegmentColor(index)}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                    >
                      {option.length > 8 ? option.substring(0, 8) + "..." : option}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add new option..."
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addOption()}
            maxLength={15}
            className="flex-1"
          />
          <Button onClick={addOption} disabled={!newOption.trim() || options.length >= 8} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
          {options.map((option, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getSegmentColor(index) }} />
                <span className="text-sm">{option}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeOption(index)} disabled={options.length <= 2}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        <Button className="w-full" size="lg" onClick={spinWheel} disabled={isSpinning || options.length < 2}>
          {isSpinning ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : <RotateCw className="mr-2 h-4 w-4" />}
          {isSpinning ? "Spinning..." : "Spin the Wheel"}
        </Button>

        {options.length < 2 && <p className="text-sm text-red-500 text-center">Add at least 2 options to spin</p>}
        {options.length >= 8 && <p className="text-sm text-orange-500 text-center">Maximum 8 options reached</p>}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">How to Use</h3>
          <ul className="space-y-2 text-gray-600">
            <li>1. Add your options (2-12 items)</li>
            <li>2. Click &quot;Spin the Wheel&quot;</li>
            <li>3. Wait for the wheel to stop spinning</li>
            <li>4. The pointer will indicate the chosen option</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Tips</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Keep options short and clear</li>
            <li>• Remove unwanted options before spinning</li>
            <li>• Use for group decisions or breaking ties</li>
            <li>• Add fun choices for party games</li>
          </ul>
        </Card>
      </div>

      {/* Add new content sections */}
      <div className="mt-8 space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Why Use a Decision Wheel?</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              A decision wheel, also known as a spinning wheel or wheel of fortune, is an engaging and fair way to make
              random selections or decisions. It eliminates bias and makes decision-making fun, whether you&apos;re
              choosing a restaurant for dinner, assigning tasks, or playing games.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-black">Perfect For:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Group decision making</li>
                  <li>Classroom activities and student engagement</li>
                  <li>Team building exercises</li>
                  <li>Party games and entertainment</li>
                  <li>Breaking deadlocks in discussions</li>
                  <li>Random selection processes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-black">Key Benefits:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Completely random and unbiased</li>
                  <li>Visual and interactive experience</li>
                  <li>Builds anticipation and excitement</li>
                  <li>Easy to use and understand</li>
                  <li>No complex setup required</li>
                  <li>Free and accessible to everyone</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Social & Entertainment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Choosing restaurants</li>
                <li>• Picking movies to watch</li>
                <li>• Party game decisions</li>
                <li>• Travel destination selection</li>
                <li>• Weekend activity planning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Education & Work</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Student participation</li>
                <li>• Task assignment</li>
                <li>• Team role selection</li>
                <li>• Presentation order</li>
                <li>• Break time activities</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Organization</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Chore distribution</li>
                <li>• Meeting ice breakers</li>
                <li>• Schedule planning</li>
                <li>• Resource allocation</li>
                <li>• Team pairing</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Is the wheel truly random?</h3>
              <p className="text-gray-600">
                Yes! Our decision wheel uses a cryptographically secure random number generator to ensure completely
                fair and unbiased results every time you spin.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How many options can I add?</h3>
              <p className="text-gray-600">
                The wheel supports between 2 and 12 options for optimal visibility and functionality. This range ensures
                that all options are clearly visible and the wheel remains easy to read.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I save my wheel configurations?</h3>
              <p className="text-gray-600">
                Currently, wheel configurations are session-based. We recommend taking a screenshot or noting down your
                options if you&apos;d like to use the same configuration later.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
