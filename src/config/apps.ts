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
];
