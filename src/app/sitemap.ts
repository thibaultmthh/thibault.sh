import { hooks } from "@/config/hooks";
import { tools } from "@/config/tools";
import { getPosts } from "@/lib/get-blog-by-slug";
import { MetadataRoute } from "next";

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
  ];

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

  return routes;
}
