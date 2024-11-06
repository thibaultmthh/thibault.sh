import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="bg-white border-b border-gray-200 mb-2">
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
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
