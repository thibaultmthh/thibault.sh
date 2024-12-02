import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memory Game - Test Your Memory with Letter Matching",
  description:
    "Challenge your memory with our free letter-matching memory game. Flip cards to find matching pairs and improve your cognitive skills.",
  keywords: "memory game, card matching game, brain training, memory training, letter matching game",
  openGraph: {
    title: "Memory Game - Test Your Memory with Letter Matching",
    description: "Challenge your memory with our free letter-matching memory game. Flip cards to find matching pairs.",
    type: "website",
  },
};

export default function MemoryGameLayout({ children }: { children: React.ReactNode }) {
  return children;
}
