import { getPostBySlug, getPosts } from "@/lib/get-blog-by-slug";
import { Metadata } from "next";
import readingTime from "reading-time";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ZoomableImage } from "@/components/ZoomableImage";

/**
 * Check if a URL should be followed by search engines
 * Returns false (nofollow) for external links except our own domains
 */
function shouldFollowLink(href: string | undefined): boolean {
  if (!href) return true;

  // Internal links (relative paths)
  if (href.startsWith("/")) return true;

  // Our own domains that should be followed
  const followDomains = ["apps.shopify.com/genlook", "genlook.app", "emmabortot.fr", "thibault.sh"];

  try {
    const url = new URL(href);
    return followDomains.some((domain) => url.hostname === domain || url.href.includes(domain));
  } catch {
    // If URL parsing fails, treat as internal/relative
    return true;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const post = getPostBySlug((await params).slug);
  const stats = readingTime(post.content);

  // Custom components for ReactMarkdown to handle external links with nofollow
  const markdownComponents: Components = {
    a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) => {
      const isExternal = href && !href.startsWith("/");
      const shouldFollow = shouldFollowLink(href);

      // Build rel attribute based on link type
      let rel: string | undefined;
      if (isExternal) {
        if (shouldFollow) {
          // Own domains: dofollow (no nofollow), keep referrer, but use noopener for security
          rel = "noopener";
        } else {
          // External links: nofollow + noopener + noreferrer
          rel = "nofollow noopener";
        }
      }
      // Internal links: no rel attribute (default behavior)

      return (
        <a href={href} target={isExternal ? "_blank" : undefined} rel={rel} {...props}>
          {children}
        </a>
      );
    },
    hr: (props) => <hr className="my-8 border-t-4 border-gray-200 rounded-full" {...props} />,
    img: (props) => <ZoomableImage src={props.src || ""} alt={props.alt || ""} {...props} />,
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-mono selection:bg-orange-100">
      <div className="relative max-w-3xl mx-auto px-6 py-12 sm:py-24">
        <header className="mb-16">
          <div className="mb-6 flex items-center gap-3 text-sm text-gray-500 font-medium uppercase tracking-wider">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{stats.text}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-8">
            {post.title}
          </h1>
        </header>

        <article
          className="prose prose-lg prose-gray max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
          prose-p:leading-relaxed prose-p:text-gray-800
          prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
          prose-strong:font-bold prose-strong:text-gray-900
          prose-code:text-orange-600 prose-code:bg-orange-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:font-medium
          prose-pre:bg-gray-900 prose-pre:text-gray-50 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-800 prose-pre:shadow-sm
          prose-hr:border-gray-200 prose-hr:border-t-4 prose-hr:rounded-full prose-hr:my-16
          prose-img:rounded-xl prose-img:shadow-sm prose-img:my-12"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}
