"use client";

import Footer from "@/components/Footer";
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
      <Footer />
      <div className="mb-6" />
    </div>
  );
}
