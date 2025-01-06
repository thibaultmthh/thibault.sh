import { hooks } from "@/config/hooks";
import { tools } from "@/config/tools";
import { getPosts } from "@/lib/get-blog-by-slug";
import { MetadataRoute } from "next";
import { apps } from "@/config/apps";
import { PackageHooks } from "@/app/hooks/layout";
import { tutorials } from "@/config/tutorials";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for the website
  const baseUrl = "https://thibault.sh";

  // Start with the main tools page
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/site-map`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Add all tutorials
  tutorials.forEach((tutorial) => {
    routes.push({
      url: `${baseUrl}/tutorials/${tutorial.id}`,
      lastModified: new Date(tutorial.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Add all tool pages
  Object.values(tools).forEach((category) => {
    category.items.forEach((tool) => {
      routes.push({
        url: `${baseUrl}${tool.path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  // Add all category pages
  Object.values(tools).forEach((category) => {
    routes.push({
      url: `${baseUrl}/tools/${category.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  // add all hooks pages
  Object.values(hooks).forEach((category) => {
    // Add hooks category pages
    category.items.forEach((hook) => {
      routes.push({
        url: `${baseUrl}/react-hooks/${hook.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  routes.push({
    url: `${baseUrl}/react-hooks`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  });

  // Add all blog posts
  const posts = getPosts();
  posts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  // Add all app pages
  apps.forEach((app) => {
    routes.push({
      url: `${baseUrl}${app.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  // Add all hooks pages from PackageHooks
  PackageHooks.forEach((category) => {
    category.items.forEach((item) => {
      routes.push({
        url: `${baseUrl}${item.href}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  // Add main hooks page
  routes.push({
    url: `${baseUrl}/hooks`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  });

  return routes;
}
