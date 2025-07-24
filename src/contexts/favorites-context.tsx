"use client";

import { useLocalStorageState } from "@thibault.sh/hooks/useLocalStorageState";
import { createContext, useContext } from "react";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useLocalStorageState<string[]>("toolbox-favorites", []);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      setFavorites(newFavorites);
      return newFavorites;
    });
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
