import Link from "next/link";
import { Rss } from "lucide-react";
import Footer from "@/components/Footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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

            <Link href="/blog" className="text-orange-600 hover:text-orange-700 transition-colors text-sm font-medium">
              Blog
            </Link>

            <div className="h-3.5 w-px bg-gray-200" />

            <Link
              href="/feed.xml"
              className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 transition-colors text-sm"
              title="RSS Feed"
            >
              <Rss className="h-4 w-4" />
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
