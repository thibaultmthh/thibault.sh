"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { tools } from "@/config/tools";
import { DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export function CommandMenu() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  // Only show on tool pages

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full max-w-sm text-sm text-muted-foreground justify-between"
        onClick={() => setOpen(true)}
      >
        <div className="flex justify-start items-center -ml-1">
          <Search className="mr-2 h-4 w-4" />

          <span>Search tools...</span>
        </div>
        <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search tools</DialogTitle>
        <CommandInput placeholder="Search tools..." />
        <CommandList>
          <CommandEmpty>No tools found.</CommandEmpty>
          {Object.entries(tools).map(([category, { icon: Icon, items }]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((tool) => (
                <CommandItem
                  key={tool.id}
                  onSelect={() => {
                    router.push(tool.path);
                    setOpen(false);
                  }}
                  keywords={tool.seo.keywords.split(",")}
                >
                  <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{tool.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{tool.description}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
