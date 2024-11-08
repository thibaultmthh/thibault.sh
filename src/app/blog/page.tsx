import { getPosts } from "@/lib/get-blog-by-slug";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Thibault Mathian",
  description: "Articles about web development, programming, and technology",
  alternates: {
    types: {
      "application/rss+xml": "https://thibault.sh/feed.xml",
    },
  },
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-mono">
      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">Blog Posts</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-orange-500 transition-colors"
            >
              <h2 className="text-xl font-bold text-orange-600 mb-2">{post.title}</h2>
              <div className="text-gray-500 text-xs mb-3">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <p className="text-gray-700 text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
