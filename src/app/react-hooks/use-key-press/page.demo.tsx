"use client";

import { useKeyPress } from "@/components/hooks/useKeyPress";
import { useEffect, useState } from "react";

export function Demo() {
  const [lastPressed, setLastPressed] = useState<string[]>([]);
  const isSpacePressed = useKeyPress(" ");
  const isEnterPressed = useKeyPress("Enter");
  const isEscapePressed = useKeyPress("Escape");
  const isControlPressed = useKeyPress("Control");
  const isShiftPressed = useKeyPress("Shift");

  // Keep track of last 5 pressed keys
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setLastPressed((prev) => [e.key, ...prev.slice(0, 4)]);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="space-y-6">
      {/* Key status indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <KeyIndicator name="Space" isPressed={isSpacePressed} />
        <KeyIndicator name="Enter" isPressed={isEnterPressed} />
        <KeyIndicator name="Escape" isPressed={isEscapePressed} />
        <KeyIndicator name="Control" isPressed={isControlPressed} />
        <KeyIndicator name="Shift" isPressed={isShiftPressed} />
      </div>

      {/* Recently pressed keys */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2">Recently Pressed Keys</h3>
        <div className="flex flex-wrap gap-2">
          {lastPressed.map((key, index) => (
            <span key={index} className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-sm font-mono animate-fade-in">
              {key}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive game example */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2">Mini Game: Press the correct keys</h3>
        <GameDemo />
      </div>
    </div>
  );
}

function KeyIndicator({ name, isPressed }: { name: string; isPressed: boolean }) {
  return (
    <div
      className={`p-3 rounded-lg transition-all ${
        isPressed ? "bg-blue-500 text-white scale-95" : "bg-gray-100 dark:bg-gray-800"
      }`}
    >
      <div className="text-xs font-medium mb-1">Key</div>
      <div className="font-mono">{name}</div>
    </div>
  );
}

function GameDemo() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userProgress, setUserProgress] = useState(0);
  const [gameState, setGameState] = useState<"waiting" | "playing" | "won">("waiting");

  const startGame = () => {
    const newSequence = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
    setSequence(newSequence);
    setUserProgress(0);
    setGameState("playing");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      if (e.key === sequence[userProgress]) {
        const newProgress = userProgress + 1;
        setUserProgress(newProgress);

        if (newProgress === sequence.length) {
          setGameState("won");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence, userProgress, gameState]);

  return (
    <div className="space-y-4">
      {gameState === "waiting" && (
        <button onClick={startGame} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Start Game
        </button>
      )}

      {gameState === "playing" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            {sequence.map((key, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded ${
                  index < userProgress ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {key.replace("Arrow", "")}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Press the arrow keys in sequence</p>
        </div>
      )}

      {gameState === "won" && (
        <div className="space-y-2">
          <p className="text-green-500 font-medium">🎉 You won!</p>
          <button onClick={startGame} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
