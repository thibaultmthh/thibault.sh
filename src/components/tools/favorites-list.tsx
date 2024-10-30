"use client";

import { useFavorites } from "@/contexts/favorites-context";
import { tools } from "@/config/tools";
import { SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { FavoriteButton } from "./favorite-button";

export function FavoritesList() {
  const { favorites } = useFavorites();

  const favoriteTools = favorites
    .map((id) => {
      for (const category of Object.values(tools)) {
        const tool = category.items.find((item) => item.id === id);
        if (tool) return tool;
      }
      return null;
    })
    .filter((tool): tool is NonNullable<typeof tool> => tool !== null);

  if (favoriteTools.length === 0) {
    return (
      <SidebarGroupContent>
        <div className="px-3 py-2 text-sm text-muted-foreground">No favorites yet</div>
      </SidebarGroupContent>
    );
  }

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {favoriteTools.map((tool) => (
          <SidebarMenuItem key={tool.id} className="group">
            <SidebarMenuButton asChild>
              <a href={tool.path}>
                <span>{tool.name}</span>
                <FavoriteButton toolId={tool.id} />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
