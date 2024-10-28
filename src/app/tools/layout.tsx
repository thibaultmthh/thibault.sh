import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { ToolsBreadcrumb } from "@/components/tools/tools-breadcrumb";
import { tools } from "@/config/tools";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="px-2 mt-2">
            <div>
              <a href="/tools" className="text-primary font-semibold text-xl">
                Thibault.sh toolbox
              </a>
              <br />
              <a href="/" className="text-sm text-muted-foreground hover:underline">
                Made by <span className="font-semibold">Thibault</span>.
              </a>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {Object.entries(tools).map(([category, { icon: Icon, items }]) => (
              <Collapsible key={category} defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                      <Icon className="mr-2 h-4 w-4" />
                      {category}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {items.map((tool) => (
                          <SidebarMenuItem key={tool.id}>
                            <SidebarMenuButton asChild>
                              <a href={tool.path}>
                                <span>{tool.name}</span>
                              </a>
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
        <main className="p-3">
          <div className="flex mb-4 items-center">
            <SidebarTrigger className="mr-2" />
            <ToolsBreadcrumb />
          </div>
          <div>{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
