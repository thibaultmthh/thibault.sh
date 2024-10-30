import { tools } from "@/config/tools";
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

  return routes;
}
