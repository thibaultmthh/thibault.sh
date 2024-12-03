import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decision Wheel - Random Decision Maker",
  description: "Make random decisions with a customizable wheel spinner. Perfect for groups, choices, and decision making.",
  keywords: "decision maker, wheel spinner, random picker, wheel of fortune, random decision, choice maker",
  openGraph: {
    title: "Decision Wheel - Random Decision Maker",
    description: "Make random decisions with a customizable wheel spinner",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 