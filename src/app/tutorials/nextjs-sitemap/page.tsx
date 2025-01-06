import { CodeBlock } from "@/components/ui/code-block";

export default function SitemapTutorial() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Adding a Sitemap to Your Next.js Site</h1>

      <div className="prose max-w-none">
        <h2>Why You Need a Sitemap</h2>
        <p>
          Hey there! If you&apos;re building a Next.js site and want search engines to find all your content, you need a
          sitemap. It&apos;s like giving Google a map of your website - it helps them discover and index your pages
          faster. The best part? Next.js 13+ makes it super easy to create one.
        </p>

        <h2>The Quick Way</h2>
        <p>
          Next.js has a built-in way to generate sitemaps. Just create a <code>sitemap.ts</code> file in your{" "}
          <code>app</code> directory:
        </p>

        <CodeBlock
          language="typescript"
          code={`// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://yoursite.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://yoursite.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}`}
        />

        <p>
          That&apos;s it! Next.js will automatically create a <code>/sitemap.xml</code> at the root of your site. But
          let&apos;s make it more interesting...
        </p>

        <h2>Making it Dynamic</h2>
        <p>
          The real power comes when you generate your sitemap dynamically based on your actual content. Here&apos;s how
          I do it with my blog posts and other dynamic content:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { MetadataRoute } from 'next';

// Your data sources (could be from files, API, etc.)
interface BlogPost {
  slug: string;
  date: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  // Get your blog posts from wherever you store them
  return [
    { slug: 'first-post', date: '2024-01-01' },
    { slug: 'second-post', date: '2024-01-15' },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yoursite.com';
  
  // Get your dynamic content
  const posts = await getBlogPosts();
  
  // Start with your static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
  
  // Add blog posts to sitemap
  const postRoutes = posts.map(post => ({
    url: \`\${baseUrl}/blog/\${post.slug}\`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [...routes, ...postRoutes];
}`}
        />

        <h2>A Real-World Example</h2>
        <p>Here&apos;s how I handle multiple content types in my sitemap:</p>

        <CodeBlock
          language="typescript"
          code={`import { MetadataRoute } from 'next';

// Your content types
interface Page {
  path: string;
  lastMod?: Date;
}

interface BlogPost {
  slug: string;
  date: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yoursite.com';
  
  // Static pages with their update frequency
  const staticPages: Page[] = [
    { path: '', lastMod: new Date() },           // Home
    { path: '/about' },                          // About
    { path: '/blog' },                           // Blog index
    { path: '/projects' },                       // Projects
  ];

  // Get dynamic content
  const posts = await getBlogPosts();
  const products = await getProducts();
  
  const routes: MetadataRoute.Sitemap = [
    // Add static pages
    ...staticPages.map(page => ({
      url: \`\${baseUrl}\${page.path}\`,
      lastModified: page.lastMod || new Date(),
      changeFrequency: 'monthly' as const,
      priority: page.path === '' ? 1 : 0.8,
    })),
    
    // Add blog posts
    ...posts.map(post => ({
      url: \`\${baseUrl}/blog/\${post.slug}\`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    
    // Add products
    ...products.map(product => ({
      url: \`\${baseUrl}/products/\${product.id}\`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];
  
  return routes;
}`}
        />

        <h2>Pro Tips</h2>
        <p>Here are some things I&apos;ve learned about sitemaps:</p>
        <ul>
          <li>
            Set <code>priority</code> based on importance - home page should be 1.0, less important pages lower
          </li>
          <li>
            Use <code>changeFrequency</code> wisely - don&apos;t say daily if you rarely update the content
          </li>
          <li>Keep your sitemap under 50,000 URLs (that&apos;s Google&apos;s limit)</li>
          <li>
            For bigger sites, create multiple sitemaps and a sitemap index (I&apos;ll cover that in another tutorial)
          </li>
          <li>Always include the lastModified date - it helps search engines know when to recrawl</li>
        </ul>

        <h2>Testing Your Sitemap</h2>
        <p>Once you&apos;ve set it up, here&apos;s how to check if it&apos;s working:</p>
        <ol>
          <li>
            Visit <code>yoursite.com/sitemap.xml</code> - it should show your sitemap in XML format
          </li>
          <li>
            Use the{" "}
            <a
              href="https://search.google.com/search-console"
              className="text-orange-600 hover:text-orange-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Search Console
            </a>{" "}
            to submit your sitemap
          </li>
          <li>Check for any errors in the Search Console&apos;s sitemap report</li>
        </ol>

        <h2>Common Gotchas</h2>
        <p>Watch out for these common issues:</p>
        <ul>
          <li>
            Always use <strong>absolute URLs</strong> (https://yoursite.com/page), not relative ones (/page)
          </li>
          <li>
            The <code>changeFrequency</code> and <code>priority</code> fields are optional, but good to include
          </li>
          <li>
            Don&apos;t forget to add your sitemap URL to your <code>robots.txt</code> file
          </li>
          <li>Keep your dates in ISO format (the Date object handles this automatically)</li>
        </ul>

        <h2>Adding to robots.txt</h2>
        <p>
          Create a <code>robots.txt</code> file in your <code>public</code> folder:
        </p>

        <CodeBlock
          language="text"
          code={`# public/robots.txt
User-agent: *
Allow: /

# Add your sitemap URL
Sitemap: https://yoursite.com/sitemap.xml`}
        />

        <h2>Wrapping Up</h2>
        <p>
          That&apos;s it! You now have a dynamic sitemap that updates automatically with your content. Remember to
          submit it to search engines through their webmaster tools, and you&apos;re good to go! If you&apos;re handling
          lots of dynamic routes or need to split your sitemap into multiple files, check out my other tutorial on
          advanced sitemap techniques (coming soon).
        </p>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
          <p className="text-sm text-orange-700">
            <strong>Quick Tip:</strong> If your site has thousands of pages, consider caching the sitemap generation or
            using incremental static regeneration (ISR) to avoid regenerating it on every request.
          </p>
        </div>
      </div>
    </div>
  );
}
