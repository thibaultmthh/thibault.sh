"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChevronDown, Store, Layout, Timer, Eye, Mouse, Database, Network, Lock } from "lucide-react";
import Link from "next/link";

// Icon mapping
const IconMap = {
  store: Store,
  layout: Layout,
  timer: Timer,
  eye: Eye,
  mouse: Mouse,
  database: Database,
  network: Network,
  lock: Lock,
} as const;

type IconName = keyof typeof IconMap;

interface HooksListProps {
  hooks: Record<
    string,
    {
      icon: IconName;
      path: string;
      items: Array<{
        id: string;
        name: string;
        description: string;
        shortDescription: string;
        path: string;
      }>;
    }
  >;
}

export function HooksList({ hooks }: HooksListProps) {
  return (
    <>
      {Object.entries(hooks).map(([category, { icon, items }]) => {
        const Icon = IconMap[icon];
        return (
          <Collapsible key={category} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="hover:text-orange-500 transition-colors">
                  <Icon className="mr-2 h-4 w-4" />
                  {category}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((hook) => (
                      <SidebarMenuItem key={hook.id}>
                        <SidebarMenuButton asChild>
                          <Link href={hook.path} className="hover:text-orange-500 transition-colors">
                            <span>{hook.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        );
      })}
    </>
  );
}
