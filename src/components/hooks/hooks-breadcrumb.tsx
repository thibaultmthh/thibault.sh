"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { hooks } from "@/config/hooks";
import { usePathname } from "next/navigation";

export function HooksBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Find current category and hook
  const categoryKey = segments[1];
  const hookId = segments[2];

  const category = Object.entries(hooks).find(([_, value]) => value.path === categoryKey);
  const hook = category?.[1].items.find((item) => item.path.endsWith(hookId));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/react-hooks">Hooks</BreadcrumbLink>
        </BreadcrumbItem>

        {category && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/react-hooks/${categoryKey}`}>{category[0]}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {hook && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{hook.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
