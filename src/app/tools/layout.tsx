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
import { ChevronDown, Star, Terminal, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import Footer from "@/components/Footer";
import { NewsletterCTA } from "@/components/tools/newsletter-cta";

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
  // Calculate total tools
  const totalTools = Object.values(tools).reduce((total, category) => total + category.items.length, 0);

  return (
    <div className="min-h-screen font-mono flex flex-col">
      <FavoritesProvider>
        <SidebarProvider>
          <div className="flex flex-1">
            <Sidebar variant="inset">
              <SidebarHeader className="px-4 pt-4 pb-2">
                {/* Main branding */}
                <Link
                  href="/tools"
                  className="flex items-center gap-3 mb-0 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Wrench className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">thibault.sh/tools</div>
                    <div className="text-xs text-muted-foreground">{totalTools} tools available</div>
                  </div>
                </Link>

                {/* Navigation links */}
                <div className="flex flex-col gap-1 mb-0">
                  <Link
                    href="/"
                    className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Portfolio</span>
                  </Link>
                </div>

                <Separator className="mb-4" />

                {/* Search */}
                <div className="mb-4">
                  <CommandMenu />
                </div>
              </SidebarHeader>

              <SidebarContent className="px-2">
                {/* Favorites */}
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          <span className="font-medium">Favorites</span>
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent className="px-2">
                        <FavoritesList />
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>

                {/* Tool Categories */}
                {Object.entries(tools).map(([category, { icon: Icon, items }]) => (
                  <Collapsible key={category} defaultOpen className="group/collapsible">
                    <SidebarGroup>
                      <SidebarGroupLabel asChild>
                        <CollapsibleTrigger className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors group">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span className="font-medium">{category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
                              {items.length}
                            </Badge>
                            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </div>
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>
                      <CollapsibleContent>
                        <SidebarGroupContent className="px-2">
                          <SidebarMenu>
                            {items.map((tool) => (
                              <SidebarMenuItem key={tool.id} className="group/item">
                                <SidebarMenuButton asChild className="w-full">
                                  <Link
                                    href={tool.path}
                                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors text-sm "
                                  >
                                    <span className="flex-1 truncate">{tool.name}</span>
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

                {/* Footer info */}
                <div className="mt-auto p-4 text-center">
                  <div className="text-xs text-muted-foreground mb-2">🔒 Privacy-first • ⚡ Fast • 🌐 Offline</div>
                  <div className="text-xs text-muted-foreground">All tools run in your browser</div>
                </div>
              </SidebarContent>
            </Sidebar>

            <SidebarInset className="flex-1 flex flex-col pb-4">
              <div className="p-4 flex-1">
                {/* Top bar with sidebar trigger and breadcrumb */}
                <div className="flex items-center gap-4 mb-6">
                  <SidebarTrigger className="hover:text-foreground transition-colors" />
                  <ToolsBreadcrumb />
                </div>

                {/* Main content */}
                <div className="flex-1 overflow-auto">{children}</div>

                {/* Newsletter CTA */}
                <div className="mt-8">
                  <NewsletterCTA />
                </div>
              </div>

              {/* Footer */}
              <Footer />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </FavoritesProvider>
    </div>
  );
}
