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

const sidebarLinks = [
  {
    category: "Get Started",
    items: [{ href: "/hooks", label: "Installation" }],
  },
  {
    category: "State Management",
    items: [
      { href: "/hooks/use-local-storage-state", label: "useLocalStorageState" },
      { href: "/hooks/use-session-storage-state", label: "useSessionStorageState" },
      { href: "/hooks/use-cookie-state", label: "useCookieState" },
      { href: "/hooks/use-query-params-state", label: "useQueryParamsState" },
    ],
  },
  {
    category: "UI/Interaction",
    items: [
      { href: "/hooks/use-click-outside", label: "useClickOutside" },
      { href: "/hooks/use-hover", label: "useHover" },
      { href: "/hooks/use-key-press", label: "useKeyPress" },
      { href: "/hooks/use-key-combo", label: "useKeyCombo" },
      { href: "/hooks/use-long-press", label: "useLongPress" },
    ],
  },
  {
    category: "Layout/Viewport",
    items: [
      { href: "/hooks/use-media-query", label: "useMediaQuery" },
      { href: "/hooks/use-window-size", label: "useWindowSize" },
      { href: "/hooks/use-scroll-position", label: "useScrollPosition" },
      { href: "/hooks/use-container-scroll", label: "useContainerScroll" },
      { href: "/hooks/use-element-size", label: "useElementSize" },
      { href: "/hooks/use-intersection-observer", label: "useIntersectionObserver" },
      { href: "/hooks/use-resize-observer", label: "useResizeObserver" },
    ],
  },
  {
    category: "Utility",
    items: [
      { href: "/hooks/use-async", label: "useAsync" },
      { href: "/hooks/use-debounce", label: "useDebounce" },
      { href: "/hooks/use-throttle", label: "useThrottle" },
      { href: "/hooks/use-timer", label: "useTimer" },
      { href: "/hooks/use-interval", label: "useInterval" },
      { href: "/hooks/use-event-listener", label: "useEventListener" },
    ],
  },
];

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
              {sidebarLinks.map((category) => (
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
