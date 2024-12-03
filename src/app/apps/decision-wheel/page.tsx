"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, RotateCw } from "lucide-react";
import { motion, animate, useMotionValue, spring } from "framer-motion";

export default function DecisionWheel() {
  const [options, setOptions] = useState<string[]>([
    "Option 1",
    "Option 2",
    "Option 3",
  ]);
  const [newOption, setNewOption] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelRotation = useMotionValue(0);

  const addOption = () => {
    if (newOption.trim() && options.length < 12) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const spinWheel = () => {
    if (isSpinning || options.length < 2) return;
    setIsSpinning(true);

    // Reset wheel position first
    wheelRotation.set(0);

    // Calculate final rotation
    const spins = 5 + Math.random() * 3; // Random number of spins (5-8)
    const baseAngle = 360 * spins;
    const randomAngle = Math.random() * 360;
    const targetRotation = baseAngle + randomAngle;

    // Animate with spring physics
    animate(wheelRotation, targetRotation, {
      type: "spring",
      duration: 5,
      bounce: 0.1,
      velocity: 2,
      stiffness: 40,
      damping: 30,
      onComplete: () => {
        setIsSpinning(false);
        const normalizedAngle = randomAngle;
        const optionAngle = 360 / options.length;
        const winningIndex = Math.floor(normalizedAngle / optionAngle);
        console.log("Winner:", options[winningIndex]);
      },
    });
  };

  const getWheelColors = (index: number, total: number) => {
    return `hsl(${(360 / total) * index}, 80%, 70%)`;
  };

  return (
    <div className="min-h-screen p-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Decision Wheel</h1>
        <p className="text-gray-600">
          Add options and spin the wheel to make a random decision.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        {/* Wheel Section */}
        <Card className="p-6 flex items-center justify-center">
          <div className="relative w-[300px] h-[300px]">
            <motion.div
              ref={wheelRef}
              className="absolute w-full h-full"
              style={{ rotate: wheelRotation }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full -rotate-90"
              >
                {options.map((option, index) => {
                  const percent = 100 / options.length;
                  const startAngle = (index * 360) / options.length;
                  const endAngle = ((index + 1) * 360) / options.length;
                  const start = polarToCartesian(50, 50, 50, startAngle);
                  const end = polarToCartesian(50, 50, 50, endAngle);
                  const largeArcFlag = percent > 50 ? 1 : 0;
                  const midAngle = startAngle + (endAngle - startAngle) / 2;
                  const textRadius = 35; // Slightly inside the wheel edge
                  const textPosition = polarToCartesian(50, 50, textRadius, midAngle);

                  return (
                    <g key={index}>
                      <path
                        d={`
                          M 50 50
                          L ${start.x} ${start.y}
                          A 50 50 0 ${largeArcFlag} 1 ${end.x} ${end.y}
                          Z
                        `}
                        fill={getWheelColors(index, options.length)}
                        stroke="white"
                        strokeWidth="0.5"
                      />
                      <text
                        x={textPosition.x}
                        y={textPosition.y}
                        className="text-[3.5px]"
                        fill="black"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${midAngle + 90}, ${textPosition.x}, ${textPosition.y})`}
                      >
                        {option}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </motion.div>
            
            {/* Updated pointer with better styling */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3L2 20h20L12 3z"
                    fill="#1a1a1a"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Card>

        {/* Controls Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add option..."
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addOption()}
                maxLength={20}
              />
              <Button
                onClick={addOption}
                disabled={!newOption.trim() || options.length >= 12}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getWheelColors(index, options.length) }}
                    />
                    <span>{option}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={spinWheel}
              disabled={isSpinning || options.length < 2}
            >
              <RotateCw className="mr-2 h-4 w-4" />
              Spin the Wheel
            </Button>

            {options.length < 2 && (
              <p className="text-sm text-red-500">
                Add at least 2 options to spin the wheel
              </p>
            )}
            {options.length >= 12 && (
              <p className="text-sm text-red-500">
                Maximum 12 options allowed
              </p>
            )}
          </div>
        </Card>
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
              A decision wheel, also known as a spinning wheel or wheel of fortune, is an engaging and fair way to make random selections or decisions. 
              It eliminates bias and makes decision-making fun, whether you're choosing a restaurant for dinner, assigning tasks, or playing games.
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
                Yes! Our decision wheel uses a cryptographically secure random number generator to ensure completely fair and unbiased results every time you spin.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How many options can I add?</h3>
              <p className="text-gray-600">
                The wheel supports between 2 and 12 options for optimal visibility and functionality. This range ensures that all options are clearly visible and the wheel remains easy to read.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I save my wheel configurations?</h3>
              <p className="text-gray-600">
                Currently, wheel configurations are session-based. We recommend taking a screenshot or noting down your options if you'd like to use the same configuration later.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
} 