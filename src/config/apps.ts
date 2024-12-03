export type AppItem = {
  id: string;
  name: string;
  description: string;
  path: string;
};

export const apps: AppItem[] = [
  {
    id: "tier-list-maker",
    name: "Tier List Maker",
    description: "Create and customize tier lists by dragging and dropping items.",
    path: "/apps/tier-list-maker",
  },
  {
    id: "2048",
    name: "2048 Clone",
    description: "Play the classic 2048 game and try to reach the 2048 tile.",
    path: "/apps/2048-game",
  },
  {
    id: "memory-game",
    name: "Memory Game",
    description: "Test your memory by matching pairs of cards.",
    path: "/apps/memory-game",
  },
  {
    id: "interest-simulator",
    name: "Interest Simulator",
    description: "Visualize compound interest and investment growth over time with interactive charts.",
    path: "/apps/interest-simulator",
  },
  {
    id: "decision-wheel",
    name: "Decision Wheel",
    description: "Spin the wheel to make random decisions. Perfect for choosing between multiple options.",
    path: "/apps/decision-wheel",
  },
  {
    id: "pixel-art-creator",
    name: "Pixel Art Creator",
    description: "Create pixel art with a simple grid-based drawing tool. Export your creations as PNG images.",
    path: "/apps/pixel-art-creator",
  },
  {
    id: "word-cloud-generator",
    name: "Word Cloud Generator",
    description:
      "Create beautiful word clouds from any text. Customize colors, shapes, and layouts for unique visualizations.",
    path: "/apps/word-cloud-generator",
  },
];
