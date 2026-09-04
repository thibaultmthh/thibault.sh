import { scribe } from "./scribe";
import { DEFAULT_LOCALE, localePath } from "./i18n";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt: string;
  content: string;
  /** Locale of the content actually shown (the default locale when untranslated). */
  locale: string;
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
    locale: doc.locale,
  };
}

/** Every post, in the requested locale when a translation exists, else the default-locale version. */
export function getPosts(locale = DEFAULT_LOCALE): Post[] {
  return scribe.blog
    .list(DEFAULT_LOCALE)
    .map((doc) => (locale === DEFAULT_LOCALE ? doc : (scribe.blog.translation(doc, locale) ?? doc)))
    .map(toPost);
}

export type ResolvedPost = {
  post: Post;
  /** False when Scribe fell back to the default locale. */
  translated: boolean;
  /** Canonical site-relative path (the default-locale URL when untranslated). */
  canonicalPath: string;
  /** hreflang map limited to locales that really have this post. */
  alternates: Record<string, string>;
};

/** Slug lookup with Scribe's fallback chain (regional → base → default locale). */
export function getPost(slug: string, locale: string): ResolvedPost | null {
  const r = scribe.blog.resolve(slug, locale);
  if (!r.document) return null;
  return {
    post: toPost(r.document),
    translated: r.actualLocale === locale,
    canonicalPath: r.canonicalPath ?? localePath(`/blog/${r.document.slug}`, r.actualLocale),
    alternates: scribe.blog.alternates(r.document),
  };
}

/** `{ locale, slug }` pairs for every locale, including untranslated ones (served with EN fallback + noindex). */
export const postStaticParams = () => scribe.blog.staticParams();

export const postPath = (slug: string, locale: string) => localePath(`/blog/${slug}`, locale);

export function fmtDate(d: string) {
  return d ? new Date(d).toISOString().slice(0, 10) : "";
}
