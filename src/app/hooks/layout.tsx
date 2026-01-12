import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown, Code2 } from "lucide-react";
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
import Link from "next/link";
import { PackageHooks } from "./packagehooks";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Default metadata for /hooks page
  return {
    title: "@thibault.sh/hooks | React Hooks Package",
    description:
      "A collection of performant React hooks for common use cases. Built with TypeScript for reliability and developer experience.",
    keywords: "React hooks, TypeScript hooks, custom hooks, React development, web development",
    openGraph: {
      title: "@thibault.sh/hooks | React Hooks Package",
      description:
        "A collection of performant React hooks for common use cases. Built with TypeScript for reliability and developer experience.",
      type: "website",
      url: "https://thibault.sh/hooks",
    },
    alternates: {
      canonical: "https://thibault.sh/hooks",
    },
  };
}

export default function HooksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-mono flex flex-col">
      <SidebarProvider>
        <div className="flex flex-1">
          <Sidebar variant="inset">
            <SidebarHeader className="px-2 mt-2">
              <Link href="/hooks" className="flex items-center gap-2 mb-4 text-orange-500">
                <Code2 className="w-5 h-5" />
                <span className="text-sm">@thibault.sh/hooks</span>
              </Link>

              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors">
                  <span>←</span>
                  <span>Portfolio</span>
                </Link>
              </div>
            </SidebarHeader>
            <SidebarContent>
              {PackageHooks.map((category) => (
                <Collapsible key={category.category} defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="hover:text-orange-500 transition-colors">
                        {category.category}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {category.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                              <SidebarMenuButton asChild>
                                <Link href={item.href} className="hover:text-orange-500 transition-colors">
                                  <span>{item.label}</span>
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
          <SidebarInset className="flex-1 flex flex-col">
            <div className="p-3 flex-1">
              <div className="flex mb-4 items-center">
                <SidebarTrigger className="mr-2 hover:text-orange-500 transition-colors" />
              </div>
              <div className="p-2 flex-1 overflow-auto">{children}</div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
