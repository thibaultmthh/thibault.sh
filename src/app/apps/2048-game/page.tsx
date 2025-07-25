"use client";

import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

type Grid = number[][];
type Direction = "up" | "down" | "left" | "right";

const GRID_SIZE = 4;
const WINNING_SCORE = 2048;

const tileVariants = {
  initial: { scale: 0.5, opacity: 0 },
  enter: { scale: 1, opacity: 1 },
  exit: { scale: 0.5, opacity: 0 },
};

const overlayVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Initialize empty grid
  const initGrid = useCallback(() => {
    const newGrid = Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(0));
    addNewTile(newGrid);
    addNewTile(newGrid);
    return newGrid;
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setGrid(initGrid());
    setScore(0);
    setGameOver(false);
    setWon(false);
  }, [initGrid]);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Add new tile to the grid
  const addNewTile = (grid: Grid) => {
    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) emptyCells.push({ x: i, y: j });
      }
    }
    if (emptyCells.length > 0) {
      const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  // Move tiles in a direction
  const move = (direction: Direction) => {
    if (gameOver || won) return;

    const newGrid = JSON.parse(JSON.stringify(grid));
    let moved = false;
    let newScore = score;

    const moveLeft = () => {
      for (let i = 0; i < GRID_SIZE; i++) {
        let col = 0;
        for (let j = 1; j < GRID_SIZE; j++) {
          if (newGrid[i][j] !== 0) {
            if (newGrid[i][col] === 0) {
              newGrid[i][col] = newGrid[i][j];
              newGrid[i][j] = 0;
              moved = true;
            } else if (newGrid[i][col] === newGrid[i][j]) {
              newGrid[i][col] *= 2;
              newScore += newGrid[i][col];
              newGrid[i][j] = 0;
              col++;
              moved = true;
              if (newGrid[i][col - 1] === WINNING_SCORE) setWon(true);
            } else {
              col++;
              if (col !== j) {
                newGrid[i][col] = newGrid[i][j];
                newGrid[i][j] = 0;
                moved = true;
              }
            }
          }
        }
      }
    };

    // Rotate grid to reuse moveLeft logic
    const rotate = (times: number) => {
      for (let t = 0; t < times; t++) {
        const rotated = Array(GRID_SIZE)
          .fill(0)
          .map(() => Array(GRID_SIZE).fill(0));
        for (let i = 0; i < GRID_SIZE; i++) {
          for (let j = 0; j < GRID_SIZE; j++) {
            rotated[j][GRID_SIZE - 1 - i] = newGrid[i][j];
          }
        }
        for (let i = 0; i < GRID_SIZE; i++) {
          for (let j = 0; j < GRID_SIZE; j++) {
            newGrid[i][j] = rotated[i][j];
          }
        }
      }
    };

    switch (direction) {
      case "left":
        moveLeft();
        break;
      case "right":
        rotate(2);
        moveLeft();
        rotate(2);
        break;
      case "up":
        rotate(3);
        moveLeft();
        rotate(1);
        break;
      case "down":
        rotate(1);
        moveLeft();
        rotate(3);
        break;
    }

    if (moved) {
      addNewTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);
      checkGameOver(newGrid);
    }
  };

  // Check if game is over
  const checkGameOver = (grid: Grid) => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) return;
        if (i < GRID_SIZE - 1 && grid[i][j] === grid[i + 1][j]) return;
        if (j < GRID_SIZE - 1 && grid[i][j] === grid[i][j + 1]) return;
      }
    }
    setGameOver(true);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent arrow keys from scrolling
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowRight":
          move("right");
          break;
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, gameOver, won, score]);

  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      2: "bg-gray-200",
      4: "bg-gray-300",
      8: "bg-orange-200",
      16: "bg-orange-300",
      32: "bg-orange-400",
      64: "bg-orange-500",
      128: "bg-yellow-200",
      256: "bg-yellow-300",
      512: "bg-yellow-400",
      1024: "bg-yellow-500",
      2048: "bg-yellow-600",
    };
    return colors[value] || "bg-gray-700";
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 max-w-md w-full">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2">2048</h1>
          <p className="text-gray-600 text-sm mb-2">
            Use arrow keys to move tiles. Tiles with the same number merge into one when they touch.
          </p>
          <div className="flex justify-center gap-4 mb-2">
            <div className="text-xl font-bold">Score: {score}</div>
            <button
              onClick={resetGame}
              className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              New Game
            </button>
          </div>
        </div>

        <Card className="p-4 bg-gray-100">
          <div className="grid grid-cols-4 gap-2">
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <div key={`${i}-${j}`} className="w-full aspect-square relative">
                  {/* Background cell */}
                  <div className="absolute inset-0 bg-gray-300 rounded-lg" />

                  {/* Animated tile */}
                  <AnimatePresence mode="popLayout">
                    {cell !== 0 && (
                      <motion.div
                        key={`${i}-${j}-${cell}`}
                        variants={tileVariants}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className={`absolute inset-0 flex items-center justify-center text-2xl font-bold rounded-lg
                          ${getTileColor(cell)}
                          ${cell > 4 ? "text-white" : "text-gray-800"}`}
                      >
                        {cell}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>
        </Card>

        <div className="mt-6 space-y-4 text-sm text-gray-600">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Tips & Strategies</h3>
            <ul className="space-y-2">
              <li>• Keep your highest number tile in a corner</li>
              <li>• Build a chain of descending numbers</li>
              <li>• Don&apos;t make hasty moves - plan ahead!</li>
              <li>• Try to maintain multiple merge options</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-2">About 2048</h3>
            <p className="mb-2">
              2048 was created by Gabriele Cirulli in March 2014. The game became a viral hit, with millions of players
              worldwide trying to reach the elusive 2048 tile.
            </p>
            <p>
              This version is built with React and features smooth animations powered by Framer Motion. Challenge
              yourself to reach 2048 and beyond!
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Advanced Strategies</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-orange-500 pl-3">
                <h4 className="font-semibold text-gray-800">The Snake Pattern</h4>
                <p>
                  Build your numbers in a zigzag pattern, keeping your highest numbers in a specific order. This helps
                  maintain organization and prevents tile lock.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-3">
                <h4 className="font-semibold text-gray-800">Corner Strategy</h4>
                <p>
                  Always keep your largest tile in one corner and build descending values around it. This creates a
                  stable foundation for merging tiles.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-3">
                <h4 className="font-semibold text-gray-800">Edge Management</h4>
                <p>
                  Focus on keeping your tiles along the edges, creating clear paths for merging and maintaining control
                  of the board.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Milestones to Aim For</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-md shadow-xs">
                <div className="font-bold text-orange-500">Beginner</div>
                <p>Reach tile 256</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-xs">
                <div className="font-bold text-orange-600">Intermediate</div>
                <p>Reach tile 512</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-xs">
                <div className="font-bold text-orange-700">Advanced</div>
                <p>Reach tile 1024</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-xs">
                <div className="font-bold text-orange-800">Expert</div>
                <p>Reach tile 2048</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Fun Facts & Math</h3>
            <div className="space-y-2">
              <p>• Every number in the game is a power of 2</p>
              <p>• The theoretical maximum score is 3,932,156</p>
              <p>• The largest possible tile is 131,072 (2¹⁷)</p>
              <p>• The probability of getting a &apos;4&apos; tile is 10%</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Controls</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-200 rounded-md">↑</span>
                <span>Move Up</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-200 rounded-md">↓</span>
                <span>Move Down</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-200 rounded-md">←</span>
                <span>Move Left</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-200 rounded-md">→</span>
                <span>Move Right</span>
              </div>
            </div>
          </div>
        </div>

        {(gameOver || won) && (
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white p-8 rounded-lg text-center"
            >
              <h2 className="text-2xl font-bold mb-4">{won ? "You Won! 🎉" : "Game Over!"}</h2>
              <p className="mb-4">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
