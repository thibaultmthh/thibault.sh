/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { hooks } from "@/config/hooks";
import { HooksList } from "@/components/hooks/hooks-list";
import { HooksBreadcrumb } from "@/components/hooks/hooks-breadcrumb";
import { headers } from "next/headers";
import { Metadata } from "next";
import { getHookMetadata } from "@/lib/get-hook-metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  console.log(await params);
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Split path and filter out empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Check if we're in a tool path (/tools/category/toolId)
  if (segments.length >= 2 && segments[0] === "react-hooks") {
    const toolId = segments[1]; // Get the third segment (toolId)
    return getHookMetadata(toolId);
  }

  // Default metadata for /tools page
  return {
    title: "React Hooks Collection | Thibault Mathian",
    description:
      "Explore a collection of custom React hooks built by Thibault Mathian. Enhance your React applications with these reusable and efficient hooks.",
    keywords: "React hooks, custom hooks, React development, Thibault Mathian, web development",
    openGraph: {
      title: "React Hooks Collection | Thibault Mathian",
      description:
        "Explore a collection of custom React hooks built by Thibault Mathian. Enhance your React applications with these reusable and efficient hooks.",
      type: "website",
      url: "https://thibault.sh/react-hooks",
    },
    alternates: {
      canonical: "https://thibault.sh/react-hooks",
    },
  };
}

export default function HooksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen font-mono">
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarHeader className="px-2 mt-2">
            <Link href="/react-hooks" className="flex items-center gap-2 mb-4 text-orange-500">
              <Terminal className="w-5 h-5" />
              <span className="text-sm">React Hooks</span>
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors">
                <span>←</span>
                <span>Portfolio</span>
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <HooksList hooks={hooks as any} />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="p-3">
            <div className="flex mb-4 items-center">
              <HooksBreadcrumb />
            </div>
            <div className="p-2">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
