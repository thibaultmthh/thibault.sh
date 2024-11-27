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
  const hookId = segments[1];

  const hook = hookId
    ? Object.values(hooks)
        .find((category) => category.items.some((item) => item.id === hookId))
        ?.items.find((item) => item.id === hookId)
    : null;

  if (!hook) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/react-hooks">Hooks</BreadcrumbLink>
        </BreadcrumbItem>

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
