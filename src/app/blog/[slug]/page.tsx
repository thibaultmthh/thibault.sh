import { getPostBySlug } from "@/lib/get-blog-by-slug";
import { markdownToHtml } from "@/lib/markdown-to-html";
import { Metadata } from "next";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const post = getPostBySlug((await params).slug);

  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-mono">
      <div className="relative max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <article className="bg-gray-50 p-8 rounded-lg border border-gray-200">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">{post.title}</h1>
            <div className="text-gray-500 text-sm">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </header>

          <div
            className="prose max-w-none prose-orange prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-code:text-orange-600"
            dangerouslySetInnerHTML={{ __html: await markdownToHtml(post.content) }}
          />
        </article>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
