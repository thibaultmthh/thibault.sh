import { hooks } from "@/config/hooks";
import { tools } from "@/config/tools";
import { getPosts } from "@/lib/get-blog-by-slug";
import { MetadataRoute } from "next";
import { apps } from "@/config/apps";
import { tutorials } from "@/config/tutorials";
import { PackageHooks } from "./hooks/packagehooks";
import { httpCodes } from "@/app/data/httpCodes";

// Function to get emojis for sitemap
async function getEmojis() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/github/gemoji/refs/heads/master/db/emoji.json");
    return response.json();
  } catch (error) {
    console.error("Failed to fetch emojis for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Add all HTTP status codes
  httpCodes.forEach((httpCode) => {
    routes.push({
      url: `${baseUrl}/tools/dev/http-codes/${httpCode.code}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Add data size converter specific conversion pages
  const units = ["bit", "byte", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"];
  units.forEach((fromUnit) => {
    units.forEach((toUnit) => {
      if (fromUnit !== toUnit) {
        routes.push({
          url: `${baseUrl}/tools/utilities/data-size-converter/${fromUnit}-to-${toUnit}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    });
  });

  // Add emoji pages
  try {
    const emojis = await getEmojis();

    // Get unique categories for category pages
    const categories = [...new Set(emojis.map((emoji: any) => emoji.category))];
    categories.forEach((category) => {
      routes.push({
        url: `${baseUrl}/tools/utilities/emoji-picker/category/${encodeURIComponent(category as string)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    // Add popular emojis (limit to avoid huge sitemap)
    const popularEmojis = [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "😚",
      "😋",
      "😛",
      "😝",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😎",
      "🤩",
      "🥳",
      "😏",
      "😒",
      "😞",
      "😔",
      "😟",
      "😕",
      "🙁",
      "☹️",
      "😣",
      "😖",
      "😫",
      "😩",
      "🥺",
      "😢",
      "😭",
      "😤",
      "😠",
      "😡",
      "🤬",
      "🤯",
      "😳",
      "🥵",
      "🥶",
      "😱",
      "😨",
      "😰",
      "😥",
      "😓",
      "🤗",
      "🤔",
      "🤭",
      "🤫",
      "🤥",
      "😶",
      "😐",
      "😑",
      "😬",
      "🙄",
      "😯",
      "😦",
      "😧",
      "😮",
      "😲",
      "🥱",
      "😴",
      "🤤",
      "😪",
      "😵",
      "🤐",
      "🥴",
      "🤢",
      "🤮",
      "🤧",
      "😷",
      "🤒",
      "🤕",
      "🤑",
      "🤠",
      "😈",
      "👍",
      "👎",
      "👌",
      "✌️",
      "🤞",
      "🤟",
      "🤘",
      "🤙",
      "👈",
      "👉",
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "🤍",
      "🤎",
      "💔",
      "🔥",
      "💯",
      "💥",
      "💫",
      "⭐",
      "🌟",
      "✨",
      "💎",
      "🎉",
      "🎊",
    ];

    popularEmojis.forEach((emoji) => {
      routes.push({
        url: `${baseUrl}/tools/utilities/emoji-picker/${encodeURIComponent(emoji)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    });
  } catch (error) {
    console.error("Failed to add emoji routes to sitemap:", error);
  }

  return routes;
}
