"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-mono flex flex-col">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href="/apps" className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors w-fit">
            {pathname !== "/apps" && <ArrowLeft className="w-4 h-4" />}
            <span>{pathname === "/apps" ? "Explore Apps" : "Back to Apps"}</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Detailed Footer */}
      <footer className="border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground order-2 sm:order-1">
              Made with ❤️ by{" "}
              <Link
                href="https://thibault.sh"
                className="font-medium underline underline-offset-4 hover:text-orange-500 transition-colors"
              >
                Thibault Mathian
              </Link>
            </p>
            <div className="flex items-center gap-6 order-1 sm:order-2">
              <Link
                href="https://github.com/thibaultmthh"
                className="text-sm font-medium transition-colors hover:text-orange-500"
              >
                GitHub
              </Link>
              <Link
                href="https://twitter.com/thibault_mthh"
                className="text-sm font-medium transition-colors hover:text-orange-500"
              >
                Twitter
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-orange-500">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-orange-500">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
