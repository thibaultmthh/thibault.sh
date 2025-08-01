"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices } from "lucide-react";
import { motion } from "framer-motion";

interface DiceRoll {
  id: number;
  value: number;
  timestamp: number;
}

const DICE_TYPES = {
  d2: { sides: 2, label: "Coin (2 sides)" },
  d4: { sides: 4, label: "D4 (4 sides)" },
  d6: { sides: 6, label: "D6 (6 sides)" },
  d8: { sides: 8, label: "D8 (8 sides)" },
  d10: { sides: 10, label: "D10 (10 sides)" },
  d12: { sides: 12, label: "D12 (12 sides)" },
  d20: { sides: 20, label: "D20 (20 sides)" },
  d100: { sides: 100, label: "D100 (100 sides)" },
};

const DiceIcon = ({ value }: { value: number }) => {
  const icons = {
    1: <Dice1 className="h-8 w-8" />,
    2: <Dice2 className="h-8 w-8" />,
    3: <Dice3 className="h-8 w-8" />,
    4: <Dice4 className="h-8 w-8" />,
    5: <Dice5 className="h-8 w-8" />,
    6: <Dice6 className="h-8 w-8" />,
  };

  return icons[value as keyof typeof icons] || <span className="text-2xl font-bold">{value}</span>;
};

export default function DiceGenerator() {
  const [diceType, setDiceType] = useState<keyof typeof DICE_TYPES>("d6");
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [rolls, setRolls] = useState<DiceRoll[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    const sides = DICE_TYPES[diceType].sides;

    // Generate secure random numbers
    const array = new Uint32Array(numberOfDice);
    crypto.getRandomValues(array);

    const newRolls = Array.from(array).map((randomValue, index) => ({
      id: Date.now() + index,
      value: (randomValue % sides) + 1,
      timestamp: Date.now(),
    }));

    setTimeout(() => {
      setRolls(newRolls);
      setIsRolling(false);
    }, 500);
  };

  const total = rolls.reduce((sum, roll) => sum + roll.value, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dice Generator</h1>

      <div>
        <Card className="p-6">
          <div className="space-y-6">
            {/* Dice Type Selector */}
            <div>
              <Label className="mb-2 block">Dice Type</Label>
              <Select value={diceType} onValueChange={(value) => setDiceType(value as keyof typeof DICE_TYPES)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dice type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DICE_TYPES).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Dice Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <Label>Number of Dice</Label>
                <span className="text-sm">
                  {numberOfDice} {numberOfDice === 1 ? "die" : "dice"}
                </span>
              </div>
              <Slider
                value={[numberOfDice]}
                onValueChange={([value]) => setNumberOfDice(value)}
                max={10}
                min={1}
                step={1}
              />
            </div>

            {/* Roll Button */}
            <Button className="w-full" size="lg" onClick={rollDice} disabled={isRolling}>
              <Dices className="mr-2 h-5 w-5" />
              Roll {numberOfDice} {numberOfDice === 1 ? "Die" : "Dice"}
            </Button>

            {/* Results Display */}
            {rolls.length > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4">
                  {rolls.map((roll) => (
                    <motion.div
                      key={roll.id}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <div className="aspect-square flex items-center justify-center bg-muted rounded-lg">
                        <DiceIcon value={roll.value} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Total */}
                {numberOfDice > 1 && (
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="font-medium">Total</span>
                    <span className="text-2xl font-bold">{total}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About Dice Generator</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              This dice generator uses cryptographically secure random numbers to simulate fair dice rolls. You can
              select from various dice types commonly used in tabletop games and roll multiple dice at once.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Supports different types of dice (D4, D6, D8, D10, D12, D20, D100)</li>
              <li>Roll up to 10 dice simultaneously</li>
              <li>Automatic total calculation for multiple dice</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
