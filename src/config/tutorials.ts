export type Tutorial = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

export const tutorials: Tutorial[] = [
  {
    id: "nestjs-redis-caching",
    title: "Redis Caching in NestJS: A Practical Guide",
    description: "Learn how to implement efficient caching with Redis in your NestJS applications",
    date: "2024-01-29",
    category: "nestjs",
    difficulty: "intermediate",
  },
  {
    id: "publishing-npm-package",
    title: "How to Publish Your First NPM Package",
    description: "Learn how to create, test, and publish your own NPM package with TypeScript and best practices",
    date: "2024-01-28",
    category: "javascript",
    difficulty: "beginner",
  },
  {
    id: "nextjs-sitemap",
    title: "Adding a Sitemap to Your Next.js Site",
    description: "Learn how to create and configure a dynamic sitemap for your Next.js website to improve SEO",
    date: "2024-01-27",
    category: "nextjs",
    difficulty: "beginner",
  },
  {
    id: "parsing-csv-typescript",
    title: "Easy CSV Parsing in TypeScript",
    description: "Learn how to parse CSV files efficiently in TypeScript with type safety and error handling",
    date: "2024-01-26",
    category: "typescript",
    difficulty: "beginner",
  },
  {
    id: "implementing-infinite-scroll-react",
    title: "Simple Infinite Scroll in React - A Beginner's Guide",
    description:
      "Learn how to implement basic infinite scrolling in React with a simple demo and step-by-step explanation",
    date: "2024-01-20",
    category: "react",
    difficulty: "beginner",
  },
];
