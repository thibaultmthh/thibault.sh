import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tutorials - Thibault Mathian",
  description: "Learn web development, programming, and technology through detailed tutorials",
};

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-12 gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 transition-colors text-sm"
            >
              <span>←</span>
              <span>Home</span>
            </Link>

            <div className="h-3.5 w-px bg-gray-200" />

            <Link
              href="/tutorials"
              className="text-orange-600 hover:text-orange-700 transition-colors text-sm font-medium"
            >
              Tutorials
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 overflow-auto">{children}</main>
      <div className="mt-auto mb-6">
        <Footer />
      </div>
    </div>
  );
}
