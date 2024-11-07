import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "src", "_blog-posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export type Post = {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  ogImage: {
    url: string;
  };
};

export function getPostBySlug(slug: string) {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { ...(data as Post), slug: realSlug, content };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

export function getPosts() {
  return getPostSlugs().map((slug) => getPostBySlug(slug));
}
