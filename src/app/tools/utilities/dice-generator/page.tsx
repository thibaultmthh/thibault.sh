"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices, RotateCcw, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DiceRoll {
  id: number;
  value: number;
  timestamp: number;
}

interface RollSession {
  id: number;
  rolls: DiceRoll[];
  total: number;
  diceType: keyof typeof DICE_TYPES;
  numberOfDice: number;
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

const DiceIcon = ({ value, isRolling = false }: { value: number; isRolling?: boolean }) => {
  const icons = {
    1: <Dice1 className="h-10 w-10" />,
    2: <Dice2 className="h-10 w-10" />,
    3: <Dice3 className="h-10 w-10" />,
    4: <Dice4 className="h-10 w-10" />,
    5: <Dice5 className="h-10 w-10" />,
    6: <Dice6 className="h-10 w-10" />,
  };

  if (isRolling) {
    return (
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        className="text-muted-foreground"
      >
        <Dices className="h-10 w-10" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
      className="text-primary"
    >
      {icons[value as keyof typeof icons] || (
        <div className="h-10 w-10 rounded-lg border-2 border-primary flex items-center justify-center">
          <span className="text-xl font-bold">{value}</span>
        </div>
      )}
    </motion.div>
  );
};

export default function DiceGenerator() {
  const [diceType, setDiceType] = useState<keyof typeof DICE_TYPES>("d6");
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [currentRolls, setCurrentRolls] = useState<DiceRoll[]>([]);
  const [rollHistory, setRollHistory] = useState<RollSession[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  // Auto-generate first roll on load
  useEffect(() => {
    rollDice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    const total = newRolls.reduce((sum, roll) => sum + roll.value, 0);

    // Show rolling animation for 800ms
    setTimeout(() => {
      setCurrentRolls(newRolls);
      setIsRolling(false);
      setRollCount((prev) => prev + 1);

      // Add to history (keep last 10 sessions)
      const newSession: RollSession = {
        id: Date.now(),
        rolls: newRolls,
        total,
        diceType,
        numberOfDice,
        timestamp: Date.now(),
      };

      setRollHistory((prev) => [newSession, ...prev.slice(0, 9)]);
    }, 800);
  };

  const clearHistory = () => {
    setRollHistory([]);
    setRollCount(0);
  };

  const total = currentRolls.reduce((sum, roll) => sum + roll.value, 0);
  const minPossible = numberOfDice;
  const maxPossible = numberOfDice * DICE_TYPES[diceType].sides;
  const average =
    rollHistory.length > 0
      ? (rollHistory.reduce((sum, session) => sum + session.total, 0) / rollHistory.length).toFixed(1)
      : "—";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dice Generator</h1>
      <p className="text-muted-foreground mb-6">
        Roll virtual dice with cryptographically secure randomness. Perfect for tabletop games, decision making, and
        probability experiments.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Dice Results Display */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Current Roll</h2>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300"
                >
                  {DICE_TYPES[diceType].label}
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  {numberOfDice} dice
                </Badge>
              </div>
            </div>

            {/* Main Dice Display */}
            <div className="min-h-[200px] flex flex-col items-center justify-center space-y-6">
              <AnimatePresence mode="wait">
                {isRolling ? (
                  <motion.div
                    key="rolling"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap justify-center gap-4"
                  >
                    {Array.from({ length: numberOfDice }).map((_, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 bg-muted/50 rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/30"
                      >
                        <DiceIcon value={1} isRolling={true} />
                      </div>
                    ))}
                  </motion.div>
                ) : currentRolls.length > 0 ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                    className="space-y-6 w-full"
                  >
                    <div className="flex flex-wrap justify-center gap-4">
                      {currentRolls.map((roll, index) => (
                        <motion.div
                          key={roll.id}
                          initial={{ scale: 0, y: -50 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{
                            delay: index * 0.1,
                            type: "spring",
                            damping: 15,
                            stiffness: 300,
                          }}
                          className="w-20 h-20 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl flex items-center justify-center border-2 border-primary/20 shadow-lg"
                        >
                          <DiceIcon value={roll.value} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Result Summary */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: numberOfDice * 0.1 + 0.2 }}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg p-6 border"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-3xl font-bold text-primary">{total}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Range</p>
                          <p className="text-lg font-semibold">
                            {minPossible} - {maxPossible}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Average</p>
                          <p className="text-lg font-semibold">{average}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Dices className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Click &quot;Roll Dice&quot; to get started</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Roll Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg"
                onClick={rollDice}
                disabled={isRolling}
              >
                {isRolling ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Dices className="h-5 w-5" />
                    </motion.div>
                    Rolling...
                  </>
                ) : (
                  <>
                    <Dices className="mr-2 h-5 w-5" />
                    Roll {numberOfDice} {numberOfDice === 1 ? "Die" : "Dice"}
                  </>
                )}
              </Button>
            </motion.div>
          </Card>

          {/* Configuration */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configuration</h3>
            <div className="space-y-6">
              {/* Dice Type Selector */}
              <div>
                <Label className="mb-3 block text-sm font-medium">Dice Type</Label>
                <Select value={diceType} onValueChange={(value) => setDiceType(value as keyof typeof DICE_TYPES)}>
                  <SelectTrigger className="h-12">
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
                <div className="flex justify-between mb-3">
                  <Label className="text-sm font-medium">Number of Dice</Label>
                  <Badge
                    variant="outline"
                    className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300"
                  >
                    {numberOfDice} {numberOfDice === 1 ? "die" : "dice"}
                  </Badge>
                </div>
                <Slider
                  value={[numberOfDice]}
                  onValueChange={([value]) => setNumberOfDice(value)}
                  max={12}
                  min={1}
                  step={1}
                  className="py-4"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Statistics & History Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Statistics</h3>
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Rolls</span>
                <span className="font-semibold">{rollCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Sessions</span>
                <span className="font-semibold">{rollHistory.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Roll</span>
                <span className="font-semibold">{average}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Rolls</h3>
              {rollHistory.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearHistory}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>

            {rollHistory.length === 0 ? (
              <div className="text-center text-muted-foreground py-6">
                <Dices className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Roll history will appear here</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {rollHistory.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 bg-muted/50 rounded-lg border"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Total: {session.total}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.numberOfDice}x {DICE_TYPES[session.diceType].label}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(session.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {session.rolls.map((roll) => (
                        <div
                          key={roll.id}
                          className="w-6 h-6 bg-background rounded text-xs font-bold flex items-center justify-center border"
                        >
                          {roll.value}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
