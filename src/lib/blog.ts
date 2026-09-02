import { scribe, LOCALE } from "./scribe";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt: string;
  content: string;
};

type BlogDoc = ReturnType<typeof scribe.blog.list>[number];

function toPost(doc: BlogDoc): Post {
  return {
    slug: doc.slug,
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    date: doc.publishedAt ?? "",
    updatedAt: doc.updatedAt ?? doc.publishedAt ?? "",
    content: doc.content,
  };
}

export function getPosts(): Post[] {
  return scribe.blog.list(LOCALE).map(toPost);
}

export function getPostBySlug(slug: string): Post | null {
  const doc = scribe.blog.get(slug, LOCALE);
  return doc ? toPost(doc) : null;
}

export function fmtDate(d: string) {
  return d ? new Date(d).toISOString().slice(0, 10) : "";
}
