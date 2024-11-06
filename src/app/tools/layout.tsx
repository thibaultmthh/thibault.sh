import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown, Star, Terminal } from "lucide-react";
import { ToolsBreadcrumb } from "@/components/tools/tools-breadcrumb";
import { tools } from "@/config/tools";
import { FavoritesProvider } from "@/contexts/favorites-context";
import { FavoriteButton } from "@/components/tools/favorite-button";
import { FavoritesList } from "@/components/tools/favorites-list";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getToolMetadata } from "@/lib/get-tool-metadata";
import Link from "next/link";
import { CommandMenu } from "../../components/command-menu";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Split path and filter out empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Check if we're in a tool path (/tools/category/toolId)
  if (segments.length >= 3 && segments[0] === "tools") {
    const toolId = segments[2]; // Get the third segment (toolId)
    return getToolMetadata(toolId);
  }

  // Default metadata for /tools page
  return {
    title: "Developer Tools & Utilities | Thibault Mathian",
    description:
      "Free online developer tools built by Thibault Mathian. Including JSON formatter, Base64 encoder/decoder, hash generator, text tools, and more. Simple, fast, and secure.",
    keywords:
      "developer tools, online tools, web tools, JSON formatter, Base64 encoder, hash generator, Thibault Mathian",
    openGraph: {
      title: "Developer Tools & Utilities | Thibault Mathian",
      description:
        "Free online developer tools built by Thibault Mathian. Including JSON formatter, Base64 encoder/decoder, hash generator, and more.",
      type: "website",
      url: "https://thibault.sh/tools",
    },
    alternates: {
      canonical: "https://thibault.sh/tools",
    },
  };
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen font-mono">
      <FavoritesProvider>
        <SidebarProvider>
          <Sidebar variant="inset">
            <SidebarHeader className="px-2 mt-2">
              <Link href="/tools" className="flex items-center gap-2 mb-4 text-orange-500">
                <Terminal className="w-5 h-5" />
                <span className="text-sm">thibault.sh/tools</span>
              </Link>

              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors">
                  <span>←</span>
                  <span>Portfolio</span>
                </Link>
              </div>

              <div className="px-2 mb-4">
                <CommandMenu />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="hover:text-orange-500 transition-colors">
                      <Star className="mr-2 h-4 w-4" />
                      Favorites
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <FavoritesList />
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
              {Object.entries(tools).map(([category, { icon: Icon, items }]) => (
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
                          {items.map((tool) => (
                            <SidebarMenuItem key={tool.id} className="group">
                              <SidebarMenuButton asChild>
                                <Link href={tool.path} className="hover:text-orange-500 transition-colors">
                                  <span>{tool.name}</span>
                                  <FavoriteButton toolId={tool.id} />
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              ))}
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <div className="p-3">
              <div className="flex mb-4 items-center">
                <SidebarTrigger className="mr-2 hover:text-orange-500 transition-colors" />
                <ToolsBreadcrumb />
              </div>
              <div className="p-2">{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </FavoritesProvider>
    </div>
  );
}
