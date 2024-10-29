"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { tools } from "@/config/tools"; // We should move the tools config to a separate file

export function ToolsBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Find current category and tool
  const categoryKey = segments[1];
  const toolId = segments[2];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const category = Object.entries(tools).find(([_, value]) => value.path === categoryKey);
  const tool = category?.[1].items.find((item) => item.path.endsWith(toolId));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
        </BreadcrumbItem>

        {category && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/tools/${categoryKey}`}>{category[0]}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {tool && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tool.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
