"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface CardItem {
  id: number;
  letter: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Add difficulty configurations
const DIFFICULTY_LEVELS = {
  easy: { pairs: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"], timeLimit: 0 },
  medium: { pairs: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"], timeLimit: 0 },
  hard: {
    pairs: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🦒"],
    timeLimit: 0,
  },
};

export default function MemoryGame() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const letters = DIFFICULTY_LEVELS[difficulty].pairs;

  useEffect(() => {
    const shuffledCards = [...letters, ...letters]
      .map((letter, index) => ({ id: index, letter, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setMoves(0);
    setMatchedPairs(0);
    setFlippedCards([]);
  }, [difficulty, letters]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newFlippedCards = [...flippedCards, index];
    const newCards = cards.map((card, i) => (i === index ? { ...card, isFlipped: true } : card));

    setCards(newCards);
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (newCards[firstIndex].letter === newCards[secondIndex].letter) {
        setMatchedPairs(matchedPairs + 1);
        setCards((prevCards) =>
          prevCards.map((card) => (card.letter === newCards[firstIndex].letter ? { ...card, isMatched: true } : card))
        );
      }
      setTimeout(() => {
        setCards((prevCards) => prevCards.map((card) => (card.isMatched ? card : { ...card, isFlipped: false })));
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Memory Game Challenge</h1>
        <div className="text-gray-600 max-w-2xl mx-auto space-y-4">
          <p>
            Welcome to the Memory Game Challenge! Test and improve your memory skills by matching pairs of cards. This
            engaging brain training exercise helps enhance concentration, pattern recognition, and short-term memory.
          </p>
          <p>Perfect for all ages, from children developing cognitive skills to adults maintaining mental sharpness.</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-center gap-4">
            <select
              className="px-4 py-2 rounded border"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as "easy" | "medium" | "hard")}
            >
              <option value="easy">Easy (8 pairs)</option>
              <option value="medium">Medium (12 pairs)</option>
              <option value="hard">Hard (16 pairs)</option>
            </select>
          </div>

          <div className="flex justify-center gap-4">
            <p className="text-gray-700">Moves: {moves}</p>
            <p className="text-gray-700">
              Pairs Matched: {matchedPairs}/{letters.length}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`grid gap-4 ${
          difficulty === "easy" ? "grid-cols-4" : difficulty === "medium" ? "grid-cols-6" : "grid-cols-8"
        }`}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            className={`p-4 flex items-center justify-center text-4xl cursor-pointer
                        ${card.isFlipped || card.isMatched ? "bg-orange-200" : "bg-gray-200"}
                        ${card.isMatched ? "text-orange-600" : "text-gray-800"}`}
            onClick={() => handleCardClick(index)}
          >
            {card.isFlipped || card.isMatched ? card.letter : "❓"}
          </Card>
        ))}
      </div>

      {matchedPairs === letters.length && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-green-600">Congratulations! You&apos;ve matched all pairs!</h2>
          <p className="mt-2 text-gray-600">
            You completed the game in {moves} moves!
            {moves <= letters.length * 2
              ? " Incredible memory!"
              : moves <= letters.length * 3
                ? " Great job!"
                : " Keep practicing to improve your score!"}
          </p>
        </div>
      )}

      <footer className="mt-12 text-center text-gray-600">
        <h2 className="text-xl font-semibold mb-4">Benefits of Memory Games</h2>
        <ul className="space-y-2 max-w-2xl mx-auto">
          <li>🧠 Improves cognitive function and memory retention</li>
          <li>🎯 Enhances concentration and attention to detail</li>
          <li>⚡ Develops faster thinking and mental agility</li>
          <li>🎮 Provides entertaining brain exercise</li>
          <li>📈 Helps prevent cognitive decline</li>
        </ul>
      </footer>
    </div>
  );
}
