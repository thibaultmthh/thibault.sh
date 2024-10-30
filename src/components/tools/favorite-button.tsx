"use client";

import { Star } from "lucide-react";
import { useFavorites } from "@/contexts/favorites-context";
import { cn } from "@/lib/utils";

export function FavoriteButton({ toolId }: { toolId: string }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(toolId);
      }}
      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Star
        className={cn("h-4 w-4", isFavorite(toolId) ? "fill-yellow-400 stroke-yellow-400" : "stroke-muted-foreground")}
      />
    </button>
  );
}
