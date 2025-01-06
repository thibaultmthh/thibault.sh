import { hooks } from "@/config/hooks";
import { tools } from "@/config/tools";
import { apps } from "@/config/apps";
import { tutorials } from "@/config/tutorials";
import Link from "next/link";
import { getPosts } from "@/lib/get-blog-by-slug";
import { Card } from "@/components/ui/card";
import { BoxIcon, Terminal } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { PackageHooks } from "@/app/hooks/layout";

export const metadata: Metadata = {
  title: "Sitemap - Thibault Mathian - Freelance Fullstack Developer",
};

export default function SitemapPage() {
  return (
    <div className="relative min-h-screen bg-white text-gray-800 font-mono">
      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex items-center gap-2 mb-8 text-orange-500">
          <Terminal className="w-5 h-5" />
          <span className="text-sm">thibault.sh ~ sitemap</span>
        </div>

        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">→ ls --sitemap</div>
          <h1 className="text-3xl font-bold mb-2 text-orange-500">Sitemap</h1>
          <p className="text-md text-muted-foreground">
            A complete overview of all pages and resources available on this site.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Blog Section */}
          <Card className="p-6 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-md bg-red-50">
                <BoxIcon className="h-5 w-5 text-red-500" />
              </div>
              <h2 className="text-2xl font-semibold">Blog Posts</h2>
            </div>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getPosts().map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block p-4 rounded-lg hover:bg-slate-50 border transition-all hover:border-red-500/50"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          {/* Tools Section */}
          <Card className="p-6 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-md bg-orange-50">
                <BoxIcon className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-2xl font-semibold">Tools</h2>
            </div>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(tools).map(([key, category]) => (
                <li key={key}>
                  <Link
                    href={`/tools/${category.path}`}
                    className="block p-4 rounded-lg hover:bg-slate-50 border transition-all hover:border-orange-500/50"
                  >
                    {category.name}
                    <span className="text-sm text-muted-foreground block">{category.items.length} tools</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          {/* Hooks Section */}
          <Card className="p-6 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-md bg-blue-50">
                <BoxIcon className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <Link href="/hooks">
                  <h2 className="text-2xl font-semibold">Package Hooks</h2>
                </Link>
              </div>
            </div>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {PackageHooks.map((category) => (
                <li key={category.category}>
                  <div className="block p-4 rounded-lg border">
                    {category.category}
                    <span className="text-sm text-muted-foreground block">{category.items.length} hooks</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* React Hooks Section */}
          <Card className="p-6 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-md bg-blue-50">
                <BoxIcon className="h-5 w-5 text-blue-500" />
              </div>
              <Link href="/react-hooks">
                <h2 className="text-2xl font-semibold">React Hooks</h2>
              </Link>
            </div>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(hooks).map(([key, category]) => (
                <li key={key}>
                  <div className="block p-4 rounded-lg border">
                    {category.name}
                    <span className="text-sm text-muted-foreground block">{category.items.length} hooks</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Apps Section */}
          <Card className="p-6 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-md bg-green-50">
                <BoxIcon className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold">Apps</h2>
            </div>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <li key={app.id}>
                  <Link
                    href={app.path}
                    className="block p-4 rounded-lg hover:bg-slate-50 border transition-all hover:border-green-500/50"
                  >
                    {app.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          {/* Tutorials Section */}
          <Card className="p-6 border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-md bg-purple-50">
                <BoxIcon className="h-5 w-5 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold">Tutorials</h2>
            </div>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tutorials.map((tutorial) => (
                <li key={tutorial.id}>
                  <Link
                    href={`/tutorials/${tutorial.id}`}
                    className="block p-4 rounded-lg hover:bg-slate-50 border transition-all hover:border-purple-500/50"
                  >
                    <div>{tutorial.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="capitalize">{tutorial.category}</span>
                      {" • "}
                      <span className="capitalize">{tutorial.difficulty}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <div className="mt-12">
            <div className="text-sm text-gray-500 mb-4">→ cd ..</div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500/50 hover:bg-orange-50 transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          <footer className="mt-16 text-center text-gray-500">
            <div className="flex justify-center space-x-4 sm:space-x-6 mb-4 sm:mb-6">
              <SocialLink icon={<GitHubLogoIcon />} href="https://github.com/thibaultmthh" label="My github link" />
              <SocialLink
                icon={<LinkedInLogoIcon />}
                href="https://www.linkedin.com/in/thibault-mathian/"
                label="My Linkedin link"
              />
              <SocialLink
                icon={<TwitterLogoIcon />}
                href="https://twitter.com/thibault_mthh"
                label="My Twitter (X) link"
              />
            </div>
            <p className="text-sm sm:text-base text-zinc-600">Made with ❤️ by Thibault Mathian</p>
          </footer>

          <div className="mt-12 flex items-center gap-2 text-gray-500">
            <span>→</span>
            <div className="w-3 h-6 bg-orange-500/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href, label }) => (
  <a href={href} aria-label={label} className="text-orange-500 hover:text-orange-600 transition-colors">
    {icon}
  </a>
);
